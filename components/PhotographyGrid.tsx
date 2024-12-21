import React from 'react';

interface PhotoCardProps {
  imageUrl: string;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ imageUrl }) => (
  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
    <img 
      src={imageUrl || "/api/placeholder/400/500"} 
      className="w-full h-full object-cover"
      alt="Photography pack"
    />
  </div>
);

const PhotographyGrid = () => {
  const photos = [
    { imageUrl: '/pack/img1.png' },
    { imageUrl: '/pack/img2.png' },
    { imageUrl: '/pack/img3.png' },
    { imageUrl: '/pack/img4.png' },
    { imageUrl: '/pack/img5.png' },
    { imageUrl: '/pack/img6.png' },
    { imageUrl: '/pack/img7.png' },
    { imageUrl: '/pack/img8.png' },
    { imageUrl: '/pack/img9.png' },
    { imageUrl: '/pack/img10.png' },
    { imageUrl: '/pack/img11.png' },
    { imageUrl: '/pack/img12.png' }
  ];

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px] py-16">
        <div className="text-center mb-8">
          <h1 className="mx-auto w-full md:w-[600px] h-auto md:h-[48px] font-[500] text-[32px] leading-[48px] text-center text-[#161C2D] font-poppins mb-4">
            OUR PACKS-YOU NAME IT, WE HAVE IT.
          </h1>
          <p className="mx-auto w-full md:w-[992px] h-auto md:h-[54px] font-[400] text-[18px] leading-[27px] tracking-[-0.04em] text-center text-[#161C2D] font-poppins">
            Explore our complete range of photography packs, crafted to suit every style and need. 
            From professional portraits to creative edits, we've got it all covered. 
            Whatever your vision, our AI photographer brings it to life effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4 lg:gap-6">
          {photos.map((photo, index) => (
            <PhotoCard
              key={index}
              imageUrl={photo.imageUrl}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="w-full md:w-auto bg-[#5B16FE] hover:bg-[#4F46E5] text-white font-medium py-3 px-6 md:px-12 rounded-full transition-colors duration-200">
            Explore More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotographyGrid;