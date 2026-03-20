"use client";

import { useRef, useEffect } from "react";
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
      className="bg-surface section-padding"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image */}
          <div className="reveal-item">
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br from-brand/20 to-brand-light/30 border border-border">
              {/* Placeholder for photographer portrait */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-brand/20 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-4xl font-medium text-brand">ED</span>
                  </div>
                  <p className="text-text-muted text-sm">Photographer Portrait</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="reveal-item inline-block px-4 py-1.5 rounded-full bg-brand/10 text-brand text-xs font-medium uppercase tracking-wider mb-6">
              About
            </span>

            <h2 className="reveal-item text-4xl md:text-5xl font-medium tracking-tight text-text-primary leading-[1.1] mb-4">
              {ABOUT.name}
            </h2>

            <p className="reveal-item text-brand font-medium text-lg mb-8">
              {ABOUT.title}
            </p>

            {ABOUT.bio.map((paragraph, i) => (
              <p
                key={i}
                className="reveal-item text-text-muted leading-relaxed mb-4 last:mb-0"
              >
                {paragraph}
              </p>
            ))}

            {/* Stats */}
            <div className="reveal-item flex flex-wrap gap-4 mt-10 mb-10">
              {ABOUT.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="px-5 py-3 rounded-2xl bg-brand text-white"
                >
                  <div className="text-2xl font-medium">{stat.value}</div>
                  <div className="text-xs text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Instagram Link */}
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal-item inline-flex items-center gap-2 text-text-primary hover:text-brand transition-colors group"
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
