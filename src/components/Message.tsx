"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { BLUR_DATA_URL, IMAGE_QUALITY } from "@/lib/image";

gsap.registerPlugin(ScrollTrigger);

export default function Message() {
  const sectionRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLDivElement>(null);
  const ownerRef = useRef<HTMLDivElement>(null);
  const ownerInnerRef = useRef<HTMLDivElement>(null);
  const ownerPhotoRef = useRef<HTMLDivElement>(null);
  const ownerNameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.to(heroImgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // Title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, letterSpacing: "-0.1em", scale: 1.1 },
        {
          opacity: 1,
          letterSpacing: "0.02em",
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 82%" },
        }
      );

      // Heading
      gsap.fromTo(
        headingRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
        }
      );

      // Text
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: textAreaRef.current, start: "top 78%" },
        }
      );

      // Owner section
      gsap.fromTo(
        ownerInnerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ownerRef.current, start: "top 80%" },
        }
      );

      // Owner photo
      gsap.fromTo(
        ownerPhotoRef.current,
        { clipPath: "inset(0 100% 0 0)", scale: 1.05 },
        {
          clipPath: "inset(0 0% 0 0)",
          scale: 1,
          duration: 1.3,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ownerPhotoRef.current, start: "top 78%" },
        }
      );

      // Owner name
      gsap.fromTo(
        ownerNameRef.current,
        { clipPath: "inset(100% 0 0 0)", opacity: 1 },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: { trigger: ownerRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="message" ref={sectionRef} className="bg-white">
      {/* Hero Image */}
      <div
        ref={heroRef}
        className="relative w-full h-[50vh] md:h-[55vh] overflow-hidden"
      >
        <div
          ref={heroImgRef}
          className="absolute inset-0 w-full h-[130%] -top-[15%]"
        >
          <Image
            src="/images/owner-detail1.jpg"
            alt="串焼き大紀"
            fill
            className="object-cover brightness-[0.7]"
            sizes="100vw"
            quality={IMAGE_QUALITY}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
        </div>
      </div>

      {/* Message Content */}
      <div className="py-16 md:py-24 max-w-[1100px] mx-auto px-6 md:px-10">
        <div className="text-center mb-10 md:mb-16">
          <h2
            ref={titleRef}
            className="font-display text-[--text-dark] text-4xl md:text-5xl lg:text-[63px] tracking-[0.02em] opacity-0"
          >
            MESSAGE
          </h2>
        </div>

        <div
          ref={textAreaRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-start"
        >
          <div ref={headingRef}>
            <p className="font-serif text-[--text-dark] text-xl md:text-[28px] leading-[1.7] tracking-[0.06em]">
              リーズナブルに
              <br />
              極上の体験を
            </p>
          </div>
          <div ref={textRef}>
            <p className="font-sans text-[--text-dark] text-sm leading-[2.6] tracking-[0.02em]">
              国内製造の「蒸し竈KAMADO Q」に加え、
              <br />
              炭と薪を使い分ける松本が生み出した独自の"三種火入れ方"で、
              <br />
              素材の旨みを最大限に引き出した串焼きを提供します。
              <br />
              落ち着いた空間で、
              <br />
              美味しいお酒とともに
              <br />
              「高級焼き鳥を身近に」を叶える大人のための一軒です。
            </p>
          </div>
        </div>
      </div>

      {/* Owner Profile */}
      <div ref={ownerRef} className="bg-cream">
        <div
          ref={ownerInnerRef}
          className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 md:py-20"
        >
          <div className="grid grid-cols-1 md:grid-cols-[40px_1fr_1fr] gap-6 md:gap-8 items-start">
            {/* OWNER label */}
            <div className="hidden md:flex items-start justify-center pt-16">
              <span className="font-display text-[--text-dark] text-xs tracking-[0.04em] [writing-mode:vertical-rl]">
                OWNER
              </span>
            </div>

            {/* Text */}
            <div className="md:pt-16">
              <div ref={ownerNameRef} className="mb-8">
                <h3 className="font-serif text-2xl md:text-[34px] tracking-[0.06em]">
                  松本紀一郎
                </h3>
                <p className="font-display text-[--text-dark] text-base tracking-[0.06em] mt-1">
                  KIICHIRO MATSUMOTO
                </p>
              </div>

              <div className="space-y-1">
                <p className="font-sans text-[--text-dark] text-sm leading-[2.4] tracking-[0.02em]">
                  東京芝大門の名店『串焼 大助』の一番弟子。
                </p>
                <p className="font-sans text-[--text-dark] text-sm leading-[2.4] tracking-[0.02em]">
                  店主の目利きで選別した
                  <br />
                  その時々の最上級の素材を仕入れ、
                  <br />
                  素材の状態をしっかりと見極め、
                  <br />
                  部位ごとの最適な火入れを
                  <br />
                  徹底的に学んできました。
                </p>
                <p className="font-sans text-[--text-dark] text-sm leading-[2.4] tracking-[0.02em] mt-4">
                  松本が長年積み重ねた確かな技術で、
                  <br />
                  串のポテンシャルを最大限に引き出し
                  <br />
                  お客様に最高の状態でご提供いたします。
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-10">
                <p className="font-sans text-[--text-dark] text-sm leading-[2.1]">
                  日々の串焼き大紀を
                  <br />
                  Instagramで発信しています
                </p>
                <a
                  href="https://www.instagram.com/taiki.kushiyaki/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display border border-black rounded-[3px] text-black bg-cream text-center py-3 px-6 text-sm tracking-[0.02em] hover:opacity-70 transition-opacity flex items-center gap-2"
                >
                  <Image
                    src="/images/icon-insta.svg"
                    alt=""
                    width={13}
                    height={13}
                  />
                  Instagram
                </a>
              </div>
            </div>

            {/* Profile photo */}
            <div
              ref={ownerPhotoRef}
              className="relative overflow-hidden order-first md:order-last"
              style={{ aspectRatio: "538/436" }}
            >
              <Image
                src="/images/owner-detail2.jpg"
                alt="松本紀一郎"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 33vw"
                quality={IMAGE_QUALITY}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
