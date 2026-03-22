"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Loader2, Calendar, Phone, Mail, User, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useChat } from "@/components/providers/ChatProvider";
import type { ChatMessage } from "@/types";

const WHATSAPP_NUMBER = "+2348089591880";

interface BookingData {
  businessType?: string;
  shootType?: string;
  date?: string;
  location?: string;
  budget?: string;
  name?: string;
  phone?: string;
  email?: string;
}

type ChatStep =
  | "welcome"
  | "business-type"
  | "shoot-type"
  | "date"
  | "location"
  | "budget"
  | "collect-name"
  | "collect-phone"
  | "collect-email"
  | "confirm"
  | "done"
  | "free-chat";

const QUICK_REPLIES: Record<ChatStep, string[]> = {
  welcome: ["Book a shoot", "View pricing", "Ask a question"],
  "business-type": ["Restaurant", "Cafe / Bakery", "Food Brand", "Hotel / Catering", "Other"],
  "shoot-type": ["Food Photography ($750+)", "Product Shoots ($950+)", "Social Media ($1,500/mo)", "Brand Campaign ($2,500+)"],
  date: ["This week", "Next week", "This month", "Flexible"],
  location: ["Abuja", "Lagos", "Other city"],
  budget: ["$500 - $1,000", "$1,000 - $2,500", "$2,500 - $5,000", "$5,000+"],
  "collect-name": [],
  "collect-phone": [],
  "collect-email": [],
  confirm: ["Confirm Booking", "Edit Details", "Start Over"],
  done: ["Book Another", "View Portfolio"],
  "free-chat": [],
};

const STEP_MESSAGES: Record<ChatStep, string> = {
  welcome: "Hi! I'm Ed's booking assistant. Want to plan a stunning food shoot?",
  "business-type": "What type of business are you?",
  "shoot-type": "What kind of shoot are you looking for?",
  date: "When would you like the shoot? (We prioritize Abuja bookings)",
  location: "Where will the shoot take place?",
  budget: "What's your budget range?",
  "collect-name": "Great choices! Let's get your details. What's your name?",
  "collect-phone": "What's your phone number?",
  "collect-email": "And your email address?",
  confirm: "",
  done: "Your booking has been sent! Ed will get back to you within 24 hours. You'll also receive a WhatsApp confirmation.",
  "free-chat": "",
};

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <div className={cn("flex mb-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center mr-2 flex-shrink-0 mt-1">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
          isUser
            ? "bg-brand text-white rounded-br-md"
            : "bg-[var(--color-bg-elevated)] border border-[var(--color-border)] text-[var(--color-text)] rounded-bl-md"
        )}
      >
        {message.content}
      </div>
    </div>
  );
}

function QuickReplyButtons({
  options,
  onSelect,
}: {
  options: string[];
  onSelect: (value: string) => void;
}) {
  if (options.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-3 ml-9">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className="px-3.5 py-1.5 rounded-full text-xs font-medium glass-gold text-gold hover:bg-gold/15 transition-all duration-200"
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default function ChatWidget() {
  const { isOpen, openChat, closeChat, toggleChat, prefillMessage, clearPrefill } = useChat();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<ChatStep>("welcome");
  const [booking, setBooking] = useState<BookingData>({});
  const [showNudge, setShowNudge] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: STEP_MESSAGES.welcome,
        },
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Handle prefilled message from Hero button
  useEffect(() => {
    if (isOpen && prefillMessage && messages.length <= 1) {
      handleUserInput(prefillMessage);
      clearPrefill();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, prefillMessage]);

  // Idle nudge - 10 seconds
  useEffect(() => {
    if (hasInteracted) return;

    idleTimerRef.current = setTimeout(() => {
      if (!isOpen && !hasInteracted) {
        setShowNudge(true);
        setTimeout(() => setShowNudge(false), 5000);
      }
    }, 10000);

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isOpen, hasInteracted]);

  // Portfolio scroll trigger
  useEffect(() => {
    const portfolioSection = document.getElementById("portfolio");
    if (!portfolioSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isOpen && !hasInteracted) {
            setShowNudge(true);
            setTimeout(() => setShowNudge(false), 5000);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(portfolioSection);
    return () => observer.disconnect();
  }, [isOpen, hasInteracted]);

  const addAssistantMessage = useCallback((content: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), role: "assistant", content },
    ]);
  }, []);

  const handleUserInput = useCallback(
    (text: string) => {
      setHasInteracted(true);
      setShowNudge(false);

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: text,
      };
      setMessages((prev) => [...prev, userMsg]);

      // Route based on current step
      setTimeout(() => {
        switch (step) {
          case "welcome":
            if (text.toLowerCase().includes("book") || text.toLowerCase().includes("shoot")) {
              setStep("business-type");
              addAssistantMessage(STEP_MESSAGES["business-type"]);
            } else if (text.toLowerCase().includes("pric")) {
              addAssistantMessage(
                "Here are our packages:\n\n• Food Photography: From $750\n• Product Shoots: From $950\n• Social Media Content: From $1,500/mo\n• Brand Campaigns: From $2,500\n\nWant to book one of these?"
              );
            } else {
              setStep("free-chat");
              sendToAI(text);
            }
            break;

          case "business-type":
            setBooking((prev) => ({ ...prev, businessType: text }));
            setStep("shoot-type");
            addAssistantMessage(STEP_MESSAGES["shoot-type"]);
            break;

          case "shoot-type":
            setBooking((prev) => ({ ...prev, shootType: text }));
            setStep("date");
            addAssistantMessage(STEP_MESSAGES.date);
            break;

          case "date":
            setBooking((prev) => ({ ...prev, date: text }));
            setStep("location");
            addAssistantMessage(STEP_MESSAGES.location);
            break;

          case "location":
            setBooking((prev) => ({ ...prev, location: text }));
            setStep("budget");
            addAssistantMessage(STEP_MESSAGES.budget);
            break;

          case "budget":
            setBooking((prev) => ({ ...prev, budget: text }));
            setStep("collect-name");
            addAssistantMessage(STEP_MESSAGES["collect-name"]);
            break;

          case "collect-name":
            setBooking((prev) => ({ ...prev, name: text }));
            setStep("collect-phone");
            addAssistantMessage(STEP_MESSAGES["collect-phone"]);
            break;

          case "collect-phone":
            setBooking((prev) => ({ ...prev, phone: text }));
            setStep("collect-email");
            addAssistantMessage(STEP_MESSAGES["collect-email"]);
            break;

          case "collect-email": {
            const finalBooking = { ...booking, email: text };
            setBooking(finalBooking);
            setStep("confirm");
            addAssistantMessage(
              `Here's your booking summary:\n\n` +
              `📋 Business: ${finalBooking.businessType}\n` +
              `📸 Shoot: ${finalBooking.shootType}\n` +
              `📅 Date: ${finalBooking.date}\n` +
              `📍 Location: ${finalBooking.location}\n` +
              `💰 Budget: ${finalBooking.budget}\n\n` +
              `👤 ${finalBooking.name}\n` +
              `📞 ${finalBooking.phone}\n` +
              `✉️ ${text}\n\n` +
              `Shall I confirm this booking?`
            );
            break;
          }

          case "confirm":
            if (text.toLowerCase().includes("confirm")) {
              submitBooking({ ...booking });
            } else if (text.toLowerCase().includes("edit")) {
              setStep("business-type");
              setBooking({});
              addAssistantMessage("No problem! Let's start over. " + STEP_MESSAGES["business-type"]);
            } else if (text.toLowerCase().includes("start over")) {
              setStep("business-type");
              setBooking({});
              addAssistantMessage(STEP_MESSAGES["business-type"]);
            }
            break;

          case "done":
            if (text.toLowerCase().includes("another")) {
              setStep("business-type");
              setBooking({});
              addAssistantMessage(STEP_MESSAGES["business-type"]);
            } else if (text.toLowerCase().includes("portfolio")) {
              closeChat();
              document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
            }
            break;

          case "free-chat":
            sendToAI(text);
            break;
        }
      }, 300);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [step, booking]
  );

  const sendToAI = async (text: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages
            .filter((m) => m.id !== "welcome")
            .slice(-10)
            .map((m) => ({ role: m.role, content: m.content }))
            .concat([{ role: "user", content: text }]),
        }),
      });

      if (!res.ok) throw new Error("Failed");

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };
      setMessages((prev) => [...prev, assistantMsg]);

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id
                ? { ...m, content: m.content + chunk }
                : m
            )
          );
        }
      }
    } catch {
      addAssistantMessage(
        "Sorry, I'm having trouble right now. Use the contact form or WhatsApp to reach Ed directly!"
      );
    } finally {
      setLoading(false);
    }
  };

  const submitBooking = async (data: BookingData) => {
    setLoading(true);
    try {
      // Send email notification
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name || "Chat Booking",
          email: data.email || "",
          projectType: data.shootType || "",
          budget: data.budget || "",
          message: `AI Chat Booking:\nBusiness: ${data.businessType}\nShoot: ${data.shootType}\nDate: ${data.date}\nLocation: ${data.location}\nBudget: ${data.budget}\nPhone: ${data.phone}`,
        }),
      });

      // Open WhatsApp with booking details
      const waMessage = `Hi Ed, I just booked a food shoot on your website. Here are my details:\n\nName: ${data.name}\nBusiness: ${data.businessType}\nShoot Type: ${data.shootType}\nDate: ${data.date}\nLocation: ${data.location}\nBudget: ${data.budget}\nPhone: ${data.phone}\nEmail: ${data.email}`;
      const encoded = encodeURIComponent(waMessage);
      window.open(
        `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, "")}?text=${encoded}`,
        "_blank"
      );

      setStep("done");
      addAssistantMessage(STEP_MESSAGES.done);
    } catch {
      addAssistantMessage(
        "There was an issue submitting. Please try the contact form or WhatsApp directly."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim() || loading) return;
    handleUserInput(input.trim());
    setInput("");
  };

  const handleQuickReply = (value: string) => {
    handleUserInput(value);
  };

  const getPlaceholder = () => {
    switch (step) {
      case "collect-name": return "Enter your name...";
      case "collect-phone": return "Enter your phone number...";
      case "collect-email": return "Enter your email...";
      default: return "Type a message...";
    }
  };

  const getInputIcon = () => {
    switch (step) {
      case "collect-name": return <User className="w-4 h-4 text-[var(--color-text-muted)]" />;
      case "collect-phone": return <Phone className="w-4 h-4 text-[var(--color-text-muted)]" />;
      case "collect-email": return <Mail className="w-4 h-4 text-[var(--color-text-muted)]" />;
      case "date": return <Calendar className="w-4 h-4 text-[var(--color-text-muted)]" />;
      case "location": return <MapPin className="w-4 h-4 text-[var(--color-text-muted)]" />;
      default: return null;
    }
  };

  return (
    <>
      {/* Chat Window */}
      <div
        className={cn(
          "fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] max-h-[520px] rounded-2xl shadow-2xl border border-[var(--color-border)] flex flex-col transition-all duration-300 overflow-hidden",
          "bg-[var(--color-bg-card)] backdrop-blur-xl",
          isOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--color-border)] bg-[var(--color-bg-elevated)]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text)]">
                Ed&apos;s Assistant
              </p>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <p className="text-xs text-[var(--color-text-muted)]">Online now</p>
              </div>
            </div>
          </div>
          <button
            onClick={closeChat}
            className="p-1.5 hover:bg-[var(--color-bg)] rounded-lg transition-colors"
          >
            <X className="w-4 h-4 text-[var(--color-text-muted)]" />
          </button>
        </div>

        {/* Urgency Banner */}
        <div className="px-4 py-2 bg-gold/10 border-b border-gold/20">
          <p className="text-xs text-gold font-medium text-center">
            Limited slots available this week
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 min-h-[280px]" data-lenis-prevent>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {/* Quick Reply Buttons */}
          {!loading && QUICK_REPLIES[step] && QUICK_REPLIES[step].length > 0 && (
            <QuickReplyButtons
              options={QUICK_REPLIES[step]}
              onSelect={handleQuickReply}
            />
          )}

          {loading && (
            <div className="flex justify-start mb-3">
              <div className="w-7 h-7 rounded-full bg-brand flex items-center justify-center mr-2 flex-shrink-0">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="bg-[var(--color-bg-elevated)] border border-[var(--color-border)] px-4 py-2.5 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2 h-2 rounded-full bg-gold/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-[var(--color-border)] p-3 bg-[var(--color-bg-elevated)]">
          <div className="flex items-center gap-2">
            {getInputIcon() && (
              <div className="flex-shrink-0 pl-1">
                {getInputIcon()}
              </div>
            )}
            <input
              ref={inputRef}
              type={step === "collect-email" ? "email" : step === "collect-phone" ? "tel" : "text"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={getPlaceholder()}
              className="flex-1 px-4 py-2.5 rounded-full bg-[var(--color-bg)] text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-brand/20 border border-[var(--color-border)]"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || loading}
              className="p-2.5 rounded-full bg-brand text-white hover:bg-brand-dark transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Nudge Bubble */}
      {showNudge && !isOpen && (
        <div
          className="fixed bottom-24 right-6 z-50 max-w-[260px] animate-fade-in cursor-pointer"
          onClick={() => {
            setShowNudge(false);
            openChat();
          }}
        >
          <div className="glass-strong rounded-2xl rounded-br-md px-4 py-3 text-sm text-[var(--color-text)] shadow-lg">
            Need help booking your shoot?
            <div className="absolute -bottom-1 right-6 w-3 h-3 glass-strong rotate-45" />
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => {
          setShowNudge(false);
          setHasInteracted(true);
          toggleChat();
        }}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300",
          isOpen
            ? "bg-[var(--color-bg-elevated)] text-[var(--color-text)] border border-[var(--color-border)]"
            : "bg-brand text-white hover:bg-brand-dark hover:scale-105 chat-pulse"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </>
  );
}
