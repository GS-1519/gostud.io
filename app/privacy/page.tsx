import React from 'react';
import type { Metadata } from 'next'

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
  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px] py-8 sm:py-12">
        <div className="w-full max-w-[1276px] mx-auto bg-white rounded-[24px] p-6 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 font-jakarta">Privacy Policy</h1>
          
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Introduction</h2>
            <p className="text-gray-600 mb-4">
              This Privacy Policy describes how your personal information is collected, used, and shared when you visit or use our services at GoStudio.ai (the "Site"). This policy is particularly important as we handle image data and provide photo processing services. We are based in Bengaluru, India, and operate in accordance with Indian data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Personal Information We Collect</h2>
            <p className="text-gray-600 mb-4">When you visit the Site, we automatically collect certain information about your device, including:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              <li>Information about your web browser</li>
              <li>IP address</li>
              <li>Time zone</li>
              <li>Cookies installed on your device</li>
            </ul>
            <p className="text-gray-600 mb-4">Additionally, as you use the Site, we collect:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              <li>Information about the pages you view</li>
              <li>Referring websites or search terms</li>
              <li>How you interact with the Site</li>
              <li>Images and photos you upload for processing</li>
              <li>Any metadata associated with uploaded images</li>
            </ul>
            <p className="text-gray-600">We refer to the automatically-collected information as "Device Information" and the uploaded images and related data as "Image Data."</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Usage of Personal Information</h2>
            <p className="text-gray-600 mb-4">We use the collected information to:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              <li>Process and enhance your uploaded images</li>
              <li>Provide you with the resulting product photos or headshots</li>
              <li>Process your payments and provide invoices/confirmations</li>
              <li>Communicate with you about your orders and services</li>
              <li>Screen for potential risk or fraud</li>
              <li>Improve and optimize our Site and services</li>
              <li>Analyze how customers use our platform</li>
              <li>Assess the success of our marketing campaigns</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Image Data Processing</h2>
            <p className="text-gray-600 mb-4">We take special care with your Image Data:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              <li>Images are processed using secure servers</li>
              <li>Original images are retained only for the duration necessary to complete the service</li>
              <li>Processed images are stored securely and accessible only to authorized personnel</li>
              <li>We implement appropriate technical measures to protect your Image Data</li>
              <li>We do not use your images for any purpose other than providing our services unless explicitly authorized</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Information Sharing</h2>
            <p className="text-gray-600 mb-4">We share your Personal Information with third parties only when necessary:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              <li>Payment processing partners to handle transactions</li>
              <li>Analytics providers to improve our services</li>
              <li>Cloud storage providers to securely store and process images</li>
              <li>Compliance with applicable laws and regulations</li>
              <li>Response to legal requests (subpoenas, court orders, etc.)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Data Storage and International Transfers</h2>
            <p className="text-gray-600 mb-4">
              Our primary operations are based in Bengaluru, India. However, we may transfer data internationally to provide our services. When we do so, we ensure appropriate safeguards are in place to protect your information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Anonymous Performance Data</h2>
            <p className="text-gray-600 mb-4">We collect anonymous performance data to assess platform and content delivery network performance, including:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              <li>Page load times</li>
              <li>Image processing speeds</li>
              <li>Content delivery efficiency</li>
            </ul>
            <p className="text-gray-600">This data is completely anonymous and contains no personal information.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Do Not Track</h2>
            <p className="text-gray-600 mb-4">
              We do not alter our site's data collection and use practices when we see a Do Not Track signal from your browser.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Legal Basis for Processing</h2>
            <p className="text-gray-600 mb-4">We process your personal information under the following legal bases:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              <li>Your consent</li>
              <li>Contract performance</li>
              <li>Legal obligations</li>
              <li>Legitimate business interests</li>
              <li>Protection of vital interests</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Your Rights</h2>
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to our processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Exercising Your Rights</h2>
            <p className="text-gray-600 mb-4">
              To exercise these rights or raise concerns, contact us at hello@gostudio.ai. We aim to respond to all legitimate requests within 30 days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Changes to Privacy Policy</h2>
            <p className="text-gray-600 mb-4">
              We may update this Privacy Policy from time to time. Any changes will be posted online with an effective date. Continued use of our services after changes constitutes acceptance of those changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Compliance with Indian Laws</h2>
            <p className="text-gray-600 mb-4">We comply with applicable Indian data protection laws, including:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              <li>Information Technology Act, 2000</li>
              <li>Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</li>
              <li>Other applicable data protection regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Contact Information</h2>
            <p className="text-gray-600 mb-4">For privacy-related inquiries:</p>
            <p className="text-gray-600 mb-2">Email: hello@gostudio.ai</p>
            {/* <p className="text-gray-600">Address: Bengaluru, India</p> */}
          </section>

          <div className="text-sm text-gray-500 mt-12">
            Last Updated: February 2024
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;