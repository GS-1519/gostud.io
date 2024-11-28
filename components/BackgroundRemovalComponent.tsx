"use client";
import { useState } from "react";
import { removeBackground } from '@imgly/background-removal';
import { Download } from "lucide-react";

const BackgroundRemovalComponent = () => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [outputFileURL, setOutputFileURL] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRemoveBackground = async (file: File) => {
    setProcessing(true);
    setErrorMsg("");
    setProgress(0);
    
    try {
      const blob = await removeBackground(file, {
        progress: (key: string, current: number, total: number) => {
          setProgress(Math.round((current / total) * 100));
        }
      });
      const url = URL.createObjectURL(blob);
      setOutputFileURL(url);
      return url;
    } catch (error) {
      console.error("Error removing background:", error);
      setErrorMsg("Error processing image. Please try again.");
      throw error;
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-4">
      {processing && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center mt-2 text-gray-600">
            Processing... {progress}%
          </p>
        </div>
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
  );
};

export default BackgroundRemovalComponent;