"use client";
import { useState, useEffect } from "react";
import { Download, UploadIcon } from "lucide-react";
import { removeBackground } from "@imgly/background-removal";
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { ChromePicker } from 'react-color';

export default function BackgroundRemove() {
    const [inputFile, setInputFile] = useState<File | null>(null);
    const [outputFileURL, setOutputFileURL] = useState<string>("");
    const [originalOutputURL, setOriginalOutputURL] = useState<string>("");
    const [processing, setProcessing] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [selectedBackground, setSelectedBackground] = useState<string>("");
    const [backgroundColor, setBackgroundColor] = useState<string>("");
    const [activeTab, setActiveTab] = useState<'photo' | 'color'>('photo');
    const [showColorPicker, setShowColorPicker] = useState(false);

    // Background images array
    const backgroundImages = [
        '/remove-bg/bg1.jpg',
        '/remove-bg/bg2.jpg',
        '/remove-bg/bg3.jpg',
        '/remove-bg/bg4.jpg',
        '/remove-bg/bg5.jpg',
        '/remove-bg/bg6.jpg',
        '/remove-bg/bg7.jpg',
        '/remove-bg/bg8.jpg',
        '/remove-bg/bg9.jpg',
        '/remove-bg/bg10.jpg',
        '/remove-bg/bg11.jpg',
        '/remove-bg/bg12.jpg',
        '/remove-bg/bg13.jpg',
        '/remove-bg/bg.jpg'
        // Add more background images as needed
    ];

    // Predefined colors
    const colorOptions = [
        '#FF0000', '#00FF00', '#0000FF', '#FFFF00',
        '#FF00FF', '#00FFFF', '#FFFFFF', '#000000',
        // Add more colors as needed
    ];

    async function removeBackgroundLocal() {
        setProcessing(true);
        setErrorMsg("");
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
                setOriginalOutputURL(url); // Save the original
                setOutputFileURL(url);     // Set initial output
            }
        } catch (error) {
            setErrorMsg("Error removing background. Please try again.");
            console.error("Error removing background:", error);
        }
        setProcessing(false);
    }

    const applyBackground = async (background: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Load the removed background image
            const foregroundImg = new Image();
            foregroundImg.onload = () => {
                canvas.width = foregroundImg.width;
                canvas.height = foregroundImg.height;

                // Apply background
                if (background.startsWith('#')) {
                    // Color background
                    ctx!.fillStyle = background;
                    ctx!.fillRect(0, 0, canvas.width, canvas.height);
                    ctx!.drawImage(foregroundImg, 0, 0);
                    resolve(canvas.toDataURL('image/png'));
                } else {
                    // Image background
                    const bgImg = new Image();
                    bgImg.onload = () => {
                        ctx!.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
                        ctx!.drawImage(foregroundImg, 0, 0);
                        resolve(canvas.toDataURL('image/png'));
                    };
                    bgImg.onerror = () => reject(new Error('Failed to load background image'));
                    bgImg.src = background;
                }
            };
            foregroundImg.onerror = () => reject(new Error('Failed to load foreground image'));
            foregroundImg.src = originalOutputURL;
        });
    };

    const handleBackgroundChange = async (newBackground: string) => {
        try {
            setProcessing(true);
            console.log('Applying background:', newBackground); // Debug log

            if (!originalOutputURL) {
                throw new Error('No image processed yet');
            }

            // Update state based on background type
            if (newBackground.startsWith('#')) {
                setBackgroundColor(newBackground);
                setSelectedBackground('');
            } else {
                setSelectedBackground(newBackground);
                setBackgroundColor('');
            }

            // Apply the background
            const result = await applyBackground(newBackground);
            setOutputFileURL(result);
            
        } catch (error) {
            console.error('Error applying background:', error);
            setErrorMsg('Failed to apply background. Please try again.');
            // Revert to original if there's an error
            setOutputFileURL(originalOutputURL);
        } finally {
            setProcessing(false);
        }
    };

    // Add this function to handle file changes
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setInputFile(file);
                setErrorMsg('');
                removeBackgroundLocal(); // Automatically start processing
            } else {
                setErrorMsg('Please select a valid image file.');
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
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </label>
                    ) : (
                        <div className="text-center">
                            <p className="text-lg font-semibold mb-2">{inputFile.name}</p>
                            <button 
                                onClick={() => {
                                    setInputFile(null);
                                    setOutputFileURL('');
                                    setOriginalOutputURL('');
                                    setErrorMsg('');
                                }}
                                className="text-blue-500 hover:text-blue-700 font-medium"
                            >
                                Choose different image
                            </button>
                        </div>
                    )}
                </div>

                {errorMsg && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center">
                        {errorMsg}
                    </div>
                )}

                {processing && (
                    <div className="mt-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Processing...</span>
                            <span className="text-sm font-medium">{progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
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
                    <>
                        {/* Background Selection Section */}
                        <div className="mb-8">
                            <div className="flex gap-4 mb-4 justify-center">
                                <button
                                    onClick={() => setActiveTab('photo')}
                                    className={`px-6 py-2 rounded-full ${
                                        activeTab === 'photo' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                                    }`}
                                >
                                    Photo Background
                                </button>
                                <button
                                    onClick={() => setActiveTab('color')}
                                    className={`px-6 py-2 rounded-full ${
                                        activeTab === 'color' ? 'bg-blue-500 text-white' : 'bg-gray-100'
                                    }`}
                                >
                                    Color Background
                                </button>
                            </div>

                            {activeTab === 'photo' && (
                                <div className="grid grid-cols-3 gap-4">
                                    {backgroundImages.map((bg, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleBackgroundChange(bg)}
                                            className={`cursor-pointer rounded-lg overflow-hidden aspect-video ${
                                                selectedBackground === bg ? 'ring-4 ring-blue-500' : ''
                                            }`}
                                        >
                                            <img
                                                src={bg}
                                                alt={`Background ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'color' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-8 gap-4">
                                        {colorOptions.map((color, index) => (
                                            <div
                                                key={index}
                                                className={`w-12 h-12 rounded-lg cursor-pointer ${
                                                    backgroundColor === color ? 'ring-4 ring-blue-500' : ''
                                                }`}
                                                style={{ backgroundColor: color }}
                                                onClick={() => handleBackgroundChange(color)}
                                            />
                                        ))}
                                    </div>
                                    
                                    <div className="flex items-center justify-center">
                                        <button
                                            onClick={() => setShowColorPicker(!showColorPicker)}
                                            className="bg-white border border-gray-300 rounded-lg px-4 py-2"
                                        >
                                            Custom Color
                                        </button>
                                    </div>
                                    
                                    {showColorPicker && (
                                        <div className="absolute z-10">
                                            <div
                                                className="fixed inset-0"
                                                onClick={() => setShowColorPicker(false)}
                                            />
                                            <ChromePicker
                                                color={backgroundColor}
                                                onChange={(color) => handleBackgroundChange(color.hex)}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Result Section */}
                        <div className="border rounded-2xl p-6 bg-gray-50">
                            <h3 className="text-lg font-semibold mb-4 text-center">Result</h3>
                            <div className="w-full max-w-2xl mx-auto">
                                <ImgComparisonSlider className="rounded-lg">
                                    <img
                                        slot="first"
                                        src={inputFile ? URL.createObjectURL(inputFile) : ''}
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
                    </>
                )}
            </div>
        </div>
    );
}