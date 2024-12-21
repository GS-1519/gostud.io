'use client'
import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const StarRating = () => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

// Calculate dimensions based on base unit
const calculateDimensions = {
  baseUnit: 16, // 1rem = 16px
  contentWidth: 308.7 / 16 + 'rem',
  contentHeight: 108.76 / 16 + 'rem',
  textCardWidth: 307.6 / 16 + 'rem',
  textCardHeight: 220.81 / 16 + 'rem',
  padding: 17.67 / 16 + 'rem',
  gap: 11.05 / 16 + 'rem',
  borderRadius: 12 / 16 + 'rem',
  borderWidth: 2 / 16 + 'rem'
};

const AnimatedNumber = ({ end, duration = 2000 }: { end: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = (currentTime - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(end * progress));
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <>{count.toLocaleString()}</>;
};

const TestimoniallGrid = () => {
  const gridStyle = {
    '--content-width': calculateDimensions.contentWidth,
    '--content-height': calculateDimensions.contentHeight,
    '--text-card-width': calculateDimensions.textCardWidth,
    '--text-card-height': calculateDimensions.textCardHeight,
    '--content-padding': calculateDimensions.padding,
    '--grid-gap': calculateDimensions.gap,
    '--border-radius': calculateDimensions.borderRadius,
    '--border-width': calculateDimensions.borderWidth,
  } as React.CSSProperties;

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8" style={gridStyle}>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">
            <span className="text-purple-500"><AnimatedNumber end={80000} /></span> PHOTOS ALREADY CREATED FOR{' '}
            <span className="text-blue-500"><AnimatedNumber end={21000} /></span> HAPPY CUSTOMERS
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Not made in a studio. Created by AI. Don't just take our word for it. Our AI turns everyday photos
            into professional headshots, that reflect your confidence & credibility.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 [gap:var(--grid-gap)]">
          {/* Column #1 */}
          <div className="grid [gap:var(--grid-gap)]">
            <div>
              <div className="relative">
                <img className="h-auto max-w-full rounded-t-lg" src="/testimoniall/img10.png" alt="Doctor headshot" />
              </div>
              <div className="bg-white rounded-b-lg [width:var(--content-width)] [height:var(--content-height)] [padding:var(--content-padding)]">
                <StarRating />
                <p className="mt-2 text-sm">The results are stunning and tailored according to me. These AI headshots are next level.</p>
              </div>
            </div>
            <div className="bg-white [width:var(--text-card-width)] [height:var(--text-card-height)] [padding:var(--content-padding)] [border-radius:var(--border-radius)] [border-width:var(--border-width)] border-solid border-gray-200 shadow">
              <StarRating />
              <p className="mt-2 text-sm">Perfect for my online store! As an online retailer, high-quality product images are crucial.</p>
            </div>
            <div>
              <div className="relative">
                <img className="h-auto max-w-full rounded-t-lg" src="/testimoniall/img7.png" alt="Professional photo" />
              </div>
              <div className="bg-white rounded-b-lg [width:var(--content-width)] [height:var(--content-height)] [padding:var(--content-padding)]">
                <StarRating />
                <p className="mt-2 text-sm">Amazing Product Photo generator site ever!</p>
              </div>
            </div>
          </div>

          {/* Column #2 */}
          <div className="grid [gap:var(--grid-gap)]">
            <div className="bg-white [width:var(--text-card-width)] [height:var(--text-card-height)] [padding:var(--content-padding)] [border-radius:var(--border-radius)] [border-width:var(--border-width)] border-solid border-gray-200 shadow">
              <StarRating />
              <p className="mt-2 text-sm">I love how the platform gives several options after uploading a single image. It's easy to pick a style or background that matches my aesthetic.</p>
            </div>
            <div>
              <div className="relative">
                <img className="h-auto max-w-full rounded-t-lg" src="/testimoniall/img1.png" alt="Man working" />
              </div>
              <div className="bg-white rounded-b-lg [width:var(--content-width)] [height:var(--content-height)] [padding:var(--content-padding)]">
                <StarRating />
                <p className="mt-2 text-sm">A must-have tool for e-commerce!</p>
              </div>
            </div>
            <div>
              <div className="relative">
                <img className="h-auto max-w-full rounded-t-lg" src="/testimoniall/img6.png" alt="Professional woman" />
              </div>
              <div className="bg-white rounded-b-lg [width:var(--content-width)] [height:var(--content-height)] [padding:var(--content-padding)]">
                <StarRating />
                <p className="mt-2 text-sm">Upload once, and you get so many options to pick from.</p>
              </div>
            </div>
            <div className="bg-white [width:var(--text-card-width)] [height:var(--text-card-height)] [padding:var(--content-padding)] [border-radius:var(--border-radius)] [border-width:var(--border-width)] border-solid border-gray-200 shadow">
              <StarRating />
              <p className="mt-2 text-sm">I love how the platform gives several options after uploading a single image. It's easy to pick a style or background that matches my aesthetic.</p>
            </div>
          </div>

          {/* Column #3 */}
          <div className="grid [gap:var(--grid-gap)]">
            <div>
              <div className="relative">
                <img className="h-auto max-w-full rounded-t-lg" src="/testimoniall/img2.png" alt="Woman with flowers" />
              </div>
              <div className="bg-white rounded-b-lg [width:var(--content-width)] [height:var(--content-height)] [padding:var(--content-padding)]">
                <StarRating />
                <p className="mt-2 text-sm">Excellent quality and diversity in photos.</p>
              </div>
            </div>
            <div>
              <div className="relative">
                <img className="h-auto max-w-full rounded-t-lg" src="/testimoniall/img4.png" alt="Business professional" />
              </div>
              <div className="bg-white rounded-b-lg [width:var(--content-width)] [height:var(--content-height)] [padding:var(--content-padding)]">
                <StarRating />
                <p className="mt-2 text-sm">Fast and user-friendly interface. I appreciate how easy this platform is to use.</p>
              </div>
            </div>
            <div className="bg-white [width:var(--text-card-width)] [height:var(--text-card-height)] [padding:var(--content-padding)] [border-radius:var(--border-radius)] [border-width:var(--border-width)] border-solid border-gray-200 shadow">
              <StarRating />
              <p className="mt-2 text-sm">I love how the platform gives several options after uploading a single image. It's easy to pick a style or background that matches my aesthetic.</p>
            </div>
            <div>
              <div className="relative">
                <img className="h-auto max-w-full rounded-t-lg" src="/testimoniall/img8.png" alt="Professional headshot" />
              </div>
              <div className="bg-white rounded-b-lg [width:var(--content-width)] [height:var(--content-height)] [padding:var(--content-padding)]">
                <StarRating />
                <p className="mt-2 text-sm">Great for quick product photos!</p>
              </div>
            </div>
          </div>

          {/* Column #4 */}
          <div className="grid [gap:var(--grid-gap)]">
            <div>
              <div className="relative">
                <img className="h-auto max-w-full rounded-t-lg" src="/testimoniall/img3.png" alt="Professional woman" />
              </div>
              <div className="bg-white rounded-b-lg [width:var(--content-width)] [height:var(--content-height)] [padding:var(--content-padding)]">
                <StarRating />
                <p className="mt-2 text-sm">The AI is incredibly smart at generating diverse images. It's like having a mini photo studio!</p>
              </div>
            </div>
            <div className="bg-white [width:var(--text-card-width)] [height:var(--text-card-height)] [padding:var(--content-padding)] [border-radius:var(--border-radius)] [border-width:var(--border-width)] border-solid border-gray-200 shadow">
              <StarRating />
              <p className="mt-2 text-sm">I love how the platform gives several options after uploading a single image. It's easy to pick a style or background that matches my aesthetic.</p>
            </div>
            <div>
              <div className="relative">
                <img className="h-auto max-w-full rounded-t-lg" src="/testimoniall/img5.png" alt="Smiling woman" />
              </div>
              <div className="bg-white rounded-b-lg [width:var(--content-width)] [height:var(--content-height)] [padding:var(--content-padding)]">
                <StarRating />
                <p className="mt-2 text-sm">Very satisfied with the quick service and quality.</p>
              </div>
            </div>
            <div>
              <div className="relative">
                <img className="h-auto max-w-full rounded-t-lg" src="/testimoniall/img9.png" alt="Smiling woman" />
              </div>
              <div className="bg-white rounded-b-lg [width:var(--content-width)] [height:var(--content-height)] [padding:var(--content-padding)]">
                <StarRating />
                <p className="mt-2 text-sm">Very satisfied with the quick service and quality.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimoniallGrid;