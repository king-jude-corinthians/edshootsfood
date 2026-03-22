import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 disabled:opacity-50",
          {
            "bg-brand text-white hover:bg-brand-light btn-glow": variant === "primary",
            "border border-border text-text-primary hover:bg-surface-dark/5":
              variant === "secondary",
            "text-text-primary hover:text-brand": variant === "ghost",
          },
          {
            "px-5 py-2 text-sm": size === "sm",
            "px-7 py-3 text-sm": size === "md",
            "px-9 py-4 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
