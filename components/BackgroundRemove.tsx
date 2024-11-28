"use client";
import { useState, useRef, useEffect } from "react";
import { Upload, Image as ImageIcon, Download } from "lucide-react";
import { removeBackground } from '@imgly/background-removal'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { HexColorPicker } from "react-colorful";
import { ImgComparisonSlider } from '@img-comparison-slider/react';
import 'react-tabs/style/react-tabs.css';
// First, define the background images with proper paths
const backgroundImages = [
    {
        thumb: '/remove-bg/bg1.jpg',
        full: '/remove-bg/bg1.jpg',
        alt: 'Brick wall texture'
    },
    {
        thumb: '/remove-bg/bg2.jpg',
        full: '/remove-bg/bg2.jpg',
        alt: 'Pink gradient'
    },
    {
        thumb: '/remove-bg/bg3.jpg',
        full: '/remove-bg/bg3.jpg',
        alt: 'Modern office'
    },
    {
        thumb: '/remove-bg/bg4.jpg',
        full: '/remove-bg/bg4.jpg',
        alt: 'Tropical beach'
    },
    {
        thumb: '/remove-bg/bg5.jpg',
        full: '/remove-bg/bg5.jpg',
        alt: 'Architecture'
    },
   
   
];

export default function BackgroundRemove() {
    const [inputFile, setInputFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [outputFileURL, setOutputFileURL] = useState<string>("");
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [showEditor, setShowEditor] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const transparentImageRef = useRef<string | null>(null);

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setInputFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            await processImage(file);
        }
    };

    const processImage = async (file: File) => {
        setProcessing(true);
        try {
            const imageData = await new Response(file).blob();
            const blob = await removeBackground(imageData, {
                progress: (key: string, current: number, total: number) => {
                    setProgress(Math.round((current / total) * 100));
                }
            });
            const url = URL.createObjectURL(blob);
            transparentImageRef.current = url;
            setOutputFileURL(url);
            setShowEditor(true);
        } catch (error) {
            console.error("Error removing background:", error);
        }
        setProcessing(false);
    };

    const handleBackgroundChange = async (background: string) => {
        if (!transparentImageRef.current) return;

        try {
            const img = new Image();
            img.src = transparentImageRef.current;
            
            await new Promise((resolve) => {
                img.onload = resolve;
            });

            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            
            if (ctx) {
                if (background.startsWith('blob:') || background.startsWith('data:')) {
                    // Handle custom uploaded background
                    const bgImg = new Image();
                    bgImg.src = background;
                    await new Promise((resolve) => {
                        bgImg.onload = resolve;
                    });
                    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
                } else if (background.startsWith('#')) {
                    // Handle color background
                    ctx.fillStyle = background;
                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                } else {
                    // Handle preset background images
                    const bgImg = new Image();
                    bgImg.src = background;
                    await new Promise((resolve) => {
                        bgImg.onload = resolve;
                    });
                    ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);
                }
                
                // Draw the transparent image
                ctx.drawImage(img, 0, 0);
                setOutputFileURL(canvas.toDataURL('image/png'));
            }
        } catch (error) {
            console.error('Error changing background:', error);
        }
    };

    const CustomBackgroundButton = () => {
        const fileInputRef = useRef<HTMLInputElement>(null);

        const handleCustomBackgroundSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0];
            if (file) {
                // Check if file is an image
                if (!file.type.startsWith('image/')) {
                    alert('Please select an image file');
                    return;
                }
                
                const url = URL.createObjectURL(file);
                handleBackgroundChange(url);

                // Clean up the object URL when done
                return () => URL.revokeObjectURL(url);
            }
        };

        return (
            <div className="relative aspect-square rounded-lg">
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full h-full border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors flex items-center justify-center"
                    aria-label="Upload custom background"
                >
                    <svg 
                        className="w-8 h-8 text-gray-400" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 4v16m8-8H4" 
                        />
                    </svg>
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCustomBackgroundSelect}
                    className="hidden"
                    onClick={(e) => {
                        // Reset the input value to allow selecting the same file again
                        (e.target as HTMLInputElement).value = '';
                    }}
                />
            </div>
        );
    };

    // Add new function for handling focus
    const handleImageFocus = (e: React.MouseEvent<HTMLImageElement>) => {
        const element = e.currentTarget;
        const comparisonSlider = element.closest('img-comparison-slider');
        
        if (comparisonSlider) {
            comparisonSlider.setAttribute('style', 'outline: 2px solid #5B16FE; outline-offset: 2px;');
            
            document.addEventListener('click', (event) => {
                if (!comparisonSlider.contains(event.target as Node)) {
                    comparisonSlider.setAttribute('style', 'outline: none; outline-offset: 0;');
                }
            }, { once: true });
        }
    };

    // Add keyboard navigation handler
    const handleKeyboardNavigation = (e: React.KeyboardEvent<HTMLDivElement>) => {
        const slider = e.currentTarget.querySelector('img-comparison-slider');
        if (!slider) return;

        switch (e.key) {
            case 'ArrowLeft':
                slider.setAttribute('value', Math.max(0, parseFloat(slider.getAttribute('value') || '50') - 5).toString());
                break;
            case 'ArrowRight':
                slider.setAttribute('value', Math.min(100, parseFloat(slider.getAttribute('value') || '50') + 5).toString());
                break;
        }
    };

    // Update your existing comparison slider render function
    const renderComparisonResult = () => {
        if (!outputFileURL) return null;
        
        return (
            <div className="mt-4">
                <ImgComparisonSlider className="rounded-lg">
                    <img
                        slot="first"
                        src={previewUrl}
                        alt="Original"
                        className="max-h-96 shadow-sm rounded-lg"
                    />
                    <img
                        slot="second"
                        src={outputFileURL}
                        alt="Processed"
                        className="max-h-96 shadow-sm rounded-lg"
                    />
                </ImgComparisonSlider>
            </div>
        );
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4">
            {!showEditor ? (
                <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
                    onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleFileChange({ target: { files: [file] } } as any);
                    }}
                    onDragOver={(e) => e.preventDefault()}
                >
                    <div className="space-y-4">
                        <div className="flex justify-center">
                            <ImageIcon className="w-16 h-16 text-gray-400" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-gray-600">Drag and drop your image here, or</p>
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Choose File
                            </button>
                        </div>
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <Tabs>
                        <TabList className="flex gap-4 mb-4">
                            <Tab className="px-4 py-2 cursor-pointer rounded-lg bg-gray-100">Photo</Tab>
                            <Tab className="px-4 py-2 cursor-pointer rounded-lg bg-gray-100">Color</Tab>
                        </TabList>

                        <TabPanel>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 p-4">
                                <CustomBackgroundButton />
                                {backgroundImages.map((bg, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleBackgroundChange(bg.full)}
                                        className="relative w-full aspect-square rounded-lg overflow-hidden hover:ring-2 hover:ring-blue-500 transition-all bg-gray-100"
                                    >
                                        <img 
                                            src={bg.thumb} 
                                            alt={bg.alt}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </TabPanel>

                        <TabPanel>
                            <div className="space-y-4">
                                <HexColorPicker onChange={handleBackgroundChange} />
                                <div className="grid grid-cols-6 gap-2">
                                    {['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff', '#ffff00'].map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => handleBackgroundChange(color)}
                                            className="w-12 h-12 rounded-lg border hover:opacity-80"
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </TabPanel>
                    </Tabs>

                    <div className="mt-4">
                        <img src={outputFileURL} alt="Result" className="w-full rounded-lg" />
                        <div className="flex justify-end mt-4">
                            <a
                                href={outputFileURL}
                                download="removed-background.png"
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Download Result
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {processing && (
                <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <p className="text-center mt-2 text-gray-600">
                        Processing... {progress}%
                    </p>
                </div>
            )}

            {outputFileURL && (
                <div className="space-y-4">
                    {renderComparisonResult()}
                    <a
                        href={outputFileURL}
                        download="removed-background.png"
                        className="block w-full text-center bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
                    >
                        <Download className="w-4 h-4 inline mr-2" />
                        Download Result
                    </a>
                </div>
            )}
        </div>
    );
}