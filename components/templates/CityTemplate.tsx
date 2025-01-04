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
  city: string;
  country: string;
  pageData: {
    title: string;
    description: string;
    longDescription: string;
    features: {
      title: string;
      description: string;
    }[];
    studios: Studio[];
  };
  nearbyItems: {
    title: string;
    subtitle: string;
    items: Array<{
      name: string;
      image: string;
      description: string;
      link: string;
    }>;
  };
}

export default function CityTemplate({ city, country, pageData, nearbyItems }: CityTemplateProps) {
  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px]">
        <div className="w-full max-w-[1276px] mx-auto space-y-12 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/near-me" className="hover:text-[#8371FF]">Near Me</Link>
            <span>›</span>
            <Link href={`/near-me/${country}`} className="hover:text-[#8371FF] capitalize">
              {country}
            </Link>
            <span>›</span>
            <span className="capitalize">{city}</span>
          </div>

          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold">
              <span className="bg-gradient-to-r from-[#8371FF] to-[#A077FE] bg-clip-text text-transparent">
                {pageData.title}
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              {pageData.longDescription}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {pageData.features.map((feature) => (
                <div key={feature.title} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Studios List */}
          <div className="space-y-6">
            {pageData.studios.map((studio) => (
              <div 
                key={studio.name}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Image Section */}
                  <div className="relative h-[250px] md:h-full">
                    <Image
                      src={studio.image}
                      alt={studio.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>

                  {/* Info Section */}
                  <div className="p-6 md:col-span-2">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold">{studio.name}</h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#8371FF]">{studio.price}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>★ {studio.rating}</span>
                          <span>({studio.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{studio.description}</p>

                    {/* Specialties */}
                    <div className="mb-4">
                      <div className="font-semibold mb-2">Specialties:</div>
                      <div className="flex flex-wrap gap-2">
                        {studio.specialties.map((specialty, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-[#F4F7FA] rounded-full text-sm"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <div className="font-semibold mb-2">Features:</div>
                      <div className="flex flex-wrap gap-2">
                        {studio.features.map((feature, idx) => (
                          <span 
                            key={idx}
                            className="px-3 py-1 bg-[#F4F7FA] rounded-full text-sm"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Location & Availability */}
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <div>📍 {studio.location}</div>
                      <div>🕒 {studio.availability}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Nearby Items Carousel */}
          <CountryCarousel 
            title={nearbyItems.title}
            subtitle={nearbyItems.subtitle}
            items={nearbyItems.items}
          />

          {/* Why Choose Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">
              Why Choose GoStudio in {city}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-[#8371FF] text-xl font-bold">Local Expertise</div>
                <p className="text-gray-600">Photographers who know the best spots in {city}</p>
              </div>
              <div className="space-y-2">
                <div className="text-[#8371FF] text-xl font-bold">Quality Guaranteed</div>
                <p className="text-gray-600">AI-enhanced photos with perfect results</p>
              </div>
              <div className="space-y-2">
                <div className="text-[#8371FF] text-xl font-bold">Fast Delivery</div>
                <p className="text-gray-600">Get your photos within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
