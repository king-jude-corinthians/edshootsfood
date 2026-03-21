"use client";

import { useRef, useEffect } from "react";
import { SERVICES } from "@/lib/constants";
import { UtensilsCrossed, Camera, Sparkles, Image } from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  utensils: <UtensilsCrossed className="w-7 h-7" />,
  camera: <Camera className="w-7 h-7" />,
  sparkles: <Sparkles className="w-7 h-7" />,
  image: <Image className="w-7 h-7" />,
};

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".service-card");
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

    cards.forEach((card, i) => {
      const htmlEl = card as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(40px)";
      htmlEl.style.transition = `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-surface-dark section-padding"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block px-5 py-2 rounded-full glass text-gold text-xs font-medium uppercase tracking-[0.2em] mb-6">
            Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
            What We Offer
          </h2>
          <p className="mt-5 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Tailored photography packages designed to elevate your brand&apos;s visual identity.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="service-card group rounded-2xl glass p-8 hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-gold/5 transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mb-6 text-gold group-hover:bg-gold/20 transition-colors duration-300">
                {ICONS[service.icon]}
              </div>

              <h3 className="text-xl font-medium text-white mb-3">{service.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
