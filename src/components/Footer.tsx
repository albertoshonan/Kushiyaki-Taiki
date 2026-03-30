"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { BLUR_DATA_URL, IMAGE_QUALITY } from "@/lib/image";

gsap.registerPlugin(ScrollTrigger);

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "ABOUT", href: "#about" },
  { label: "RESTAURANT", href: "#specialite" },
  { label: "STAY", href: "#" },
  { label: "WINE PLAN", href: "#" },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: footerRef.current, start: "top 90%" },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer id="access" ref={footerRef} className="bg-burgundy py-14 md:py-20">
      <div
        ref={contentRef}
        className="max-w-[1100px] mx-auto px-6 md:px-10"
      >
        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-10 md:gap-12 pb-14 border-b border-decorative/30"
        >
          {/* Nav */}
          <nav className="flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-display text-white text-[19px] tracking-[0.02em] hover:opacity-70 transition-opacity"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#message"
              className="font-display text-white text-[19px] tracking-[0.02em] hover:opacity-70 transition-opacity mt-4"
            >
              MESSAGE
            </a>
          </nav>

          {/* Social + Brand */}
          <div>
            <p className="font-sans text-white text-sm tracking-[0.02em] mb-3">
              - 串焼き大紀
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="font-display flex items-center gap-2 text-white text-[13.5px] hover:opacity-70 transition-opacity"
              >
                <Image
                  src="/images/icon-insta-wh.svg"
                  alt=""
                  width={13}
                  height={13}
                />
                Instagram
              </a>
            </div>
          </div>

          {/* Logo */}
          <div className="relative w-[200px] h-[200px] hidden md:block">
            <Image
              src="/images/footer-logo.jpg"
              alt="串焼き大紀"
              fill
              className="object-contain"
              sizes="200px"
              quality={IMAGE_QUALITY}
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-6 md:gap-12 items-end">
          <div>
            <p className="font-display text-white text-[13px] tracking-[0.02em] mb-1">
              ACCESS
            </p>
            <p className="font-sans text-white text-sm tracking-[0.02em]">〒231-0032 神奈川県横浜市中区不老町１丁目4−１１ ガレリア不老町 3階-B</p>
          </div>
          <div>
            <p className="font-display text-white text-sm tracking-[0.02em] mb-1">
              CONTACT
            </p>
            <div className="flex flex-wrap gap-4">
              <p className="font-display text-white text-[13px] tracking-[0.02em]">
                Tel. 0467-80-3013
              </p>
              <a
                href="https://yoyaku.tabelog.com/yoyaku/net_booking_form/index?rcd=14102132"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-white text-sm tracking-[0.02em] hover:opacity-70 transition-opacity"
              >
                ご予約はこちら
              </a>
            </div>
          </div>
          <p className="font-display text-white/40 text-[13px] tracking-[0.04em]">
            &copy;TAIKI KUSHIYAKI
          </p>
        </div>
      </div>
    </footer>
  );
}
