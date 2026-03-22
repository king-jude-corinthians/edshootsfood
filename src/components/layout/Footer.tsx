import Link from "next/link";
import Image from "next/image";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { Instagram, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-bg-dark)] transition-colors duration-500">
      <div className="mx-auto max-w-[1400px] px-[5vw] py-20 md:py-28">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-2.5 mb-6 group">
              <Image
                src="/images/logo-icon.png"
                alt="ED"
                width={56}
                height={56}
                className="h-14 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_12px_rgba(47,60,207,0.6)] group-hover:scale-105"
              />
              <span className="text-xl font-light tracking-wide text-[var(--color-text)] opacity-80 transition-all duration-300 group-hover:opacity-100 group-hover:text-gold">
                SHOOTSFOOD
              </span>
            </Link>
            <p className="text-[var(--color-text-muted)] text-base leading-relaxed">
              Premium food photography by Ezekwe Desmond. Elevating brands
              through stunning culinary visuals.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="text-sm font-medium text-gold/60 uppercase tracking-wider mb-4">
                Navigation
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[var(--color-text-muted)] hover:text-gold transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gold/60 uppercase tracking-wider mb-4">
                Connect
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-gold transition-colors text-sm"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-2 text-[var(--color-text-muted)] hover:text-gold transition-colors text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-[var(--color-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--color-text-muted)] opacity-60 text-sm">
            &copy; {new Date().getFullYear()} EdShootsFood. All rights
            reserved.
          </p>
          <p className="text-[var(--color-text-muted)] opacity-40 text-xs">
            Crafted with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
