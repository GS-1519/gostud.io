import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Country {
  id: number;
  name: string;
  image: string;
  description: string;
  cities: string;
  link: string;
}

const CountryCard = ({ name, image, description, cities, link }: Country) => {
  return (
    <Link href={link} className="block group">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
        <div className="relative h-[240px]">
          <Image
            src={image}
            alt={`${name} Photography Studios`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            <span className="text-[#8371FF] group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-2">{description}</p>
          <p className="text-xs text-[#8371FF] font-medium">{cities}</p>
        </div>
      </div>
    </Link>
  )
}

const countries: Country[] = [
  {
    id: 1,
    name: "United States",
    image: "/locations/usa.jpg",
    description: "Premium AI-powered headshot studios across major cities",
    cities: "New York • Los Angeles • Chicago • Miami",
    link: "/near-me/united-states"
  },
  {
    id: 2,
    name: "Japan",
    image: "/locations/jpn.jpg",
    description: "Modern AI photography with Japanese precision",
    cities: "Tokyo • Osaka • Kyoto",
    link: "/near-me/japan"
  },
  {
    id: 3,
    name: "Germany",
    image: "/locations/ger.jpg",
    description: "Professional headshots with German engineering",
    cities: "Berlin • Munich • Hamburg",
    link: "/near-me/germany"
  },
  {
    id: 4,
    name: "India",
    image: "/locations/ind.jpg",
    description: "Contemporary portraits with cultural elegance",
    cities: "Mumbai • Delhi • Bangalore",
    link: "/near-me/india"
  }
]

const NearMeHero = () => {
  return (
    <div className="w-full max-w-[1276px] mx-auto">
      <div className="text-center space-y-6 mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
          Discover Professional Headshots
          <br />
          <span className="bg-gradient-to-r from-[#8371FF] to-[#A077FE] bg-clip-text text-transparent">
            Photographers Near Me
          </span>
        </h1>
        
        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
          Experience the perfect blend of professional photography and AI innovation with GoStudio.ai. 
          Our global network of expert photographers delivers exceptional headshots enhanced by 
          cutting-edge AI technology.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="flex items-center px-4 py-2 bg-[#F4F7FA] rounded-full text-gray-600">
            <span className="w-1.5 h-1.5 bg-[#8371FF] rounded-full mr-2"></span>
            AI-Enhanced Quality
          </span>
          <span className="flex items-center px-4 py-2 bg-[#F4F7FA] rounded-full text-gray-600">
            <span className="w-1.5 h-1.5 bg-[#8371FF] rounded-full mr-2"></span>
            Professional Network
          </span>
          <span className="flex items-center px-4 py-2 bg-[#F4F7FA] rounded-full text-gray-600">
            <span className="w-1.5 h-1.5 bg-[#8371FF] rounded-full mr-2"></span>
            Same-Day Delivery
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <CountryCard key={country.id} {...country} />
        ))}
      </div>
    </div>
  )
}

export default NearMeHero