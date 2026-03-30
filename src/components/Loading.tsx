"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

const LOGO_CHARS = ["串", "焼", "大", "紀"];
const EMBER_COUNT = 60;

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
  color: string;
}

function createEmber(width: number, height: number): Ember {
  const colors = [
    "255,90,10",
    "255,140,30",
    "255,60,0",
    "255,180,50",
    "230,40,0",
  ];
  return {
    x: width * 0.3 + Math.random() * width * 0.4,
    y: height * 0.6 + Math.random() * height * 0.3,
    vx: (Math.random() - 0.5) * 1.5,
    vy: -(Math.random() * 2 + 0.8),
    size: Math.random() * 4 + 1.5,
    alpha: 0,
    life: 0,
    maxLife: Math.random() * 120 + 60,
    color: colors[Math.floor(Math.random() * colors.length)],
  };
}

export default function Loading({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const screenRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hidden, setHidden] = useState(false);

  // Canvas ember animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const embers: Ember[] = [];
    for (let i = 0; i < EMBER_COUNT; i++) {
      const e = createEmber(canvas.width, canvas.height);
      e.life = Math.random() * e.maxLife;
      embers.push(e);
    }

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.life++;
        e.x += e.vx + Math.sin(e.life * 0.05) * 0.5;
        e.y += e.vy;
        e.vy -= 0.003;

        const progress = e.life / e.maxLife;
        if (progress < 0.15) {
          e.alpha = progress / 0.15;
        } else if (progress > 0.6) {
          e.alpha = 1 - (progress - 0.6) / 0.4;
        } else {
          e.alpha = 1;
        }

        // Flicker
        e.alpha *= 0.7 + 0.3 * Math.sin(e.life * 0.3);
        if (Math.random() < 0.03) e.alpha *= 0.2;

        e.alpha = Math.max(0, Math.min(1, e.alpha));

        // Glow
        const gradient = ctx.createRadialGradient(
          e.x, e.y, 0,
          e.x, e.y, e.size * 3
        );
        gradient.addColorStop(0, `rgba(${e.color},${e.alpha * 0.9})`);
        gradient.addColorStop(0.4, `rgba(${e.color},${e.alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${e.color},0)`);
        ctx.fillStyle = gradient;
        ctx.fillRect(
          e.x - e.size * 3, e.y - e.size * 3,
          e.size * 6, e.size * 6
        );

        // Core
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,240,200,${e.alpha * 0.8})`;
        ctx.fill();

        if (e.life >= e.maxLife) {
          embers[i] = createEmber(canvas.width, canvas.height);
        }
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const handleComplete = useCallback(() => {
    setHidden(true);
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const fallback = setTimeout(handleComplete, 4000);

    const tl = gsap.timeline({
      onComplete: () => {
        clearTimeout(fallback);
        handleComplete();
      },
    });

    // Decorative line draws in
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.4, ease: "power2.out" }
    );

    // Each character brush stroke reveal
    charsRef.current.forEach((char, i) => {
      if (!char) return;
      tl.fromTo(
        char,
        { clipPath: "inset(0 0 100% 0)", opacity: 1 },
        { clipPath: "inset(0 0 0% 0)", duration: 0.3, ease: "power3.out" },
        0.25 + i * 0.08
      );
      tl.fromTo(
        char,
        { y: -6 },
        { y: 0, duration: 0.2, ease: "power2.out" },
        0.25 + i * 0.08
      );
    });

    // Subtitle fades in
    tl.fromTo(
      subRef.current,
      { opacity: 0, y: 8 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      "-=0.15"
    );

    // Hold
    tl.to({}, { duration: 0.15 });

    // Exit
    tl.to(charsRef.current.filter(Boolean), {
      opacity: 0,
      y: -15,
      duration: 0.2,
      stagger: 0.03,
      ease: "power2.in",
    });
    tl.to(
      [subRef.current, lineRef.current],
      { opacity: 0, duration: 0.2, ease: "power2.in" },
      "-=0.15"
    );

    // Screen slides away
    tl.to(screenRef.current, {
      yPercent: -100,
      duration: 0.45,
      ease: "power4.inOut",
    });

    return () => {
      clearTimeout(fallback);
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "#7a0017" }}
    >
      {/* Ember canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none mix-blend-screen"
      />
      {/* Bottom heat glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1/4 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(255,80,0,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center">
        {/* Decorative line */}
        <div
          ref={lineRef}
          className="mx-auto mb-6 opacity-60"
          style={{
            width: "60px",
            height: "1px",
            background: "#d3c9bd",
            transformOrigin: "center",
          }}
        />
        {/* Logo characters */}
        <div className="flex justify-center gap-[0.15em]">
          {LOGO_CHARS.map((char, i) => (
            <span
              key={i}
              ref={(el) => {
                charsRef.current[i] = el;
              }}
              className="font-serif font-normal text-decorative text-4xl tracking-[0.3em] inline-block"
              style={{ clipPath: "inset(0 0 100% 0)" }}
            >
              {char}
            </span>
          ))}
        </div>
        {/* Subtitle */}
        <div
          ref={subRef}
          className="font-display text-decorative text-xs tracking-[0.3em] mt-5 opacity-0"
        >
          KUSHIYAKI TAIKI
        </div>
      </div>
    </div>
  );
}
