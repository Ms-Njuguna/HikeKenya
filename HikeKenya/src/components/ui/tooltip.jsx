// src/components/ui/tooltip.jsx
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
 // or define your own `cn` function if not using shadcn

export const TooltipProvider = TooltipPrimitive.Provider;
export const Tooltip = TooltipPrimitive.Root;
export const TooltipTrigger = TooltipPrimitive.Trigger;

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function TooltipContent({ className, sideOffset = 4, ...props }) {
  return (
    <TooltipPrimitive.Content
      sideOffset={sideOffset}
      className={cn(
        "z-50 rounded-md bg-black px-3 py-1.5 text-xs text-white shadow-md animate-in fade-in-0 zoom-in-95",
        className
      )}
      {...props}
    />
  );
}
