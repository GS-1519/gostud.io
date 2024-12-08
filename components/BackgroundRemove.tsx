"use client";
import { useState, useRef, useEffect } from "react";
import { Upload, Image as ImageIcon, Download, Plus } from "lucide-react";
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import { removeBackground } from "@imgly/background-removal";
import { HexColorPicker } from "react-colorful";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const backgroundImages = [
    {
        src: '/remove-bg/bg1.jpg',
        alt: 'Office Background',
        preload: true
    },
    {
        src: '/remove-bg/bg2.jpg',
        alt: 'Studio Background',
        preload: true
    },
    {
        src: '/remove-bg/bg3.jpg',
        alt: 'Natural Background',
        preload: true
    },
    {
        src: '/remove-bg/bg4.jpg',
        alt: 'Modern Background',
        preload: true
    },
    {
        src: '/remove-bg/bg5.jpg',
        alt: 'Clean Background',
        preload: true
    },
    {
        src: '/remove-bg/bg6.jpg',
        alt: 'Professional Background',
        preload: true
    }
];

const predefinedColors = [
    "#FFFFFF", // White
    "#000000", // Black
    "#0066CC", // Blue
    "#4CAF50", // Green
    "#FF5722", // Orange
    "#9C27B0", // Purple
    "#F44336", // Red
    "#607D8B"  // Gray
];

export default function BackgroundRemove() {
    const [inputFile, setInputFile] = useState<File | null>(null);
    const [outputFileURL, setOutputFileURL] = useState<string>("");
    const [originalOutputURL, setOriginalOutputURL] = useState<string>("");
    const [processing, setProcessing] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [progress, setProgress] = useState<number>(0);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#FFFFFF");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Preload background images
        backgroundImages.forEach(bg => {
            if (bg.preload) {
                const img = new Image();
                img.src = bg.src;
            }
        });
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.type.startsWith('image/')) {
                setInputFile(file);
                setErrorMsg('');
                removeBackgroundLocal(file);
            } else {
                setErrorMsg('Please select a valid image file.');
            }
        }
    };

    async function removeBackgroundLocal(file: File) {
        setProcessing(true);
        setErrorMsg("");
        setProgress(0);
        
        try {
            const imageData = await new Response(file).blob();
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
            setOriginalOutputURL(url);
            setOutputFileURL(url);
        } catch (error) {
            setErrorMsg("Error removing background. Please try again.");
            console.error("Error removing background:", error);
        }
        setProcessing(false);
    }

    const applyBackground = async (background: string) => {
        if (!originalOutputURL) return;
        setProcessing(true);

        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            const foregroundImg = new Image();
            foregroundImg.src = originalOutputURL;

            await new Promise((resolve) => {
                foregroundImg.onload = async () => {
                    canvas.width = foregroundImg.width;
                    canvas.height = foregroundImg.height;

                    if (background.startsWith('#')) {
                        // For color backgrounds
                        ctx!.fillStyle = background;
                        ctx!.fillRect(0, 0, canvas.width, canvas.height);
                        ctx!.drawImage(foregroundImg, 0, 0);
                        const newUrl = canvas.toDataURL('image/png');
                        setOutputFileURL(newUrl);
                        resolve(true);
                    } else {
                        // For image backgrounds
                        const bgImg = new Image();
                        bgImg.crossOrigin = "anonymous";
                        bgImg.src = background;
                        
                        bgImg.onload = () => {
                            ctx!.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
                            ctx!.drawImage(foregroundImg, 0, 0);
                            const newUrl = canvas.toDataURL('image/png');
                            setOutputFileURL(newUrl);
                            resolve(true);
                        };
                        
                        bgImg.onerror = () => {
                            console.error('Error loading background image');
                            resolve(true);
                        };
                    }
                };
            });
        } catch (error) {
            console.error('Error applying background:', error);
        } finally {
            setProcessing(false);
        }
    };

    const handleReset = () => {
        setInputFile(null);
        setOutputFileURL('');
        setProgress(0);
        setProcessing(false);
        setErrorMsg('');
    };

    const handleImageUpload = async (file: File) => {
        setInputFile(file);
        setProcessing(true);
        setProgress(0);
        
        try {
            const result = await removeBackground(file, {
                progress: (progress) => {
                    setProgress(Math.round(Number(progress) * 100));
                },
            });
            
            const url = URL.createObjectURL(result);
            setOutputFileURL(url);
        } catch (error) {
            setErrorMsg('Error processing image. Please try again.');
            console.error('Error:', error);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="w-full max-w-[1400px] mx-auto p-8">
            {!outputFileURL ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 relative">
                    <div className="max-w-xl mx-auto text-center">
                        <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-200">
                            <label className="cursor-pointer block">
                                <div className="flex flex-col items-center justify-center p-10">
                                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                                        <Upload className="w-8 h-8 text-blue-500" />
                                    </div>
                                    <p className="text-lg font-semibold text-gray-700 mb-2">
                                        Click to Select or Drag and Drop
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Supported formats: PNG, JPG, JPEG
                                    </p>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                </div>
                            </label>
                        </div>

                        {processing && (
                            <div className="mt-8 max-w-md mx-auto">
                                <div className="space-y-4">
                                    <div className="flex justify-between text-base font-medium text-gray-700">
                                        <span>Processing image...</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div 
                                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-[30%] border-r border-gray-100">
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-6">
                                    <ImageIcon size={20} className="text-gray-600" />
                                    <h3 className="text-gray-700 font-medium">Select background</h3>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm text-gray-500 mb-3">Colors</h4>
                                        <div className="grid grid-cols-4 gap-2">
                                            {predefinedColors.map((color, index) => (
                                                <div
                                                    key={`color-${index}`}
                                                    onClick={() => applyBackground(color)}
                                                    className="aspect-square rounded-lg cursor-pointer hover:ring-2 hover:ring-blue-600 transition-all"
                                                    style={{ backgroundColor: color }}
                                                />
                                            ))}
                                            <button
                                                onClick={() => setShowColorPicker(!showColorPicker)}
                                                className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-600 transition-all flex items-center justify-center"
                                            >
                                                <Plus size={20} className="text-gray-400" />
                                            </button>
                                        </div>
                                        
                                        {showColorPicker && (
                                            <div className="mt-3 p-3 bg-white border border-gray-200 rounded-xl shadow-lg">
                                                <HexColorPicker
                                                    color={selectedColor}
                                                    onChange={(color) => {
                                                        setSelectedColor(color);
                                                        applyBackground(color);
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <h4 className="text-sm text-gray-500 mb-3">Background Images</h4>
                                        <div className="grid grid-cols-2 gap-2 max-h-[500px] overflow-y-auto pr-2">
                                            {backgroundImages.map((bg, index) => (
                                                <div
                                                    key={`bg-${index}`}
                                                    onClick={() => !processing && applyBackground(bg.src)}
                                                    className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-600 transition-all"
                                                >
                                                    <img
                                                        src={bg.src}
                                                        alt={bg.alt}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-[70%] p-6">
                           
                            <div className="bg-[#f8fafc] rounded-xl flex items-center justify-center min-h-[500px] p-4 relative">
                                {processing ? (
                                    <div className="max-w-md w-full p-6">
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-base font-medium text-gray-700">
                                                <span>Processing image...</span>
                                                <span>{progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div 
                                                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                                    style={{ width: `${progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <ImgComparisonSlider
                                        className="max-w-[600px] w-full rounded-lg shadow-sm"
                                        hover={true}
                                        direction="horizontal"
                                    >
                                        <img
                                            slot="first"
                                            src={inputFile ? URL.createObjectURL(inputFile) : ''}
                                            alt="Original"
                                            className="max-h-[600px] w-full object-contain bg-white"
                                            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                                        />
                                        <img
                                            slot="second"
                                            src={outputFileURL}
                                            alt="Background Removed"
                                            className="max-h-[600px] w-full object-contain bg-white"
                                            style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                                        />
                                    </ImgComparisonSlider>
                                )}
                            </div>

                            <div className="mt-6 flex justify-center gap-4">
                                <a
                                    href={outputFileURL}
                                    download="removed-background.png"
                                    className="flex items-center justify-center gap-2 bg-[#00A693] hover:bg-[#008577] text-white px-8 py-2.5 rounded-lg font-medium transition-all w-full max-w-xs"
                                >
                                    <Download size={18} />
                                    Download
                                </a>
                                <button
                                    onClick={handleReset}
                                    className="flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white px-8 py-2.5 rounded-lg font-medium transition-all w-full max-w-xs"
                                >
                                    Remove Another
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {errorMsg && (
                <div className="absolute bottom-6 right-6 bg-red-50 text-red-600 px-6 py-4 rounded-xl shadow-lg">
                    {errorMsg}
                </div>
            )}
        </div>
    );
}