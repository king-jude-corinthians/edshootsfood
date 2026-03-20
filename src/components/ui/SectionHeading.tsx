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
  light = false,
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
        <span
          className={cn(
            "inline-block px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider mb-6",
            light
              ? "bg-white/10 text-white/80"
              : "bg-brand/10 text-brand"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1]",
          light ? "text-text-light" : "text-text-primary"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-lg md:text-xl max-w-2xl leading-relaxed",
            align === "center" && "mx-auto",
            light ? "text-text-light/60" : "text-text-muted"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
