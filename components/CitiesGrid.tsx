// components/CitiesGrid.tsx

'use client'
import Image from 'next/image'
import Link from 'next/link'

const cities = [
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

const CitiesGrid = () => {
  return (
    <div className="max-w-[1276px] mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cities.map((city) => (
          <Link 
            href={city.link}
            key={city.name}
            className="block group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="aspect-[4/3] relative">
              <Image
                src={city.image}
                alt={city.name}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-900">{city.name}</h3>
              <p className="text-sm text-gray-600">{city.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default CitiesGrid