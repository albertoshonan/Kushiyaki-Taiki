"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { BLUR_DATA_URL, IMAGE_QUALITY } from "@/lib/image";

gsap.registerPlugin(ScrollTrigger);

export default function Specialite() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const mainImgRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridImgsRef = useRef<(HTMLDivElement | null)[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const ctaWrapRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Label
      gsap.fromTo(
        labelRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: labelRef.current, start: "top 85%" },
        }
      );

      // Title
      gsap.fromTo(
        titleRef.current,
        { clipPath: "inset(100% 0 0 0)", opacity: 1 },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        }
      );

      // Description
      if (descRef.current) {
        gsap.fromTo(
          descRef.current.querySelectorAll("p"),
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: descRef.current, start: "top 82%" },
          }
        );
      }

      // Main image
      gsap.fromTo(
        mainImgRef.current,
        { clipPath: "inset(50% 50% 50% 50%)", scale: 1.1 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: { trigger: mainImgRef.current, start: "top 80%" },
        }
      );

      // Grid images
      const imgs = gridImgsRef.current.filter(Boolean);
      gsap.fromTo(
        imgs,
        { clipPath: "inset(100% 0 0 0)", scale: 1.08 },
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          stagger: 0.2,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: gridRef.current, start: "top 78%" },
        }
      );

      // Menu
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: menuRef.current, start: "top 85%" },
        }
      );

      // CTAs
      const ctas = ctasRef.current.filter(Boolean);
      gsap.fromTo(
        ctas,
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: ctaWrapRef.current, start: "top 90%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setGridImgRef = (i: number) => (el: HTMLDivElement | null) => {
    gridImgsRef.current[i] = el;
  };
  const setCtaRef = (i: number) => (el: HTMLAnchorElement | null) => {
    ctasRef.current[i] = el;
  };

  return (
    <section id="specialite" ref={sectionRef} className="bg-cream">
      {/* Content */}
      <div className="py-24 md:py-36 lg:py-44">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          {/* Title + Description + Image */}
          <div className="grid grid-cols-1 md:grid-cols-[42%_1fr] gap-10 md:gap-14 items-start mb-20 md:mb-32">
            <div className="order-2 md:order-1">
              <div className="mb-10 md:mb-14">
                <p
                  ref={labelRef}
                  className="font-serif text-[--text-dark] text-4xl md:text-5xl lg:text-[63px] tracking-[0.02em] mb-4"
                >
                  Specialite
                </p>
                <h2
                  ref={titleRef}
                  className="font-serif font-normal text-[--text-dark] text-2xl md:text-3xl lg:text-[36px] tracking-[0.01em]"
                >
                  名物 薪焼きそぼろご飯
                </h2>
              </div>
              <div ref={descRef}>
                <p className="font-serif text-[--text-dark] text-sm md:text-lg lg:text-[20px] leading-[2] md:leading-[1.8] tracking-[0.014em]">
                  蒸し竈で薪を焚き、
                  <br />
                  鶏の旨みを閉じ込めた
                  <br className="md:hidden" />
                  そぼろご飯。
                  <br />
                  「KAMADO Q」の薪火で
                  <br />
                  一粒ずつ香ばしさをまとわせ、
                  <br />
                  香り高い三つ葉と和えた、
                  <br />
                  記憶に残る〆の一椀。
                </p>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div
                ref={mainImgRef}
                className="img-hover-zoom relative overflow-hidden"
                style={{ aspectRatio: "4/5" }}
              >
                <Image
                  src="/images/specialite-dish2.jpg"
                  alt="薪焼きそぼろご飯"
                  fill
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, 55vw"
                  quality={IMAGE_QUALITY}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
            </div>
          </div>

          {/* Food images grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 mb-20 md:mb-32"
          >
            <div
              ref={setGridImgRef(0)}
              className="img-hover-zoom relative overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src="/images/specialite-dish7.jpg"
                alt="串焼き"
                fill
                className="object-cover"
                sizes="(max-width:768px) 50vw, 33vw"
                quality={IMAGE_QUALITY}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
            <div
              ref={setGridImgRef(1)}
              className="img-hover-zoom relative overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src="/images/specialite-dish6.jpg"
                alt="串焼き"
                fill
                className="object-cover"
                sizes="(max-width:768px) 50vw, 33vw"
                quality={IMAGE_QUALITY}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
            <div
              ref={setGridImgRef(2)}
              className="img-hover-zoom relative overflow-hidden col-span-2 md:col-span-1"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src="/images/specialite-dish8.jpg"
                alt="串焼き"
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 33vw"
                quality={IMAGE_QUALITY}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
          </div>

          {/* Course Menu */}
          <div ref={menuRef} className="max-w-[820px] mx-auto opacity-0">
            <div className="border-t border-black pb-8">
              <h3 className="font-serif text-[19px] tracking-[0.02em] mt-6 mb-8">
                二種類のおまかせコース
              </h3>

              <div className="mb-8">
                <p className="font-sans text-base font-bold mb-1">
                  【焼き鳥】おまかせコース：6,600円（13品）
                </p>
                <p className="font-serif text-[--text-body] text-sm leading-[2] tracking-[0.02em]">
                  「炭の熱」と「薪の香」が織りなす、
                  <br />
                  鶏の真髄に触れる至高のひととき。
                  <br />
                  部位ごとに火入れの秒単位までこだわり、
                  <br />
                  素材が持つ生命力を最大限に引き出す、
                  <br />
                  まさに"一串一魂"を体現した王道の構成です。
                </p>
                <p className="font-serif text-[--text-body] text-sm mt-2">
                  焼き物7種/一品3種/薪焼きそぼろご飯/鶏スープ/デザート
                </p>
              </div>

              <div className="mb-8">
                <p className="font-serif text-base font-bold mb-1">
                  【串焼】おまかせコース：6,600円（13品）
                </p>
                <p className="font-serif text-[--text-body] text-sm leading-[2] tracking-[0.02em]">
                  彩り豊かな旬の食材を、
                  <br />
                  薪火の魔法で仕立てる。
                  <br />
                  定番の部位はもちろん、
                  <br />
                  炭火で焼き上げる創作野菜巻や
                  <br />
                  薪火で甘みを凝縮させた旬菜など、
                  <br />
                  一串ごとに驚きと発見がある
                  <br />
                  バラエティ豊かなコースです。
                </p>
                <p className="font-serif text-[--text-body] text-sm mt-2">
                  焼き物4種/野菜串巻物合わせて3種/一品3種/薪焼きそぼろご飯/鶏スープ/デザート
                </p>
              </div>
            </div>

            <div className="border-t border-b border-[#ccc] py-6">
              <p className="font-serif text-[--text-body] text-[13px] tracking-[0.02em] text-center">
                ※食材の入荷状況などでメニュー変更する可能性がございます。ご了承ください
              </p>
            </div>

            <div
              ref={ctaWrapRef}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-10"
            >
              <a
                ref={setCtaRef(0)}
                href="#"
                className="font-sans border border-burgundy rounded-[3px] text-burgundy bg-white text-center py-4 px-4 text-sm tracking-[0.02em] hover:bg-burgundy hover:text-white transition-colors flex flex-col items-center justify-center"
              >
                <span>食べログ</span>
                <span className="text-[11px] mt-0.5">
                  （外部サイトへリンクします）
                </span>
              </a>
              <a
                ref={setCtaRef(1)}
                href="#"
                className="font-display border border-burgundy rounded-[3px] text-burgundy bg-white text-center py-4 px-4 text-sm tracking-[0.02em] hover:bg-burgundy hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Image
                  src="/images/icon-insta-brown.svg"
                  alt=""
                  width={13}
                  height={13}
                />
                Instagram
              </a>
              <a
                ref={setCtaRef(2)}
                href="tel:0166-56-8846"
                className="font-display border border-burgundy rounded-[3px] text-burgundy bg-white text-center py-4 px-4 text-sm tracking-[0.02em] hover:bg-burgundy hover:text-white transition-colors flex items-center justify-center"
              >
                Tel. 0166-56-8846
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
