"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useChat } from "@/components/providers/ChatProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const { openChat } = useChat();
  const { theme } = useTheme();

  useEffect(() => {
    const els = [badgeRef.current, headingRef.current, subtitleRef.current, ctaRef.current];
    els.forEach((el, i) => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.filter = "blur(6px)";
        setTimeout(() => {
          el.style.transition = "all 1s cubic-bezier(0.16, 1, 0.3, 1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          el.style.filter = "blur(0px)";
        }, 400 + i * 250);
      }
    });
  }, []);

  const isLight = theme === "light";

  return (
    <section
      className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500 ${
        isLight ? "bg-[#F0F2FF]" : "bg-black"
      }`}
    >
      {/* Fallback gradient (behind video) */}
      <div
        className="absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          background: isLight
            ? "linear-gradient(135deg, #E8EBFF 0%, #F0F2FF 25%, #FFFFFF 50%, #F0F2FF 75%, #E8EBFF 100%)"
            : "linear-gradient(135deg, #0a0d1a 0%, #070912 25%, #111 50%, #070912 75%, #0a0d1a 100%)",
        }}
      />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-poster.jpg"
          alt="Food photography hero"
          fill
          className={`object-cover transition-opacity duration-500 ${
            isLight ? "opacity-60" : "opacity-100"
          }`}
          sizes="100vw"
          priority
        />
      </div>

      {/* Overlays */}
      <div
        className={`absolute inset-0 z-[1] transition-opacity duration-500 ${
          isLight
            ? "bg-gradient-to-b from-white/40 via-white/10 to-white/50"
            : "bg-gradient-to-b from-black/70 via-black/50 to-black/80"
        }`}
      />
      <div
        className={`absolute inset-0 z-[1] transition-opacity duration-500 ${
          isLight
            ? "bg-gradient-to-r from-white/10 via-transparent to-white/10"
            : "bg-gradient-to-r from-black/30 via-transparent to-black/30"
        }`}
      />
      {/* Blue tone gradient accent */}
      <div
        className={`absolute inset-0 z-[1] bg-gradient-to-tr from-[#2F3CCF]/20 via-transparent to-transparent ${
          isLight ? "opacity-15" : "opacity-20"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-[5vw] max-w-5xl mx-auto pt-20 md:pt-24">
        <span
          ref={badgeRef}
          className="inline-block px-5 py-2 rounded-full glass-glow text-gold text-xs font-medium uppercase tracking-[0.2em] mb-8"
        >
          Premium Food Photography
        </span>

        <h1
          ref={headingRef}
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-medium tracking-tight leading-[0.95] mb-6 transition-colors duration-500 ${
            isLight ? "text-[#111111]" : "text-white"
          }`}
        >
          We Capture Food
          <br />
          <span className="text-gold">Like Art</span>
        </h1>

        <p
          ref={subtitleRef}
          className={`text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12 transition-colors duration-500 ${
            isLight ? "text-[#555555]" : "text-white/60"
          }`}
        >
          Premium food photography for brands, restaurants, and campaigns
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <LiquidMetalButton
            label="Book a Shoot"
            onClick={() => openChat("I want to book a food shoot")}
          />
          <LiquidMetalButton
            label="View Portfolio"
            variant="secondary"
            onClick={() => {
              document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
      </div>

    </section>
  );
}
