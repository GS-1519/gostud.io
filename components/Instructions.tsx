'use client'

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

// Types
interface PhotoGuideProps {
  title: string;
  icon: string;
  iconColor: string;
  images: {
    src: string;
    alt: string;
    label: string;
    description: string;
  }[];
}

// Icons component for header
const HeaderIcon: React.FC<{ type: string }> = ({ type }) => {
  return (
    <span className="text-white text-lg">
      {type === "good" ? "✓" : type === "bad" ? "×" : "!"}
    </span>
  );
};

// Photo Guide Section Component
const PhotoGuideSection = ({ title, icon, iconColor, images }: PhotoGuideProps) => {
  const t = useTranslations('photoGuide');

  // Create descriptions object from images array
  const descriptions = images.reduce((acc, img) => {
    if (!acc[img.label]) {
      acc[img.label] = [];
    }
    acc[img.label].push(img.description);
    return acc;
  }, {} as Record<string, string[]>);

  // Determine icon type
  const iconType = title.toLowerCase().includes("good") 
    ? "good" 
    : title.toLowerCase().includes("avoid") 
      ? "bad" 
      : "warning";

  return (
    <div className="w-full sm:w-[384.5px] min-h-[497.75px] p-5 sm:p-[20.25px] 
                    bg-[#F2F2F7] rounded-[20px] 
                    shadow-[0_13.5px_81px_0_#00000026]
                    flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <div className={`w-6 h-6 ${iconColor} rounded-full flex items-center justify-center shrink-0`}>
          <HeaderIcon type={iconType} />
        </div>
        <h3 className="font-poppins font-normal text-[24px] leading-[36px]">
          {t(`sections.${title}`)}
        </h3>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 flex-grow">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="relative w-full aspect-square rounded-[12px] overflow-hidden">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Descriptions with dots */}
      <div className="flex flex-wrap gap-y-2 mt-4">
        {Object.entries(descriptions).map(([label, descs]) => (
          descs.map((desc, idx) => (
            <div key={`${label}-${idx}`} className="w-1/2 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full shrink-0 ${
                label === 'good' ? 'bg-green-500' : 
                label === 'bad' ? 'bg-red-500' : 
                'bg-yellow-500'
              }`} />
              <span className="text-sm text-gray-600">{desc}</span>
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

interface InstructionsPageProps {
  onContinue: () => void;
  user: any;
}

// Main Instructions Page Component
const InstructionsPage: React.FC<InstructionsPageProps> = ({ onContinue, user }) => {
  const t = useTranslations('photoGuide');
  const [countdown, setCountdown] = useState(5);
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Get the pack name from the URL
  const getPack = () => {
    const segments = pathname ? pathname.split('/') : [];
    return segments[segments.length - 1]; // This will get 'vikings' from the URL
  };

  const handleUploadClick = () => {
    if (isCountdownComplete && onContinue) {
      onContinue();
    }
  };

  // Countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setIsCountdownComplete(true);
    }
  }, [countdown]);

  // Section data
  const sections = [
    {
      title: "goodPhotos",
      icon: "/icons/check.svg",
      iconColor: "bg-green-500",
      images: [
        {
          src: "/good/img1.png",
          alt: t('alt.goodPhoto1'),
          label: "good",
          description: t('descriptions.closeUpSelfie')
        },
        {
          src: "/good/img2.png",
          alt: t('alt.goodPhoto2'),
          label: "good",
          description: t('descriptions.facingCamera')
        },
        {
          src: "/good/img3.png",
          alt: t('alt.goodPhoto3'),
          label: "good",
          description: t('descriptions.halfBody')
        },
        {
          src: "/good/img4.png",
          alt: t('alt.goodPhoto4'),
          label: "good",
          description: t('descriptions.onlyVisible')
        }
      ]
    },
    {
      title: "photosToAvoid",
      icon: "/icons/cross.svg",
      iconColor: "bg-red-500",
      images: [
        {
          src: "/bad/img1.png",
          alt: t('alt.badPhoto1'),
          label: "bad",
          description: t('descriptions.groupSelfies')
        },
        {
          src: "/bad/img2.png",
          alt: t('alt.badPhoto2'),
          label: "bad",
          description: t('descriptions.withSomeone')
        },
        {
          src: "/bad/img3.png",
          alt: t('alt.badPhoto3'),
          label: "bad",
          description: t('descriptions.hidingFace')
        },
        {
          src: "/bad/img4.png",
          alt: t('alt.badPhoto4'),
          label: "bad",
          description: t('descriptions.wearingGlasses')
        }
      ]
    },
    {
      title: "refrainUsing",
      icon: "/icons/warning.svg",
      iconColor: "bg-yellow-500",
      images: [
        {
          src: "/bad/img5.png",
          alt: t('alt.avoidPhoto1'),
          label: "warning",
          description: t('descriptions.onlyFace')
        },
        {
          src: "/bad/img6.png",
          alt: t('alt.avoidPhoto2'),
          label: "warning",
          description: t('descriptions.nudity')
        },
        {
          src: "/bad/img7.png",
          alt: t('alt.avoidPhoto3'),
          label: "warning",
          description: t('descriptions.blurredImage')
        },
        {
          src: "/bad/img8.png",
          alt: t('alt.avoidPhoto4'),
          label: "warning",
          description: t('descriptions.tooMuchShadow')
        }
      ]
    }
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 py-8 pb-32">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-poppins font-normal text-[24px] leading-[36px] text-left mb-2">
            {t('title')}
          </h1>
          <p className="text-gray-600 text-left">{t('subtitle')}</p>
        </div>

        {/* Sections Container */}
        <div className="flex flex-col lg:flex-row gap-6 justify-center lg:justify-start items-start">
          {sections.map((section, index) => (
            <PhotoGuideSection
              key={index}
              title={section.title}
              icon={section.icon}
              iconColor={section.iconColor}
              images={section.images}
            />
          ))}
        </div>
      </div>

      {/* Fixed Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 py-4">
          <div className="flex justify-center items-center gap-4">
            {/* Go Back Button */}
            <button 
              onClick={() => router.back()}
              className="h-12 px-6 text-purple-600 font-medium 
                       rounded-full border border-purple-600 
                       hover:bg-purple-50 transition-colors
                       bg-white flex items-center justify-center min-w-[120px]">
              Go Back
            </button>

            {/* Upload Button */}
            <button 
              onClick={handleUploadClick}
              disabled={!isCountdownComplete}
              className={`h-12 px-6 font-medium rounded-full 
                       flex items-center justify-center gap-2
                       transition-all duration-300 min-w-[160px]
                       ${isCountdownComplete 
                         ? 'bg-gradient-to-r from-[#8371FF] to-[#01C7E4] text-white hover:opacity-90' 
                         : 'bg-gradient-to-r from-[#8371FF] to-[#01C7E4] text-white hover:opacity-90'}`}
            >
              <span>
                {isCountdownComplete 
                  ? 'Upload images' 
                  : `Upload in... (${countdown} sec left)`
                }
              </span>
              {isCountdownComplete && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsPage;