import React from 'react';
import Image from 'next/image';
import AI from "@/public/logo/AI.svg";

// Add these utility functions at the top of the file
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Add this shuffle utility function
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// First, let's define the type for our testimonial
interface Testimonial {
  name: string;
  image: string;
  date: string;
  rating: number;
  text?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Priya Sharma",
    image: "/homepage-reviews/professional-woman-13.jpg",
    date: "Aug 2024",
    rating: 4.5,
    text: "As a media personality, I was skeptical about AI enhancement, but the results are stunning! Used it for my recent magazine feature and social media profiles. The consistency across platforms is exactly what I needed. ✨"
  },
  {
    name: "David Rosenberg",
    image: "/homepage-reviews/professional-man15.jpg",
    date: "Aug 2024",
    rating: 4.5,
    text: "Being in commercial real estate, my profile photo shows up everywhere - from business cards to building proposals. GoStudio helped me achieve that perfect balance of approachable yet professional. Great investment! 🏢"
  },
  {
    name: "Maya Patel",
    image: "/homepage-reviews/professional-woman9.jpg",
    date: "Sept 2024",
    rating: 5,
    text: "Starting my career in investment banking, I needed to look polished yet approachable. GoStudio helped me strike that perfect balance. My headshot now looks like it belongs in the company's annual report! 📊"
  },
  {
    name: "Alessandro Conti",
    image: "/homepage-reviews/professional-man19.jpg",
    date: "Aug 2024",
    rating: 5,
    text: "Ho provato diversi servizi, ma GoStudio è stato il migliore. Perfetto per il mio profilo da docente universitario e per le conferenze internazionali. Eccezionale! 🎓"
  },
  {
    name: "Christina Mueller",
    image: "/homepage-reviews/professional-woman10.jpg",
    date: "Oct 2024",
    rating: 4.5,
    text: "Einfach fantastisch! As a business coach, my photo needs to convey tr and experience. GoStudio delivered exactly that - and so quickly! Now using it across all my marketing materials. Danke! ⭐"
  },
  {
    name: "Christopher Bennett",
    image: "/homepage-reviews/professional-man5.jpg",
    date: "Oct 2024",
    rating: 5,
    text: "Had been putting off getting a new headshot for years (who has the time?). My daughter suggested GoStudio - took me 5 minutes to upload and the results came back looking better than my last professional shoot from 2019. Brilliant service."
  },
  {
    name: "Isabella Romano",
    image: "/homepage-reviews/professional-woman.jpg",
    date: "Sept 2024",
    rating: 4.5,
    text: "Come responsabile delle vendite internazionali, avevo bisogno di una foto che trasmettesse professionalità e affidabilità. GoStudio ha superato le mie aspettative. Perfetto per il mio personal branding! 🌍"
  },
  {
    name: "Matthew Sullivan",
    image: "/homepage-reviews/professional-man1.jpg",
    date: "Oct 2024",
    rating: 5,
    text: "Working at Deloitte means every detail matters. Got this done for our team of 15 - the consistency in lighting and background made our 'Meet the Team' page look incredibly professional. No more mismatched headshots!"
  },
//   {
//     name: "Elena Petrova",
//     image: "/homepage-reviews/dating-woman-1.jpg",
//     date: "Sept 2024",
//     rating: 5,
//     text: "Превосходное качество! Used the enhanced photos for both our Moscow and London offices' website. The consistency across all regional teams is exactly what our firm needed. Professional, elegant, and worth every penny. Спасибо! 🌟"
//   },
  {
    name: "Eric Schmidt",
    image: "/homepage-reviews/professional-man6.jpg",
    date: "November 2024",
    rating: 5,
    text: "As a startup founder, I needed something quick and professional for our pitch deck. GoStudio delivered exactly what I needed in minutes. Investors actually commented on how polished our team photos looked! 🚀"
 },
  {
    name: "Rachel Goldstein",
    image: "/homepage-reviews/photoshoot-women-fullshot.jpg",
    date: "November 2024",
    rating: 5,
    text: "Quick story - had a last-minute speaker bio needed for a tech conference in San Francisco. Got my photo enhanced during my Uber ride there. The organizers literally asked which studio I used! 😄"
  },
  {
    name: "Emmanuel Okonjo",
    image: "/homepage-reviews/professional-man16.jpg",
    date: "November 2024",
    rating: 5,
    text: "Running a tech consultancy means I'm always on video calls with clients. Really impressed with how GoStudio enhanced my headshot while keeping it natural. Even my LinkedIn connection requests increased! 💻"
  },
  {
    name: "Amir Khoury",
    image: "/homepage-reviews/dating-man6.jpg",
    date: "Sept 2024",
    rating: 5,
    text: "As a wealth management advisor in Dubai, I needed photos that would resonate with international clients. GoStudio transformed my casual office photo into something that belongs on a Bloomberg terminal. Worth every dirham!"
  },
];

// Star SVG Components
const FullStar = () => (
    <svg 
      className="w-[18px] h-[18px]" 
      viewBox="0 0 18 18" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M8.49751 1.44954C8.77008 0.877484 9.61123 0.877484 9.8838 1.44954L11.8264 5.53644C11.9265 5.74772 12.1282 5.89608 12.3617 5.92899L16.8859 6.61635C17.5235 6.71384 17.7835 7.50961 17.3197 7.95557L14.0497 11.1C13.8818 11.2616 13.8063 11.4974 13.8456 11.7298L14.6705 16.2301C14.7857 16.8641 14.1093 17.3537 13.5381 17.0486L9.49674 14.8991C9.28641 14.7863 9.03491 14.7863 8.82457 14.8991L4.78324 17.0486C4.21203 17.3537 3.53562 16.8641 3.65077 16.2301L4.47573 11.7298C4.51498 11.4974 4.43951 11.2616 4.27161 11.1L1.00163 7.95557C0.537826 7.50961 0.797863 6.71384 1.43544 6.61635L5.95959 5.92899C6.19312 5.89608 6.39483 5.74772 6.49494 5.53644L8.49751 1.44954Z" 
        fill="#FFB800"
      />
    </svg>
  );
  
  const HalfStar = () => (
    <svg 
      className="w-[18px] h-[18px]" 
      viewBox="0 0 18 18" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gray background star */}
      <path 
        d="M8.49751 1.44954C8.77008 0.877484 9.61123 0.877484 9.8838 1.44954L11.8264 5.53644C11.9265 5.74772 12.1282 5.89608 12.3617 5.92899L16.8859 6.61635C17.5235 6.71384 17.7835 7.50961 17.3197 7.95557L14.0497 11.1C13.8818 11.2616 13.8063 11.4974 13.8456 11.7298L14.6705 16.2301C14.7857 16.8641 14.1093 17.3537 13.5381 17.0486L9.49674 14.8991C9.28641 14.7863 9.03491 14.7863 8.82457 14.8991L4.78324 17.0486C4.21203 17.3537 3.53562 16.8641 3.65077 16.2301L4.47573 11.7298C4.51498 11.4974 4.43951 11.2616 4.27161 11.1L1.00163 7.95557C0.537826 7.50961 0.797863 6.71384 1.43544 6.61635L5.95959 5.92899C6.19312 5.89608 6.39483 5.74772 6.49494 5.53644L8.49751 1.44954Z" 
        fill="#D9D9D9"
      />
      {/* Yellow half star overlay */}
      <mask id="half-star-mask">
        <rect x="0" y="0" width="9" height="18" fill="white"/>
      </mask>
      <path 
        d="M8.49751 1.44954C8.77008 0.877484 9.61123 0.877484 9.8838 1.44954L11.8264 5.53644C11.9265 5.74772 12.1282 5.89608 12.3617 5.92899L16.8859 6.61635C17.5235 6.71384 17.7835 7.50961 17.3197 7.95557L14.0497 11.1C13.8818 11.2616 13.8063 11.4974 13.8456 11.7298L14.6705 16.2301C14.7857 16.8641 14.1093 17.3537 13.5381 17.0486L9.49674 14.8991C9.28641 14.7863 9.03491 14.7863 8.82457 14.8991L4.78324 17.0486C4.21203 17.3537 3.53562 16.8641 3.65077 16.2301L4.47573 11.7298C4.51498 11.4974 4.43951 11.2616 4.27161 11.1L1.00163 7.95557C0.537826 7.50961 0.797863 6.71384 1.43544 6.61635L5.95959 5.92899C6.19312 5.89608 6.39483 5.74772 6.49494 5.53644L8.49751 1.44954Z" 
        fill="#FFB800"
        mask="url(#half-star-mask)"
      />
    </svg>
  );
  
  const EmptyStar = () => (
    <svg 
      className="w-[18px] h-[18px]" 
      viewBox="0 0 18 18" 
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
        d="M8.49751 1.44954C8.77008 0.877484 9.61123 0.877484 9.8838 1.44954L11.8264 5.53644C11.9265 5.74772 12.1282 5.89608 12.3617 5.92899L16.8859 6.61635C17.5235 6.71384 17.7835 7.50961 17.3197 7.95557L14.0497 11.1C13.8818 11.2616 13.8063 11.4974 13.8456 11.7298L14.6705 16.2301C14.7857 16.8641 14.1093 17.3537 13.5381 17.0486L9.49674 14.8991C9.28641 14.7863 9.03491 14.7863 8.82457 14.8991L4.78324 17.0486C4.21203 17.3537 3.53562 16.8641 3.65077 16.2301L4.47573 11.7298C4.51498 11.4974 4.43951 11.2616 4.27161 11.1L1.00163 7.95557C0.537826 7.50961 0.797863 6.71384 1.43544 6.61635L5.95959 5.92899C6.19312 5.89608 6.39483 5.74772 6.49494 5.53644L8.49751 1.44954Z" 
        fill="#D9D9D9"
      />
    </svg>
  );
  
  // Update the RatingStars component to ensure it handles the rating properly
const RatingStars = ({ rating }: { rating: number }) => {
    return (
        <div className="flex gap-[2px]">
            {[...Array(5)].map((_, index) => {
                const value = index + 1;
                if (value <= rating) {
                    // Full star for values less than or equal to rating
                    return <FullStar key={`star-${index}`} />;
                } else if (value - rating <= 0.5 && value - rating > 0) {
                    // Half star when difference is 0.5 or less but greater than 0
                    return <HalfStar key={`star-${index}`} />;
                } else {
                    // Empty star for all other cases
                    return <EmptyStar key={`star-${index}`} />;
                }
            })}
        </div>
    );
};
  
  
  // Add this interface
  interface ReviewCardProps {
    review: Testimonial;
  }
  
  // Update the ReviewCard component to explicitly pass the rating
const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
    return (
      <div className="break-inside-avoid mb-4 rounded-[24px] border border-[rgba(10,23,39,0.1)] overflow-hidden bg-white">
        {review.image && (
          <div className="relative w-full aspect-[4/5]">
            <Image
              src={review.image}
              alt={`${review.name}'s headshot`}
              layout="fill"
              objectFit="cover"
              className="object-center"
            />
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
              <Image src={AI} alt="AI Logo" width={60} height={16} className="w-[60px] h-[16px] sm:w-[90px] sm:h-[25px]" />
            </div>
          </div>
        )}
        
        <div className="p-5 sm:p-6 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-base sm:text-lg text-gray-900">{review.name}</h3>
            <span className="text-xs text-gray-500">{review.date}</span>
          </div>
          
          <div className="flex gap-[2px]">
            <RatingStars rating={review.rating} />
          </div>
          
          {review.text && (
            <p className="text-[15px] leading-[22px] text-[#475467]">{review.text}</p>
          )}
        </div>
      </div>
    );
  };
  

  const ReviewSection = () => {
    // Generate random numbers within realistic ranges
    const photosCreated = formatNumber(getRandomNumber(12000, 15000));
    const happyCustomers = formatNumber(getRandomNumber(2800, 3500));
  
    // Shuffle testimonials
    const shuffledTestimonials = shuffleArray(testimonials);

    return (
      <div className="w-full max-w-[1276px] mx-auto bg-white rounded-[24px] sm:rounded-[60px] py-[18px] sm:py-20 px-4 sm:px-8 lg:px-10 font-poppins">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-6">
            <h2 className="text-gray-500 font-semibold font-jakarta">TESTIMONIALS</h2>
            
            <h1 className="text-3xl sm:text-5xl font-bold font-jakarta">
              <span className="bg-gradient-to-r from-[#7160FF] to-[#B19FFF] text-transparent bg-clip-text">{photosCreated}</span> headshots already created
              <br/>
              <span className="bg-gradient-to-r from-[#00B6D0] to-[#53E0FF] text-transparent bg-clip-text">{happyCustomers}</span> happy customers 
            </h1>
            
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
              Transform your photos into polished, professional headshots in minutes. Join thousands of professionals 
              who trust our AI to create studio-quality portraits that enhance their personal brand and make the right first impression.
            </p>
          </div>
  
          {/* Reviews Grid - now using shuffled testimonials */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {shuffledTestimonials.map((review, index) => (
              <ReviewCard key={`${review.name}-${index}`} review={review} />
            ))}
          </div>

          {/* View More Link */}
          {/* <div className="flex justify-center pt-8">
            <Link 
              href="/reviews" 
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-[#7160FF] hover:bg-[#5B4CCC] transition-colors duration-200 rounded-full"
            >
              View Our Photography
            </Link>
          </div> */}
        </div>
      </div>
    );
  };
  
  export default ReviewSection;