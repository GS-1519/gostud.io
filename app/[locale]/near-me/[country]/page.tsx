// app/near-me/[country]/page.tsx

import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Footer from "@/components/Footer"
import Banner from "@/components/Banner"
import WhySection from '@/components/Why'

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

// US Cities Data
const usaCities: City[] = [
  {
    name: "New York",
    population: "8.8M",
    image: "/cities/new-york.jpg",
    description: "New York, a city with 8.8M habitants. See the top headshot studios by customers reviews.",
    link: "/near-me/united-states/new-york"
  },
  {
    name: "Los Angeles",
    population: "3.9M",
    image: "/cities/los-angeles.jpg",
    description: "Los Angeles, a city with 3.9M habitants. See the top headshot studios by customers reviews.",
    link: "/near-me/united-states/los-angeles"
  },
  {
    name: "Chicago",
    population: "2.7M",
    image: "/cities/chicago.jpg",
    description: "Chicago, a city with 2.7M habitants. See the top headshot studios by customers reviews.",
    link: "/near-me/united-states/chicago"
  },
  {
    name: "Brooklyn",
    population: "2.7M",
    image: "/cities/brooklyn.jpg",
    description: "Brooklyn, a city with 2.7M habitants. See the top headshot studios by customers reviews.",
    link: "/near-me/united-states/brooklyn"
  },
  {
    name: "Houston",
    population: "2.3M",
    image: "/cities/houston.jpg",
    description: "Houston, a city with 2.3M habitants. See the top headshot studios by customers reviews.",
    link: "/near-me/united-states/houston"
  },
  {
    name: "Queens",
    population: "2.3M",
    image: "/cities/queens.jpg",
    description: "Queens, a city with 2.3M habitants. See the top headshot studios by customers reviews.",
    link: "/near-me/united-states/queens"
  },
  {
    name: "Phoenix",
    population: "1.6M",
    image: "/cities/phoenix.jpg",
    description: "Phoenix, a city with 1.6M habitants. See the top headshot studios by customers reviews.",
    link: "/near-me/united-states/phoenix"
  },
  {
    name: "Philadelphia",
    population: "1.6M",
    image: "/cities/philadelphia.jpg",
    description: "Philadelphia, a city with 1.6M habitants. See the top headshot studios by customers reviews.",
    link: "/near-me/united-states/philadelphia"
  }
];



// Nearby Countries Data Structure
interface NearbyCountry {
  name: string;
  image: string;
  description: string;
  link: string;
}

// All countries in one place
const countryRelations: { [key: string]: NearbyCountry[] } = {
  'united-states': [
    {
      name: "Mexico",
      image: "/countries/mexico.jpg",
      description: "Mexico, a country renowned for its vibrant culture, breathtaking landscapes, and warm-hearted people. Whether you're a...",
      link: "/near-me/mexico"
    },
    {
      name: "Canada",
      image: "/countries/canada.jpg",
      description: "Discover top headshot photographers in Canada",
      link: "/near-me/canada"
    },
    {
      name: "Brazil",
      image: "/countries/brazil.jpg",
      description: "Brazil, a vibrant country brimming with diverse landscapes, rich culture, and warm-hearted people. Whether you're a professional.....",
      link: "/near-me/brazil"
    },
    {
      name: "United Kingdom",
      image: "/countries/uk.jpg",
      description: "Find professional headshot studios in the UK",
      link: "/near-me/united-kingdom"
    },
    {
      name: "Australia",
      image: "/countries/australia.jpg",
      description: "Explore professional headshot services across Australia's vibrant cities...",
      link: "/near-me/australia"
    },
    {
      name: "France",
      image: "/countries/france.jpg",
      description: "Discover elegant headshot photography in the heart of Europe...",
      link: "/near-me/france"
    }
  ],
  // Add more country relations...
}

// Single Carousel Component
const CountryCarousel = ({ country }: { country: string }) => {
  const nearbyCountries = countryRelations[country] || []

  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <span className="text-[#8371FF] text-lg">
          Discover more Headshot Photographers in countries near {country.replace('-', ' ')}
        </span>
        <h2 className="text-3xl font-bold mt-4">
          Other countries close to {country.replace('-', ' ')}
        </h2>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
        {nearbyCountries.map((nearCountry, index) => (
          <Link
            key={index}
            href={nearCountry.link}
            className="flex-shrink-0 w-[300px] group"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative h-[200px]">
                <Image
                  src={nearCountry.image}
                  alt={`${nearCountry.name} Photography`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{nearCountry.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{nearCountry.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function CountryPage({ params }: Props) {
  const country = params.country.toLowerCase().replace(' ', '-')
  const data = countryData[country]
  const nearbyCountries = countryRelations[country] || []

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

          {/* City Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {usaCities.map((city, index) => (
              <Link 
                key={index}
                href={city.link}
                className="block group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={city.image}
                    alt={`${city.name} Headshot Studios`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{city.name}</h3>
                  <p className="text-gray-600 text-sm">{city.description}</p>
                </div>
              </Link>
            ))}
          </div>
                   {/* Why Choose Section */}
          <WhySection country={params.country.replace('-', ' ')} />

          {/* Similar Countries Carousel */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Explore Nearby Countries</h2>
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
              {countryRelations[country] && countryRelations[country].map((country, index) => (
                <Link
                  key={index}
                  href={country.link}
                  className="flex-shrink-0 w-72 group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="relative h-40">
                      <Image
                        src={country.image}
                        alt={country.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-1">{country.name}</h3>
                      <p className="text-gray-600 text-sm">{country.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Only Carousel Section */}
        
          {/* Blog Section */}
          <div className="mt-24">
            <div className="text-center">
              <span className="text-[#8371FF] text-lg">Headshot Photography Blogs</span>
              <h2 className="text-3xl font-bold mt-4 mb-12">
                Read more about headshot photography
              </h2>
            </div>
            {/* Add your blog cards here */}
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
