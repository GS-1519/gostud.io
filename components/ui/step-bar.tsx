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
  { number: "04", title: "Get Credits", path: "step=get-credits" },
  { number: "05", title: "Summary", path: "step=summary" },
];

export function StepBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  if (!pathname?.includes('/overview/packs') && !pathname?.includes('/overview/models/train')) {
    return null;
  }

  const getCurrentStepIndex = () => {
    if (pathname?.includes('/overview/packs')) return 0;
    const step = searchParams?.get('step');
    if (!step) return 1;
    
    switch (step) {
      case 'img-upload': return 2;
      case 'get-credits': return 3;
      case 'summary': return 4;
      default: return 1;
    }
  };

  const currentStepIndex = getCurrentStepIndex();
  
  return (
    <div className="sticky top-0 left-0 right-0 z-30 bg-white px-4">
      <div className="max-w-[1200px] mx-auto py-6">
        {/* Mobile View - Top */}
        <div className="md:hidden mb-4">
          <div className="text-[24px] font-medium text-gray-900">
            {steps[currentStepIndex].number}/{steps.length.toString().padStart(2, '0')} {steps[currentStepIndex].title}
          </div>
        </div>

        {/* Desktop Steps - Hidden on Mobile */}
        <div className="hidden md:flex justify-between mt-2 text-sm">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={cn(
                "text-xs font-medium transition-colors",
                index === currentStepIndex ? "text-[#8371FF]" :
                index < currentStepIndex ? "text-[#6366F1]" :
                "text-gray-400"
              )}
            >
              {step.number}/ {step.title}
            </div>
          ))}
        </div>

        {/* Progress Line */}
        <div className="relative h-[2px]">
          <div className="absolute h-full bg-gray-200 left-0 right-0" />
          <div 
            className="absolute h-full bg-gradient-to-r from-[#8371FF] via-[#A077FE] to-[#01C7E4] left-0 transition-all duration-500"
            style={{ 
              width: `${((currentStepIndex + 1) / steps.length) * 100}%`
            }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-[#8371FF] shadow-md" />
          </div>
        </div>
      </div>
    </div>
  );
} 