'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import final_Logo from '@/public/final_Logo.svg';
import { useTranslations } from 'use-intl';
import { useRouter, useParams, usePathname } from "next/navigation";

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

// Add this new interface for language options
interface LanguageOption {
  code: string;
  name: string;
  localName: string;
}

// Add this new component for the language modal
const LanguageModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelectLanguage: (code: string) => void;
  currentLocale: string;
}> = ({ isOpen, onClose, onSelectLanguage, currentLocale }) => {
  const languages: LanguageOption[] = [
    { code: 'en', name: 'English', localName: 'English' },
    { code: 'de', name: 'German', localName: 'Deutsch' },
    { code: 'es', name: 'Spanish', localName: 'Español' },
    { code: 'fr', name: 'French', localName: 'Français' },
    { code: 'id', name: 'Indonesian', localName: 'Bahasa Indonesia' },
    { code: 'it', name: 'Italian', localName: 'Italiano' },
    { code: 'ja', name: 'Japanese', localName: '日本語' },
    { code: 'ko', name: 'Korean', localName: '한국어' },
    { code: 'br', name: 'Brazilian Portuguese', localName: 'Português (BR)' },
    { code: 'tr', name: 'Turkish', localName: 'Türkçe' },
    { code: 'th', name: 'Thai', localName: 'ภาษาไทย' },
    { code: 'vi', name: 'Vietnamese', localName: 'Tiếng Việt' },
    { code: 'cn', name: 'Chinese', localName: '中文' },
    { code: 'ru', name: 'Russian', localName: 'Русский' },
    { code: 'ar', name: 'Arabic', localName: 'العربية' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Choose your language</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className={`p-4 rounded-lg text-left hover:bg-gray-50 transition-colors ${
                  currentLocale === lang.code ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="font-semibold">{lang.name}</div>
                <div className="text-gray-500 text-sm">{lang.localName}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const locale = (params?.locale || 'en') as string;
  const t = useTranslations('footer');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = React.useState(false);

  const switchLanguage = (locale: string) => {
    const currentPath = pathname;
    if (currentPath) {
      router.push(currentPath.replace(/^\/[a-z]{2}/, `/${locale}`));
    }
  };

  const columns: FooterColumnProps[] = [
    {
      title: t('aiHeadshots.title'),
      items: [
        { text: t('aiHeadshots.items.doctor'), href: '/headshot-packs/doctor-headshot' },
        { text: t('aiHeadshots.items.lawyer'), href: '/headshot-packs/lawyer-headshot' },
        { text: t('aiHeadshots.items.actor'), href: '/headshot-packs/actor-headshot' },
        { text: t('aiHeadshots.items.realtor'), href: '/headshot-packs/realtor-headshot' },
        { text: t('aiHeadshots.items.tedSpeaker'), href: '/headshot-packs/ted-speaker-headshot' },
        { text: t('aiHeadshots.items.businessCasual'), href: '/headshot-packs/business-casual-headshots' },
        { text: t('aiHeadshots.items.effortlessPro'), href: '/headshot-packs/effortlessprofessionalism-headshot' },
        { text: t('aiHeadshots.items.lawyerBranded'), href: '/headshot-packs/lawyerbranded-headshot' },
        { text: t('aiHeadshots.items.partner'), href: '/headshot-packs/partners-headshots' },
        { text: t('aiHeadshots.items.proPack'), href: '/headshot-packs/professionalpackage-headshot' },
        { text: t('aiHeadshots.items.styledSuccess'), href: '/headshot-packs/styled-for-success-headshot' },
        { text: t('aiHeadshots.items.stylishLawyer'), href: '/headshot-packs/stylishlawyers-headshot' }
      ]
    },
    {
      title: t('aiPhotos.title'),
      items: [
        { text: t('aiPhotos.items.meiravClass'), href: '/photoshoot-packs/meiravclass-headshot' },
        { text: t('aiPhotos.items.tattoos'), href: '/photoshoot-packs/professional-tattoos-portraits' },
        { text: t('aiPhotos.items.annie'), href: '/photoshoot-packs/annie-headshot' },
        { text: t('aiPhotos.items.barbie'), href: '/photoshoot-packs/barbie-headshot' },
        { text: t('aiPhotos.items.viking'), href: '/photoshoot-packs/viking-portraits' },
        { text: t('aiPhotos.items.dreamland'), href: '/photoshoot-packs/4dreamland-kids-photos' },
        { text: t('aiPhotos.items.babyDoodles'), href: '/photoshoot-packs/baby-doodles-photos' },
        { text: t('aiPhotos.items.birthdayMagic'), href: '/photoshoot-packs/birthday-magic-photos' },
        { text: t('aiPhotos.items.branding'), href: '/photoshoot-packs/branding-photography' },
        { text: t('aiPhotos.items.casual'), href: '/photoshoot-packs/casual-photos' },
        { text: t('aiPhotos.items.casualCollection'), href: '/photoshoot-packs/casualcollection-photos' },
        { text: t('aiPhotos.items.catMagic'), href: '/photoshoot-packs/catmeowgic-photos' },
        { text: t('aiPhotos.items.christmasElf'), href: '/photoshoot-packs/christmas-elf-photos' },
        { text: t('aiPhotos.items.christmasSweater'), href: '/photoshoot-packs/christmas-sweater-photos' },
        { text: t('aiPhotos.items.familyChristmas'), href: '/photoshoot-packs/cool-family-christmas-photos' },
        { text: t('aiPhotos.items.cyberpunk'), href: '/photoshoot-packs/cyberpunk-photos' },
        { text: t('aiPhotos.items.hanukkah'), href: '/photoshoot-packs/hanukka-miracle-photos' },
        { text: t('aiPhotos.items.happyKid'), href: '/photoshoot-packs/happy-kid-photos' },
        { text: t('aiPhotos.items.influencer'), href: '/photoshoot-packs/influencer-photos' },
        { text: t('aiPhotos.items.iconic'), href: '/photoshoot-packs/me-iconic-photos' },
        { text: t('aiPhotos.items.merryChristmas'), href: '/photoshoot-packs/merry-christmas-photos' },
        { text: t('aiPhotos.items.vintageAmericana'), href: '/photoshoot-packs/vintage-americana-photos' },
        { text: t('aiPhotos.items.onesie'), href: '/photoshoot-packs/onesie-portraits' },
        { text: t('aiPhotos.items.halloween'), href: '/photoshoot-packs/halloween-photos' },
        { text: t('aiPhotos.items.actress'), href: '/photoshoot-packs/actress-portraits' },
        { text: t('aiPhotos.items.birthdayParty'), href: '/photoshoot-packs/birthday-party-save-the-date-photoshoot' },
        { text: t('aiPhotos.items.artistic'), href: '/photoshoot-packs/artistic-portraits' },
        { text: t('aiPhotos.items.wrestlemania'), href: '/photoshoot-packs/wrestlemania-photos' },
        { text: t('aiPhotos.items.redCarpet'), href: '/photoshoot-packs/actor-red-carpet-photos' },
        { text: t('aiPhotos.items.gameOfThrones'), href: '/photoshoot-packs/game-of-thrones-portraits' },
        { text: t('aiPhotos.items.kidsBirthday'), href: '/photoshoot-packs/kids-birthday-portraits' },
        { text: t('aiPhotos.items.mythical'), href: '/photoshoot-packs/mythical-creatures-portaits' },
        { text: t('aiPhotos.items.dating'), href: '/photoshoot-packs/online-dating-profile-photos' },
        { text: t('aiPhotos.items.petDog'), href: '/photoshoot-packs/pet-photography-dog' },
        { text: t('aiPhotos.items.popColor'), href: '/photoshoot-packs/pop-color-photos' },
        { text: t('aiPhotos.items.youtube'), href: '/photoshoot-packs/youtube-thumbnail-photos' },
        { text: t('aiPhotos.items.playfulCasual'), href: '/photoshoot-packs/playful-casual-photos' },
        { text: t('aiPhotos.items.podcaster'), href: '/photoshoot-packs/podcaster-photos' },
        { text: t('aiPhotos.items.maternity'), href: '/photoshoot-packs/romantic-maternity-photos' },
        { text: t('aiPhotos.items.socialMedia'), href: '/photoshoot-packs/social-media-photos' },
        { text: t('aiPhotos.items.timeMachine'), href: '/photoshoot-packs/time-machine-photos' },
        { text: t('aiPhotos.items.timelessStudio'), href: '/photoshoot-packs/timeless-studio-photos' },
        { text: t('aiPhotos.items.tlvFashion'), href: '/photoshoot-packs/TLV-fashion-photos' },
        { text: t('aiPhotos.items.vintagePack'), href: '/photoshoot-packs/vintage-pack-photos' },
        { text: t('aiPhotos.items.wildFriends'), href: '/photoshoot-packs/wild-friends-photos' },
        { text: t('aiPhotos.items.winterWonderland'), href: '/photoshoot-packs/winter-wonderland-photos' },
        { text: t('aiPhotos.items.workFromHome'), href: '/photoshoot-packs/work-from-home-photos' }
      ]
    },
    {
      title: t('freeTools.title'),
      items: [
        { text: t('freeTools.items.backgroundLibrary'), href: '/free-tools/background-library' },
        { text: t('freeTools.items.backgroundRemover'), href: '/free-tools/background-remover' },
        { text: t('freeTools.items.blackBg'), href: '/free-tools/black-background' },
        { text: t('freeTools.items.greyBg'), href: '/free-tools/grey-background' },
        { text: t('freeTools.items.redBg'), href: '/free-tools/red-background' },
        { text: t('freeTools.items.whiteBg'), href: '/free-tools/white-background' },
        { text: t('freeTools.items.abstractBg'), href: '/free-tools/abstract-background' },
        { text: t('freeTools.items.christmasBg'), href: '/free-tools/christmas-background' },
        { text: t('freeTools.items.halloweenBg'), href: '/free-tools/halloween-background' }
      ]
    },
    {
      title: t('company.title'),
      items: [
        { text: t('company.items.testimonial'), href: '/#testimonial' },
        { text: t('company.items.pricing'), href: '/#pricing' },
        { text: t('company.items.faq'), href: '/#faq' },
        { text: t('company.items.privacy'), href: '/privacy-policy' },
        { text: t('company.items.terms'), href: '/terms-of-service' }
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
                  alt={t('logoAlt')} 
                  width={320} 
                  height={120} 
                  className="rounded-full" 
                  style={{ padding: '14.12px 11.3px', gap: '4.16px' }} 
                />
              </div>
              <p className="text-xs text-gray-500 max-w-xs leading-tight">
                {t('description.line1')}
                <br />
                {t('description.line2')}
                <br/>
                {t('description.line3')}
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
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8">
              <p className="text-sm text-gray-600">
                {t('copyright')} <Link href="/" className="text-blue-600 hover:underline">GoStudio.ai</Link>
              </p>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{t('needHelp')}</span>
                <a href="mailto:hello@gostudio.ai" className="text-sm text-blue-600 hover:underline transition-colors duration-300">
                  {t('contactUs')}
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsLanguageModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.6 9h16.8M3.6 15h16.8" />
                </svg>
                <span>{(locale as string).toUpperCase()}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add the LanguageModal component */}
      <LanguageModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        onSelectLanguage={switchLanguage}
        currentLocale={locale}
      />
    </footer>
  );
};

export default Footer;