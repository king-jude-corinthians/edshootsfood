"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTheme } from "@/components/providers/ThemeProvider";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
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
            ? "bg-gradient-to-b from-white/30 via-white/5 to-white/60"
            : "bg-gradient-to-b from-black/40 via-black/30 to-black/85"
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
          className={`inline-block px-5 py-2 rounded-full text-xs font-medium uppercase tracking-[0.2em] mb-8 border ${
            isLight
              ? "bg-black/5 border-black/10 text-[#555]"
              : "bg-white/[0.07] border-white/[0.12] text-white/70"
          }`}
        >
          Premium Food Photography
        </span>

        <h1
          ref={headingRef}
          className={`text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-medium tracking-tight leading-[1.1] mb-8 transition-colors duration-500 ${
            isLight ? "text-[#111111]" : "text-white"
          }`}
        >
          We Capture Food
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: isLight
                ? "linear-gradient(135deg, #2F3CCF 0%, #6F86F7 100%)"
                : "linear-gradient(135deg, #8B9CF7 0%, #B4C0FF 50%, #8B9CF7 100%)",
            }}
          >
            Like Art
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className={`text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12 transition-colors duration-500 ${
            isLight ? "text-[#555555]" : "text-white/60"
          }`}
        >
          Premium food photography for brands, restaurants, and campaigns
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-6">
          <button
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className={`px-8 py-3.5 rounded-full text-sm font-medium tracking-wide uppercase transition-all duration-300 border backdrop-blur-sm ${
              isLight
                ? "border-[#2F3CCF]/40 text-[#2F3CCF] hover:bg-[#2F3CCF]/10 hover:border-[#2F3CCF]/60 hover:shadow-[0_0_20px_rgba(47,60,207,0.2)]"
                : "border-white/25 text-white/90 hover:bg-white/10 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            }`}
          >
            Book a Shoot
          </button>
        </div>
      </div>

    </section>
  );
}
