"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Concept from "@/components/Concept";

// Below-the-fold components: lazy load
const Specialite = dynamic(() => import("@/components/Specialite"));
const Drinks = dynamic(() => import("@/components/Drinks"));
const Message = dynamic(() => import("@/components/Message"));
const Footer = dynamic(() => import("@/components/Footer"));
const EmberParticles = dynamic(() => import("@/components/EmberParticles"), { ssr: false });

export default function HomeClient() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <>
      {isLoading && <Loading onComplete={handleLoadingComplete} />}

      <SmoothScroll>
        <Header />
        <main>
          <Hero />
          <Concept />
          <EmberParticles image="/images/concept-fire.jpg" />
          <Specialite />
          <Drinks />
          <EmberParticles image="/images/concept-fire.jpg" />
          <Message />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
