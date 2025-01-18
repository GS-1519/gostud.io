import React from 'react';
import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';

export const metadata: Metadata = {
  title: 'Privacy Policy | GoStudio.ai',
  description: 'Learn how GoStudio.ai protects your privacy and handles your data. Our comprehensive privacy policy explains your rights and our data practices.',
  keywords: 'privacy policy, data protection, privacy rights, GoStudio.ai privacy, data security',
  openGraph: {
    title: 'Privacy Policy | GoStudio.ai',
    description: 'Learn how GoStudio.ai protects your privacy and handles your data.',
    type: 'website',
    images: ['/og.png'],
  }
}

const PrivacyPolicy: React.FC = () => {
  const t = useTranslations('privacy');

  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px] py-8 sm:py-12">
        <div className="w-full max-w-[1276px] mx-auto bg-white rounded-[24px] p-6 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 font-jakarta">{t('content.title')}</h1>
          
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">{t('content.introduction.title')}</h2>
            <p className="text-gray-600 mb-4">{t('content.introduction.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">{t('content.personalInfo.title')}</h2>
            <p className="text-gray-600 mb-4">{t('content.personalInfo.content')}</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              {t('content.personalInfo.items').split(',').map((item: string, index: number) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
            <p className="text-gray-600 mb-4">{t('content.personalInfo.additional')}</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              {t('content.personalInfo.additionalItems').split(',').map((item: string, index: number) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
            <p className="text-gray-600">{t('content.personalInfo.note')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">{t('content.usage.title')}</h2>
            <p className="text-gray-600 mb-4">{t('content.usage.content')}</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              {t('content.usage.items').split(',').map((item: string, index: number) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">{t('content.imageData.title')}</h2>
            <p className="text-gray-600 mb-4">{t('content.imageData.content')}</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              {t('content.imageData.items').split(',').map((item: string, index: number) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">{t('content.sharing.title')}</h2>
            <p className="text-gray-600 mb-4">{t('content.sharing.content')}</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              {t('content.sharing.items').split(',').map((item: string, index: number) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">{t('content.storage.title')}</h2>
            <p className="text-gray-600 mb-4">{t('content.storage.content')}</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">{t('content.rights.title')}</h2>
            <p className="text-gray-600 mb-4">{t('content.rights.content')}</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              {t('content.rights.items').split(',').map((item: string, index: number) => (
                <li key={index}>{item.trim()}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">{t('content.contact.title')}</h2>
            <p className="text-gray-600 mb-4">{t('content.contact.content')}</p>
            <p className="text-gray-600 mb-2">{t('content.contact.email')}</p>
          </section>

          <div className="text-sm text-gray-500 mt-12">
            {t('content.lastUpdate')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;