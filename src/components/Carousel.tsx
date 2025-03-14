import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useCarousel } from '../hooks/useCarousel';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Carousel: React.FC = () => {
  const { images, loading } = useCarousel();

  if (loading) {
    return (
      <div className="relative h-[500px] md:h-[600px] bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="relative h-[500px] md:h-[600px] bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Aucune image dans le carrousel.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[500px] md:h-[600px]"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <div className="relative w-full h-full">
              <img 
                src={image.url || `/uploads/carousel/${image.file_path}`} 
                alt={image.alt} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                    {image.title}
                  </h2>
                  <p className="text-xl md:text-2xl max-w-3xl mx-auto">
                    Tradition, amitié et festivités au cœur du village
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;