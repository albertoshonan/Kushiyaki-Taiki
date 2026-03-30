"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { BLUR_DATA_URL, IMAGE_QUALITY } from "@/lib/image";

gsap.registerPlugin(ScrollTrigger);

export default function Concept() {
  const sectionRef = useRef<HTMLElement>(null);
  const decoRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const block2ImagesRef = useRef<HTMLDivElement>(null);
  const block3Ref = useRef<HTMLDivElement>(null);
  const b1ImgsRef = useRef<(HTMLDivElement | null)[]>([]);
  const b1TextRef = useRef<HTMLDivElement>(null);
  const b2TextRef = useRef<HTMLDivElement>(null);
  const b2ImgRef = useRef<HTMLDivElement>(null);
  const b3ImgsRef = useRef<(HTMLDivElement | null)[]>([]);
  const b3TextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ABOUT decorative text
      gsap.fromTo(
        decoRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: decoRef.current, start: "top 80%" },
        }
      );

      // Title
      gsap.fromTo(
        titleRef.current,
        { clipPath: "inset(100% 0 0 0)", opacity: 1 },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        }
      );

      // Subtitle
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: subtitleRef.current, start: "top 85%" },
        }
      );

      // Block 1 images
      const b1Imgs = b1ImgsRef.current.filter(Boolean);
      gsap.fromTo(
        b1Imgs,
        { clipPath: "inset(100% 0 0 0)", scale: 1.15 },
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          stagger: 0.25,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: block1Ref.current, start: "top 75%" },
        }
      );

      // Block 1 text
      if (b1TextRef.current) {
        gsap.fromTo(
          b1TextRef.current.querySelectorAll("p"),
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: block1Ref.current, start: "top 70%" },
          }
        );
      }

      // Block 2 text
      gsap.fromTo(
        b2TextRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: "power3.inOut",
          scrollTrigger: { trigger: block2Ref.current, start: "top 75%" },
        }
      );

      // Block 2 image
      gsap.fromTo(
        b2ImgRef.current,
        { clipPath: "inset(100% 0 0 0)", scale: 1.1 },
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: block2ImagesRef.current, start: "top 75%" },
        }
      );

      // Block 3 images
      const b3Imgs = b3ImgsRef.current.filter(Boolean);
      gsap.fromTo(
        b3Imgs,
        { clipPath: "inset(0 0 100% 0)", scale: 1.08 },
        {
          clipPath: "inset(0 0 0% 0)",
          scale: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: block3Ref.current, start: "top 75%" },
        }
      );

      // Block 3 text
      if (b3TextRef.current) {
        gsap.fromTo(
          b3TextRef.current.querySelectorAll("p"),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: b3TextRef.current, start: "top 80%" },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setB1ImgRef = (i: number) => (el: HTMLDivElement | null) => {
    b1ImgsRef.current[i] = el;
  };
  const setB3ImgRef = (i: number) => (el: HTMLDivElement | null) => {
    b3ImgsRef.current[i] = el;
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-cream py-24 md:py-36 lg:py-48"
    >
      {/* Title */}
      <div className="text-center mb-20 md:mb-28 lg:mb-36">
        <p
          ref={decoRef}
          className="font-display font-normal text-decorative text-5xl md:text-6xl lg:text-[68px] tracking-[0.02em]"
        >
          ABOUT
        </p>
        <h2
          ref={titleRef}
          className="font-serif font-normal text-[--text-dark] text-2xl md:text-3xl lg:text-[39px] tracking-[0.06em] mt-10 md:mt-16"
        >
          高級焼き鳥を身近に
        </h2>
        <p
          ref={subtitleRef}
          className="font-serif text-[--text-dark] text-[13px] tracking-[0.18em] mt-3 opacity-0"
        >
          Premium Yakitori, Accessible to ALL
        </p>
      </div>

      {/* Block 1 */}
      <div
        ref={block1Ref}
        className="relative max-w-[1200px] mx-auto px-6 md:px-10 mb-24 md:mb-36 lg:mb-44"
      >
        {/* Desktop */}
        <div className="hidden md:block relative min-h-[620px]">
          <div className="absolute top-0 left-[5%] w-[34%]">
            <div
              ref={setB1ImgRef(0)}
              className="img-hover-zoom relative overflow-hidden"
              style={{ aspectRatio: "388/480" }}
            >
              <Image
                src="/images/about-1.jpg"
                alt="炭火の串焼き"
                fill
                className="object-cover"
                sizes="34vw"
                quality={IMAGE_QUALITY}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
          </div>
          <div className="absolute top-[55%] left-[18%] w-[22%]">
            <div
              ref={setB1ImgRef(1)}
              className="img-hover-zoom relative overflow-hidden aspect-square"
            >
              <Image
                src="/images/about-3.jpg"
                alt="串焼 大紀"
                fill
                className="object-cover"
                sizes="22vw"
                quality={IMAGE_QUALITY}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
          </div>
          <div ref={b1TextRef} className="absolute top-[8%] left-[48%] w-[44%]">
            <p className="font-serif text-[--text-body] text-[18px] leading-[2.6] tracking-[0.06em]">
              蒸し竈・炭・薪。
              <br />
              三種火入れの串焼。
            </p>
            <p className="font-serif text-[--text-body] text-[18px] leading-[2.6] tracking-[0.06em] mt-8">
              「比内地鶏」と「伊達鶏」を中心に、
              <br />
              一本ごとに最適な火入れで焼き上げる串焼店。
            </p>
            <p className="font-serif text-[--text-body] text-[18px] leading-[2.6] tracking-[0.06em] mt-8">
              高級焼き鳥を、もっと身近に。
            </p>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="grid grid-cols-5 gap-3 mb-8">
            <div
              ref={setB1ImgRef(2)}
              className="img-hover-zoom col-span-3 relative overflow-hidden"
              style={{ aspectRatio: "3/4" }}
            >
              <Image
                src="/images/about-1.jpg"
                alt="炭火の串焼き"
                fill
                className="object-cover"
                sizes="60vw"
                quality={IMAGE_QUALITY}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
            <div
              ref={setB1ImgRef(3)}
              className="img-hover-zoom col-span-2 relative overflow-hidden self-end aspect-square"
            >
              <Image
                src="/images/about-3.jpg"
                alt="串焼 大紀"
                fill
                className="object-cover"
                sizes="40vw"
                quality={IMAGE_QUALITY}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
          </div>
          <div ref={!b1TextRef.current ? b1TextRef : undefined}>
            <p className="font-serif text-[--text-body] text-sm leading-[2.6] tracking-[0.06em]">
              蒸し竈・炭・薪。三種火入れの串焼。
              <br />
              「比内地鶏」と「伊達鶏」を中心に、一本ごとに最適な火入れで焼き上げる串焼店。
            </p>
            <p className="font-serif text-[--text-body] text-sm leading-[2.6] tracking-[0.06em] mt-6">
              高級焼き鳥を、もっと身近に。
            </p>
          </div>
        </div>
      </div>

      {/* Block 2 */}
      <div
        ref={block2Ref}
        className="max-w-[960px] mx-auto px-6 md:px-10 mb-24 md:mb-36 lg:mb-44"
      >
        <div
          ref={block2ImagesRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-center"
        >
          <div ref={b2TextRef}>
            <p className="font-serif text-[--text-body] text-sm md:text-[18px] leading-[2.6] tracking-[0.06em]">
              【関内1分】名店大助の系譜。カウンター10席の洗練された隠れ家。
            </p>
            <p className="font-serif text-[--text-body] text-sm md:text-[18px] leading-[2.6] tracking-[0.06em] mt-4">
              大切な接待や記念日に、上質な時間をカジュアルな価格帯でご堪能ください。
            </p>
          </div>
          <div
            ref={b2ImgRef}
            className="img-hover-zoom relative overflow-hidden w-full"
            style={{ aspectRatio: "265/346" }}
          >
            <Image
              src="/images/about-5.jpg"
              alt="店内の様子"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
              quality={IMAGE_QUALITY}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
        </div>
      </div>

      {/* Block 3 */}
      <div ref={block3Ref} className="max-w-[1100px] mx-auto px-6 md:px-10">
        {/* Desktop top row */}
        <div className="hidden md:grid md:grid-cols-2 gap-6 mb-8">
          <div
            ref={setB3ImgRef(0)}
            className="img-hover-zoom relative overflow-hidden w-full mt-12"
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src="/images/about-12.jpg"
              alt="串焼き"
              fill
              className="object-cover"
              sizes="50vw"
              quality={IMAGE_QUALITY}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
          <div
            ref={setB3ImgRef(1)}
            className="img-hover-zoom relative overflow-hidden w-full"
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src="/images/about-8.jpg"
              alt="料理の数々"
              fill
              className="object-cover"
              sizes="50vw"
              quality={IMAGE_QUALITY}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
        </div>

        {/* Mobile top row */}
        <div className="md:hidden grid grid-cols-2 gap-3 mb-6">
          <div
            ref={setB3ImgRef(2)}
            className="img-hover-zoom relative overflow-hidden w-full"
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src="/images/about-12.jpg"
              alt="串焼き"
              fill
              className="object-cover"
              sizes="50vw"
              quality={IMAGE_QUALITY}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
          <div
            ref={setB3ImgRef(3)}
            className="img-hover-zoom relative overflow-hidden w-full"
            style={{ aspectRatio: "4/3" }}
          >
            <Image
              src="/images/about-8.jpg"
              alt="料理の数々"
              fill
              className="object-cover"
              sizes="50vw"
              quality={IMAGE_QUALITY}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-start">
          <div
            ref={setB3ImgRef(4)}
            className="img-hover-zoom relative overflow-hidden w-full"
            style={{ aspectRatio: "3/4" }}
          >
            <Image
              src="/images/about-10.jpg"
              alt="蒸しかまど"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
              quality={IMAGE_QUALITY}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
          <div ref={b3TextRef} className="md:pt-16 lg:pt-24">
            <p className="font-serif text-[--text-body] text-sm md:text-[18px] leading-[2.6] tracking-[0.06em]">
              伝統の紀州備長炭による火入れに加え、国内唯一のセラミック製「蒸しかまど」を導入。
            </p>
            <p className="font-serif text-[--text-body] text-sm md:text-[18px] leading-[2.6] tracking-[0.06em] mt-6">
              薪の香りと圧倒的な水分量を保つ火入れで、地鶏の真価を引き出します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
