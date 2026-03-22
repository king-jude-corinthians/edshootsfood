"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "+2348089591880";
const WHATSAPP_MESSAGE = "Hi! I'm interested in booking a food photography session.";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const openWhatsApp = () => {
    const encoded = encodeURIComponent(WHATSAPP_MESSAGE);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encoded}`,
      "_blank"
    );
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-3 whitespace-nowrap">
          <div className="glass-strong rounded-xl px-4 py-2.5 text-[var(--color-text)] text-sm">
            Let&apos;s discuss your shoot
            <div className="absolute bottom-0 left-6 translate-y-1/2 rotate-45 w-2 h-2 glass-strong" />
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
