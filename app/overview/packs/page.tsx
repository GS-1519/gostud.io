import PacksGalleryZone from "@/components/PacksGalleryZone";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { redirect } from "next/navigation";

/**
 * 
 * @returns Removing this code intentionally - we don't use packs on the test mode
 */
// const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";

export default function PacksPage() {
  return (
    <div className="pt-[120px]">
      <h1 className="text-4xl font-bold mb-4">Packs</h1>
      <p className="text-gray-600 mb-8">Choose a pack to start generating images.</p>
      <PacksGalleryZone />
    </div>
  );
}