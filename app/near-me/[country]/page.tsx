// app/near-me/[country]/page.tsx

import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Footer from "@/components/Footer"
import Banner from "@/components/Banner"

// Types
interface City {
  name: string;
  population: string;
  image: string;
  description: string;
  link: string;
}

interface CountryData {
  title: string;
  description: string;
  subtitle: string;
  longDescription: string;
  cities: City[];
}

interface CountryDataMap {
  [key: string]: CountryData;
}

interface Props {
  params: {
    country: string;
  }
}

// Country Data
const countryData: CountryDataMap = {
  "united-states": {
    title: "Headshot Photo Studios in United States",
    description: "Discover Professional Headshot Photographers Near United States",
    subtitle: "Professional Headshots in Major US Cities",
    longDescription: "Welcome to the United States' premier network of professional headshot photographers. From New York's corporate excellence to LA's entertainment industry expertise, our photographers deliver exceptional quality across all major cities. Whether you need LinkedIn profiles, actor headshots, or corporate team photos, our AI-enhanced photography ensures perfect results every time.",
    cities: [
      {
        name: "New York",
        population: "8.4M",
        image: "/cities/newyork.jpg",
        description: "New York, the business capital with top corporate headshot studios.",
        link: "/near-me/united-states/new-york"
      },
      {
        name: "Los Angeles",
        population: "3.9M",
        image: "/cities/los-angeles.jpg",
        description: "Los Angeles, where entertainment industry headshots meet professional excellence.",
        link: "/near-me/united-states/los-angeles"
      },
      // Add more US cities...
    ]
  },
  japan: {
    title: "Headshot Photo Studios in Japan",
    description: "Discover Professional Headshot Photographers Near Japan",
    subtitle: "Professional Headshots in Major Japanese Cities",
    longDescription: "Experience Japan's unique blend of traditional aesthetics and modern professional photography. Our network of skilled photographers across major Japanese cities offers premium headshot services for business professionals, actors, and corporate teams. With AI enhancement technology, we deliver exceptional quality while maintaining the efficiency Japan is known for.",
    cities: [
      {
        name: "Tokyo",
        population: "8.3M",
        image: "/cities/tokyo.jpg",
        description: "Tokyo, a city with 8.3M habitants. See the top headshot studios by customers reviews.",
        link: "/near-me/japan/tokyo"
      },
      {
        name: "Yokohama",
        population: "3.8M",
        image: "/cities/yokohama.jpg",
        description: "Yokohama, a city with 3.8M habitants. See the top headshot studios by customers reviews.",
        link: "/near-me/japan/yokohama"
      },
      {
        name: "Osaka",
        population: "2.8M",
        image: "/cities/osaka.jpg",
        description: "Osaka, a city with 2.8M habitants. See the top headshot studios by customers reviews.",
        link: "/near-me/japan/osaka"
      },
      {
        name: "Nagoya",
        population: "2.2M",
        image: "/cities/nagoya.jpg",
        description: "Nagoya, a city with 2.2M habitants. See the top headshot studios by customers reviews.",
        link: "/near-me/japan/nagoya"
      }
    ]
  }
  // Add other countries here
}

export default function CountryPage({ params }: Props) {
  const country = params.country.toLowerCase().replace(' ', '-')
  const data = countryData[country]

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FA]">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Country Not Found</h1>
          <p className="text-gray-600 mb-6">Sorry, we couldn't find information for this country.</p>
          <Link 
            href="/near-me" 
            className="inline-flex items-center px-6 py-3 bg-[#8371FF] text-white rounded-full hover:bg-[#6F5FF6] transition-colors"
          >
            Return to Countries
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
            <span className="capitalize">{country.replace('-', ' ')}</span>
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
          </div>

          {/* Cities Grid */}
          <div>
            <h2 className="text-2xl font-bold mb-6">{data.subtitle}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.cities.map((city) => (
                <Link 
                  href={city.link}
                  key={city.name}
                  className="block group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={city.image}
                      alt={`${city.name} Professional Headshot Studios`}
                      fill
                      className="object-cover transition-transform group-hover:scale-105 duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{city.population} inhabitants</p>
                    <p className="text-sm text-gray-600 mt-2">{city.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Why Choose Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold mb-6">
              Why Choose GoStudio in {country.replace('-', ' ')}?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-[#8371FF] text-xl font-bold">Professional Quality</div>
                <p className="text-gray-600">Expert photographers with years of experience in professional headshots</p>
              </div>
              <div className="space-y-2">
                <div className="text-[#8371FF] text-xl font-bold">AI Enhancement</div>
                <p className="text-gray-600">State-of-the-art AI technology ensures perfect results every time</p>
              </div>
              <div className="space-y-2">
                <div className="text-[#8371FF] text-xl font-bold">Quick Delivery</div>
                <p className="text-gray-600">Same-day delivery available for most headshot sessions</p>
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
  const country = params.country.replace('-', ' ')
  const formattedCountry = country
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `Professional Headshot Studios in ${formattedCountry} | GoStudio`,
    description: `Find the best professional headshot photographers in ${formattedCountry}. Book your session today!`,
    openGraph: {
      title: `Professional Headshot Studios in ${formattedCountry}`,
      description: `Find the best professional headshot photographers in ${formattedCountry}. Premium quality, AI-enhanced headshots.`,
      type: 'website',
    }
  }
}
