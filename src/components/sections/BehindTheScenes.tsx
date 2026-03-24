"use client";

import { useRef, useEffect } from "react";
import { BTS_VIDEOS } from "@/lib/constants";
import { Play } from "lucide-react";

const BTS_VIDEO_SRCS = [
  "/videos/bts-1.mp4",
  "/videos/bts-2.mp4",
  "/videos/bts-3.mp4",
  "/videos/bts-4.mp4",
];

export default function BehindTheScenes() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const items = section.querySelectorAll(".bts-item");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateX(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((item, i) => {
      const el = item as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateX(40px)";
      el.style.transition = `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms`;
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[var(--color-bg-dark)] section-padding overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block px-5 py-2 rounded-full glass-glow text-gold text-xs font-medium uppercase tracking-[0.2em] mb-6">
            Process
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--color-text)] leading-[1.1]">
            Behind the Scenes
          </h2>
          <p className="mt-5 text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
            A glimpse into how we craft every frame.
          </p>
        </div>

        {/* Horizontal Scroll */}
        <div
          className="flex gap-6 overflow-x-auto horizontal-scroll pb-4 -mx-[5vw] px-[5vw] snap-x snap-mandatory"
        >
          {BTS_VIDEOS.map((video, index) => (
            <div
              key={video.id}
              className="bts-item flex-shrink-0 w-[320px] md:w-[400px] group cursor-pointer snap-start"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                  <source src={BTS_VIDEO_SRCS[index]} type="video/mp4" />
                </video>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center">
                    <Play className="w-6 h-6 text-gold fill-gold" />
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
              </div>
              <h3 className="text-[var(--color-text)] font-medium text-lg mb-1">{video.title}</h3>
              <p className="text-[var(--color-text-muted)] text-sm">{video.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
