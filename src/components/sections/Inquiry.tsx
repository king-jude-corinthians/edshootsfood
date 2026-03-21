"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, CheckCircle, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/constants";

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
    const message = `Hi! I'm ${values.name || "interested"}. I'd like to book a ${values.projectType || "photography"} session${values.location ? ` in ${values.location}` : ""}${values.date ? ` on ${values.date}` : ""}. ${values.message || ""}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${SITE.whatsapp.replace(/[^0-9]/g, "")}?text=${encoded}`, "_blank");
  };

  const inputClass =
    "w-full px-5 py-4 rounded-xl glass text-white placeholder:text-white/30 focus:outline-none focus:border-gold/40 transition-all text-sm border border-white/10 focus:border-gold/30 bg-white/[0.03]";
  const selectClass =
    "w-full px-5 py-4 rounded-xl glass text-white/60 focus:outline-none focus:border-gold/40 transition-all text-sm appearance-none cursor-pointer border border-white/10 focus:border-gold/30 bg-white/[0.03]";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-surface-dark section-padding"
    >
      <div className="mx-auto max-w-[900px]">
        {/* Heading */}
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block px-5 py-2 rounded-full glass text-gold text-xs font-medium uppercase tracking-[0.2em] mb-6">
            Book Now
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
            Book a Shoot
          </h2>
          <p className="mt-5 text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Have a project in mind? Fill in the details and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-strong rounded-3xl p-8 md:p-12">
          {submitted ? (
            <div className="text-center py-16">
              <CheckCircle className="w-16 h-16 text-gold mx-auto mb-6" />
              <h3 className="text-2xl font-medium text-white mb-3">
                Booking Request Sent!
              </h3>
              <p className="text-white/50 mb-6">
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
                    <option value="" className="bg-[#111]">
                      Project Type
                    </option>
                    <option value="food-photography" className="bg-[#111]">
                      Food Photography
                    </option>
                    <option value="product-shoot" className="bg-[#111]">
                      Product Shoot
                    </option>
                    <option value="brand-campaign" className="bg-[#111]">
                      Brand Campaign
                    </option>
                    <option value="social-media" className="bg-[#111]">
                      Social Media Content
                    </option>
                    <option value="other" className="bg-[#111]">
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
                    className={`${inputClass} text-white/60`}
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
                  <option value="" className="bg-[#111]">
                    Budget Range
                  </option>
                  <option value="500-1000" className="bg-[#111]">
                    $500 - $1,000
                  </option>
                  <option value="1000-2500" className="bg-[#111]">
                    $1,000 - $2,500
                  </option>
                  <option value="2500-5000" className="bg-[#111]">
                    $2,500 - $5,000
                  </option>
                  <option value="5000+" className="bg-[#111]">
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

              <div className="form-reveal flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={sending}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gold text-white font-medium hover:bg-gold-dark transition-colors disabled:opacity-50"
                >
                  {sending ? "Sending..." : "Book a Shoot"}
                  <Send className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full glass text-white font-medium hover:bg-white/10 transition-colors border border-white/10"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
