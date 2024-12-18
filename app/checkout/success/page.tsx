import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SuccessPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-600 via-violet-800 to-purple-900">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-purple-500/30 blur-[128px] animate-pulse" />
        <div className="absolute -right-[10%] top-[30%] h-[500px] w-[500px] rounded-full bg-violet-500/30 blur-[128px] animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="flex flex-col items-center text-center text-white">
          <div className="mb-8 text-6xl font-bold animate-fade-in">
            Payment successful
          </div>
          <p className="mb-12 text-xl text-gray-200">
            Success! Your payment is complete, and you're all set.
          </p>
          <Button 
            className="bg-white text-purple-900 hover:bg-gray-100 transition-all duration-200"
            asChild
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
