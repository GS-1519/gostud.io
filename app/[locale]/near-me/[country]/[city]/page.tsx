import { Metadata } from 'next'
import CityTemplate from '@/components/templates/CityTemplate'
import Footer from "@/components/Footer"
import Banner from "@/components/Banner"
import Link from 'next/link'

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
  "new-york": {
    title: "Top 10 New York Best Professional Headshot Studios",
    description: "Discover the best professional headshot photographers in New York",
    longDescription: "Welcome to New York's premier collection of professional headshot studios. Our curated list features the city's most talented photographers, specializing in corporate headshots, actor portfolios, and professional portraits. Each studio has been carefully selected based on quality, customer satisfaction, and expertise.",
    features: [
      {
        title: "Expert Photographers",
        description: "Award-winning photographers with decades of experience"
      },
      {
        title: "Prime Locations",
        description: "Conveniently located studios across Manhattan"
      },
      {
        title: "Industry Standard",
        description: "State-of-the-art equipment and techniques"
      }
    ],
    studios: [
      {
        name: "Manhattan Headshots",
        rating: 4.9,
        reviews: 285,
        price: "$299",
        image: "/studios/new-york/studio1.jpg",
        specialties: ["Corporate Headshots", "Actor Headshots", "Model Portfolios"],
        location: "Midtown Manhattan",
        description: "Premium headshot studio in the heart of NYC",
        features: ["Natural Lighting", "Multiple Backdrops", "Professional Makeup"],
        availability: "Mon-Sat: 9AM-7PM"
      },
      {
        name: "Broadway Portraits",
        rating: 4.8,
        reviews: 173,
        price: "$249",
        image: "/studios/new-york/studio2.jpg",
        specialties: ["Theater Headshots", "Commercial Portraits", "Professional Headshots"],
        location: "Theater District",
        description: "Specialized in theatrical and commercial headshots",
        features: ["Theater Lighting", "Quick Turnaround", "Retouching Included"],
        availability: "Tue-Sun: 10AM-8PM"
      },
      {
        name: "Wall Street Studios",
        rating: 4.9,
        reviews: 156,
        price: "$349",
        image: "/studios/new-york/studio3.jpg",
        specialties: ["Executive Portraits", "LinkedIn Photos", "Team Photos"],
        location: "Financial District",
        description: "Corporate headshot specialists",
        features: ["Corporate Setting", "Same-Day Delivery", "Group Discounts"],
        availability: "Mon-Fri: 8AM-6PM"
      }
    ]
  },
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

  const nearbyItems = {
    title: `Other cities close to ${city}`,
    subtitle: `Discover more Headshot Photographers in cities near ${city}`,
    items: [/* Your nearby cities data */]
  }

  return (
    <>
      <CityTemplate
        city={params.city}
        country={params.country}
        pageData={data}
        nearbyItems={nearbyItems}
      />
      <Banner />
      <Footer />
    </>
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