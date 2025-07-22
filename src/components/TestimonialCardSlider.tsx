import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { testimonialsData } from '../data/testimonials';

// Divide el comentario en dos partes: la primera frase y el resto
function splitComment(comment: string) {
  // Divide la primera frase (hasta el primer punto o exclamación/interrogación)
  const match = comment.match(/(.+?[.!?])\s*(.*)/);
  if (match) {
    return [match[1], match[2]];
  }
  return [comment, ''];
}

export default function TestimonialCardSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(1);

  // Calcular cuántas tarjetas entran visibles
  useEffect(() => {
    const updateCardsPerPage = () => {
      const container = containerRef.current;
      if (!container) return;
      const card = container.querySelector('[role="card"]') as HTMLElement;
      if (!card) return;
      const visible = Math.floor(container.clientWidth / card.offsetWidth);
      setCardsPerPage(visible > 0 ? visible : 1);
    };
    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  // Actualizar página actual según scroll
  const handleUserScroll = () => {
    pauseAutoScroll();
    updateCurrentPage();
    resumeTimeoutRef.current = setTimeout(() => {
      startAutoScroll();
    }, 2000);
  };

  const updateCurrentPage = () => {
    const container = containerRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const card = container.querySelector('[role="card"]') as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16; // gap-4 = 16px
    const page = Math.round(scrollLeft / cardWidth);
    setCurrentPage(page);
  };

  // Scroll automático
  const startAutoScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    let scrollAmount = container.scrollLeft;
    const scrollStep = 1;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!container) return;
      if (scrollAmount >= maxScroll) {
        scrollAmount = 0;
      } else {
        scrollAmount += scrollStep;
      }
      container.scrollTo({
        left: scrollAmount,
        behavior: "auto",
      });
      updateCurrentPage();
    }, 30);
  };

  const pauseAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleUserScroll, { passive: true });
    return () => {
      pauseAutoScroll();
      if (container) {
        container.removeEventListener("scroll", handleUserScroll);
      }
    };
    // eslint-disable-next-line
  }, []);

  // Función para avanzar o retroceder el slider con flechas
  const scrollByCards = (direction: 'left' | 'right') => {
    const container = containerRef.current;
    if (!container) return;
    const card = container.querySelector('[role="card"]') as HTMLElement;
    if (!card) return;
    const cardWidth = card.offsetWidth + 16; // gap-4 = 16px
    const scrollAmount = cardWidth * cardsPerPage;
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(updateCurrentPage, 350); // Actualiza el dot después del scroll
  };

  // Calcular número de páginas
  const numPages = Math.max(1, Math.ceil(testimonialsData.length / cardsPerPage));

  return (
    <div id="testimonios" className="w-full bg-black py-8 md:py-16">
      <div className="max-w-6xl mx-auto bg-black rounded-2xl p-3 md:p-10 relative">
        <h2 className="text-xl md:text-3xl font-bold text-white mb-6 md:mb-8 text-center">
          Lo que dicen mis clientes
        </h2>
        {/* Flechas solo en desktop */}
        <button
          type="button"
          aria-label="Anterior"
          onClick={() => scrollByCards('left')}
          className="hidden md:flex items-center justify-center absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-red-600 text-white hover:bg-red-700 shadow transition-all"
          style={{ fontSize: 18 }}
        >
          &#8592;
        </button>
        <button
          type="button"
          aria-label="Siguiente"
          onClick={() => scrollByCards('right')}
          className="hidden md:flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-red-600 text-white hover:bg-red-700 shadow transition-all"
          style={{ fontSize: 18 }}
        >
          &#8594;
        </button>
        <div
          ref={containerRef}
          className="flex gap-4 md:gap-8 overflow-x-auto pb-4 snap-x scroll-smooth hide-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {testimonialsData.map((testimonial) => {
            const [main, rest] = splitComment(testimonial.comment);
            return (
              <div
                key={testimonial.id}
                role="card"
                className="relative w-72 md:w-80 flex-shrink-0 bg-gray-200 border border-red-700 rounded-2xl shadow-lg p-4 md:p-6 flex flex-col items-center text-center snap-center transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl"
                style={{ minHeight: 260 }}
              >
                {/* Badge y foto centrados arriba */}
                <div className="flex flex-col items-center gap-1 mb-2 md:mb-3">
                  <span className="bg-red-100 text-red-700 text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow border border-red-200">
                    {testimonial.results}
                  </span>
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={56}
                    height={56}
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover border-2 border-red-500 shadow"
                  />
                </div>
                {/* Nombre */}
                <h4 className="font-semibold text-sm md:text-base text-black mb-1 z-10">{testimonial.name}</h4>
                {/* Frase destacada */}
                <blockquote className="text-red-600 text-base md:text-lg font-bold italic mb-1 leading-snug z-10">
                  “{main}”
                </blockquote>
                {/* Resto del comentario */}
                {rest && (
                  <blockquote className="text-gray-800 text-xs md:text-sm italic mb-2 leading-relaxed z-10">
                    {rest}
                  </blockquote>
                )}
              </div>
            );
          })}
        </div>
        {/* Dots indicator */}
        <div className="flex space-x-2 mt-4 md:mt-6 justify-center">
          {Array.from({ length: numPages }).map((_, pageIdx) => (
            <div
              key={pageIdx}
              className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 transition-all duration-300
                ${pageIdx === currentPage
                  ? 'bg-red-600 border-red-600 scale-110 shadow-lg'
                  : 'bg-transparent border-red-500'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 