"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-gold fill-gold" : "text-white/20"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const next = useCallback(() => {
    goTo((current + 1) % TESTIMONIALS.length);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(next, 5000);
  };

  return (
    <section id="testimonials" className="bg-surface section-padding overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block px-5 py-2 rounded-full glass text-gold text-xs font-medium uppercase tracking-[0.2em] mb-6">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
            Trusted by Brands
            <br />
            <span className="text-gold">&amp; Restaurants</span>
          </h2>
        </div>

        {/* Carousel */}
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Card */}
            <div
              key={current}
              className="glass-strong rounded-3xl p-10 md:p-14 text-center animate-slide-carousel"
            >
              <Quote className="w-10 h-10 text-gold/30 mx-auto mb-6" />

              <StarRating rating={TESTIMONIALS[current].rating} />

              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 max-w-xl mx-auto">
                &ldquo;{TESTIMONIALS[current].quote}&rdquo;
              </p>

              <div>
                <p className="font-medium text-white text-base">
                  {TESTIMONIALS[current].name}
                </p>
                <p className="text-white/40 text-sm mt-1">
                  {TESTIMONIALS[current].role}, {TESTIMONIALS[current].company}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                onClick={() => { prev(); resetInterval(); }}
                className="p-3 rounded-full glass text-white/60 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { goTo(i); resetInterval(); }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current ? "w-8 bg-gold" : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => { next(); resetInterval(); }}
                className="p-3 rounded-full glass text-white/60 hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
