"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { POSTER_POSE } from "@/three/VXScene";

const VXScene = dynamic(() => import("@/three/VXScene"), { ssr: false });

export function PosterLab() {
  const [ready, setReady] = useState(false);
  return (
    <div
      id="poster"
      data-ready={ready}
      style={{ position: "fixed", inset: 0, zIndex: 9999, width: 1200, height: 1200, background: "transparent" }}
    >
      <VXScene active pose={POSTER_POSE} onReady={() => setTimeout(() => setReady(true), 400)} />
    </div>
  );
}
