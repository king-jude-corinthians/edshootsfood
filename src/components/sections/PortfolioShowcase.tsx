"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { PORTFOLIO_ITEMS, PORTFOLIO_CATEGORIES } from "@/lib/constants";
import { X, ChevronLeft, ChevronRight, Images } from "lucide-react";

const ASPECT_MAP: Record<string, string> = {
  tall: "aspect-[3/4]",
  wide: "aspect-[4/3]",
  square: "aspect-square",
};

type PortfolioItem = typeof PORTFOLIO_ITEMS[number];

export default function PortfolioShowcase() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [galleryItem, setGalleryItem] = useState<PortfolioItem | null>(null);
  const [galleryImageIndex, setGalleryImageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const filteredItems =
    activeFilter === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeFilter);

  const hasGallery = (item: PortfolioItem) =>
    (item.category === "Restaurants" || item.category === "Products") && "gallery" in item;

  const openItem = (index: number) => {
    const item = filteredItems[index];
    if (hasGallery(item)) {
      setGalleryItem(item);
      setGalleryImageIndex(0);
    } else {
      setLightboxIndex(index);
    }
  };

  const closeLightbox = () => setLightboxIndex(null);
  const closeGallery = () => { setGalleryItem(null); setGalleryImageIndex(0); };

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
      if (e.key === "Escape") { closeLightbox(); closeGallery(); }
      if (lightboxIndex !== null) {
        if (e.key === "ArrowRight") navigateLightbox("next");
        if (e.key === "ArrowLeft") navigateLightbox("prev");
      }
      if (galleryItem && "gallery" in galleryItem) {
        const gallery = (galleryItem as any).gallery as string[];
        if (e.key === "ArrowRight") setGalleryImageIndex((i) => (i + 1) % gallery.length);
        if (e.key === "ArrowLeft") setGalleryImageIndex((i) => (i - 1 + gallery.length) % gallery.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, navigateLightbox, galleryItem]);

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
      <section ref={sectionRef} id="portfolio" className="bg-[var(--color-bg)] section-padding">
        <div className="mx-auto max-w-[1400px]">
          {/* Heading */}
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-block px-5 py-2 rounded-full glass-glow text-gold text-xs font-medium uppercase tracking-[0.2em] mb-6">
              Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--color-text)] leading-[1.1]">
              Selected Work
            </h2>
            <p className="mt-5 text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
              A curated collection of culinary stories, crafted by ED.
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
                    ? "glass-glow text-gold"
                    : "glass-glow text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
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
                onClick={() => openItem(index)}
              >
                <div className={`relative ${ASPECT_MAP[item.aspect]} rounded-2xl overflow-hidden`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-500 flex items-end p-6">
                    <div className="translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="inline-block px-3 py-1 rounded-full glass text-gold text-[10px] uppercase tracking-wider mb-2">
                        {item.category}
                      </span>
                      {item.category !== "Drinks" && item.category !== "Food" && (
                        <h3 className="text-xl font-medium text-white flex items-center gap-2">
                          {item.title}
                          {hasGallery(item) && <Images className="w-4 h-4 text-gold/70" />}
                        </h3>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Single Image Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button onClick={closeLightbox} className="absolute top-6 right-6 p-3 rounded-full glass text-white/80 hover:text-white transition-colors z-10">
            <X className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }} className="absolute left-4 md:left-8 p-3 rounded-full glass text-white/80 hover:text-white transition-colors z-10">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }} className="absolute right-4 md:right-8 p-3 rounded-full glass text-white/80 hover:text-white transition-colors z-10">
            <ChevronRight className="w-6 h-6" />
          </button>
          <div className="relative max-w-4xl max-h-[80vh] w-full mx-8 rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
              <Image src={filteredItems[lightboxIndex].image} alt={filteredItems[lightboxIndex].title} fill className="object-cover" sizes="(max-width: 1024px) 90vw, 800px" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
              <span className="inline-block px-3 py-1 rounded-full glass text-gold text-[10px] uppercase tracking-wider mb-2">{filteredItems[lightboxIndex].category}</span>
              {filteredItems[lightboxIndex].category !== "Drinks" && filteredItems[lightboxIndex].category !== "Food" && (
                <h3 className="text-2xl font-medium text-white">{filteredItems[lightboxIndex].title}</h3>
              )}
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm">{lightboxIndex + 1} / {filteredItems.length}</div>
        </div>
      )}

      {/* Gallery Modal for Restaurants & Products */}
      {galleryItem && "gallery" in galleryItem && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
          onClick={closeGallery}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 z-10" onClick={(e) => e.stopPropagation()}>
            <div>
              <span className="inline-block px-3 py-1 rounded-full glass text-gold text-[10px] uppercase tracking-wider mb-1">{galleryItem.category}</span>
              <h3 className="text-2xl font-medium text-white">{galleryItem.title}</h3>
            </div>
            <button onClick={closeGallery} className="p-3 rounded-full glass text-white/80 hover:text-white transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center px-16 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setGalleryImageIndex((i) => (i - 1 + (galleryItem as any).gallery.length) % (galleryItem as any).gallery.length)}
              className="absolute left-4 md:left-6 p-3 rounded-full glass text-white/80 hover:text-white transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="relative w-full max-w-3xl max-h-[60vh] aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src={(galleryItem as any).gallery[galleryImageIndex]}
                alt={`${galleryItem.title} ${galleryImageIndex + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 800px"
              />
            </div>
            <button
              onClick={() => setGalleryImageIndex((i) => (i + 1) % (galleryItem as any).gallery.length)}
              className="absolute right-4 md:right-6 p-3 rounded-full glass text-white/80 hover:text-white transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-3 justify-center px-6 py-5 overflow-x-auto" onClick={(e) => e.stopPropagation()}>
            {(galleryItem as any).gallery.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setGalleryImageIndex(i)}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 ${i === galleryImageIndex ? "ring-2 ring-gold scale-105" : "opacity-50 hover:opacity-80"}`}
              >
                <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>

          <div className="text-center pb-4 text-white/40 text-sm">{galleryImageIndex + 1} / {(galleryItem as any).gallery.length}</div>
        </div>
      )}
    </>
  );
}
