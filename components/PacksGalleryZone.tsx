'use client'
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';

interface Pack {
  id: string;
  title: string;
  cover_url: string;
  slug: string;
}

export default function PacksGalleryZone() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  const fetchPacks = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<Pack[]>('/astria/packs');
      setPacks(response.data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast({
          title: "Error fetching packs",
          description: err.message,
          duration: 5000,
        });
      } else {
        toast({
          title: "Unknown error",
          description: "An unknown error occurred.",
          duration: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPacks();
  }, []);

  const handlePackSelect = (e: React.MouseEvent, pack: Pack) => {
    e.preventDefault();
    
    try {
      localStorage.setItem('selectedPack', JSON.stringify(pack));
      console.log('Pack saved:', pack);
      
      router.push(`/overview/models/train/${pack.slug}`);
    } catch (error) {
      console.error('Error saving pack to localStorage:', error);
      toast({
        title: "Error",
        description: "Failed to save your selection. Please try again.",
        duration: 5000,
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin mb-4" />
        <p className="mt-4 text-sm text-gray-500">Loading packs...</p>
      </div>
    );
  }

  if (packs.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-lg text-gray-500">No packs available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {packs.map((pack) => (
        <Link 
          href={`/overview/models/train/${pack.slug}`} 
          key={pack.id} 
          className="w-full h-70 bg-black rounded-md overflow-hidden transition-transform duration-300 hover:scale-105"
          onClick={(e) => handlePackSelect(e, pack)}
        >
          <img
            src={pack.cover_url ?? "https://www.astria.ai/assets/logo-b4e21f646fb5879eb91113a70eae015a7413de8920960799acb72c60ad4eaa99.png"}
            alt={pack.title}
            className="w-full h-4/5 object-cover"
          />
          <div className="text-white w-full p-3 text-md font-bold text-center capitalize leading-tight">
            {pack.title}
          </div>
        </Link>
      ))}
      {/* Coming Soon Card */}
      <div className="w-full h-70 rounded-md overflow-hidden transition-transform duration-300 hover:scale-105"
           style={{
             background: 'linear-gradient(180deg, rgba(131, 113, 255, 0.1) 0%, rgba(1, 199, 228, 0.1) 100%)'
           }}>
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-[#8371FF] text-md font-bold text-center leading-tight">
          <div>More Packs</div>
          <div>Coming Soon</div>
          </div>
        </div>
      </div>
    </div>
  );
}