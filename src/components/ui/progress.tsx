"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { value?: number }
>(({ className, value = 0, ...props }, ref) => (
  <div className="relative w-full">
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-muted dark:bg-gray-700",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full bg-blue-300 dark:bg-blue-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </ProgressPrimitive.Root>
    <span
      className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-900 dark:text-gray-100"
    >
      {value}%
    </span>
  </div>
));

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };