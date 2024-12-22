import React from 'react';

const Gallery = () => {
  // Gallery images data
  const images = [
    { src: '/api/placeholder/400/400', isLarge: false, alt: 'Doctor portrait' },
    { src: '/api/placeholder/400/400', isLarge: false, alt: 'Woman with flowers' },
    { src: '/api/placeholder/400/600', isLarge: true, alt: 'Business man' },
    { src: '/api/placeholder/400/400', isLarge: false, alt: 'Pop art portrait' },
    { src: '/api/placeholder/400/400', isLarge: false, alt: 'Dog outdoors' },
    { src: '/api/placeholder/400/600', isLarge: true, alt: 'Evening portrait' },
    { src: '/api/placeholder/400/400', isLarge: false, alt: 'Professional woman' },
    { src: '/api/placeholder/400/600', isLarge: true, alt: 'Doctor consultation' }
  ];

  // Function to organize images into columns
  const getColumnImages = (columnCount) => {
    const columns = Array.from({ length: columnCount }, () => []);
    images.forEach((image, index) => {
      columns[index % columnCount].push(image);
    });
    return columns;
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12 pt-8 sm:pt-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            TAKE A SNEAK PEEK INTO MY CREATIONS
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            I'm excited to share a glimpse of my work with you.
          </p>
        </div>

        {/* Desktop Layout (4 columns) */}
        <div className="hidden md:flex gap-4">
          {getColumnImages(4).map((column, columnIndex) => (
            <div key={`desktop-${columnIndex}`} className="flex-1 flex flex-col gap-4">
              {column.map((image, imageIndex) => (
                <div 
                  key={`desktop-${columnIndex}-${imageIndex}`} 
                  className={`w-full rounded-xl overflow-hidden group relative transition-transform duration-200 hover:scale-[1.02] ${
                    image.isLarge ? 'h-[375px]' : 'h-[300px]'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Mobile Layout (2 columns) */}
        <div className="md:hidden flex gap-4">
          {getColumnImages(2).map((column, columnIndex) => (
            <div key={`mobile-${columnIndex}`} className="flex-1 flex flex-col gap-4">
              {column.map((image, imageIndex) => (
                <div 
                  key={`mobile-${columnIndex}-${imageIndex}`} 
                  className={`w-full rounded-xl overflow-hidden group relative transition-transform duration-200 hover:scale-[1.02] ${
                    image.isLarge ? 'h-[375px]' : 'h-[300px]'
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;