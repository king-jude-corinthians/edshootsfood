import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16 md:mb-20",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="inline-block px-5 py-2 rounded-full glass text-gold text-xs font-medium uppercase tracking-[0.2em] mb-6">
          {eyebrow}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white leading-[1.1]">
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-lg md:text-xl max-w-2xl leading-relaxed text-white/50",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
