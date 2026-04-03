"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle } from "lucide-react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal-button";

const WHATSAPP_NUMBER = "+2348089591880";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(7, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  projectType: z.string().min(1, "Select a project type"),
  location: z.string().min(2, "Shoot location is required"),
  date: z.string().min(1, "Select a date"),
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
      const message = `Hi Ed, I'd like to book a shoot! Here are my details:\n\n👤 Name: ${data.name}\n📞 Phone: ${data.phone}\n✉️ Email: ${data.email}\n📸 Package: ${data.projectType}\n📍 Location: ${data.location}\n📅 Date: ${data.date}\n\n💬 ${data.message}`;
      const encoded = encodeURIComponent(message);
      window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encoded}`, "_blank");
      setSubmitted(true);
      reset();
    } finally {
      setSending(false);
    }
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
                    <option value="" className="bg-[var(--color-bg-card)]">Select a Package</option>
                    <optgroup label="── Photography ──">
                      <option value="Photography – Silver Package (N150k) | 10 edited images | Curated for online sales & growth" className="bg-[var(--color-bg-card)]">Silver Package — N150k | 10 edited images</option>
                      <option value="Photography – Platinum Package (N180k) | 20 edited images | Online sales growth & social media" className="bg-[var(--color-bg-card)]">Platinum Package — N180k | 20 edited images</option>
                      <option value="Photography – Gold Package (N250k) | 30 edited images | Online sales, website & social media" className="bg-[var(--color-bg-card)]">Gold Package — N250k | 30 edited images</option>
                    </optgroup>
                    <optgroup label="── Videography ──">
                      <option value="Videography – Basic Package (N130k) | 2 professionally edited Short Reels" className="bg-[var(--color-bg-card)]">Basic Package — N130k | 2 Short Reels</option>
                      <option value="Videography – Classic Package (N175k) | 2 Short Reels + 1 Creative Video of 1 Menu Item" className="bg-[var(--color-bg-card)]">Classic Package — N175k | 2 Reels + 1 Creative Video</option>
                      <option value="Videography – Premium Package (N225k) | 3 Short Reels + 2 Creative Videos of 2 Menu Items" className="bg-[var(--color-bg-card)]">Premium Package — N225k | 3 Reels + 2 Creative Videos</option>
                    </optgroup>
                    <option value="Custom / Other" className="bg-[var(--color-bg-card)]">Custom / Other</option>
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
                    type="text"
                    placeholder="Date of Shoot"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
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
