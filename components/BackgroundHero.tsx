import { Lock, Shield } from "lucide-react";

export default function BackgroundHero() {
    return (
        <div className="w-full max-w-[1276px] mx-auto bg-white text-black rounded-[24px] px-4 sm:px-6 lg:px-20 py-16 space-y-8 font-poppins">
            <div className="text-center space-y-4">
                <h2 className="text-gray-500 font-semibold font-jakarta">AI TOOL</h2>
                <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold font-jakarta">
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
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto">
                    Remove background from your images quickly and securely. All processing happens locally on your device.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 w-full max-w-[967px] mt-6 sm:mt-8 px-4">
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

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-red-600 text-sm text-center font-medium">
                    Note: Due to resource constraints, this tool may not work optimally on mobile devices.
                </p>
            </div>
        </div>
    );
}