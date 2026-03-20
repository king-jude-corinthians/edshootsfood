"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import { ArrowDown } from "lucide-react";

const Scene = dynamic(() => import("@/components/three/Scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-brand-light/10" />
  ),
});

export default function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [headingRef.current, subtitleRef.current, ctaRef.current];
    els.forEach((el, i) => {
      if (el) {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        el.style.filter = "blur(6px)";
        setTimeout(() => {
          el.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          el.style.filter = "blur(0px)";
        }, 200 + i * 200);
      }
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-surface overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-[5vw] max-w-5xl mx-auto pt-20">
        <span className="inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-medium uppercase tracking-wider mb-8">
          Food Photography
        </span>

        <h1
          ref={headingRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight text-text-primary leading-[0.95] mb-6"
        >
          Ezekwe
          <br />
          <span className="text-brand">Desmond</span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-text-muted max-w-lg mx-auto leading-relaxed mb-10"
        >
          Elevating brands through stunning culinary visuals.
          Every dish tells a story — I capture it.
        </p>

        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#portfolio">
            <Button variant="primary" size="lg">
              View Portfolio
            </Button>
          </a>
          <a href="#contact">
            <Button variant="secondary" size="lg">
              Book a Session
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ArrowDown className="w-5 h-5 text-text-muted" />
      </div>
    </section>
  );
}
