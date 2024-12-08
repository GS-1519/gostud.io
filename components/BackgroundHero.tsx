import { Lock, Shield } from "lucide-react";

export default function BackgroundHero() {
    return (
        <div className="w-full max-w-[1276px] mx-auto bg-white text-black rounded-[24px] px-4 sm:px-6 lg:px-16 py-8 sm:py-12 space-y-6 font-poppins">
            <div className="text-center space-y-3">
                <h2 className="text-gray-500 font-semibold font-jakarta text-sm">AI TOOL</h2>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-jakarta leading-tight">
                    Remove Background from Images{' '}
                    <span style={{
                        background: 'linear-gradient(90deg, #4C6FFF 0%, #62CDFF 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Instantly
                    </span>
                </h1>
              
            </div>

            

          
        </div>
    );
}
