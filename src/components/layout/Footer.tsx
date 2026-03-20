import Link from "next/link";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { Instagram, Mail, ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-dark text-text-light">
      <div className="mx-auto max-w-[1400px] px-[5vw] py-20 md:py-28">
        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="max-w-md">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <span className="text-2xl font-medium">ED</span>
              <span className="text-2xl font-light">SHOOTSFOOD</span>
            </Link>
            <p className="text-text-light/60 text-base leading-relaxed">
              Premium food photography by Ezekwe Desmond. Elevating brands
              through stunning culinary visuals.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h4 className="text-sm font-medium text-text-light/40 uppercase tracking-wider mb-4">
                Navigation
              </h4>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-text-light/80 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-text-light/40 uppercase tracking-wider mb-4">
                Connect
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-text-light/80 hover:text-white transition-colors text-sm"
                  >
                    <Instagram className="w-4 h-4" />
                    Instagram
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="flex items-center gap-2 text-text-light/80 hover:text-white transition-colors text-sm"
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
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-light/40 text-sm">
            &copy; {new Date().getFullYear()} EdShootsFood. All rights
            reserved.
          </p>
          <p className="text-text-light/30 text-xs">
            Crafted with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
