'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import final_Logo from '@/public/final_Logo.svg';

interface FooterColumnProps {
  title: string;
  items: {
    text: string;
    href?: string;
    isEmail?: boolean;
  }[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, items }) => (
  <div className="mb-6 sm:mb-0">
    <h3 className="font-semibold text-sm mb-4 font-jakarta">
      {title}
    </h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index}>
          {item.isEmail ? (
            <a 
              href={`mailto:${item.href}`} 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              {item.text}
            </a>
          ) : (
            <div>
              <Link href={item.href || '/'} className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
                {item.text}
              </Link>
            </div>
          )}
        </li>
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  const columns: FooterColumnProps[] = [
    {
      title: 'AI Headshots',
      items: [
        { text: 'Doctor Headshots', href: '/headshot-types/doctor-headshot' },
        { text: 'Lawyer Headshots', href: '/headshot-types/lawyer-headshot' },
        { text: 'Glamour Headshots', href: '/headshot-types/glamour-headshot' },
        { text: 'Bold Color Headshots', href: '/headshot-types/bold-color-headshot' },
        { text: 'Tattoo Headshots', href: '/headshot-types/tattoos-headshot' },
        { text: 'Annie Leibovitz Style', href: '/headshot-types/annie-headshot' },
        { text: 'Barbie Style', href: '/headshot-types/barbie-headshot' },
        { text: 'Viking Style', href: '/headshot-types/viking-headshot' }
      ]
    },
    {
      title: 'AI Photos',
      items: [
        { text: 'Americana Photos', href: '/photos/americana-photos' },
        { text: 'Onesie Photos', href: '/photos/everyday-onesie-photos' },
        { text: 'Halloween Photos', href: '/photos/halloween-photos' },
        { text: 'Helmut Newton Photos', href: '/photos/helmut-newton-photos' },
        { text: 'J.Crew Photos', href: '/photos/jcrew-photos' },
        { text: 'Dating Profile Photos', href: '/photos/dating-photos' },
        { text: 'Realtor Photos', href: '/photos/realtor-photos' },
        { text: 'Artistic Photos', href: '/photos/artistic-photos' },
        { text: 'Wrestlemania Photos', href: '/photos/wrestlemania-photos' },
        { text: 'Red Carpet Photos', href: '/photos/red-carpet-photos' }
      ]
    },
    {
      title: 'Free Tools',
      items: [
        { text: 'Background Library', href: '/free-tools/background-library' },
        { text: 'Black Background', href: '/free-tools/black-background' },
        { text: 'Grey Background', href: '/free-tools/grey-background' },
        { text: 'Red Background', href: '/free-tools/red-background' },
        { text: 'White Background', href: '/free-tools/white-background' }
      ]
    },
    {
      title: 'Company',
      items: [
        { text: 'Testimonial', href: '/#testimonial' },
        { text: 'Pricing', href: '/#pricing' },
        { text: 'FAQ', href: '/#faq' },
        { text: 'Privacy Policy', href: '/privacy-policy' },
        { text: 'Terms of Service', href: '/terms-of-service' }
      ]
    }
  ];

  return (
    <footer className="w-full bg-white mt-4 font-poppins">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px]">
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center mb-4">
                <Image 
                  src={final_Logo} 
                  alt="Studio.ai logo" 
                  width={320} 
                  height={120} 
                  className="rounded-full" 
                  style={{ padding: '14.12px 11.3px', gap: '4.16px' }} 
                />
              </div>
              <p className="text-xs text-gray-500 max-w-xs leading-tight">
                Professional Headshots at the comfort of your home.
                <br />
                Your Personal Branding done your way. 
                <br/>
                No photographer needed - create the perfect professional image that truly represents you, in minutes, starting at just $10.
              </p>
            </div>
            <div className="col-span-1 lg:col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {columns.map((column, index) => (
                  <div key={column.title}>
                    <FooterColumn {...column} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-600 mb-4 sm:mb-0">
              Copyright© 2024 <Link href="/" className="text-blue-600 hover:underline">GoStudio.ai</Link>
            </p>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-4">Need help?</span>
              <a 
                href="mailto:hello@gostudio.ai" 
                className="text-sm text-blue-600 hover:underline transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;