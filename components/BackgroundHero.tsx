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
                <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                    Remove background from your images quickly and securely. All processing happens locally on your device.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full max-w-[967px] mt-4 px-4">
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 font-poppins">100% Private & Secure</span>
                </div>
                <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm text-gray-700 font-poppins">Local Processing Only</span>
                </div>
            </div>

          
        </div>
    );
}
