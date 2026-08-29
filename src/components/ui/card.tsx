import * as React from "react";

import { cn } from "@/lib/utils";

export interface CardProps extends React.ComponentProps<"div"> {
  theme?: "light" | "dark";
  cardBg?: string;
  borderColor?: string;
  textColor?: string;
}

function Card({
  className,
  theme = "dark",
  cardBg = "bg-white/10",
  borderColor = "border-white/20",
  textColor = "text-white",
  ...props
}: CardProps) {
  return (
    <div
      data-slot="card"
      className={cn(
        `flex flex-col gap-6 rounded-xl border py-6 shadow-sm backdrop-blur-sm transition-all duration-300 ${cardBg} ${borderColor} ${textColor}`,
        theme === "light" && "bg-white/80 border-gray-300 text-gray-800",
        className,
      )}
      {...props}
    />
  );
}

export interface CardHeaderProps extends React.ComponentProps<"div"> {
  theme?: "light" | "dark";
  accentColor?: string;
}

function CardHeader({
  className,
  theme = "dark",
  accentColor = "pink",
  ...props
}: CardHeaderProps) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        theme === "dark"
          ? `text-${accentColor}-200`
          : `text-${accentColor}-700`,
        className,
      )}
      {...props}
    />
  );
}

export interface CardTitleProps extends React.ComponentProps<"div"> {
  theme?: "light" | "dark";
  accentColor?: string;
}

function CardTitle({
  className,
  theme = "dark",
  accentColor = "pink",
  ...props
}: CardTitleProps) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "leading-none font-semibold transition-colors duration-300",
        theme === "dark"
          ? `text-${accentColor}-200 group-hover:text-${accentColor}-100`
          : `text-${accentColor}-700 group-hover:text-${accentColor}-600`,
        className,
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className,
      )}
      {...props}
    />
  );
}

export interface CardContentProps extends React.ComponentProps<"div"> {
  theme?: "light" | "dark";
  textMuted?: string;
}

function CardContent({
  className,
  theme = "dark",
  textMuted = "text-white/80",
  ...props
}: CardContentProps) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-6 transition-colors duration-300",
        theme === "dark" ? textMuted : "text-gray-600",
        className,
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
