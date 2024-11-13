import React from 'react';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | GoStudio.ai',
  description: 'Terms and conditions for using GoStudio.ai AI product photography services. Learn about our service terms, user rights, and policies.',
  keywords: 'terms of service, terms and conditions, GoStudio.ai terms, AI photography terms, user agreement',
  openGraph: {
    title: 'Terms of Service | GoStudio.ai',
    description: 'Terms and conditions for using GoStudio.ai AI product photography services.',
    type: 'website',
    images: ['/og.png'],
  }
}

const TermsOfService: React.FC = () => {
  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px] py-8 sm:py-12">
        <div className="w-full max-w-[1276px] mx-auto bg-white rounded-[24px] p-6 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 font-jakarta">Terms of Service</h1>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Acceptance of Terms of Service</h2>
            <p className="text-gray-600 mb-4">
              Welcome to GoStudio.ai ("we", "us", "our"). By using our website and the services provided through gostudio.ai (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms", "ToS"), including our Privacy Policy and any additional terms and conditions and policies referenced herein and/or available by hyperlink.
            </p>
            <p className="text-gray-600 mb-4">
              Please read these Terms carefully before accessing or using our Service. By accessing or using any part of the Service, you agree to be bound by these Terms. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Use of the Service</h2>
            <p className="text-gray-600 mb-4">
              GoStudio.ai allows users to upload photos and generate professional product photos and headshots. The Service is available to users who are at least 13 years of age, unless otherwise specified in your local jurisdiction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">User Accounts</h2>
            <p className="text-gray-600 mb-4">
              To access certain features of the Service, you may be required to create an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">User Content</h2>
            <p className="text-gray-600 mb-4">
              You retain all rights in, and are solely responsible for, the photos and content you upload to GoStudio.ai. By uploading content, you grant GoStudio.ai a non-exclusive, worldwide, royalty-free license to use, modify, publicly perform, publicly display, reproduce, and distribute your content on and through the Service solely for the purpose of operating and providing the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Purchases and Payments</h2>
            <p className="text-gray-600 mb-4">
              GoStudio.ai allows users to purchase credits that can be used to generate and edit photos. These purchases are processed securely through Stripe, a third-party payment processor.
            </p>
            <p className="text-gray-600 mb-4">
              By choosing to purchase credits, you agree to provide accurate and complete payment information and confirm that you are authorized to use the payment method. You also agree to allow us to charge your payment method for the total amount of your purchase, including any applicable taxes and fees.
            </p>
            <p className="text-gray-600 mb-4">
              All purchases are final and non-refundable, except at our sole discretion and in accordance with the rules governing each specific transaction. If you believe that you have been charged in error, you must contact us within 30 days of such charge. No refunds will be given for any charges more than 30 days old.
            </p>
            <p className="text-gray-600 mb-4">
              We reserve the right to refuse or cancel your order at any time for reasons including but not limited to: product or service availability, errors in the description or price of the product or service, error in your order, or other reasons.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Intellectual Property</h2>
            <p className="text-gray-600 mb-4">
              The Service and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of GoStudio.ai and its licensors.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Prohibited Uses</h2>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              <li>In any way that violates any applicable national or international law or regulation</li>
              <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way</li>
              <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Termination</h2>
            <p className="text-gray-600 mb-4">
              We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach the Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Disclaimer</h2>
            <p className="text-gray-600 mb-4">
              The Service is provided on an "AS IS" and "AS AVAILABLE" basis. We disclaim all warranties, express or implied, of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              In no event shall GoStudio.ai, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Changes</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms, please contact us at hello@gostudio.ai.
            </p>
          </section>

          <div className="text-sm text-gray-500 mt-12">
            Last Updated: February 2024
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService; 