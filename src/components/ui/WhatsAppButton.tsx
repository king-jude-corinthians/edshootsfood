"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const openWhatsApp = () => {
    const encoded = encodeURIComponent(SITE.whatsappMessage);
    window.open(
      `https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, "")}?text=${encoded}`,
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-3 whitespace-nowrap">
          <div className="glass-strong rounded-xl px-4 py-2.5 text-white text-sm">
            Let&apos;s discuss your shoot
            <div className="absolute bottom-0 right-6 translate-y-1/2 rotate-45 w-2 h-2 glass-strong" />
          </div>
        </div>
      )}

      {/* Button */}
      <button
        onClick={openWhatsApp}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:bg-[#20BD5A] transition-all duration-300 hover:scale-110 whatsapp-pulse"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    </div>
  );
}
