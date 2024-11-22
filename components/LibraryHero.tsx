import Link from 'next/link';
import Image from 'next/image';

const backgrounds = [
  {
    title: 'Black Background',
    image: '/backgrounds/black.png',
    href: '/backgrounds/black'
  },
  {
    title: 'Red Background',
    image: '/backgrounds/red.png',
    href: '/backgrounds/red'
  },
  {
    title: 'Halloween Background',
    image: '/backgrounds/hallo.png',
    href: '/backgrounds/halloween'
  },
  {
    title: 'Christmas Background',
    image: '/backgrounds/xmax.png',
    href: '/backgrounds/christmas'
  },
  {
    title: 'White Background',
    image: '/backgrounds/white.png',
    href: '/backgrounds/white'
  },
  {
    title: 'Abstract Background',
    image: '/backgrounds/multy.png',
    href: '/backgrounds/abstract'
  },
  {
    title: 'Grey Background',
    image: '/backgrounds/grey.png',
    href: '/backgrounds/grey'
  }
];

export default function LibraryHero() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
      <div className="w-[1274px] min-h-[1010px] bg-white rounded-[60px] py-20 mx-auto">
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
                {/* Black Background */}
                <div className="w-[254px] h-[255px] bg-gray-200 rounded-[12px] overflow-hidden relative">
                  <Image
                    src="/backgrounds/black.png"
                    alt="Black Background"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* White Background */}
                <div className="w-[254px] h-[380px] bg-gray-200 rounded-[12px] overflow-hidden relative">
                  <Image
                    src="/backgrounds/white.png"
                    alt="White Background"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Second Column */}
              <div className="space-y-[14px]">
                {/* Red Background */}
                <div className="w-[254.06px] h-[380px] bg-gray-200 rounded-[12px] overflow-hidden relative">
                  <Image
                    src="/backgrounds/red.png"
                    alt="Red Background"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Abstract Background */}
                <div className="w-[254.06px] h-[255px] bg-gray-200 rounded-[12px] overflow-hidden relative">
                  <Image
                    src="/backgrounds/multy.png"
                    alt="Abstract Background"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Third Column */}
              <div className="space-y-[14px]">
                {/* Halloween Background */}
                <div className="w-[254px] h-[255px] bg-gray-200 rounded-[12px] overflow-hidden relative">
                  <Image
                    src="/backgrounds/hallo.png"
                    alt="Halloween Background"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Christmas Background */}
                <div className="w-[254px] h-[380px] bg-gray-200 rounded-[12px] overflow-hidden relative">
                  <Image
                    src="/backgrounds/xmax.png"
                    alt="Christmas Background"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Fourth Column */}
              <div className="space-y-[14px]">
                {/* Grey Background */}
                <div className="w-[254px] h-[380px] bg-gray-200 rounded-[12px] overflow-hidden relative">
                  <Image
                    src="/backgrounds/grey.png"
                    alt="Grey Background"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
