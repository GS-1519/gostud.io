'use client'

import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";

interface Step {
  number: string;
  title: string;
  path: string;
}

const steps: Step[] = [
  { number: "01", title: "Select Pack", path: "/overview/packs" },
  { number: "02", title: "Instructions", path: "/overview/models/train" },
  { number: "03", title: "Upload Photos", path: "step=img-upload" },
  { number: "04", title: "Select GoStudio Package", path: "/overview/package" },
  { number: "05", title: "Check Out", path: "/overview/checkout" },
  { number: "06", title: "Order Details", path: "/overview/order-details" },
];

export function StepBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  if (!pathname?.includes('/overview')) {
    return null;
  }

  const getCurrentStepIndex = () => {
    const step = searchParams?.get('step');
    
    if (step === 'img-upload') {
      return 2;
    }

    return steps.findIndex(s => 
      pathname.includes(s.path) && s.path !== "step=img-upload"
    );
  };

  const currentStepIndex = getCurrentStepIndex();
  
  return (
    <div className="sticky top-[64px] left-0 right-0 z-40 bg-white pb-4 px-4">
      <div className="max-w-[1200px] mx-auto">
        {/* Desktop Steps */}
        <div className="hidden md:flex items-center justify-between mb-2">
          {steps.map((step, index) => {
            const isActive = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;

            return (
              <div 
                key={step.number}
                className="relative flex flex-col items-center"
              >
                <div 
                  className={cn(
                    "text-sm font-medium mb-1",
                    isActive ? "text-[#0066FF]" : "text-[#666666]"
                  )}
                >
                  {step.number}
                </div>
                <span 
                  className={cn(
                    "text-sm whitespace-nowrap",
                    isCurrent ? "text-black" : "text-[#666666]"
                  )}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Progress Line and Dots */}
        <div className="relative h-[2px]">
          {/* Background Line */}
          <div className="absolute h-full bg-[#E5E7EB] left-0 right-0" />
          
          {/* Active Progress Line */}
          <div 
            className="absolute h-full bg-[#0066FF] left-0 transition-all duration-500"
            style={{ 
              width: `${((currentStepIndex + 1) / steps.length) * 100}%`
            }}
          >
            {/* Dot at the end of blue line */}
            <div 
              className={cn(
                "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2",
                "w-3 h-3 rounded-full bg-[#0066FF] border-2 border-[#0066FF]",
                "ring-2 ring-[#0066FF] ring-offset-2"
              )}
            />
          </div>

          {/* Static Dots */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-between">
            {steps.map((_, index) => {
              const isActive = index < currentStepIndex; // Changed condition to not include current

              return (
                <div
                  key={index}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all duration-300",
                    isActive 
                      ? "bg-[#0066FF] border-2 border-[#0066FF]" 
                      : "bg-white border-2 border-[#E5E7EB]"
                  )}
                />
              );
            })}
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden text-sm font-medium mt-2">
          {currentStepIndex + 1}/{steps.length} {steps[currentStepIndex]?.title}
        </div>
      </div>
    </div>
  );
} 