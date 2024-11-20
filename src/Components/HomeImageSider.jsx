// src/components/HomeSlideshow.jsx
// src/components/Slideshow.jsx
import React from 'react';
import Slider from 'react-slick';

const Slideshow = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slides = [
    {
      img: '/images/banner41.jpg',
      
    },
    {
      img: '/images/Banner2.webp',
      
    },
    {
      img: '/images/banner5.jpg',
      
    },
    {
      img: '/images/banner3.webp',
      
    },
  ];

  return (
    <div className="relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <img src={slide.img} alt={`Slide ${index + 1}`} className="w-full h-auto object-cover" />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-4xl font-bold text-center px-4">{slide.text}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slideshow;