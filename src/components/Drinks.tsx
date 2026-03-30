"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { BLUR_DATA_URL, IMAGE_QUALITY } from "@/lib/image";

gsap.registerPlugin(ScrollTrigger);

interface SakeItem {
  name: string;
  origin: string;
}

const SAKE_LIST: SakeItem[] = [
  { name: "山形正宗 純米吟醸 雄町", origin: "山形県：水戸部酒造" },
  { name: "廣戸川 特別純米酒", origin: "福島県：松崎酒造" },
  { name: "真澄 純吟 辛口生一本", origin: "長野県：宮坂醸造" },
  { name: "来福 愛山 純米大吟醸 火入", origin: "茨城県：来福酒造" },
];

export default function Drinks() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const sakeItemsRef = useRef<(HTMLLIElement | null)[]>([]);
  const priceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        }
      );

      // Description
      if (descRef.current) {
        gsap.fromTo(
          descRef.current.querySelectorAll("p"),
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: descRef.current, start: "top 80%" },
          }
        );
      }

      // First image
      gsap.fromTo(
        img1Ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: imagesRef.current, start: "top 78%" },
        }
      );

      // Second image
      gsap.fromTo(
        img2Ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: img2Ref.current, start: "top 78%" },
        }
      );

      // Sake list
      gsap.fromTo(
        listRef.current,
        { clipPath: "inset(100% 0 0 0)", opacity: 1 },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: listRef.current, start: "top 82%" },
        }
      );

      // Sake items stagger
      const items = sakeItemsRef.current.filter(Boolean);
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: { trigger: listRef.current, start: "top 80%" },
        }
      );

      // Price
      gsap.fromTo(
        priceRef.current,
        { opacity: 0, scale: 0.9, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: priceRef.current, start: "top 85%" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="drinks"
      ref={sectionRef}
      className="relative bg-burgundy py-24 md:py-36 lg:py-44 overflow-hidden"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        {/* Title */}
        <div className="mb-12 md:mb-20">
          <h2
            ref={titleRef}
            className="font-serif font-normal text-white text-3xl md:text-4xl lg:text-[52px] tracking-[0.02em]"
          >
            こだわりのお酒・酒器
          </h2>
        </div>

        {/* Description + Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start mb-20 md:mb-32">
          <div ref={descRef}>
            <p className="font-serif text-white text-sm md:text-lg lg:text-2xl leading-[2] md:leading-[1.8] tracking-[0.014em]">
              日本酒は、
              <br />
              香り・酸・余韻まで
              <br className="md:hidden" />
              串との相性を第一に、
              <br />
              季節替わりで常時数種を
              <br className="md:hidden" />
              ご用意しております。
              <br />
              燗・冷や・温度帯まで調整し、
              <br className="md:hidden" />
              一本の串に寄り添う一杯を。
              <br />
              焼酎やワインも
              <br className="md:hidden" />
              料理に合わせてご提案いたします。
            </p>
          </div>

          <div ref={imagesRef}>
            <div
              ref={img1Ref}
              className="img-hover-zoom relative overflow-hidden"
              style={{ aspectRatio: "4/5" }}
            >
              <Image
                src="/images/drinks-sake3.jpg"
                alt="日本酒"
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

        {/* Lower image + Sake list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start mb-20 md:mb-32">
          <div
            ref={img2Ref}
            className="img-hover-zoom relative overflow-hidden"
            style={{ aspectRatio: "564/412" }}
          >
            <Image
              src="/images/drinks-sake5.jpg"
              alt="酒と料理"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
              quality={IMAGE_QUALITY}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>

          <div>
            <div ref={listRef} className="border-b border-white pb-6 mb-6">
              <p className="font-serif text-white text-base leading-[1.44] tracking-[0.025em]">
                三段火入れが引き出す地鶏の芳醇な肉汁。その複雑な旨みに寄り添う銘酒を厳選しました。
                <br />
                米の旨みが脂を包み込み、キレのある酸が次の一本を誘う。
                <br />
                温度変化とともに移ろう、串と酒の繊細な調和をお愉しみください。
              </p>
            </div>

            <ul className="space-y-4">
              {SAKE_LIST.map((sake, i) => (
                <li
                  key={sake.name}
                  ref={(el) => { sakeItemsRef.current[i] = el; }}
                  className="font-serif text-white text-sm leading-[1.5] tracking-[0.02em]"
                >
                  <p>{sake.name}</p>
                  <p>{sake.origin}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Price Section */}
        <div ref={priceRef} className="text-center opacity-0">
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="border-r border-[#707070] pr-4">
                <span className="font-serif text-white text-xl tracking-[0.06em]">
                  コース価格
                </span>
              </div>
              <span className="font-serif text-white text-[35px]">¥</span>
              <span className="font-serif text-white text-[52px] tracking-[0.06em]">
                6,600
              </span>
              <span className="font-serif text-white text-[47px]">~</span>
            </div>
          </div>

          <p className="font-serif text-white text-sm leading-[1.8] mb-2">
            詳しくは、予約サイト（食べログ）をご覧ください。
          </p>
          <p className="font-serif text-white text-sm leading-[1.8] mb-10">
            お店のご予約・お問い合わせはInstagram・お電話からも受付けています。
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-[720px] mx-auto">
            <a
              href="https://yoyaku.tabelog.com/yoyaku/net_booking_form/index?rcd=14102132"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans border border-burgundy rounded-[3px] text-burgundy bg-white text-center py-4 px-4 text-sm tracking-[0.02em] hover:opacity-80 transition-opacity flex flex-col items-center justify-center"
            >
              <span>ご予約</span>
              <span className="text-[11px] mt-0.5">
                （外部サイトへリンクします）
              </span>
            </a>
            <a
              href="https://www.instagram.com/taiki.kushiyaki/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-display border border-burgundy rounded-[3px] text-burgundy bg-white text-center py-4 px-4 text-sm tracking-[0.02em] hover:opacity-80 transition-opacity flex items-center justify-center gap-2"
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
              href="tel:0467-80-3013"
              className="font-display border border-burgundy rounded-[3px] text-burgundy bg-white text-center py-4 px-4 text-sm tracking-[0.02em] hover:opacity-80 transition-opacity flex items-center justify-center"
            >
              Tel. 0467-80-3013
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
