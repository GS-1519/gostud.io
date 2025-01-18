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
  },
  {
    id: 5,
    name: "United Kingdom",
    image: "/locations/uk.jpg",
    description: "Timeless elegance and dynamic cityscapes for professional headshots",
    cities: "London • Manchester • Edinburgh • Birmingham",
    link: "/near-me/united-kingdom"
  },
  {
    id: 6,
    name: "France",
    image: "/locations/fra.jpg",
    description: "Where art, culture, and beauty converge for perfect headshots",
    cities: "Paris • Lyon • Marseille • Nice",
    link: "/near-me/france"
  },
  {
    id: 7,
    name: "Canada",
    image: "/locations/can.jpg",
    description: "Stunning landscapes and diverse culture for professional portraits",
    cities: "Toronto • Vancouver • Montreal • Calgary",
    link: "/near-me/canada"
  },
  {
    id: 8,
    name: "Italy",
    image: "/locations/ita.jpg",
    description: "Timeless beauty and artistic inspiration for perfect portraits",
    cities: "Rome • Milan • Venice • Florence",
    link: "/near-me/italy"
  },
  {
    id: 9,
    name: "Australia",
    image: "/locations/aus.jpg",
    description: "Vibrant urban scenes and natural beauty for professional photography",
    cities: "Sydney • Melbourne • Brisbane • Perth",
    link: "/near-me/australia"
  },
  {
    id: 10,
    name: "South Korea",
    image: "/locations/kor.jpg",
    description: "Cutting-edge technology meets traditional aesthetics",
    cities: "Seoul • Busan • Incheon • Daegu",
    link: "/near-me/south-korea"
  },
  {
    id: 11,
    name: "Spain",
    image: "/locations/esp.jpg",
    description: "Passionate culture and architectural wonders for stunning portraits",
    cities: "Madrid • Barcelona • Valencia • Seville",
    link: "/near-me/spain"
  },
  {
    id: 12,
    name: "Singapore",
    image: "/locations/sgp.jpg",
    description: "Modern sophistication with multicultural charm",
    cities: "Marina Bay • Orchard • Jurong • Tampines",
    link: "/near-me/singapore"
  },
  {
    id: 13,
    name: "Netherlands",
    image: "/locations/nld.jpg",
    description: "Historic charm meets contemporary innovation",
    cities: "Amsterdam • Rotterdam • The Hague • Utrecht",
    link: "/near-me/netherlands"
  },
  {
    id: 14,
    name: "Brazil",
    image: "/locations/bra.jpg",
    description: "Vibrant culture and dynamic urban landscapes",
    cities: "São Paulo • Rio de Janeiro • Brasília • Salvador",
    link: "/near-me/brazil"
  },
  {
    id: 15,
    name: "UAE",
    image: "/locations/uae.jpg",
    description: "Luxurious settings and futuristic architecture",
    cities: "Dubai • Abu Dhabi • Sharjah • Ajman",
    link: "/near-me/uae"
  },
  {
    id: 16,
    name: "Switzerland",
    image: "/locations/che.jpg",
    description: "Precision and elegance amid stunning Alpine backdrops",
    cities: "Zurich • Geneva • Basel • Bernl",
    link: "/near-me/switzerland"
  }
]

const NearMeHero = () => {
  return (
    <div className="w-full">
      {/* Cards Section First */}
      <div className="max-w-[1276px] mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <span className="text-[#8371FF] text-lg">Best Local Headshot Photography Studios</span>
          <h1 className="text-4xl sm:text-5xl font-bold mt-4 mb-6">
            Discover Professional Headshots
            <br />
            Photographers Near Me
          </h1>
          
          <p className="max-w-4xl mx-auto text-gray-600 text-lg">
            GoStudio is your personal guide for discovering breathtaking female and male headshots from 
            leading studios. Be it business headshots, actor headshots, corporate headshots, outdoor 
            headshots or modeling headshots, we've got you covered. Click on your country to explore studios 
            in each city!
          </p>
        </div>

        {/* Country Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {countries.map((country) => (
            <CountryCard key={country.id} {...country} />
          ))}
        </div>
      </div>

      {/* Purple Gradient Section */}
      <div className="bg-gradient-to-b from-[#F4F7FA] via-[#EEF1FF] to-[#F4F7FA] py-12">
        <div className="max-w-[1276px] mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm">
            <div className="text-center mb-8">
              <span className="text-[#8371FF] text-lg">Welcome to GoStudio's Professional Network</span>
              <h2 className="text-4xl font-bold mt-4">
                Locate the Top-Quality Headshot Services
                <br />
                <span className="text-[#8371FF]">
                  across the Globe with our Comprehensive Guide
                </span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6 text-gray-600">
              <p className="text-lg">
                Embarking on the mission for an outdoor headshot or a professional headshot that truly captures your essence? 
                Congratulations! You've stumbled upon the perfect guide to navigate your quest. We've meticulously sorted top-end 
                studios and skilled professionals providing exemplary headshot services. Break free from laborious searches and 
                brace yourself for crystal-clear, impressionable headshots. Whether it's captivating 
                <Link href="/commercial-headshots" className="text-[#8371FF] hover:underline"> commercial headshots</Link>, striking 
                <Link href="/actor-headshots" className="text-[#8371FF] hover:underline"> actor headshots</Link>, or unique 
                <Link href="/modeling-headshots" className="text-[#8371FF] hover:underline"> modeling headshots</Link>, 
                we ensure a comprehensive coverage in our 
                <Link href="/types-of-headshots" className="text-[#8371FF] hover:underline"> list of types of headshots</Link>.
              </p>

              <p className="text-lg">
                Curious about the types of headshots or wondering how much do headshots cost? Desiring a glimpse into 
                commercial headshot examples or pondering about headshot dos and don'ts? Swing by our 
                <Link href="/blog" className="text-[#8371FF] hover:underline"> informational blog</Link>.
              </p>

              <p className="text-lg">
                You can explore studios offering high-quality services across diverse countries. Discover brilliant photographers from 
                <Link href="/near-me/germany" className="text-[#8371FF] hover:underline"> Germany</Link>, find magnificent headshot studios in 
                <Link href="/near-me/canada" className="text-[#8371FF] hover:underline"> Canada</Link>, navigate to exceptional freelance experts in 
                <Link href="/near-me/united-kingdom" className="text-[#8371FF] hover:underline"> United Kingdom</Link> or map out the top studios in cities across the 
                <Link href="/near-me/united-states" className="text-[#8371FF] hover:underline"> United States</Link>. Navigate through the thriving arts scene in 
                <Link href="/near-me/new-york" className="text-[#8371FF] hover:underline"> New York</Link>, or discover renowned headshot studios in the entertainment hub of 
                <Link href="/near-me/los-angeles" className="text-[#8371FF] hover:underline"> Los Angeles</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NearMeHero