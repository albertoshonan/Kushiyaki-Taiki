"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { BLUR_DATA_URL } from "@/lib/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: "power3.out" }
      );

      gsap.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.5, ease: "power2.out" }
      );
      gsap.to(scrollRef.current, {
        y: 10,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        delay: 2,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <Image
          src="/images/hero.jpg"
          alt="串焼大紀"
          fill
          className="object-cover brightness-[0.55]"
          sizes="100vw"
          priority
          quality={85}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <h1
          ref={titleRef}
          className="font-serif font-normal text-white text-lg md:text-2xl lg:text-[28px] tracking-[0.2em] leading-relaxed opacity-0"
        >
          高級焼き鳥を身近に
        </h1>
        <p
          ref={subRef}
          className="font-display text-decorative text-xs md:text-sm tracking-[0.3em] mt-4 opacity-0"
        >
          KUSHIYAKI TAIKI
        </p>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="font-display text-white/50 text-[10px] tracking-[0.3em]">
          SCROLL
        </span>
        <div className="w-px h-8 bg-white/30" />
      </div>
    </section>
  );
}
