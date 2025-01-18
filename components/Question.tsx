'use client'
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
  isRTL: boolean;
}

const FAQItem = ({ question, answer, isOpen, toggleOpen, isRTL }: FAQItemProps) => (
  <div className={`mb-4 overflow-hidden rounded-lg ${isOpen ? 'bg-white shadow-md' : 'bg-gray-50'}`}>
    <button
      className="flex justify-between items-center w-full text-left p-4"
      onClick={toggleOpen}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <span className={`text-sm sm:text-base lg:text-lg font-medium ${isOpen ? 'text-indigo-600' : 'text-gray-900'} ${isRTL ? 'font-arabic' : ''}`}>
        {question}
      </span>
      <div className={`${isOpen ? 'bg-black' : 'bg-indigo-600'} rounded-full p-1 flex-shrink-0 ${isRTL ? 'mr-2' : 'ml-2'}`}>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        ) : (
          <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        )}
      </div>
    </button>
    {isOpen && (
      <div className="px-4 pb-4" dir={isRTL ? 'rtl' : 'ltr'}>
        <p className={`text-gray-600 text-sm sm:text-base ${isRTL ? 'font-arabic' : ''}`}>{answer}</p>
      </div>
    )}
  </div>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const t = useTranslations('FAQ');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const faqs = [
    {
      question: t('questions.whatIs.question'),
      answer: t('questions.whatIs.answer')
    },
    {
      question: t('questions.photoRequirements.question'),
      answer: t('questions.photoRequirements.answer')
    },
    {
      question: t('questions.ownership.question'),
      answer: t('questions.ownership.answer')
    },
    {
      question: t('questions.timing.question'),
      answer: t('questions.timing.answer')
    },
    {
      question: t('questions.satisfaction.question'),
      answer: t('questions.satisfaction.answer')
    },
    {
      question: t('questions.linkedin.question'),
      answer: t('questions.linkedin.answer')
    },
    {
      question: t('questions.whichAI.question'),
      answer: t('questions.whichAI.answer')
    },
    {
      question: t('questions.dataSecurity.question'),
      answer: t('questions.dataSecurity.answer')
    }
  ];

  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 bg-white" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-[1280px] mx-auto">
        <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 
          ${isRTL ? 'font-arabic text-right pr-4' : 'text-left pl-4'}`}>
          {t('title')}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              toggleOpen={() => setOpenIndex(index === openIndex ? -1 : index)}
              isRTL={isRTL}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;