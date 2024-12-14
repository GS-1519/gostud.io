import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Footer from "@/components/Footer"
import Banner from "@/components/Banner"
import { Star, MapPin, Clock, Camera, Award } from 'lucide-react'

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

interface CityData {
  title: string;
  description: string;
  longDescription: string;
  studios: Studio[];
  features: {
    title: string;
    description: string;
  }[];
}

interface CityDataMap {
  [key: string]: CityData;
}

interface Props {
  params: {
    country: string;
    city: string;
  }
}

const cityData: CityDataMap = {
  yokohama: {
    title: "Top 10 Yokohama Best Professional Headshot Studios",
    description: "Discover the best professional headshot photographers in Yokohama",
    longDescription: "Welcome to Yokohama's premier collection of professional headshot studios. Our curated list features the city's most talented photographers, specializing in corporate headshots, actor portfolios, and professional portraits. Each studio has been carefully selected based on quality, customer satisfaction, and expertise.",
    features: [
      {
        title: "Expert Photographers",
        description: "Skilled professionals with years of experience"
      },
      {
        title: "Modern Equipment",
        description: "State-of-the-art cameras and lighting"
      },
      {
        title: "Prime Locations",
        description: "Conveniently located studios across Yokohama"
      }
    ],
    studios: [
      {
        name: "Studio Sakura",
        rating: 4.9,
        reviews: 128,
        price: "¥15,000",
        image: "/studios/yokohama/studio1.jpg",
        specialties: ["Corporate Headshots", "Actor Headshots", "Professional Portraits"],
        location: "Minato Mirai District",
        description: "Premium headshot studio with stunning city views",
        features: ["Natural Lighting", "Multiple Backdrops", "Professional Makeup"],
        availability: "Mon-Sat: 9AM-6PM"
      },
      {
        name: "Modern Portrait Lab",
        rating: 4.8,
        reviews: 95,
        price: "¥12,000",
        image: "/studios/yokohama/studio2.jpg",
        specialties: ["LinkedIn Photos", "Team Photos", "Executive Portraits"],
        location: "Kannai Area",
        description: "Specialized in modern corporate photography",
        features: ["Quick Turnaround", "Digital Retouching", "Business Casual Setup"],
        availability: "Mon-Fri: 10AM-7PM"
      },
      {
        name: "Creative Shot Studio",
        rating: 4.7,
        reviews: 156,
        price: "¥13,500",
        image: "/studios/yokohama/studio3.jpg",
        specialties: ["Creative Portraits", "Personal Branding", "Social Media"],
        location: "Motomachi District",
        description: "Artistic approach to professional headshots",
        features: ["Unique Style", "Outdoor Options", "Same-Day Delivery"],
        availability: "Tue-Sun: 11AM-8PM"
      }
      // Add more studios as needed
    ]
  },
  tokyo: {
    title: "Top 10 Tokyo Best Professional Headshot Studios",
    description: "Find the perfect headshot photographer in Tokyo",
    longDescription: "Explore Tokyo's finest professional headshot studios...",
    features: [
      // Tokyo features...
    ],
    studios: [
      // Tokyo studios...
    ]
  }
}

export default function CityPage({ params }: Props) {
  const city = params.city.toLowerCase()
  const data = cityData[city]

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA]">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">City Not Found</h1>
          <Link 
            href={`/near-me/${params.country}`}
            className="inline-flex items-center px-6 py-3 bg-[#8371FF] text-white rounded-full hover:bg-[#6F5FF6] transition-colors"
          >
            Back to Cities
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px]">
        <div className="w-full max-w-[1276px] mx-auto space-y-12 py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/near-me" className="hover:text-[#8371FF]">Near Me</Link>
            <span>›</span>
            <Link href={`/near-me/${params.country}`} className="hover:text-[#8371FF] capitalize">
              {params.country}
            </Link>
            <span>›</span>
            <span className="capitalize">{params.city}</span>
          </div>

          {/* Hero Section */}
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold">
              <span className="bg-gradient-to-r from-[#8371FF] to-[#A077FE] bg-clip-text text-transparent">
                {data.title}
              </span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              {data.longDescription}
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {data.features.map((feature) => (
                <div key={feature.title} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Studios List */}
          <div className="space-y-6">
            {data.studios.map((studio, index) => (
              <div 
                key={studio.name}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-1/3">
                    <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image
                        src={studio.image}
                        alt={studio.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{studio.name}</h3>
                        <div className="flex items-center gap-2 text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <p>{studio.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#8371FF]">{studio.price}</div>
                        <div className="text-sm text-gray-600">per session</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-4">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <div className="font-medium">{studio.rating}</div>
                      <div className="text-gray-600">({studio.reviews} reviews)</div>
                    </div>

                    <p className="text-gray-600 mb-4">{studio.description}</p>

                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Clock className="w-4 h-4" />
                      <span>{studio.availability}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {studio.specialties.map((specialty) => (
                        <span 
                          key={specialty}
                          className="px-3 py-1 bg-[#F4F7FA] rounded-full text-sm text-gray-600"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Why Choose Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">
              Why Choose GoStudio in {params.city}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-[#8371FF] text-xl font-bold">Local Expertise</div>
                <p className="text-gray-600">Photographers who know the best spots in {params.city}</p>
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

          <Banner />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export function generateMetadata({ params }: Props): Metadata {
  const city = params.city.charAt(0).toUpperCase() + params.city.slice(1)
  
  return {
    title: `Top 10 ${city} Best Professional Headshot Studios | GoStudio`,
    description: `Discover the best professional headshot photographers in ${city}. Book your session today!`,
    openGraph: {
      title: `Top 10 ${city} Best Professional Headshot Studios`,
      description: `Find the best professional headshot photographers in ${city}`,
      type: 'website',
    }
  }
}