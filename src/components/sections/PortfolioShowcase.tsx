"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { PORTFOLIO_ITEMS, PORTFOLIO_CATEGORIES } from "@/lib/constants";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const ASPECT_MAP: Record<string, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
};

const GRADIENT_MAP: Record<string, string> = {
  "1": "linear-gradient(135deg, #2d1f14 0%, #4a2c17 50%, #1a0f08 100%)",
  "2": "linear-gradient(135deg, #1a2332 0%, #2c3e50 50%, #0f1923 100%)",
  "3": "linear-gradient(135deg, #2d2414 0%, #4a3c17 50%, #1a1408 100%)",
  "4": "linear-gradient(135deg, #142d1f 0%, #174a2c 50%, #081a0f 100%)",
  "5": "linear-gradient(135deg, #2d1424 0%, #4a1738 50%, #1a080f 100%)",
  "6": "linear-gradient(135deg, #24142d 0%, #38174a 50%, #0f081a 100%)",
  "7": "linear-gradient(135deg, #2d2914 0%, #4a4417 50%, #1a1608 100%)",
  "8": "linear-gradient(135deg, #142d29 0%, #174a44 50%, #081a16 100%)",
  "9": "linear-gradient(135deg, #2d1414 0%, #4a1717 50%, #1a0808 100%)",
  "10": "linear-gradient(135deg, #1f142d 0%, #2c174a 50%, #0f081a 100%)",
  "11": "linear-gradient(135deg, #142029 0%, #173244 50%, #081016 100%)",
  "12": "linear-gradient(135deg, #29142d 0%, #44174a 50%, #16081a 100%)",
};

export default function PortfolioShowcase() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredItems =
    activeFilter === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigateLightbox = useCallback(
    (direction: "prev" | "next") => {
      if (lightboxIndex === null) return;
      if (direction === "next") {
        setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
      } else {
        setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
      }
    },
    [lightboxIndex, filteredItems.length]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, navigateLightbox]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".portfolio-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0) scale(1)";
          }
        });
      },
      { threshold: 0.05 }
    );

    cards.forEach((card, i) => {
      const el = card as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(30px) scale(0.97)";
      el.style.transition = `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms`;
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, [activeFilter]);

  return (
    <>
      <section ref={sectionRef} id="portfolio" className="bg-surface section-padding">
        <div className="mx-auto max-w-[1400px]">
          {/* Heading */}
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block px-5 py-2 rounded-full glass text-gold text-xs font-medium uppercase tracking-[0.2em] mb-6">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
              Selected Work
            </h2>
            <p className="mt-5 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
              A curated collection of culinary stories, crafted with precision and passion.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {PORTFOLIO_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === category
                    ? "glass-gold text-gold"
                    : "glass text-white/50 hover:text-white/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="masonry-grid">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className="portfolio-card masonry-item group cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div
                  className={`relative ${ASPECT_MAP[item.aspect]} rounded-2xl overflow-hidden`}
                >
                  {/* Placeholder gradient */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
                    style={{ background: GRADIENT_MAP[item.id] }}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 flex items-end p-6">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="inline-block px-3 py-1 rounded-full glass text-gold text-[10px] uppercase tracking-wider mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-medium text-white">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-3 rounded-full glass text-white/80 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
            className="absolute left-4 md:left-8 p-3 rounded-full glass text-white/80 hover:text-white transition-colors z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
            className="absolute right-4 md:right-8 p-3 rounded-full glass text-white/80 hover:text-white transition-colors z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image */}
          <div
            className="relative max-w-4xl max-h-[80vh] w-full mx-8 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full aspect-[4/3] rounded-2xl"
              style={{ background: GRADIENT_MAP[filteredItems[lightboxIndex].id] }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <span className="inline-block px-3 py-1 rounded-full glass text-gold text-[10px] uppercase tracking-wider mb-2">
                {filteredItems[lightboxIndex].category}
              </span>
              <h3 className="text-2xl font-medium text-white">
                {filteredItems[lightboxIndex].title}
              </h3>
            </div>
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm">
            {lightboxIndex + 1} / {filteredItems.length}
          </div>
        </div>
      )}
    </>
  );
}
