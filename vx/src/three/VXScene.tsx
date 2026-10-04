"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { chromeMaterial, markGeometries, studioEnvironment } from "./markScene";
import { heroState } from "./heroState";

const damp = THREE.MathUtils.damp;

function Environment() {
  const gl = useThree((st) => st.gl);
  const env = useMemo(() => studioEnvironment(gl), [gl]);
  useEffect(() => () => env.dispose(), [env]);
  return <primitive object={env} attach="environment" />;
}

export type Pose = { rx: number; ry: number; gap: number };

/** Pose do pôster estático (/public/media/vx-chrome.webp). */
export const POSTER_POSE: Pose = { rx: 0.04, ry: 0.32, gap: 0.035 };

function Mark({ onReady, pose }: { onReady?: () => void; pose?: Pose }) {
  const geos = useMemo(() => markGeometries(), []);
  const mat = useMemo(() => chromeMaterial(), []);
  const root = useRef<THREE.Group>(null);
  const top = useRef<THREE.Group>(null);
  const bottom = useRef<THREE.Group>(null);
  // Começa exatamente na pose do pôster estático: a troca pôster → 3D não pula.
  const s = useRef({ rx: POSTER_POSE.rx, ry: POSTER_POSE.ry, t0: -1 });
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
    const p = pose ?? null;

    if (!top.current || !bottom.current || !root.current) return;

    let rx: number, ry: number, gap: number;
    if (p) {
      rx = p.rx;
      ry = p.ry;
      gap = p.gap;
    } else {
      if (st.t0 < 0) st.t0 = t;
      const e = t - st.t0;
      // balanço lento a partir da pose do pôster + resposta ao ponteiro
      const idle = POSTER_POSE.ry * Math.cos(e * 0.42);
      st.ry = damp(st.ry, idle + heroState.px * 0.5, 2.6, d);
      st.rx = damp(st.rx, POSTER_POSE.rx + heroState.py * 0.2, 2.6, d);
      rx = st.rx;
      ry = st.ry;
      gap = POSTER_POSE.gap + heroState.progress * 0.55 + Math.sin(e * 0.8) * 0.008;
    }

    // V em cima responde ao ponteiro; o reflexo responde espelhado.
    top.current.rotation.set(rx, ry, 0);
    bottom.current.rotation.set(-rx, -ry * 0.82, 0);
    top.current.position.y = gap / 2;
    bottom.current.position.y = -gap / 2;
    root.current.rotation.z = heroState.progress * -0.12;
    root.current.scale.setScalar(1 - heroState.progress * 0.12);

    if (!readyCalled.current) {
      readyCalled.current = true;
      // espera um quadro renderizado antes de trocar o pôster pelo canvas
      requestAnimationFrame(() => onReady?.());
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
  pose,
}: {
  active: boolean;
  onReady?: () => void;
  pose?: Pose;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ fov: 28, position: [0, 0, 7.2], near: 0.1, far: 50 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: !!pose }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.setClearColor(0x000000, 0);
      }}
      aria-hidden
    >
      <Environment />
      <Mark onReady={onReady} pose={pose} />
    </Canvas>
  );
}
