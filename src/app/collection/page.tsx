"use client";

import navStore from "@/utils/store";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import { collectionCanvas } from "../scene/collection";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Collection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lenis = new Lenis();

  lenis.on("scroll", ScrollTrigger.update);

  const [threeApi, setThreeApi] = useState<{
    moveCamera: (x: number) => void;
  }>();

  navStore.getState().setPage("collection");
  useEffect(() => {
    if (!canvasRef.current) return;

    collectionCanvas(canvasRef.current, setThreeApi);

    const resize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useGSAP(() => {
    if (!wrapperRef.current || !trackRef.current || !threeApi) return;

    const sections = gsap.utils.toArray<HTMLElement>(".h-section");
    const totalWidth = sections.reduce((sum, el) => sum + el.offsetWidth, 0);

    gsap.set(trackRef.current, { width: totalWidth });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    gsap.to(trackRef.current, {
      x: -(totalWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: totalWidth - window.innerWidth,
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const camX = (self.progress * (totalWidth - window.innerWidth)) / 32;
          threeApi.moveCamera(camX);
        },
      },
    });
  }, [threeApi]);

  return (
    <>
      <div
        ref={wrapperRef}
        className="relative h-screen w-full overflow-hidden"
      >
        <div ref={trackRef} className="flex">
          <div className="h-section flex-shrink-0 w-screen " />
          <div className="h-section flex-shrink-0 w-screen " />
        </div>
      </div>
      <canvas ref={canvasRef} className="fixed inset-0 -z-10" />
    </>
  );
}
