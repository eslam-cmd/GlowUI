import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.ComponentProps<"input"> {
  theme?: "light" | "dark";
  cardBg?: string;
  borderColor?: string;
  textColor?: string;
  placeholderColor?: string;
  focusRingColor?: string;
}

function Input({
  className,
  type,
  theme = "dark",
  cardBg = "bg-white/10",
  borderColor = "border-white/20",
  textColor = "text-white",
  placeholderColor = "placeholder-white/50",
  focusRingColor = "focus:ring-pink-400/50",
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        `file:text-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`,
        `${cardBg} ${borderColor} ${textColor} ${placeholderColor}`,
        `focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] ${focusRingColor}`,
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        theme === "light" &&
          "bg-white/80 border-gray-300 text-gray-800 placeholder-gray-500",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
