import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useImageCache } from '../hooks/useImageCache';
import { motion } from 'framer-motion';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E'
}) => {
  const { targetRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
    rootMargin: '50px'
  });
  
  const { getImage } = useImageCache();
  const [imageSrc, setImageSrc] = React.useState(placeholder);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (isIntersecting) {
      getImage(src).then(url => {
        setImageSrc(url);
      });
    }
  }, [isIntersecting, src, getImage]);

  return (
    <motion.div
      ref={targetRef as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0 }}
      animate={{ opacity: isLoaded ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className={className}
      style={{ width, height }}
    >
      <img
        src={imageSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        width={width}
        height={height}
      />
    </motion.div>
  );
};

export default LazyImage;