"use client";
import { useState, useRef } from "react";
import { Download, UploadIcon } from "lucide-react";

export default function BackgroundRemoverNode(): JSX.Element {
    const [inputFile, setInputFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [outputFileURL, setOutputFileURL] = useState<string>("");
    const [processing, setProcessing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [currentStatus, setCurrentStatus] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (!file.type.match(/^image\/(jpeg|png|jpg)$/)) {
                setErrorMsg("Please upload a valid JPG or PNG image");
                return;
            }
            setInputFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
            setErrorMsg("");
        }
    };

    async function removeBackgroundServer(): Promise<void> {
        if (!inputFile) return;

        setProcessing(true);
        setErrorMsg("");
        setOutputFileURL("");
        setProgress(0);
        setCurrentStatus("Processing...");

        try {
            const formData = new FormData();
            formData.append('file', inputFile);
            formData.append('quality', '100');
            formData.append('model', 'isnet-general-use');
            formData.append('format', 'png');

            const response = await fetch('/api/remove-bg-node', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to process image');
            }

            const data = await response.json();
            if (data.success && data.data) {
                setOutputFileURL(data.data);
                setProgress(100);
                setCurrentStatus("Done!");
            } else {
                throw new Error(data.error || 'Failed to process image');
            }
        } catch (error) {
            setErrorMsg("Error removing background. Please try again.");
            console.error("Error:", error);
        } finally {
            setProcessing(false);
        }
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <div className="space-y-4">
                <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
                    onClick={() => fileInputRef.current?.click()}
                >
                    {!previewUrl ? (
                        <div className="space-y-4">
                            <UploadIcon className="w-12 h-12 mx-auto text-gray-400" />
                            <p>Click or drag image here</p>
                        </div>
                    ) : (
                        <img 
                            src={previewUrl} 
                            alt="Preview" 
                            className="max-h-[300px] mx-auto"
                        />
                    )}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/jpg"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                {previewUrl && (
                    <button
                        onClick={removeBackgroundServer}
                        disabled={processing}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                    >
                        {processing ? currentStatus : "Remove Background"}
                    </button>
                )}

                {errorMsg && (
                    <div className="text-red-500 text-center">
                        {errorMsg}
                    </div>
                )}

                {outputFileURL && (
                    <div className="space-y-4">
                        <img 
                            src={outputFileURL} 
                            alt="Result" 
                            className="max-h-[300px] mx-auto"
                        />
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
        </div>
    );
}