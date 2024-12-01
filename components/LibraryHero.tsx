import Link from 'next/link';
import Image from 'next/image';

const backgrounds = [
  {
    title: 'Black Background',
    image: '/backgrounds/black.png',
    href: '/free-tools/background-library/black-background'
  },
  {
    title: 'Red Background',
    image: '/backgrounds/red.png',
    href: '/free-tools/background-library/red-background'
  },
  {
    title: 'Halloween Background',
    image: '/backgrounds/hallo.png',
    href: '/free-tools/background-library/halloween-background'
  },
  {
    title: 'Christmas Background',
    image: '/backgrounds/xmax.png',
    href: '/free-tools/background-library/christmas-background'
  },
  {
    title: 'White Background',
    image: '/backgrounds/white.png',
    href: '/free-tools/background-library/white-background'
  },
  {
    title: 'Abstract Background',
    image: '/backgrounds/multy.png',
    href: '/free-tools/background-library/abstract-background'
  },
  {
    title: 'Grey Background',
    image: '/backgrounds/grey.png',
    href: '/free-tools/background-library/grey-background'
  }
];

const categories = [
  { name: 'Black', path: '/free-tools/background-library/black-background' },
  { name: 'Grey', path: '/free-tools/background-library/grey-background' },
  { name: 'White', path: '/free-tools/background-library/white-background' },
  { name: 'Red', path: '/free-tools/background-library/red-background' },
  { name: 'Abstract', path: '/free-tools/background-library/abstract-background' },
  { name: 'Halloween', path: '/free-tools/background-library/halloween-background' },
  { name: 'Christmas', path: '/free-tools/background-library/christmas-background' }
];

export default function LibraryHero() {
  return (
    <div className="mt-[100px] w-full min-h-screen bg-white rounded-[30px] sm:rounded-[60px] p-8 sm:p-12">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-[60px] px-4 sm:px-6">
          <h1 className="mx-auto max-w-[692px] text-[28px] sm:text-[32px] lg:text-[40px] leading-tight sm:leading-[1.4] lg:leading-[60.48px] font-bold font-plus-jakarta-sans mb-3 sm:mb-4">
            GoStudio Background Library
          </h1>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl px-4">
            Personalize your brand with our diverse selection of free
            <span className="hidden sm:inline"><br/></span> backgrounds.
          </p>
        </div>

        {/* Background Grid */}
        <div className="flex justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-[1058px]">
            {/* Mobile View (1 column) */}
            <div className="grid grid-cols-1 gap-4 sm:hidden">
              {backgrounds.map((bg, index) => (
                <Link href={bg.href} key={`mobile-${index}`} className="block">
                  <div className="w-full h-[280px] bg-gray-200 rounded-[12px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    <Image 
                      src={bg.image} 
                      alt={bg.title} 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw"
                    />
                  </div>
                </Link>
              ))}
            </div>

            {/* Tablet View (2 columns) */}
            <div className="hidden sm:grid lg:hidden grid-cols-2 gap-4">
              {backgrounds.map((bg, index) => (
                <Link href={bg.href} key={`tablet-${index}`} className="block">
                  <div className="w-full h-[300px] bg-gray-200 rounded-[12px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    <Image 
                      src={bg.image} 
                      alt={bg.title} 
                      fill 
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw"
                    />
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop View (4 columns) */}
            <div className="hidden lg:flex gap-[14px]">
              {/* First Column */}
              <div className="space-y-[14px] flex-1">
                <Link href="/free-tools/background-library/black-background" className="block">
                  <div className="w-full h-[255px] bg-gray-200 rounded-[12px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    <Image 
                      src="/backgrounds/black.png" 
                      alt="Black Background" 
                      fill 
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                </Link>
                <Link href="/free-tools/background-library/white-background" className="block">
                  <div className="w-full h-[380px] bg-gray-200 rounded-[12px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    <Image 
                      src="/backgrounds/white.png" 
                      alt="White Background" 
                      fill 
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                </Link>
              </div>

              {/* Second Column */}
              <div className="space-y-[14px] flex-1">
                <Link href="/free-tools/background-library/red-background" className="block">
                  <div className="w-full h-[380px] bg-gray-200 rounded-[12px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    <Image 
                      src="/backgrounds/red.png" 
                      alt="Red Background" 
                      fill 
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                </Link>
                <Link href="/free-tools/background-library/abstract-background" className="block">
                  <div className="w-full h-[255px] bg-gray-200 rounded-[12px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    <Image 
                      src="/backgrounds/multy.png" 
                      alt="Abstract Background" 
                      fill 
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                </Link>
              </div>

              {/* Third Column */}
              <div className="space-y-[14px] flex-1">
                <Link href="/free-tools/background-library/halloween-background" className="block">
                  <div className="w-full h-[255px] bg-gray-200 rounded-[12px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    <Image 
                      src="/backgrounds/hallo.png" 
                      alt="Halloween Background" 
                      fill 
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                </Link>
                <Link href="/free-tools/background-library/grey-background" className="block">
                  <div className="w-full h-[380px] bg-gray-200 rounded-[12px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    <Image 
                      src="/backgrounds/grey.png" 
                      alt="Grey Background" 
                      fill 
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                </Link>
              </div>

              {/* Fourth Column */}
              <div className="space-y-[14px] flex-1">
                <Link href="/free-tools/background-library/christmas-background" className="block">
                  <div className="w-full h-[380px] bg-gray-200 rounded-[12px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    <Image 
                      src="/backgrounds/xmax.png" 
                      alt="Christmas Background" 
                      fill 
                      className="object-cover"
                      sizes="25vw"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
