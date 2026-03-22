"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";
import { useChat } from "@/components/providers/ChatProvider";
import { useTheme } from "@/components/providers/ThemeProvider";

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
      {/* Video Background with Ken Burns */}
      <div className="absolute inset-0 z-0 ken-burns">
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isLight ? "opacity-20" : "opacity-100"
          }`}
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-reel.mp4" type="video/mp4" />
        </video>
        {/* Fallback gradient */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: isLight
              ? "linear-gradient(135deg, #E8EBFF 0%, #F0F2FF 25%, #FFFFFF 50%, #F0F2FF 75%, #E8EBFF 100%)"
              : "linear-gradient(135deg, #0a0d1a 0%, #070912 25%, #111 50%, #070912 75%, #0a0d1a 100%)",
          }}
        />
      </div>

      {/* Overlays */}
      <div
        className={`absolute inset-0 z-[1] transition-opacity duration-500 ${
          isLight
            ? "bg-gradient-to-b from-white/60 via-white/30 to-white/70"
            : "bg-gradient-to-b from-black/70 via-black/50 to-black/80"
        }`}
      />
      <div
        className={`absolute inset-0 z-[1] transition-opacity duration-500 ${
          isLight
            ? "bg-gradient-to-r from-white/20 via-transparent to-white/20"
            : "bg-gradient-to-r from-black/30 via-transparent to-black/30"
        }`}
      />
      {/* Blue tone gradient accent */}
      <div
        className={`absolute inset-0 z-[1] bg-gradient-to-tr from-[#2F3CCF]/20 via-transparent to-transparent ${
          isLight ? "opacity-30" : "opacity-20"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-[5vw] max-w-5xl mx-auto pt-20 md:pt-24">
        <span
          ref={badgeRef}
          className="inline-block px-5 py-2 rounded-full glass text-gold text-xs font-medium uppercase tracking-[0.2em] mb-8"
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

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openChat("I want to book a food shoot")}
            className={`px-10 py-4 rounded-full font-medium text-base transition-all duration-300 backdrop-blur-xl btn-glow ${
              isLight
                ? "bg-brand text-white hover:bg-brand-dark"
                : "glass-gold text-white hover:bg-gold/20"
            }`}
          >
            Book a Shoot
          </button>
          <a href="#portfolio">
            <button
              className={`px-10 py-4 rounded-full font-medium text-base transition-all duration-300 backdrop-blur-xl ${
                isLight
                  ? "border border-[#111111]/20 text-[#111111] hover:bg-[#111111]/5"
                  : "border border-white/20 text-white hover:bg-white/10"
              }`}
            >
              View Portfolio
            </button>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span
            className={`text-xs uppercase tracking-widest transition-colors duration-500 ${
              isLight ? "text-[#111111]/30" : "text-white/30"
            }`}
          >
            Scroll
          </span>
          <ArrowDown
            className={`w-4 h-4 transition-colors duration-500 ${
              isLight ? "text-[#111111]/30" : "text-white/30"
            }`}
          />
        </div>
      </div>
    </section>
  );
}
