"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "TOP", href: "#top" },
  { label: "ABOUT", href: "#about" },
  { label: "RESTAURANT", href: "#specialite" },
  { label: "STAY", href: "#" },
  { label: "WINE PLAN", href: "#" },
  { label: "MESSAGE", href: "#message" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menuRef.current, {
        clipPath: "circle(150% at calc(100% - 3rem) 2.5rem)",
        duration: 0.8,
        ease: "power4.inOut",
      });
      gsap.fromTo(
        navLinksRef.current?.children ?? [],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          delay: 0.3,
          duration: 0.6,
          ease: "power3.out",
        }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)",
        duration: 0.6,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  const handleNavClick = useCallback((href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-black/70 backdrop-blur-md py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
          <a
            href="#top"
            className="font-serif font-light text-white tracking-[0.2em] text-sm md:text-base"
          >
            串焼大紀
          </a>

          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="relative z-[60] flex flex-col items-center justify-center w-10 h-10 gap-[6px] group"
            aria-label="メニュー"
          >
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                isOpen ? "rotate-45 translate-y-[3.5px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-px bg-white transition-all duration-300 ${
                isOpen ? "-rotate-45 -translate-y-[3.5px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* Fullscreen Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[55] bg-burgundy-dark flex items-center justify-center"
        style={{ clipPath: "circle(0% at calc(100% - 3rem) 2.5rem)" }}
      >
        <nav ref={navLinksRef} className="flex flex-col items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href)}
              className="font-display text-white text-2xl md:text-4xl tracking-[0.2em] hover:text-decorative transition-colors duration-300 opacity-0"
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
