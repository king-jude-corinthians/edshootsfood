"use client";

import { useRef, useEffect } from "react";
import { CLIENT_LOGOS } from "@/lib/constants";

const STATS = [
  { value: "100+", label: "Shoots Completed" },
  { value: "50+", label: "Happy Clients" },
];

export default function ClientTrust() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const els = section.querySelectorAll(".trust-reveal");
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

    els.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(20px)";
      htmlEl.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-surface-dark section-padding">
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <span className="trust-reveal inline-block px-5 py-2 rounded-full glass text-gold text-xs font-medium uppercase tracking-[0.2em] mb-6">
            Clients
          </span>
          <h2 className="trust-reveal text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
            Worked With
          </h2>
        </div>

        {/* Client Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20 max-w-3xl mx-auto">
          {CLIENT_LOGOS.map((client) => (
            <div
              key={client.name}
              className="trust-reveal logo-grayscale flex items-center justify-center p-6 rounded-2xl glass aspect-[3/2] cursor-pointer group"
            >
              <div className="text-center">
                <span className="text-2xl font-medium text-white/70 group-hover:text-gold transition-colors duration-300">
                  {client.initials}
                </span>
                <p className="text-white/30 text-[10px] mt-1 uppercase tracking-wider group-hover:text-white/60 transition-colors duration-300">
                  {client.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="trust-reveal text-center">
              <div className="text-5xl md:text-6xl font-medium text-gold mb-2">
                {stat.value}
              </div>
              <div className="text-white/40 text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
