import { useRef, useEffect, useState } from 'react';
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
  const isUserScrolling = useRef(false); // Nuevo flag
  const isProgrammaticScroll = useRef(false); // Flag robusto

  // Estado: índice de la tarjeta activa y si el auto-play está pausado
  const [current, setCurrent] = useState(0); // Índice de la tarjeta activa
  const [isPaused, setIsPaused] = useState(false); // Controla si el auto-play está pausado
  const [cardsPerPage, setCardsPerPage] = useState(1);
  const testimonials = testimonialsData;

  // Solo testimonios válidos
  const validTestimonials = testimonials.filter(t => t && t.name && t.comment && t.results);

  // Pausa el auto-play por 3 segundos cuando el usuario interactúa (dots o scroll manual)
  const handleInteraction = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  // Cambia a una tarjeta específica y pausa el auto-play
  const goToSlide = (idx: number) => {
    handleInteraction();
    setCurrent(idx);
  };

  // Detecta cuántas tarjetas caben en pantalla
  useEffect(() => {
    function updateCardsPerPage() {
      const container = containerRef.current;
      if (!container) return setCardsPerPage(1);
      const card = container.querySelector('div[role="card"]');
      if (!card) return setCardsPerPage(1);
      const containerWidth = container.offsetWidth;
      const cardWidth = (card as HTMLElement).offsetWidth;
      const perPage = Math.max(1, Math.floor(containerWidth / cardWidth));
      setCardsPerPage(perPage);
    }
    updateCardsPerPage();
    window.addEventListener('resize', updateCardsPerPage);
    return () => window.removeEventListener('resize', updateCardsPerPage);
  }, []);

  // Calcula el número de páginas
  const numPages = Math.ceil(validTestimonials.length / cardsPerPage);
  const currentPage = Math.floor(current / cardsPerPage);

  // Navega a la primera tarjeta de la página seleccionada
  const goToPage = (pageIdx: number) => {
    handleInteraction();
    setCurrent(pageIdx * cardsPerPage);
  };

  // Auto-play: avanza automáticamente cada 5 segundos si no está pausado
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      console.log('[AUTO-PLAY] Avanza slide', current + 1);
      setCurrent((prev) => (prev + 1) % validTestimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, validTestimonials.length]);

  // Centra la tarjeta activa en el contenedor usando scroll horizontal suave
  // (esto es necesario porque el usuario puede ver varias tarjetas a la vez y hacer scroll manual)
  const prevCurrent = useRef(current);
  useEffect(() => {
    if (prevCurrent.current !== current) {
      const container = containerRef.current;
      if (!container) return;
      const card = container.children[current] as HTMLElement;
      if (card) {
        isProgrammaticScroll.current = true; // Desactiva scroll manual
        console.log('[SCROLL PROG] Centra tarjeta', current);
        // Calcula la posición horizontal para centrar la tarjeta activa
        const scrollLeft =
          card.offsetLeft - (container.offsetWidth / 2 - card.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
        // Espera a que termine la animación antes de volver a permitir scroll manual
        setTimeout(() => { isProgrammaticScroll.current = false; }, 700);
      }
    }
    prevCurrent.current = current;
  }, [current]);

  // Cuando el usuario scrollea manualmente, detecta cuál tarjeta está más centrada
  // y la marca como activa (actualiza el índice)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let timeout: NodeJS.Timeout;
    const onScroll = () => {
      if (isProgrammaticScroll.current) return; // Ignora scroll programático
      console.log('[SCROLL MANUAL] Usuario scrollea');
      setIsPaused(true); // Pausa el auto-play mientras el usuario interactúa
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setIsPaused(false);
        // Detecta la tarjeta más centrada en el contenedor
        const cards = Array.from(container.children) as HTMLElement[];
        const containerRect = container.getBoundingClientRect();
        let minDelta = Infinity;
        let bestIdx = current;
        cards.forEach((card, idx) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = (rect.left + rect.right) / 2;
          const containerCenter = (containerRect.left + containerRect.right) / 2;
          const delta = Math.abs(cardCenter - containerCenter);
          if (delta < minDelta) {
            minDelta = delta;
            bestIdx = idx;
          }
        });
        if (bestIdx !== current) {
          console.log('[SCROLL MANUAL] Actualiza índice a', bestIdx);
          setCurrent(bestIdx); // Solo actualiza si realmente cambió
        }
      }, 800); // Espera a que termine el scroll (debounce aumentado)
    };
    container.addEventListener('scroll', onScroll, { passive: true });
    return () => container.removeEventListener('scroll', onScroll);
  }, [current]);


  return (
    <div className="max-w-6xl mx-auto bg-white rounded-2xl p-3 md:p-10">
      <h2 className="text-xl md:text-3xl font-bold text-black mb-6 md:mb-8 text-center">
        Lo que dicen mis clientes
      </h2>
      <div
        ref={containerRef}
        className="flex gap-4 md:gap-8 overflow-x-auto pb-4 snap-x scroll-smooth"
        style={{ scrollBehavior: 'smooth' }}
      >
        {validTestimonials.map((testimonial, idx) => {
          const [main, rest] = splitComment(testimonial.comment);
          return (
            <div
              key={testimonial.id}
              role="card"
              className="relative w-72 md:w-80 flex-shrink-0 bg-white border border-blue-200 rounded-2xl shadow-lg p-4 md:p-6 flex flex-col items-center text-center snap-center"
              style={{ minHeight: 260 }}
            >
              {/* Badge y foto centrados arriba */}
              <div className="flex flex-col items-center gap-1 mb-2 md:mb-3">
                <span className="bg-blue-100 text-blue-700 text-[10px] md:text-xs font-bold px-2 md:px-3 py-0.5 md:py-1 rounded-full shadow border border-blue-200">
                  {testimonial.results}
                </span>
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 md:w-14 md:h-14 rounded-full object-cover border-2 border-blue-500 shadow"
                />
              </div>
              {/* Nombre */}
              <h4 className="font-semibold text-sm md:text-base text-black mb-1 z-10">{testimonial.name}</h4>
              {/* Frase destacada */}
              <blockquote className="text-blue-700 text-base md:text-lg font-bold italic mb-1 leading-snug z-10">
                “{main}”
              </blockquote>
              {/* Resto del comentario */}
              {rest && (
                <blockquote className="text-gray-700 text-xs md:text-sm italic mb-2 leading-relaxed z-10">
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
          <button
            key={pageIdx}
            onClick={() => goToPage(pageIdx)}
            className={`w-2 h-2 rounded-full transition-all duration-300 active:scale-125 ${
              pageIdx === currentPage ? 'bg-blue-600 scale-110 shadow-lg' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Ir a página ${pageIdx + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 