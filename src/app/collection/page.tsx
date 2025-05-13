"use client";

import { collectionCanvas } from "../scene/collection";

import navStore from "@/utils/store";
import { useEffect, useRef } from "react";

export default function Collection() {
  const setPage = navStore((state) => state.setPage);
  setPage("collection");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    collectionCanvas(canvasRef.current);

    const handleResize = () => {
      if (canvasRef.current) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
