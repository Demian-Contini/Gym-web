
// ---------- Seccion Carousel ----------
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  images: string[];
  title?: string;
  description?: string;
}

export default function ImageCarousel({ images, title, description }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Autoplay: avanza cada 5s, se pausa si el usuario interactúa
  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
      if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    };
    // eslint-disable-next-line
  }, [currentIndex, images.length]);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // ---------> Cambia de imagen cada 5 segundos
  };
  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = null;
  };
  const pauseAutoplay = () => {
    stopAutoplay();
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => {
      startAutoplay();
    }, 3000);
  };

  // Swipe handlers solo para touch
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe izquierda: siguiente
        setCurrentIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      } else {
        // Swipe derecha: anterior
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      }
      pauseAutoplay();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Pausa autoplay cuando el usuario interactúa con botones
  const handleInteraction = () => {
    pauseAutoplay();
  };

  const goToPrevious = () => {
    handleInteraction();
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    handleInteraction();
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    handleInteraction();
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      {title && (
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 md:mb-6 text-center">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-gray-700 text-center mb-6 md:mb-8 text-lg md:text-xl max-w-3xl mx-auto">
          {description}
        </p>
      )}
      
      <div className="relative overflow-hidden rounded-xl shadow-2xl">
        {/* Imagen principal */}
        <div
          className="relative h-80 md:h-96 lg:h-[600px] xl:h-[700px] select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                index === currentIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              <Image
                src={image}
                alt={`Imagen ${index + 1}`}
                width={1200}
                height={800}
                className="w-full h-full object-cover"
                priority={index === 0}
                quality={90}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 md:left-4 lg:left-8 top-1/2 transform -translate-y-1/2 
            text-white p-2 md:p-3 lg:p-4 rounded-full 
            bg-transparent hover:bg-white/10 transition-all duration-300 active:scale-95 hover:scale-110 z-10
            touch-manipulation"
          aria-label="Imagen anterior"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 md:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 
            text-white p-2 md:p-3 lg:p-4 rounded-full 
            bg-transparent hover:bg-white/10 transition-all duration-300 active:scale-95 hover:scale-110 z-10
            touch-manipulation"
          aria-label="Siguiente imagen"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Contador de imágenes */}
        <div className="absolute top-4 md:top-6 right-4 md:right-6 bg-black/60 backdrop-blur-sm 
          text-white px-3 py-2 rounded-full text-sm md:text-base font-medium z-10">
          {currentIndex + 1} / {images.length}
        </div>


      </div>
    </div>
  );
} 