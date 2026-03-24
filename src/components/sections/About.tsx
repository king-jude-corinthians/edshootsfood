"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { ABOUT, SITE } from "@/lib/constants";
import { Instagram, ArrowUpRight } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const els = section.querySelectorAll(".reveal-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
            (entry.target as HTMLElement).style.filter = "blur(0px)";
          }
        });
      },
      { threshold: 0.1 }
    );

    els.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(30px)";
      htmlEl.style.filter = "blur(4px)";
      htmlEl.style.transition = `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-[var(--color-bg)] section-padding"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Section Label */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block px-5 py-2 rounded-full glass-glow text-gold text-xs font-medium uppercase tracking-[0.2em] mb-6">
            About
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--color-text)] leading-[1.1]">
            Behind the Lens
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image - B&W to Color */}
          <div className="reveal-item">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bw-to-color group cursor-pointer">
              <Image
                src="/images/about-portrait.jpg"
                alt="Ezekwe Desmond — Food Photographer"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Subtle overlay for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="reveal-item text-3xl md:text-4xl font-medium tracking-tight text-[var(--color-text)] leading-[1.1] mb-2">
              {ABOUT.name}
            </h3>

            <p className="reveal-item text-gold font-medium text-lg mb-8">
              {ABOUT.title}
            </p>

            {ABOUT.bio.map((paragraph, i) => (
              <p
                key={i}
                className="reveal-item text-[var(--color-text-muted)] leading-relaxed mb-4 last:mb-0"
              >
                {paragraph}
              </p>
            ))}

            {/* Signature */}
            <div className="reveal-item mt-10 mb-10">
              <p className="text-gold text-2xl italic font-light tracking-wide">
                — Ezekwe Desmond
              </p>
            </div>

            {/* Instagram Link */}
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-item inline-flex items-center gap-2 text-[var(--color-text-muted)] hover:text-gold transition-colors group"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm font-medium">@edshootsfood</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
