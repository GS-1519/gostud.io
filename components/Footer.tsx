'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import final_Logo from "@/public/new-logo.png";

interface FooterColumnProps {
  title: string;
  items: {
    text: string;
    href?: string;
    isEmail?: boolean;
  }[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, items }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="mb-6 sm:mb-0"
  >
    <motion.h3 
      whileHover={{ scale: 1.05 }}
      className="font-semibold text-sm mb-4 font-jakarta"
    >
      {title}
    </motion.h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <motion.li 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          viewport={{ once: true }}
        >
          {item.isEmail ? (
            <motion.a 
              whileHover={{ scale: 1.05, color: '#3B82F6' }}
              href={`mailto:${item.href}`} 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300"
            >
              {item.text}
            </motion.a>
          ) : (
            <motion.div whileHover={{ scale: 1.05, x: 5 }}>
              <Link href={item.href || '/'} className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-300">
                {item.text}
              </Link>
            </motion.div>
          )}
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

const Footer: React.FC = () => {
  const columns: FooterColumnProps[] = [
    {
      title: 'AI Headshots',
      items: [
        { text: 'J.Crew Style', href: '/photos/jcrew-photos' },
        { text: 'Health & Fitness', href: '/photos/health-inspiration-photos' },
        { text: 'Artistic Photos', href: '/photos/artistic-photos' },
        { text: 'Americana Photos', href: '/photos/americana-photos' },
        { text: 'Annie Photos', href: '/photos/annie-photos' },
        { text: 'Barbie Photos', href: '/photos/barbie-photos' },
        { text: 'Botanical Photos', href: '/photos/botanical-photos' },
        { text: 'Dating Photos', href: '/photos/dating-photos' },
        { text: 'Save-The-HBD-Photos', href: '/photos/date-photos' },
        { text: 'Glamour Photos', href: '/photos/glamour-photos' },
        { text: 'Lawyer Photos', href: '/photos/lawyer-photos' },
        { text: 'Helmut Newton Style', href: '/photos/helmut-newton-photos' },
        { text: 'Wednesday Addams', href: '/photos/wednesday-addams-photos' },
        { text: 'Youtube Photos', href: '/photos/youtube-reaction-photos' },
        { text: 'Red Carpet Photos', href: '/photos/red-carpet-photos' },
        { text: 'Speaker Photos', href: '/photos/speaker-photos' },
        { text: 'Tattoo Photos', href: '/photos/tattoos-photos' },
        { text: 'Vikings Photos', href: '/photos/viking-photos' }
      ]
    },
    {
      title: 'Background Library',
      items: [
        { text: 'Background Library', href: '/free-tools/background-library' },
        { text: 'Christmas Background', href: '/free-tools/christmas-background' },
        { text: 'Halloween Background', href: '/free-tools/halloween-background' },
        { text: 'Abstract Background', href: '/free-tools/abstract-background' },
        { text: 'Red Background', href: '/free-tools/red-background' },
        { text: 'Grey Background', href: '/free-tools/grey-background' }
      ]
    },
    {
      title: 'Company',
      items: [
        { text: 'Contact Us', href: 'hello@gostudio.ai', isEmail: true }
      ]
    },
    {
      title: 'Legal',
      items: [
        { text: 'Terms Policy', href: '/terms' },
        { text: 'Privacy Policy', href: '/privacy' },
        { text: 'Refund Policy', href: '/refund' }
      ]
    }
  ];

  return (
    <footer className="w-full bg-white mt-4 font-poppins">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px]">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="py-12 lg:py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="col-span-1 lg:col-span-2"
            >
              <motion.div 
                whileHover={{ rotate: [0, -5, 5, -5, 0] }}
                transition={{ duration: 0.5 }}
                className="flex items-center mb-4"
              >
                <Image 
                  src={final_Logo} 
                  alt="Studio.ai logo" 
                  width={320} 
                  height={120} 
                  className="rounded-full hover:shadow-lg transition-shadow duration-300" 
                  style={{ padding: '14.12px 11.3px', gap: '4.16px' }} 
                />
              </motion.div>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-xs text-gray-500 max-w-xs leading-tight"
              >
                Professional Headshots at the comfort of your home.
                <br />
                Your Personal Branding done your way. 
                <br/>
                No photographer needed - create the perfect professional image that truly represents you, in minutes, starting at just $10.
              </motion.p>
            </motion.div>
            <div className="col-span-1 lg:col-span-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {columns.map((column, index) => (
                  <motion.div
                    key={column.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <FooterColumn {...column} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="border-t border-gray-200 py-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <motion.p 
              whileHover={{ scale: 1.05 }}
              className="text-sm text-gray-600 mb-4 sm:mb-0"
            >
              Copyright© 2024 <Link href="/" className="text-blue-600 hover:underline">GoStudio.ai</Link>
            </motion.p>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center"
            >
              <span className="text-sm text-gray-600 mr-4">Need help?</span>
              <motion.a 
                whileHover={{ scale: 1.1, color: '#3B82F6' }}
                href="mailto:hello@gostudio.ai" 
                className="text-sm text-blue-600 hover:underline transition-colors duration-300"
              >
                Contact Us
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;