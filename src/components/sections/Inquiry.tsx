"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { Send, CheckCircle } from "lucide-react";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  projectType: z.string().min(1, "Select a project type"),
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
      htmlEl.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.08}s`;
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

  const inputClass =
    "w-full px-0 py-4 bg-transparent border-b-2 border-white/20 text-white placeholder:text-white/40 focus:border-white focus:outline-none transition-colors text-sm";
  const selectClass =
    "w-full px-0 py-4 bg-transparent border-b-2 border-white/20 text-white/80 focus:border-white focus:outline-none transition-colors text-sm appearance-none cursor-pointer";

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-brand section-padding"
    >
      <div className="mx-auto max-w-[800px]">
        <SectionHeading
          eyebrow="Inquiry"
          title="Let's Create Together"
          subtitle="Have a project in mind? Tell me about it and I'll get back to you within 24 hours."
          light
        />

        {submitted ? (
          <div className="text-center py-16">
            <CheckCircle className="w-16 h-16 text-white mx-auto mb-6" />
            <h3 className="text-2xl font-medium text-white mb-3">
              Message Sent!
            </h3>
            <p className="text-white/70">
              Thank you for reaching out. I&apos;ll be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <div className="form-reveal">
                <input
                  {...register("name")}
                  placeholder="Your Name"
                  className={inputClass}
                />
                {errors.name && (
                  <p className="text-white/60 text-xs mt-1">
                    {errors.name.message}
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
                  <p className="text-white/60 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="form-reveal">
                <select {...register("projectType")} className={selectClass}>
                  <option value="" className="text-black">
                    Project Type
                  </option>
                  <option value="restaurant" className="text-black">
                    Restaurant Menu
                  </option>
                  <option value="product" className="text-black">
                    Product Photography
                  </option>
                  <option value="brand" className="text-black">
                    Brand Campaign
                  </option>
                  <option value="content" className="text-black">
                    Content Creation
                  </option>
                  <option value="other" className="text-black">
                    Other
                  </option>
                </select>
                {errors.projectType && (
                  <p className="text-white/60 text-xs mt-1">
                    {errors.projectType.message}
                  </p>
                )}
              </div>
              <div className="form-reveal">
                <select {...register("budget")} className={selectClass}>
                  <option value="" className="text-black">
                    Budget Range
                  </option>
                  <option value="500-1000" className="text-black">
                    $500 - $1,000
                  </option>
                  <option value="1000-2500" className="text-black">
                    $1,000 - $2,500
                  </option>
                  <option value="2500-5000" className="text-black">
                    $2,500 - $5,000
                  </option>
                  <option value="5000+" className="text-black">
                    $5,000+
                  </option>
                </select>
                {errors.budget && (
                  <p className="text-white/60 text-xs mt-1">
                    {errors.budget.message}
                  </p>
                )}
              </div>
            </div>

            <div className="form-reveal">
              <textarea
                {...register("message")}
                placeholder="Tell me about your project..."
                rows={4}
                className={`${inputClass} resize-none`}
              />
              {errors.message && (
                <p className="text-white/60 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <div className="form-reveal pt-6">
              <Button
                type="submit"
                disabled={sending}
                className="bg-white text-brand hover:bg-white/90 w-full sm:w-auto"
                size="lg"
              >
                {sending ? "Sending..." : "Send Inquiry"}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
