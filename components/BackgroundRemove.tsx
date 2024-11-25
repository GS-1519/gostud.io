"use client";
import { useState } from "react";
import { Download, UploadIcon } from "lucide-react";
import { removeBackground } from "@imgly/background-removal";
import { ImgComparisonSlider } from '@img-comparison-slider/react';

export default function BackgroundRemove() {
    const [inputFile, setInputFile] = useState<File | null>(null);
    const [outputFileURL, setOutputFileURL] = useState<string>("");
    const [processing, setProcessing] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);

    async function removeBackgroundLocal() {
        setProcessing(true);
        setErrorMsg("");
        setOutputFileURL("");
        setProgress(0);
        
        try {
            if (inputFile) {
                const imageData = await new Response(inputFile).blob();
                const blob = await removeBackground(imageData, {
                    progress: (key: string, current: number, total: number) => {
                        if(key.includes("fetch")) {
                            setProgress(25);
                        }
                        if (key.includes("compute")) {
                            setProgress(Math.round((current / total) * 100));
                        }
                    }
                });      
                const url = URL.createObjectURL(blob);
                setOutputFileURL(url);
            }
        } catch (error) {
            setErrorMsg("Error removing background. Please try again.");
            console.error("Error removing background:", error);
        }
        setProcessing(false);
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        if (file) {
            if (file.type.startsWith("image/")) {
                setInputFile(file);
                setErrorMsg("");
            } else {
                setErrorMsg("Please select a valid image file.");
            }
        }
    };

    return (
        <div className="w-full max-w-[1276px] mx-auto bg-white rounded-[24px] px-4 sm:px-6 lg:px-20 py-16 space-y-8 font-poppins">
            <div className="max-w-3xl mx-auto">
                <div className="bg-gray-50 rounded-2xl p-8 border-2 border-dashed border-gray-200">
                    {!inputFile ? (
                        <label className="cursor-pointer block">
                            <div className="flex flex-col items-center justify-center p-10">
                                <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                    <UploadIcon className="w-8 h-8 text-blue-500" />
                                </div>
                                <p className="text-lg font-semibold text-gray-700 mb-2">
                                    Click to Select or Drag and Drop
                                </p>
                                <p className="text-sm text-gray-500">
                                    Supported formats: PNG, JPG, JPEG
                                </p>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </label>
                    ) : (
                        <div className="text-center">
                            <p className="text-lg font-semibold mb-2">{inputFile.name}</p>
                            <button 
                                onClick={() => setInputFile(null)}
                                className="text-blue-500 hover:text-blue-700 font-medium"
                            >
                                Choose different image
                            </button>
                        </div>
                    )}
                </div>

                {processing && (
                    <div className="mt-8">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Processing...</span>
                            <span className="text-sm font-medium">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-gradient-to-r from-[#8371FF] to-[#01C7E4] h-2 rounded-full transition-all duration-300" 
                                style={{width: `${progress}%`}}
                            ></div>
                        </div>
                    </div>
                )}

                {errorMsg && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-lg mt-8 text-center">
                        {errorMsg}
                    </div>
                )}

                <div className="flex justify-center mt-8">
                    <button
                        onClick={removeBackgroundLocal}
                        disabled={!inputFile || processing}
                        className="bg-[#5B16FE] text-white px-8 py-3 rounded-full font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? "Processing..." : "Remove Background"}
                    </button>
                </div>

                {inputFile && outputFileURL && (
                    <div className="mt-8 border rounded-2xl p-6 bg-gray-50 flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-4 text-center">Result</h3>
                        <div className="w-full max-w-2xl mx-auto">
                            <ImgComparisonSlider className="rounded-lg">
                                <img
                                    slot="first"
                                    src={URL.createObjectURL(inputFile)}
                                    alt="Original"
                                    className="max-h-96 rounded-lg"
                                />
                                <img
                                    slot="second"
                                    src={outputFileURL}
                                    alt="Background Removed"
                                    className="max-h-96 rounded-lg"
                                />
                            </ImgComparisonSlider>
                        </div>
                        
                        <div className="flex justify-center mt-6">
                            <a
                                href={outputFileURL}
                                download="removed-background.png"
                                className="bg-gradient-to-r from-[#8371FF] to-[#01C7E4] text-white px-8 py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition-all duration-300 font-semibold"
                            >
                                Download Result <Download size={16} />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}