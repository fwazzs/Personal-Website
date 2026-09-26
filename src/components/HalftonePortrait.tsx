"use client";

import Image from "next/image";
import type { PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

interface HalftonePortraitProps {
  src: string;
  alt: string;
  halftoneLabel: string;
}

interface HalftonePoint {
  u: number;
  v: number;
  lum: number;
}

const GRID_W = 160;
const GRID_H = 202;

export default function HalftonePortrait({ src, alt, halftoneLabel }: HalftonePortraitProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<HalftonePoint[] | null>(null);
  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const points = pointsRef.current;
    if (!canvas || !points) return;
    const rect = canvas.getBoundingClientRect();
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    if (!width || !height) return;
    const dpr = window.devicePixelRatio || 1;
    const backingWidth = Math.round(width * dpr);
    const backingHeight = Math.round(height * dpr);
    if (canvas.width !== backingWidth || canvas.height !== backingHeight) {
      canvas.width = backingWidth;
      canvas.height = backingHeight;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    let px: number | null = null;
    let py: number | null = null;
    if (pointerRef.current) {
      px = pointerRef.current.x - rect.left;
      py = pointerRef.current.y - rect.top;
    }
    const cell = width / GRID_W;
    const maxRadius = cell * 0.68;
    const lensRadius = Math.max(width, height) * 0.28;

    // Every dot shares one color, so they all go into a single path and a single fill() call.
    ctx.fillStyle = "rgba(245,245,247,.94)";
    ctx.beginPath();
    for (const point of points) {
      const x = point.u * width;
      const y = point.v * height;
      let glow = 0;
      if (px !== null && py !== null) {
        const dx = x - px;
        const dy = y - py;
        const distance = Math.hypot(dx, dy);
        if (distance < lensRadius) glow = 1 - distance / lensRadius;
      }
      const radius = Math.pow(point.lum, 0.85) * maxRadius * (1 + glow * 0.15);
      if (radius < 0.3) continue;
      ctx.moveTo(x + radius, y);
      ctx.arc(x, y, radius, 0, Math.PI * 2);
    }
    ctx.fill();
  }, []);

  const scheduleDraw = useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      draw();
    });
  }, [draw]);

  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (cancelled) return;
      try {
        const offscreen = document.createElement("canvas");
        offscreen.width = GRID_W;
        offscreen.height = GRID_H;
        const octx = offscreen.getContext("2d");
        if (!octx) return;
        const sourceAspect = img.naturalWidth / img.naturalHeight;
        const targetAspect = GRID_W / GRID_H;
        let sx = 0;
        let sw = img.naturalWidth;
        let sh = img.naturalHeight;
        if (sourceAspect > targetAspect) {
          sh = img.naturalHeight;
          sw = sh * targetAspect;
          sx = (img.naturalWidth - sw) / 2;
        } else {
          sw = img.naturalWidth;
          sh = sw / targetAspect;
        }
        octx.drawImage(img, sx, 0, sw, sh, 0, 0, GRID_W, GRID_H);
        const data = octx.getImageData(0, 0, GRID_W, GRID_H).data;
        const points: HalftonePoint[] = [];
        for (let gy = 0; gy < GRID_H; gy++) {
          for (let gx = 0; gx < GRID_W; gx++) {
            const i = (gy * GRID_W + gx) * 4;
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            // Green-screen key: the backdrop reads far greener than any skin/hair/clothing tone.
            if (g > 80 && g > r * 1.18 && g > b * 1.18) continue;
            const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
            points.push({ u: (gx + 0.5) / GRID_W, v: (gy + 0.5) / GRID_H, lum });
          }
        }
        pointsRef.current = points;
        setReady(true);
      } catch {
        // getImageData failed (e.g. a tainted canvas) — keep showing the fallback <img>.
      }
    };
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    if (!ready) return;
    draw();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(() => scheduleDraw());
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [ready, draw, scheduleDraw]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLCanvasElement>) => {
    pointerRef.current = { x: event.clientX, y: event.clientY };
    scheduleDraw();
  };

  const handlePointerLeave = () => {
    pointerRef.current = null;
    scheduleDraw();
  };

  return (
    <>
      <Image
        src={src}
        alt={alt}
        aria-hidden={ready ? true : undefined}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover object-top grayscale contrast-[1.05]"
      />
      <canvas
        ref={canvasRef}
        role={ready ? "img" : undefined}
        aria-label={ready ? halftoneLabel : undefined}
        aria-hidden={ready ? undefined : true}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className={`absolute inset-0 h-full w-full bg-bg ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </>
  );
}
