import Image from 'next/image';
import React from 'react';

const BrandLogos = () => {
  const brands = [
    {
      name: 'Weybee',
      imgUrl: '/logo1.png',
      color: '#FF6B6B'
    },
    {
      name: 'Brew and Beans',
      imgUrl: '/logo2.png',
      color: '#4D4D4D'
    },
    {
      name: 'Avadh Group',
      imgUrl: '/logo6.png',
      color: '#00A0DC'
    },
    {
      name: 'Craft Cart',
      imgUrl: '/logo3.png',
      color: '#4A90E2'
    },
    {
      name: 'Serene Stays',
      imgUrl: '/logo4.png',
      color: '#E50914'
    },
    {
      name: 'Green Valley Grocery',
      imgUrl: '/logo5.png',
      color: '#00A0DC'
    },

  ];

  return (
    <div className="w-screen mx-auto py-12 bg-white">
      <h2 className="text-4xl font-bold text-gray-900 text-center tracking-wider mb-8">
          Trusted by Businesses like
        </h2>
      
      <div className="flex flex-wrap justify-center items-center gap-12 px-4">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="group relative transition-all duration-300 ease-in-out cursor-pointer"
          >
            <div className="w-32 h-32 flex items-center justify-center transform transition-all duration-300 group-hover:-translate-y-2">
              <Image
                src={brand.imgUrl}
                width={500}
                height={500}
                alt={`${brand.name} logo`}
                className="w-full h-full object-contain transition-all duration-300 filter grayscale group-hover:grayscale-0"
                style={{
                  '--hover-color': brand.color
                } as React.CSSProperties}
              />
            </div>
            <div 
              className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-200 group-hover:w-full transition-all duration-300"
              style={{ 
                backgroundColor: 'var(--hover-color)',
                opacity: 0,
                transition: 'opacity 0.3s, width 0.3s',
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandLogos;