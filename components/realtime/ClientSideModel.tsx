"use client";

import { Icons } from "@/components/icons";
import { Database } from "@/types/supabase";
import { imageRow, modelRow, sampleRow } from "@/types/utils";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Badge } from "../ui/badge";
import { Download } from 'lucide-react';

export const revalidate = 0;

type ClientSideModelProps = {
  serverModel: modelRow;
  serverImages: imageRow[];
  samples: sampleRow[];
};

export default function ClientSideModel({
  serverModel,
  serverImages,
  samples,
}: ClientSideModelProps) {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  const [model, setModel] = useState<modelRow>(serverModel);

  useEffect(() => {
    const channel = supabase
      .channel("realtime-model")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "models" },
        (payload: { new: modelRow }) => {
          setModel(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, model, setModel]);

  const handleDownload = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `headshot-${Date.now()}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div id="train-model-container" className="w-full h-full bg-white p-6">
      <div className="flex flex-col w-full gap-12">
        <div className="flex flex-col lg:flex-row">
          {samples && (
            <div className="flex w-full lg:w-1/2 flex-col gap-4 lg:pr-8">
              <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-semibold text-gray-900">Training Data</h2>
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  {samples.length} images
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {samples.map((sample) => (
                  <div key={sample.id} className="relative aspect-square group">
                    <img
                      src={sample.uri}
                      className="rounded-2xl w-full h-full object-cover shadow-sm transition-transform duration-200 group-hover:shadow-md"
                      alt="Training sample"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="hidden lg:block w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent mx-8" />

          <div className="flex flex-col w-full lg:w-1/2 lg:pl-8 mt-8 lg:mt-0">
            {model.status === "finished" && (
              <div className="flex flex-1 flex-col gap-4">
                <div className="flex items-center gap-2 mb-4">
                  <h1 className="text-2xl font-semibold text-gray-900">Results</h1>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                    {serverImages?.length} generated
                  </Badge>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {serverImages?.map((image) => (
                    <div 
                      key={image.id} 
                      className="relative group aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <img
                        src={image.uri}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                        alt="Generated headshot"
                      />
                      <button
                        onClick={() => handleDownload(image.uri)}
                        className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 shadow-lg backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:shadow-xl"
                        title="Download image"
                      >
                        <Download className="w-5 h-5 text-gray-700" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
