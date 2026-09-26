"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  s: number;
}

interface RingConfig {
  gap: number;
  baseR: number;
  idleX: number;
  idleY: number;
}

// The mockup hardcodes ring size/position for 1440x900 (desktop) and 390x800
// (mobile) separately. We interpolate between those two reference points so
// the ring stays proportional at any fluid width in between.
const MOBILE_REFERENCE_WIDTH = 390;
const DESKTOP_REFERENCE_WIDTH = 1440;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function getRingConfig(width: number, height: number): RingConfig {
  const t = Math.min(
    1,
    Math.max(0, (width - MOBILE_REFERENCE_WIDTH) / (DESKTOP_REFERENCE_WIDTH - MOBILE_REFERENCE_WIDTH)),
  );
  return {
    gap: lerp(18, 22, t),
    baseR: lerp(0.282, 0.132, t) * width,
    idleX: lerp(0.641, 0.722, t) * width,
    idleY: lerp(0.2875, 0.489, t) * height,
  };
}

function createDots(width: number, height: number, gap: number): Dot[] {
  const dots: Dot[] = [];
  for (let y = gap / 2; y < height; y += gap) {
    for (let x = gap / 2; x < width; x += gap) {
      dots.push({
        x: x + (Math.random() - 0.5) * gap * 0.8,
        y: y + (Math.random() - 0.5) * gap * 0.8,
        s: Math.random(),
      });
    }
  }
  return dots;
}

function smoothstep(a: number, b: number, x: number): number {
  const k = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return k * k * (3 - 2 * k);
}

export default function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement ?? null;
    const ctx = canvas?.getContext("2d") ?? null;
    if (!canvas || !section || !ctx) return;

    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    let config: RingConfig | null = null;
    const ring = { x: 0, y: 0 };
    let pointer: { x: number; y: number } | null = null;
    let pulse = 0;
    let morph = 1;
    let time = 0;
    let visible = true;
    let rafId: number | null = null;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reducedMotionQuery.matches;

    const resize = () => {
      const rect = section.getBoundingClientRect();
      const nextWidth = Math.round(rect.width);
      const nextHeight = Math.round(rect.height);
      if (!nextWidth || !nextHeight) return;

      width = nextWidth;
      height = nextHeight;
      dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      config = getRingConfig(width, height);
      dots = createDots(width, height, config.gap);
      ring.x = config.idleX;
      ring.y = config.idleY;
    };

    resize();

    const draw = () => {
      if (!width || !height || !config) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      if (!reducedMotion) time += 0.016;

      let targetX = config.idleX + Math.sin(time * 0.4) * width * 0.06;
      let targetY = config.idleY + Math.cos(time * 0.3) * height * 0.06;
      if (pointer) {
        const rect = canvas.getBoundingClientRect();
        targetX = ((pointer.x - rect.left) * width) / rect.width;
        targetY = ((pointer.y - rect.top) * height) / rect.height;
      }

      ring.x += (targetX - ring.x) * 0.08;
      ring.y += (targetY - ring.y) * 0.08;
      pulse *= 0.94;
      morph += ((pointer ? 0 : 1) - morph) * 0.05;

      const rx = ring.x;
      const ry = ring.y;
      const baseR = config.baseR;
      const R = baseR * (1 + Math.sin(time * 1.2) * 0.06) + pulse * baseR * 0.9;
      const w = baseR * 0.28;
      const w2 = baseR * 0.6;
      const push = baseR * 0.22;
      const buckets: number[][] = [[], [], [], [], [], [], [], []];

      for (const dot of dots) {
        const n = Math.sin(dot.x * 0.012 + time * 0.6) * Math.cos(dot.y * 0.014 - time * 0.45);
        const dx = dot.x - rx;
        const dy = dot.y - ry;
        const d = Math.hypot(dx, dy) || 1;
        const ringDistance = d - R;
        const moon = Math.max(ringDistance, R * 0.79 - Math.hypot(dx, dy + R * 0.29));
        const edge = ringDistance + (moon - ringDistance) * morph;
        const edge1 = edge + n * 10;
        let t = Math.pow(Math.max(0, smoothstep(-w * 2, 0, edge) - smoothstep(0, w, edge1)), 2);
        t += Math.pow(Math.max(0, smoothstep(-w2 * 2, 0, edge) - smoothstep(0, w2, edge1)), 3) * 1.5;
        t += smoothstep(w2, 0, edge) * 0.25;
        t += Math.pow((n + 1.5) * 0.5, 2) * 0.12;
        t = Math.min(1.4, t);
        const ux = dx / d;
        const uy = dy / d;
        const cx = dot.x + ux * t * push;
        const cy = dot.y + uy * t * push;
        buckets[Math.min(7, Math.floor(t * 5.5))].push(cx, cy, 0.7 + t * 1.9 + dot.s * 0.4);
      }

      for (let b = 0; b < 8; b++) {
        const seg = buckets[b];
        if (!seg.length) continue;
        ctx.fillStyle = `rgba(245,245,247,${(0.04 + b * 0.05).toFixed(2)})`;
        ctx.beginPath();
        for (let i = 0; i < seg.length; i += 3) {
          ctx.moveTo(seg[i] + seg[i + 2], seg[i + 1]);
          ctx.arc(seg[i], seg[i + 1], seg[i + 2], 0, Math.PI * 2);
        }
        ctx.fill();
      }
    };

    const tick = () => {
      draw();
      rafId = requestAnimationFrame(tick);
    };

    const stopLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const resumeLoopIfNeeded = () => {
      if (reducedMotion || rafId !== null) return;
      if (!visible || document.hidden) return;
      tick();
    };

    if (reducedMotion) {
      draw();
    } else {
      tick();
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (reducedMotion) draw();
    });
    resizeObserver.observe(section);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (!visible) stopLoop();
        else resumeLoopIfNeeded();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    const handleVisibilityChange = () => {
      if (document.hidden) stopLoop();
      else resumeLoopIfNeeded();
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleMotionChange = () => {
      reducedMotion = reducedMotionQuery.matches;
      if (reducedMotion) {
        stopLoop();
        draw();
      } else {
        resumeLoopIfNeeded();
      }
    };
    reducedMotionQuery.addEventListener("change", handleMotionChange);

    const handlePointerMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
    };
    const handlePointerLeave = () => {
      pointer = null;
    };
    const handlePointerDown = (event: PointerEvent) => {
      if ((event.target as HTMLElement | null)?.closest("a, button")) return;
      pulse = 1;
    };

    section.addEventListener("pointermove", handlePointerMove);
    section.addEventListener("pointerleave", handlePointerLeave);
    section.addEventListener("pointerdown", handlePointerDown);

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      reducedMotionQuery.removeEventListener("change", handleMotionChange);
      section.removeEventListener("pointermove", handlePointerMove);
      section.removeEventListener("pointerleave", handlePointerLeave);
      section.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full"
    />
  );
}
