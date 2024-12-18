import React from 'react';

interface PhotoCardProps {
  title: string;
  imageUrl: string;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ title, imageUrl }) => (
  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
    <img 
      src={imageUrl || "/api/placeholder/400/500"} 
      className="w-full h-full object-cover"
      alt={title}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    <div className="absolute bottom-4 left-4 text-white font-medium">
      {title}
    </div>
  </div>
);

const PhotographyGrid = () => {
  const photos = [
    { title: 'Corporate Headshots', imageUrl: '/pack/img1.png' },
    { title: 'Speaker', imageUrl: '/pack/img2.png' },
    { title: 'MD Doctor', imageUrl: '/pack/img3.png' },
    { title: 'Realtor', imageUrl: '/pack/img4.png' },
    { title: 'Dating', imageUrl: '/pack/img5.png' },
    { title: 'Red Carpet', imageUrl: '/pack/img6.png' },
    { title: 'Tattoos', imageUrl: '/pack/img7.png' },
    { title: 'Bold Colors', imageUrl: '/pack/img8.png' },
    { title: 'Glamour shot', imageUrl: '/pack/img9.png' },
    { title: 'Mythical Creatures', imageUrl: '/pack/img10.png' },
    { title: 'Barbie', imageUrl: '/pack/img11.png' },
    { title: 'Halloween', imageUrl: '/pack/img12.png' }
  ];

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[82px] py-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4 text-[#1E293B]">
            OUR PACKS-YOU NAME IT, WE HAVE IT.
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore our complete range of photography packs, crafted to suit every style and need. 
            From professional portraits to creative edits, we've got it all covered. 
            Whatever your vision, our AI photographer brings it to life effortlessly.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-6">
          {photos.map((photo, index) => (
            <PhotoCard
              key={index}
              title={photo.title}
              imageUrl={photo.imageUrl}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white font-medium py-3 px-8 rounded-full transition-colors duration-200">
            Explore More →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotographyGrid;