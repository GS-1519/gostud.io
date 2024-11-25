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
    <div className="flex items-center justify-center">
      <div className="w-[1274px] h-[1010px] bg-white rounded-[60px] py-20 mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-[60px]">
          <h1 className="mx-auto max-w-[692px] text-[40px] leading-[60.48px] font-bold font-plus-jakarta-sans mb-4">
            GoStudio Background Library
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Personalize your brand with our diverse selection of free <br/>backgrounds.
          </p>
        </div>

        {/* Background Grid */}
        <div className="flex justify-center">
          <div className="w-[1058.06px] h-[650px]">
            <div className="flex gap-[14px]">
              {/* First Column */}
              <div className="space-y-[14px]">
                <Link href="/free-tools/background-library/black-background" className="block">
                  <div className="w-[254px] h-[255px] bg-gray-200 rounded-[12px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    <Image src="/backgrounds/black.png" alt="Black Background" fill className="object-cover" />
                  </div>
                </Link>
                <Link href="/free-tools/background-library/white-background" className="block">
                  <div className="w-[254px] h-[380px] bg-gray-200 rounded-[12px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    <Image src="/backgrounds/white.png" alt="White Background" fill className="object-cover" />
                  </div>
                </Link>
              </div>

              {/* Second Column */}
              <div className="space-y-[14px]">
                <Link href="/free-tools/background-library/red-background" className="block">
                  <div className="w-[254.06px] h-[380px] bg-gray-200 rounded-[12px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    <Image src="/backgrounds/red.png" alt="Red Background" fill className="object-cover" />
                  </div>
                </Link>
                <Link href="/free-tools/background-library/abstract-background" className="block">
                  <div className="w-[254.06px] h-[255px] bg-gray-200 rounded-[12px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    <Image src="/backgrounds/multy.png" alt="Abstract Background" fill className="object-cover" />
                  </div>
                </Link>
              </div>

              {/* Third Column */}
              <div className="space-y-[14px]">
                <Link href="/free-tools/background-library/halloween-background" className="block">
                  <div className="w-[254px] h-[255px] bg-gray-200 rounded-[12px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    <Image src="/backgrounds/hallo.png" alt="Halloween Background" fill className="object-cover" />
                  </div>
                </Link>
                <Link href="/free-tools/background-library/grey-background" className="block">
                  <div className="w-[254px] h-[380px] bg-gray-200 rounded-[12px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    <Image src="/backgrounds/grey.png" alt="Grey Background" fill className="object-cover" />
                  </div>
                </Link>
              </div>

              {/* Fourth Column */}
              <div className="space-y-[14px]">
                <Link href="/free-tools/background-library/christmas-background" className="block">
                  <div className="w-[254px] h-[380px] bg-gray-200 rounded-[12px] overflow-hidden relative cursor-pointer hover:opacity-90 transition-opacity">
                    <Image src="/backgrounds/xmax.png" alt="Christmas Background" fill className="object-cover" />
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
