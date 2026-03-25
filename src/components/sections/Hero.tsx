"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Fallback gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(135deg, #0a0d1a 0%, #070912 25%, #111 50%, #070912 75%, #0a0d1a 100%)",
        }}
      />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-poster.jpg"
          alt="Food photography hero"
          fill
          className="object-cover opacity-100"
          sizes="100vw"
          priority
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/40 via-black/30 to-black/85" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      {/* Blue tone gradient accent */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-tr from-[#2F3CCF]/20 via-transparent to-transparent opacity-20" />

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
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-medium tracking-tight leading-[1.1] mb-8 text-white"
        >
          We Capture Food
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #D4A853 0%, #F5D88E 50%, #D4A853 100%)",
            }}
          >
            Like Art
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-16 text-white/60"
        >
          Premium food photography for brands, restaurants, and campaigns
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-10 py-4 rounded-full glass-glow text-sm font-semibold tracking-wider uppercase text-gold transition-all duration-300"
          >
            Book a Shoot
          </button>
        </div>
      </div>

    </section>
  );
}
