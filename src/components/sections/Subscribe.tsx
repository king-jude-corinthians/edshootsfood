"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";

export default function Subscribe() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSubmitted(true);
        setEmail("");
      }
    } catch {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-surface section-padding-sm">
      <div className="mx-auto max-w-[600px] text-center">
        <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-text-primary mb-4">
          Stay in the Loop
        </h3>
        <p className="text-text-muted mb-8 text-base">
          Get behind-the-scenes content, food photography tips, and updates on
          new projects. No spam, ever.
        </p>

        {submitted ? (
          <div className="flex items-center justify-center gap-3 text-brand">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">You&apos;re subscribed! Check your inbox.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-6 py-3.5 rounded-full border border-border bg-white text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-brand focus:ring-2 focus:ring-brand/10 transition-all"
            />
            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              size="md"
            >
              {loading ? "..." : "Subscribe"}
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}
