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

// Add route segment config for caching
export const revalidate = 86400; // 24 hours in seconds
export const fetchCache = 'force-cache';
export const dynamic = 'force-static';

const packsIsEnabled = process.env.NEXT_PUBLIC_TUNE_TYPE === "packs";

export default async function Index() {
  const generatedAt = new Date().toISOString();

  if(!packsIsEnabled) {
    redirect('/overview')
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-gray-100 p-2 text-xs text-gray-600 rounded mb-2">
          Page generated at: {generatedAt}
        </div>
      )}
      <div
        id="train-model-container"
        className="flex flex-1 flex-col gap-2 px-2"
      >
        <Link href="/overview" className="text-sm w-fit">
          <Button variant={"outline"}>
            <FaArrowLeft className="mr-2" />
            Go Back
          </Button>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>Packs Gallery</CardTitle>
            <CardDescription>
              Choose the type of images you would like to create.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <PacksGalleryZone />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}