"use client";

import { useRef, useEffect } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { PORTFOLIO_ITEMS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function PortfolioShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = scrollRef.current?.querySelectorAll(".portfolio-card");
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0) scale(1)";
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => {
      (card as HTMLElement).style.opacity = "0";
      (card as HTMLElement).style.transform = "translateY(40px) scale(0.95)";
      (card as HTMLElement).style.transition = "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" className="bg-white section-padding">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="Portfolio"
          title="Selected Work"
          subtitle="A curated collection of culinary stories, crafted with precision and passion."
        />

        <div
          ref={scrollRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 hover-dim-group"
        >
          {PORTFOLIO_ITEMS.map((item, index) => (
            <div
              key={item.id}
              className="portfolio-card group cursor-pointer"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface border border-border">
                {/* Placeholder gradient for demo */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(${135 + index * 30}deg,
                      hsl(${220 + index * 20}, 60%, ${85 - index * 5}%),
                      hsl(${240 + index * 15}, 50%, ${75 - index * 3}%))`,
                  }}
                />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-surface-dark/0 group-hover:bg-surface-dark/40 transition-all duration-500 flex items-end p-6">
                  <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <span className="text-xs text-white/70 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-medium text-white mt-1">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/portfolio"
            className="inline-flex items-center gap-2 text-brand text-sm font-medium hover:gap-4 transition-all duration-300"
          >
            View all projects
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
