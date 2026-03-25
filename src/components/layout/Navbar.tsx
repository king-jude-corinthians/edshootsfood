"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { Menu, X } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "glass-strong"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto max-w-[1400px] px-[5vw] flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-10 group">
            <Image
              src="/images/logo-icon.png"
              alt="ED"
              width={48}
              height={48}
              className="h-10 md:h-11 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(47,60,207,0.6)] group-hover:scale-105"
              priority
            />
            <span className="text-base md:text-lg font-light tracking-wide text-[var(--color-text)] opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:text-gold">
              SHOOTSFOOD
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-5 py-2 rounded-full text-[13px] font-normal text-[var(--color-text)] opacity-70 hover:opacity-100 hover:bg-[var(--color-border)] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <LiquidMetalButton
              label="Book a Shoot"
              onClick={() => {
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-2 md:hidden z-10">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-6 h-6 text-[var(--color-text)]" />
              ) : (
                <Menu className="w-6 h-6 text-[var(--color-text)]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[var(--color-bg)]/95 backdrop-blur-xl transition-all duration-500 md:hidden flex flex-col items-center justify-center gap-8",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setMobileOpen(false)}
            className="text-3xl font-light text-[var(--color-text)] opacity-80 hover:text-gold transition-colors"
          >
            {link.label}
          </a>
        ))}
        <div className="mt-4">
          <LiquidMetalButton
            label="Book a Shoot"
            onClick={() => {
              setMobileOpen(false);
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
      </div>
    </>
  );
}
