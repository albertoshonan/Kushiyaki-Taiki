"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SectionDivider({ image }: { image: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      <div
        ref={imgRef}
        className="absolute inset-[-20%] w-full h-[140%]"
        style={{
          backgroundImage: `url('${image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7)",
        }}
      />
    </div>
  );
}
