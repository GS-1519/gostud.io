import React from 'react';

const RefundPolicy: React.FC = () => {
  return (
    <div className="w-full bg-[#F4F7FA] min-h-screen font-poppins">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px] py-8 sm:py-12">
        <div className="w-full max-w-[1276px] mx-auto bg-white rounded-[24px] p-6 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 font-jakarta">Refund Policy</h1>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Our Policy</h2>
            <p className="text-gray-600 mb-4">
              At GoStudio.ai, we want you to be completely satisfied with our services. We offer a straightforward, no-questions-asked refund policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Refund Terms</h2>
            <p className="text-gray-600 mb-4">
              You can request a full refund within 7 days of your purchase. No questions asked, no complicated procedures.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              <li>Refund requests must be made within 7 days of purchase</li>
              <li>Refunds will be processed to the original payment method</li>
              <li>Refund processing typically takes 5-10 business days</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">How to Request a Refund</h2>
            <p className="text-gray-600 mb-4">
              To request a refund, simply email us at hello@gostudio.ai with your order details. Our team will process your refund as quickly as possible.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 font-jakarta">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about our refund policy, please contact us at hello@gostudio.ai.
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

export default RefundPolicy; 