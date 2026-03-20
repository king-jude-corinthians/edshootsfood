"use client";

import { useState } from "react";
import { SERVICES } from "@/lib/constants";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { Check, ArrowRight, Loader2 } from "lucide-react";

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
                  ? "border-brand bg-brand/5"
                  : "border-border bg-white hover:border-brand/30"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-text-primary">
                  {service.title}
                </h3>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selected === service.id
                      ? "border-brand bg-brand"
                      : "border-border"
                  }`}
                >
                  {selected === service.id && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
              </div>

              <p className="text-text-muted text-sm leading-relaxed mb-4">
                {service.description}
              </p>

              <ul className="space-y-1.5 mb-5">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="text-xs text-text-muted flex items-center gap-2"
                  >
                    <div className="w-1 h-1 rounded-full bg-brand" />
                    {f}
                  </li>
                ))}
              </ul>

              <p className="text-xl font-medium text-brand">
                {service.priceLabel}
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
              className="w-full px-6 py-3.5 rounded-full border border-border bg-white text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10"
            />
            <Button
              onClick={handleCheckout}
              disabled={!email || loading}
              variant="primary"
              size="lg"
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
