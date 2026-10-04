"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { chromeMaterial, markGeometries, studioEnvironment } from "./markScene";
import { heroState } from "./heroState";

const damp = THREE.MathUtils.damp;

function Environment() {
  const { gl, scene } = useThree();
  useEffect(() => {
    const env = studioEnvironment(gl);
    scene.environment = env;
    return () => {
      scene.environment = null;
      env.dispose();
    };
  }, [gl, scene]);
  return null;
}

function Mark({ onReady }: { onReady?: () => void }) {
  const geos = useMemo(() => markGeometries(), []);
  const mat = useMemo(() => chromeMaterial(), []);
  const root = useRef<THREE.Group>(null);
  const top = useRef<THREE.Group>(null);
  const bottom = useRef<THREE.Group>(null);
  const s = useRef({ rx: 0, ry: 0, gap: 0.8, intro: 0 });
  const readyCalled = useRef(false);

  useEffect(
    () => () => {
      geos.top.dispose();
      geos.bottom.dispose();
      mat.dispose();
    },
    [geos, mat],
  );

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const st = s.current;
    const d = Math.min(dt, 1 / 30);

    // montagem: as metades se aproximam da linha
    st.intro = damp(st.intro, 1, 2.4, d);
    const idle = Math.sin(t * 0.45) * 0.22;
    const targetRy = idle + heroState.px * 0.55;
    const targetRx = heroState.py * 0.22;
    st.ry = damp(st.ry, targetRy, 3, d);
    st.rx = damp(st.rx, targetRx, 3, d);
    const targetGap = (1 - st.intro) * 0.9 + heroState.progress * 0.55 + Math.sin(t * 0.8) * 0.006;
    st.gap = damp(st.gap, targetGap, 4, d);

    if (top.current && bottom.current && root.current) {
      // V em cima responde ao ponteiro; o reflexo responde espelhado.
      top.current.rotation.set(st.rx, st.ry, 0);
      bottom.current.rotation.set(-st.rx, -st.ry * 0.82, 0);
      top.current.position.y = st.gap / 2;
      bottom.current.position.y = -st.gap / 2;
      root.current.rotation.z = heroState.progress * -0.12;
      const sc = 1 - heroState.progress * 0.12;
      root.current.scale.setScalar(sc * (0.92 + st.intro * 0.08));
    }

    if (!readyCalled.current && st.intro > 0.02) {
      readyCalled.current = true;
      onReady?.();
    }
  });

  return (
    <group ref={root}>
      <group ref={top}>
        <mesh geometry={geos.top} material={mat} />
      </group>
      <group ref={bottom}>
        <mesh geometry={geos.bottom} material={mat} />
      </group>
    </group>
  );
}

export default function VXScene({
  active,
  onReady,
}: {
  active: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ fov: 28, position: [0, 0, 7.2], near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.setClearColor(0x000000, 0);
      }}
      aria-hidden
    >
      <Environment />
      <Mark onReady={onReady} />
    </Canvas>
  );
}
