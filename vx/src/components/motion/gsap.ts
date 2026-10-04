"use client";

import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { EASE_VX, EASE_VX_BEZIER } from "@/lib/motion";

let registered = false;

export function registerGSAP() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger, CustomEase, useGSAP);
  CustomEase.create(EASE_VX, EASE_VX_BEZIER);
  gsap.defaults({ ease: EASE_VX, duration: 0.8 });
  registered = true;
}

registerGSAP();

export { gsap, ScrollTrigger, useGSAP };
