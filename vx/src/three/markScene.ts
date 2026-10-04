import * as THREE from "three";
import { MARK, markHalves, type Pt } from "@/lib/mark";

/**
 * Peças 3D do monograma VX, sem dependência de React — usadas pela cena
 * interativa (R3F) e pelo laboratório que renderiza o pôster estático.
 */

export const UNIT = 2 / MARK.H; // a marca inteira mede 2 unidades de altura

function shapeFrom(points: Pt[]) {
  const s = new THREE.Shape();
  points.forEach(([x, y], i) => {
    // SVG (y para baixo) → three (y para cima), centrado na linha de corte
    const px = (x - MARK.W / 2) * UNIT;
    const py = (MARK.H / 2 - y) * UNIT;
    if (i === 0) s.moveTo(px, py);
    else s.lineTo(px, py);
  });
  s.closePath();
  return s;
}

export function markGeometries(gap = 2.2) {
  const { top, bottom } = markHalves(gap);
  const opts: THREE.ExtrudeGeometryOptions = {
    depth: 22 * UNIT,
    bevelEnabled: true,
    bevelThickness: 2.4 * UNIT,
    bevelSize: 1.5 * UNIT,
    bevelOffset: 0,
    bevelSegments: 5,
    curveSegments: 1,
  };
  const make = (pts: Pt[]) => {
    const g = new THREE.ExtrudeGeometry(shapeFrom(pts), opts);
    g.translate(0, 0, -(22 * UNIT) / 2);
    g.computeVertexNormals();
    return g;
  };
  return { top: make(top), bottom: make(bottom) };
}

export function chromeMaterial() {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color("#dfe3e8"),
    metalness: 1,
    roughness: 0.12,
    clearcoat: 0.6,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.3,
  });
}

/** Cor de sódio da marca. */
export const SODIUM = new THREE.Color("#ff8a2b");

/**
 * Estúdio noturno para reflexos: preto, softbox frio em cima, tubo de luz
 * branca à esquerda, tubo de sódio à direita e uma linha horizontal ao fundo
 * (a "linha de corte" refletida no cromo).
 */
export function studioEnvironment(renderer: THREE.WebGLRenderer) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color("#050505");

  const box = new THREE.BoxGeometry(1, 1, 1);
  const plane = new THREE.PlaneGeometry(1, 1);

  const room = new THREE.Mesh(
    box,
    new THREE.MeshBasicMaterial({ color: new THREE.Color("#0b0b0c"), side: THREE.BackSide }),
  );
  room.scale.set(30, 18, 30);
  scene.add(room);

  const light = (
    color: THREE.Color,
    intensity: number,
    pos: [number, number, number],
    scale: [number, number],
    lookAt: [number, number, number] = [0, 0, 0],
  ) => {
    const mat = new THREE.MeshBasicMaterial({ color: color.clone().multiplyScalar(intensity), side: THREE.DoubleSide });
    const m = new THREE.Mesh(plane, mat);
    m.position.set(...pos);
    m.scale.set(scale[0], scale[1], 1);
    m.lookAt(...lookAt);
    scene.add(m);
    return m;
  };

  const white = new THREE.Color("#f3f5f8");
  // softbox de cima, levemente à frente
  light(white, 2.2, [0, 8, 3], [10, 4]);
  // tubo frio à esquerda (vertical)
  light(white, 6, [-7, 0.5, 2.5], [0.55, 12]);
  // tubo de sódio à direita (vertical)
  light(SODIUM, 7, [7, 0, 1.5], [0.6, 12]);
  // recorte de fundo frio
  light(white, 1.2, [-3, 1, -9], [6, 7]);
  // linha horizontal ao fundo
  light(white, 6, [0, 0, -8], [26, 0.12]);
  // piso: rebatimento fraco de sódio
  light(SODIUM, 0.35, [0, -8, 2], [12, 6]);

  // Frente (atrás da câmera): é o que as faces da marca refletem.
  // softbox grande no alto à esquerda — gradiente na face
  light(white, 1.5, [-4.5, 3.2, 9], [8, 5.5]);
  light(white, 0.45, [2.5, 1.5, 9.5], [5, 4]);
  // a linha de corte, refletida na face como um traço de luz
  light(white, 7, [0, 0.35, 9], [34, 0.1]);
  // sódio baixo à direita
  light(SODIUM, 1.3, [5, -3.4, 8.5], [6, 3]);

  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromScene(scene, 0.02).texture;
  pmrem.dispose();
  box.dispose();
  plane.dispose();
  return env;
}
