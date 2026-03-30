"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Price() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".price-line-left", { scaleX: 0 }, {
        scaleX: 1, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: ".price-content", start: "top 85%" },
      });
      gsap.fromTo(".price-amount", { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ".price-content", start: "top 85%" },
      });
      gsap.fromTo(".price-line-right", { scaleX: 0 }, {
        scaleX: 1, duration: 0.8, delay: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".price-content", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24" style={{ backgroundColor: "var(--burgundy-dark)" }}>
      <div className="price-content flex items-center justify-center gap-6 md:gap-10">
        <div className="price-line-left w-[50px] md:w-[80px] h-[1px] origin-right" style={{ backgroundColor: "var(--gold)" }} />
        <div className="price-amount text-center">
          <p className="text-white/50 text-[10px] tracking-[0.3em] mb-2" style={{ fontFamily: "'EB Garamond', serif" }}>
            COURSE
          </p>
          <p className="text-white text-2xl md:text-[36px] tracking-[0.08em]" style={{ fontFamily: "'EB Garamond', serif" }}>
            ¥ 6,600
          </p>
          <p className="text-white/40 text-[11px] mt-2 tracking-wider" style={{ fontFamily: "'Noto Serif JP', serif" }}>
            （税込）
          </p>
        </div>
        <div className="price-line-right w-[50px] md:w-[80px] h-[1px] origin-left" style={{ backgroundColor: "var(--gold)" }} />
      </div>
    </section>
  );
}
