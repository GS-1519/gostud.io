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
import { useTranslations } from 'next-intl';

/**
 * 
 * @returns Removing this code intentionally - we don't use packs on the test mode
 */
// const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";

export default function PacksPage() {
  const t = useTranslations('packs');

  return (
    <div className="pt-[40px] px-6 max-w-[1200px] mx-auto w-full">
      <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
      <p className="text-gray-600 mb-8">{t('description')}</p>
      <PacksGalleryZone />
    </div>
  );
}