'use client';

import { useState, useEffect } from 'react';

interface ImageCarouselProps {
  images: string[];
  title?: string;
  description?: string;
  autoPlayTrigger?: number;
  isPaused?: boolean;
  onInteraction?: () => void;
}

export default function ImageCarousel({ 
  images, 
  title, 
  description, 
  autoPlayTrigger = 0,
  isPaused = false,
  onInteraction
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función de auto-play con pausa en interacción
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia de imagen cada 5 segundos

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  // Sincronización con el trigger externo
  useEffect(() => {
    setCurrentIndex(autoPlayTrigger % images.length);
  }, [autoPlayTrigger, images.length]);

  // Pausa auto-play cuando el usuario interactúa
  const handleInteraction = () => {
    if (onInteraction) {
      onInteraction();
    }
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
    <div className="relative w-full max-w-5xl mx-auto">
      {title && (
        <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 text-center">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-gray-700 text-center mb-6 px-4">
          {description}
        </p>
      )}
      
      <div className="relative overflow-hidden rounded-xl shadow-2xl">
        {/* Imagen principal*/}
        <div className="relative h-80 sm:h-96 md:h-[500px] lg:h-[600px] xl:h-[700px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                index === currentIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              <img
                src={image}
                alt={`Cambio físico ${index + 1}`}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Botones de navegación  */}
        <button
          onClick={goToPrevious}
          className="absolute left-3 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 
            bg-black/70 backdrop-blur-sm border border-white/30 
            text-white p-3 sm:p-4 rounded-full 
            transition-all duration-300 active:scale-95 
            hover:bg-black/80 hover:scale-110 z-10
            touch-manipulation shadow-lg"
          aria-label="Imagen anterior"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-3 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 
            bg-black/70 backdrop-blur-sm border border-white/30 
            text-white p-3 sm:p-4 rounded-full 
            transition-all duration-300 active:scale-95 
            hover:bg-black/80 hover:scale-110 z-10
            touch-manipulation shadow-lg"
          aria-label="Siguiente imagen"
        >
          <svg className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Image counter */}
        <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm 
          text-white px-3 py-2 rounded-full text-sm sm:text-base font-semibold z-10
          border border-white/20 shadow-lg">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full 
                transition-all duration-300 active:scale-125 
                touch-manipulation ${
                index === currentIndex 
                  ? 'bg-white scale-110 shadow-lg' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 