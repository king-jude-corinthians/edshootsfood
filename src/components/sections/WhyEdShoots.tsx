"use client";

import { useRef, useEffect } from "react";
import { WHY_EDSHOOTS } from "@/lib/constants";
import { Clock, Sparkles, Share2, PenTool } from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  clock: <Clock className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
  share: <Share2 className="w-6 h-6" />,
  pen: <PenTool className="w-6 h-6" />,
};

export default function WhyEdShoots() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll(".why-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item, i) => {
      const el = item as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 120}ms`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[var(--color-bg)] section-padding">
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block px-5 py-2 rounded-full glass-glow text-gold text-xs font-medium uppercase tracking-[0.2em] mb-6">
            Why Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--color-text)] leading-[1.1]">
            Why <span className="text-gold">EdShoots</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {WHY_EDSHOOTS.map((item) => (
            <div
              key={item.title}
              className="why-item text-center group"
            >
              <div className="w-16 h-16 rounded-2xl glass-glow mx-auto mb-6 flex items-center justify-center text-gold group-hover:bg-gold/10 transition-all duration-300">
                {ICONS[item.icon]}
              </div>
              <h3 className="text-[var(--color-text)] font-medium text-lg mb-2">{item.title}</h3>
              <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
