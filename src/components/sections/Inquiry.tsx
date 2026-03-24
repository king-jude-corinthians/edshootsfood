"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, MessageCircle } from "lucide-react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

const WHATSAPP_NUMBER = "+2348089591880";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(7, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  projectType: z.string().min(1, "Select a project type"),
  location: z.string().min(2, "Shoot location is required"),
  date: z.string().min(1, "Select a date"),
  budget: z.string().min(1, "Select a budget range"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function Inquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const els = section.querySelectorAll(".form-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.1 }
    );

    els.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(20px)";
      htmlEl.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 80}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data: FormData) => {
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSubmitted(true);
        reset();
      }
    } catch {
      // Handle error
    } finally {
      setSending(false);
    }
  };

  const openWhatsApp = () => {
    const values = getValues();
    const message = `Hi Ed, I just booked a food shoot on your website. Here are my details:\nName: ${values.name || "N/A"}\nProject: ${values.projectType || "N/A"}\nLocation: ${values.location || "N/A"}\nDate: ${values.date || "N/A"}\nBudget: ${values.budget || "N/A"}\nMessage: ${values.message || "N/A"}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encoded}`, "_blank");
  };

  const inputClass =
    "w-full px-5 py-4 rounded-xl glass text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-gold/40 transition-all text-sm border border-[var(--color-border)] focus:border-gold/30 bg-[var(--color-bg-card)]";
  const selectClass =
    "w-full px-5 py-4 rounded-xl glass text-[var(--color-text-muted)] focus:outline-none focus:border-gold/40 transition-all text-sm appearance-none cursor-pointer border border-[var(--color-border)] focus:border-gold/30 bg-[var(--color-bg-card)]";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-[var(--color-bg-dark)] section-padding"
    >
      <div className="mx-auto max-w-[900px]">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block px-5 py-2 rounded-full glass-glow text-gold text-xs font-medium uppercase tracking-[0.2em] mb-6">
            Book Now
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-[var(--color-text)] leading-[1.1]">
            Book a Shoot
          </h2>
          <p className="mt-5 text-lg md:text-xl text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Fill in the details and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-glow rounded-3xl p-8 md:p-12">
          {submitted ? (
            <div className="text-center py-16">
              <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
              <h3 className="text-2xl font-medium text-[var(--color-text)] mb-3">
                Booking Request Sent!
              </h3>
              <p className="text-[var(--color-text-muted)] mb-6">
                Thank you for reaching out. We&apos;ll be in touch within 24 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 rounded-full glass text-gold text-sm font-medium hover:bg-gold/10 transition-colors"
              >
                Send Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="form-reveal">
                  <input
                    {...register("name")}
                    placeholder="Your Name"
                    className={inputClass}
                  />
                  {errors.name && (
                    <p className="text-gold/60 text-xs mt-1.5 ml-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="form-reveal">
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="Phone Number"
                    className={inputClass}
                  />
                  {errors.phone && (
                    <p className="text-gold/60 text-xs mt-1.5 ml-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div className="form-reveal">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Email Address"
                    className={inputClass}
                  />
                  {errors.email && (
                    <p className="text-gold/60 text-xs mt-1.5 ml-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className="form-reveal">
                  <select {...register("projectType")} className={selectClass}>
                    <option value="" className="bg-[var(--color-bg-card)]">
                      Project Type
                    </option>
                    <option value="food-photography" className="bg-[var(--color-bg-card)]">
                      Food Photography
                    </option>
                    <option value="product-shoot" className="bg-[var(--color-bg-card)]">
                      Product Shoot
                    </option>
                    <option value="brand-campaign" className="bg-[var(--color-bg-card)]">
                      Brand Campaign
                    </option>
                    <option value="social-media" className="bg-[var(--color-bg-card)]">
                      Social Media Content
                    </option>
                    <option value="other" className="bg-[var(--color-bg-card)]">
                      Other
                    </option>
                  </select>
                  {errors.projectType && (
                    <p className="text-gold/60 text-xs mt-1.5 ml-1">
                      {errors.projectType.message}
                    </p>
                  )}
                </div>
                <div className="form-reveal">
                  <input
                    {...register("location")}
                    placeholder="Shoot Location"
                    className={inputClass}
                  />
                  {errors.location && (
                    <p className="text-gold/60 text-xs mt-1.5 ml-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>
                <div className="form-reveal">
                  <input
                    {...register("date")}
                    type="date"
                    className={`${inputClass} text-[var(--color-text-muted)]`}
                  />
                  {errors.date && (
                    <p className="text-gold/60 text-xs mt-1.5 ml-1">
                      {errors.date.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="form-reveal">
                <select {...register("budget")} className={selectClass}>
                  <option value="" className="bg-[var(--color-bg-card)]">
                    Budget Range
                  </option>
                  <option value="500-1000" className="bg-[var(--color-bg-card)]">
                    $500 - $1,000
                  </option>
                  <option value="1000-2500" className="bg-[var(--color-bg-card)]">
                    $1,000 - $2,500
                  </option>
                  <option value="2500-5000" className="bg-[var(--color-bg-card)]">
                    $2,500 - $5,000
                  </option>
                  <option value="5000+" className="bg-[var(--color-bg-card)]">
                    $5,000+
                  </option>
                </select>
                {errors.budget && (
                  <p className="text-gold/60 text-xs mt-1.5 ml-1">
                    {errors.budget.message}
                  </p>
                )}
              </div>

              <div className="form-reveal">
                <textarea
                  {...register("message")}
                  placeholder="Tell us about your project..."
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
                {errors.message && (
                  <p className="text-gold/60 text-xs mt-1.5 ml-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <div className="form-reveal flex flex-col sm:flex-row items-center gap-6 pt-4">
                <LiquidMetalButton
                  label={sending ? "Sending..." : "Book a Shoot"}
                  onClick={handleSubmit(onSubmit)}
                />
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
