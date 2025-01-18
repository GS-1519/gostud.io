import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Star, MapPin, Clock } from 'lucide-react'
import CountryCarousel from '@/components/CountryCarousel'

interface Studio {
  name: string;
  rating: number;
  reviews: number;
  price: string;
  image: string;
  specialties: string[];
  location: string;
  description: string;
  features: string[];
  availability: string;
}

interface CityTemplateProps {
  pageData: {
    title: string;
    description: string;
    studios: Array<{
      name: string;
      rating: number;
      reviews: number;
      price: string;
      image: string;
      features: string[];
      specialties: string[];
      location: string;
      description: string;
    }>;
  };
}

export default function CityTemplate({ pageData }: CityTemplateProps) {
  return (
    <div>
      <h1 className="text-4xl sm:text-5xl font-bold">
        <span className="bg-gradient-to-r from-[#8371FF] to-[#A077FE] bg-clip-text text-transparent">
          {pageData.title}
        </span>
      </h1>
      {/* Rest of your component */}
    </div>
  );
}
