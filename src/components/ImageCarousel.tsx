
// ---------- Seccion Carousel ----------
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  images: string[];
  title?: string;
  description?: string;
}

export default function ImageCarousel({ images, title, description }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Función de auto-play con pausa en interacción
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambia de imagen cada 5 segundos

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  // Pausa auto-play cuando el usuario interactúa
  const handleInteraction = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000); // Resume after 3 seconds
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
    <div className="relative w-full max-w-4xl mx-auto">
      {title && (
        <h3 className="text-2xl md:text-3xl font-bold text-black mb-4 text-center">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-gray-700 text-center mb-6">
          {description}
        </p>
      )}
      
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        {/* Imagen principal */}
        <div className="relative h-64 md:h-80 lg:h-96">
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
                width={800}
                height={600}
                className="w-full h-full object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 
            bg-black/60 backdrop-blur-sm border border-white/20 
            text-white p-2 md:p-3 rounded-full 
            transition-all duration-300 active:scale-95 
            hover:bg-black/80 hover:scale-110 z-10
            touch-manipulation"
          aria-label="Imagen anterior"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 
            bg-black/60 backdrop-blur-sm border border-white/20 
            text-white p-2 md:p-3 rounded-full 
            transition-all duration-300 active:scale-95 
            hover:bg-black/80 hover:scale-110 z-10
            touch-manipulation"
          aria-label="Siguiente imagen"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Contador de imágenes */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm 
          text-white px-2 py-1 rounded-full text-xs md:text-sm font-medium z-10">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Indicador de puntos */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full 
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