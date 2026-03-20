"use client";

import { useRef, useEffect } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { SERVICES } from "@/lib/constants";
import { UtensilsCrossed, Camera, Sparkles, Image, ArrowRight } from "lucide-react";

const ICONS: Record<string, React.ReactNode> = {
  utensils: <UtensilsCrossed className="w-6 h-6" />,
  camera: <Camera className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
  image: <Image className="w-6 h-6" />,
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
      htmlEl.style.transition = `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.15}s`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="bg-surface-dark text-text-light section-padding"
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="Services"
          title="What I Offer"
          subtitle="Tailored photography packages designed to elevate your brand's visual identity."
          light
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 hover-dim-group">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="service-card group rounded-2xl border border-white/10 p-8 md:p-10 hover:border-white/25 transition-all duration-300"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 text-brand-light">
                {ICONS[service.icon]}
              </div>

              <h3 className="text-2xl font-medium mb-3">{service.title}</h3>
              <p className="text-text-light/60 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-8">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-text-light/50 text-sm"
                  >
                    <div className="w-1 h-1 rounded-full bg-brand-light" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Price + CTA */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <span className="text-2xl font-medium text-brand-light">
                  {service.priceLabel}
                </span>
                <a href="#contact">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
