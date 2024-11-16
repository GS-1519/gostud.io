'use client'
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import Link from "next/link";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface Cost {
  cost: number;
  num_images: number;
}

interface Costs {
  man?: Cost;
  woman?: Cost;
  boy?: Cost;
  girl?: Cost;
  dog?: Cost;
  cat?: Cost;
}

interface Pack {
  id: number;
  slug: string;
  title: string;
  cover_url: string;
  costs: Costs;
}

const groupPacksByCategory = (packs: Pack[]) => {
  const groups: { [key: string]: Pack[] } = {
    adults: [],
    children: [],
    pets: []
  };

  packs.forEach(pack => {
    if (pack.costs.man || pack.costs.woman) {
      groups.adults.push(pack);
    }
    if (pack.costs.boy || pack.costs.girl) {
      groups.children.push(pack);
    }
    if (pack.costs.dog || pack.costs.cat) {
      groups.pets.push(pack);
    }
  });

  return groups;
};

export default function PacksGalleryZone() {
  const [packs, setPacks] = useState<Pack[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({
    adults: true,
    children: true,
    pets: true
  });

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

  const groupedPacks = groupPacksByCategory(packs);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
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

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'adults':
        return 'Professional & Lifestyle Packs';
      case 'children':
        return 'Children Packs';
      case 'pets':
        return 'Pet Packs';
      default:
        return `${category} Packs`;
    }
  };

  return (
    <div className="space-y-8">
      {Object.entries(groupedPacks).map(([category, categoryPacks]) => 
        categoryPacks.length > 0 && (
          <div key={category} className="space-y-4">
            <button 
              onClick={() => toggleSection(category)}
              className="w-full flex items-center justify-between text-xl font-bold py-2 hover:bg-gray-50 rounded-lg transition-colors duration-200"
            >
              <h2>{getCategoryTitle(category)}</h2>
              <span className="text-gray-500">
                {expandedSections[category] ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </span>
            </button>
            
            {expandedSections[category] && (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 transition-all duration-300">
                {categoryPacks.map((pack) => (
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
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
}