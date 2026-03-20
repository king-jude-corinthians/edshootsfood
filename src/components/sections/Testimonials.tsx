"use client";

import { TESTIMONIALS } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import { Quote } from "lucide-react";

function TestimonialCard({
  quote,
  name,
  company,
  role,
}: (typeof TESTIMONIALS)[number]) {
  return (
    <div className="flex-shrink-0 w-[380px] md:w-[440px] p-8 rounded-2xl bg-white border border-border mx-3">
      <Quote className="w-8 h-8 text-brand/20 mb-4" />
      <p className="text-text-primary leading-relaxed mb-6 text-[15px]">
        &ldquo;{quote}&rdquo;
      </p>
      <div>
        <p className="font-medium text-text-primary text-sm">{name}</p>
        <p className="text-text-muted text-xs">
          {role}, {company}
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const items = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section className="bg-white section-padding overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="Testimonials"
          title="Client Stories"
          subtitle="Hear from the brands and restaurants I've had the pleasure of working with."
        />
      </div>

      {/* Marquee Row 1 */}
      <div className="relative group">
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {items.map((testimonial, i) => (
            <TestimonialCard key={`r1-${i}`} {...testimonial} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (reverse) */}
      <div className="relative mt-6 group">
        <div className="flex animate-marquee-reverse group-hover:[animation-play-state:paused]">
          {[...items].reverse().map((testimonial, i) => (
            <TestimonialCard key={`r2-${i}`} {...testimonial} />
          ))}
        </div>
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
    </section>
  );
}
