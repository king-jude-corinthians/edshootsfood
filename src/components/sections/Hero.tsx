"use client";

import { useEffect, useRef } from "react";
import { ArrowDown } from "lucide-react";

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
      {/* Video Background with Ken Burns */}
      <div className="absolute inset-0 z-0 ken-burns">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-reel.mp4" type="video/mp4" />
        </video>
        {/* Fallback gradient if no video */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1a0f0a 0%, #0d0907 25%, #111 50%, #0a0705 75%, #1a0f0a 100%)",
          }}
        />
      </div>

      {/* Dark Luxury Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      {/* Warm tone gradient accent */}
      <div className="absolute inset-0 z-[1] opacity-20 bg-gradient-to-tr from-[#C8956C]/20 via-transparent to-transparent" />

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
          className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-medium tracking-tight text-white leading-[0.95] mb-6"
        >
          We Capture Food
          <br />
          <span className="text-gold">Like Art</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-white/60 max-w-xl mx-auto leading-relaxed mb-12"
        >
          Premium food photography for brands, restaurants, and campaigns
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#contact">
            <button className="px-10 py-4 rounded-full glass-gold text-white font-medium text-base hover:bg-gold/20 transition-all duration-300 backdrop-blur-xl">
              Book a Shoot
            </button>
          </a>
          <a href="#portfolio">
            <button className="px-10 py-4 rounded-full border border-white/20 text-white font-medium text-base hover:bg-white/10 transition-all duration-300 backdrop-blur-xl">
              View Portfolio
            </button>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/30 text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 text-white/30" />
        </div>
      </div>
    </section>
  );
}
