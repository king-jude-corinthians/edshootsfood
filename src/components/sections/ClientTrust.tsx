"use client";

import { useRef, useEffect } from "react";
import NextImage from "next/image";
import { CLIENT_LOGOS } from "@/lib/constants";

const CLIENT_LOGO_IMAGES: Record<string, string> = {
  SK: "/images/clients/client-sk.png",
  UG: "/images/clients/client-ug.png",
  AF: "/images/clients/client-af.png",
  LM: "/images/clients/client-lm.png",
  SB: "/images/clients/client-sb.png",
  RT: "/images/clients/client-rt.png",
  FL: "/images/clients/client-fl.png",
  SM: "/images/clients/client-sm.png",
};

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
    <section ref={sectionRef} className="bg-[var(--color-bg-dark)] section-padding">
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <span className="trust-reveal inline-block px-5 py-2 rounded-full glass-glow text-gold text-xs font-medium uppercase tracking-[0.2em] mb-6">
            Clients
          </span>
          <h2 className="trust-reveal text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--color-text)] leading-[1.1]">
            Worked With
          </h2>
        </div>

        {/* Client Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-20 max-w-3xl mx-auto">
          {CLIENT_LOGOS.map((client) => (
            <div
              key={client.name}
              className="trust-reveal flex flex-col items-center justify-center p-6 rounded-2xl glass-glow aspect-[3/2] cursor-pointer group hover:shadow-[0_0_24px_rgba(79,95,227,0.4),0_0_48px_rgba(79,95,227,0.15)] hover:border-[rgba(79,95,227,0.35)] hover:scale-[1.05] transition-all duration-500"
            >
              <div className="relative w-16 h-16 mb-3 rounded-xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500">
                <NextImage
                  src={CLIENT_LOGO_IMAGES[client.initials]}
                  alt={client.name}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
              <p className="text-[var(--color-text)] text-sm font-semibold uppercase tracking-wider group-hover:text-gold transition-colors duration-300">
                {client.name}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {STATS.map((stat) => (
            <div key={stat.label} className="trust-reveal text-center glass-glow rounded-2xl px-10 py-8">
              <div className="text-5xl md:text-6xl font-bold text-gold mb-2">
                {stat.value}
              </div>
              <div className="text-[var(--color-text)] text-sm font-semibold uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
