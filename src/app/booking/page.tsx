"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";
import { Check, ArrowRight, Loader2 } from "lucide-react";

const SERVICE_PRICES: Record<string, string> = {
  "food-photography": "From $750",
  "product-shoots": "From $950",
  "social-media": "From $1,500/mo",
  "brand-campaigns": "From $2,500",
};

export default function BookingPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleCheckout = async () => {
    if (!selected || !email) return;
    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ serviceId: selected, customerEmail: email }),
      });

      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface pt-28 pb-20">
      <div className="mx-auto max-w-[1000px] px-[5vw]">
        <SectionHeading
          eyebrow="Booking"
          title="Choose Your Package"
          subtitle="Select a service to get started. You'll be redirected to our secure payment page."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {SERVICES.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelected(service.id)}
              className={`text-left p-7 rounded-2xl border-2 transition-all duration-200 ${
                selected === service.id
                  ? "border-gold glass-gold"
                  : "border-white/10 glass hover:border-gold/30"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-white">
                  {service.title}
                </h3>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selected === service.id
                      ? "border-gold bg-gold"
                      : "border-white/20"
                  }`}
                >
                  {selected === service.id && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>

              <p className="text-white/50 text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              <p className="text-xl font-medium text-gold">
                {SERVICE_PRICES[service.id] ?? "Contact for pricing"}
              </p>
            </button>
          ))}
        </div>

        {/* Email + Checkout */}
        {selected && (
          <div className="max-w-md mx-auto text-center space-y-4 animate-fade-in">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full px-6 py-3.5 rounded-full glass text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold/30 border border-white/10 transition-all"
            />
            <button
              onClick={handleCheckout}
              disabled={!email || loading}
              className="w-full inline-flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-gold text-white font-medium hover:bg-gold-dark transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
