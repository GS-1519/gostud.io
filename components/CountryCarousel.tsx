import Image from 'next/image'
import Link from 'next/link'

interface NearbyCountry {
  name: string;
  image: string;
  description: string;
  link: string;
}

interface CountryCarouselProps {
  title: string;
  subtitle: string;
  items: NearbyCountry[];
}

export default function CountryCarousel({ title, subtitle, items }: CountryCarouselProps) {
  return (
    <div className="mt-16">
      <div className="text-center mb-8">
        <span className="text-[#8371FF] text-lg">{subtitle}</span>
        <h2 className="text-3xl font-bold mt-4">{title}</h2>
      </div>

      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="flex-shrink-0 w-[300px] group"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
              <div className="relative h-[200px]">
                <Image
                  src={item.image}
                  alt={`${item.name} Photography`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm line-clamp-3">{item.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 