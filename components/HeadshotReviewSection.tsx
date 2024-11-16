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
    name: "Sophie Laurent",
    image: "/homepage-reviews/professional-woman-13.jpg",
    date: "March 2024",
    rating: 5,
    text: "En tant que directrice marketing, je cherchais une solution pour harmoniser les photos de notre équipe internationale. Résultat parfait, délai record ! 🌟"
  },
  {
    name: "James Chen",
    image: "/homepage-reviews/professional-man15.jpg",
    date: "March 2024",
    rating: 5,
  },
  {
    name: "Maria Rodriguez",
    image: "/homepage-reviews/professional-woman9.jpg",
    date: "February 2024",
    rating: 5,
    text: "Perfect for my LinkedIn profile! The AI enhancement made my professional headshot look like it was taken in a studio. Amazing technology! ✨"
  },
  {
    name: "David Park",
    image: "/homepage-reviews/professional-man19.jpg",
    date: "March 2024",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    image: "/homepage-reviews/professional-woman10.jpg",
    date: "March 2024",
    rating: 5,
    text: "As a real estate agent, my profile photo is crucial. GoStudio helped me achieve a polished, trustworthy look. Thank you! 🏠"
  },
  {
    name: "Michael O'Brien",
    image: "/homepage-reviews/professional-man5.jpg",
    date: "March 2024",
    rating: 5,
    text: "Quick, efficient, and professional. Transformed my casual photo into a perfect corporate headshot. Exactly what I needed! 🎯"
  },
  {
    name: "Sarah Williams",
    image: "/homepage-reviews/professional-woman.jpg",
    date: "February 2024",
    rating: 5,
    text: "I was skeptical about AI photo enhancement, but the results blew me away. My dating profile looks so much more professional now! 📸"
  },
  {
    name: "Thomas Anderson",
    image: "/homepage-reviews/professional-man1.jpg",
    date: "March 2024",
    rating: 5,
    text: "Our entire sales team got their photos done through GoStudio. Consistent, professional, and incredibly cost-effective! 🚀"
  },
//   {
//     name: "Lisa Zhang",
//     image: "/homepage-reviews/dating-woman-1.jpg",
//     date: "February 2024",
//     rating: 5,
//     text: "The photo enhancement is subtle yet impactful. Perfect for both professional and social media use. Love the natural look! ❤️"
//   },
  {
    name: "Robert Martinez",
    image: "/homepage-reviews/professional-man6.jpg",
    date: "March 2024",
    rating: 5,
    text: "As a consultant, first impressions matter. GoStudio helped me nail that professional look for my business portraits. Exceptional service! 💼"
  },
  {
    name: "Jennifer Kumar",
    image: "/homepage-reviews/photoshoot-women-fullshot.jpg",
    date: "March 2024",
    rating: 5,
    text: "Used it for our company's about page. The whole process was seamless, and the results are stunning. Great investment! 🌟"
  },
  {
    name: "Alex Thompson",
    image: "/homepage-reviews/professional-man16.jpg",
    date: "March 2024",
    rating: 5,
    text: "The AI enhancement made my headshot look like it was taken by a professional photographer. Amazing value for money! 📊"
  },
  {
    name: "Daniel Lee",
    image: "/homepage-reviews/dating-man6.jpg",
    date: "February 2024",
    rating: 5,
    text: "Finally found a solution that makes professional headshots accessible and affordable. Game-changer for freelancers like me! 🎯"
  }
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
      <path 
        d="M8.49751 1.44954C8.77008 0.877484 9.61123 0.877484 9.8838 1.44954L11.8264 5.53644C11.9265 5.74772 12.1282 5.89608 12.3617 5.92899L16.8859 6.61635C17.5235 6.71384 17.7835 7.50961 17.3197 7.95557L14.0497 11.1C13.8818 11.2616 13.8063 11.4974 13.8456 11.7298L14.6705 16.2301C14.7857 16.8641 14.1093 17.3537 13.5381 17.0486L9.49674 14.8991C9.28641 14.7863 9.03491 14.7863 8.82457 14.8991L4.78324 17.0486C4.21203 17.3537 3.53562 16.8641 3.65077 16.2301L4.47573 11.7298C4.51498 11.4974 4.43951 11.2616 4.27161 11.1L1.00163 7.95557C0.537826 7.50961 0.797863 6.71384 1.43544 6.61635L5.95959 5.92899C6.19312 5.89608 6.39483 5.74772 6.49494 5.53644L8.49751 1.44954Z" 
        fill="url(#half-star)"
      />
      <defs>
        <linearGradient id="half-star" x1="0" x2="18" y1="0" y2="0">
          <stop offset="50%" stopColor="#FFB800" />
          <stop offset="50%" stopColor="#D9D9D9" />
        </linearGradient>
      </defs>
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
    console.log('Rating received:', rating); // Add this for debugging
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);
  
    return (
      <div className="flex gap-[2px]">
        {/* Full stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <FullStar key={`full-${i}`} />
        ))}
        
        {/* Half star */}
        {hasHalfStar && <HalfStar />}
        
        {/* Empty stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <EmptyStar key={`empty-${i}`} />
        ))}
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
            <span className="text-sm text-gray-500">{review.date}</span>
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
              <span className="bg-gradient-to-r from-[#7160FF] to-[#B19FFF] text-transparent bg-clip-text">{photosCreated}</span> Photos already created
              <br/>
              <span className="bg-gradient-to-r from-[#00B6D0] to-[#53E0FF] text-transparent bg-clip-text">{happyCustomers}</span> Happy customers 
            </h1>
            
            <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
              Not made in a studio. Created by AI. Don't just take our word for it. Our AI turns everyday
              photos into professional headshots, that reflect your confidence & credibility.
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