'use client';

import Image from 'next/image';
import ImageCarousel from '../components/ImageCarousel';
import TestimonialCardSlider from '../components/TestimonialCardSlider';
import Form from '../components/Form';
import FloatingMenu from '../components/FloatingMenu';

export default function Home() {







  return (
    <div className="min-h-screen">
      {/* Título Personal Trainer */}
      <section className="py-12 px-4 md:px-8 lg:px-12 bg-black border-b border-red-700">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2 flex items-center justify-center gap-3">
            Personal Trainer
            <Image src="/Verificado.png" alt="Verificado" width={32} height={32} className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 inline-block align-middle" />
          </h1>
          <p className="text-red-500 font-bold">+50 mentorías</p>
        </div>
      </section>

      {/* Video de YouTube con controles clasicos */}
      <section
        id="inicio"
        className="flex flex-col items-center justify-center min-h-[60vh] py-12 px-4 md:px-8 lg:px-12 text-center relative overflow-hidden bg-black"
      >
        {/* Video responsivo y más grande en móvil */}
        <div className="absolute inset-0 w-full h-full z-0 flex items-center justify-center">
          <div className="w-full h-full aspect-video max-w-full md:max-w-5xl mx-0 md:mx-auto">
            <iframe
              className="w-full h-full rounded-none md:rounded-xl shadow-2xl"
              src="https://www.youtube.com/embed/nvCrar6IvBk?controls=1&rel=0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Botón debajo de la imagen */}
      <section className="py-12 px-4 md:px-8 lg:px-12 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <a href="#contacto">
            <button
              type="button"
              className="inline-block bg-red-700 hover:bg-red-600 active:bg-red-700 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition-all duration-200 cursor-pointer text-xl md:text-2xl hover:scale-105"
            >
              ¡Inicia tus cambios!
            </button>
          </a>
        </div>
      </section>

      
      {/* Sección Cambios Físicos */}
      <section id="cambios-fisicos" className="py-12 px-4 md:px-8 lg:px-12 bg-black border-t border-red-700">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-center">Cambios Físicos</h2>
          <p className="text-white text-lg md:text-xl text-center mb-8 md:mb-12 text-balance max-w-4xl mx-auto">
            Las transformaciones más impresionantes de mis clientes.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="w-full aspect-[4/5] bg-gray-100 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <Image
                  src="/Cambiosfisic.png"
                  alt={`Cambio físico ${idx + 1}`}
                  width={500}
                  height={625}
                  className="w-full h-full object-cover object-center transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Carrusel de Imágenes */}
      <section id="carrusel" className="py-12 px-4 md:px-8 lg:px-12 bg-black">
        <div className="w-full max-w-7xl mx-auto">
          <ImageCarousel
            images={[
              '/Cambiosfisic.png',
              '/C1.jpg',
              '/C2.jpg',
              '/Cambiosfisic.png',
              '/C1.jpg',
            ]}
          />
          {/* Texto debajo del carrusel */}
          <div className="mt-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">¡Inspírate con estos resultados!</h3>
            <p className="text-white text-lg md:text-xl">Tú también puedes lograr tu mejor versión. ¡Comienza hoy!</p>
          </div>
        </div>
      </section>

      {/* Sección Testimonios */}
      <section id="testimonios" className="py-12 px-4 md:px-8 lg:px-12 bg-">
        <TestimonialCardSlider />
      </section>

      {/* Sección Contacto */}
      <section id="contacto">
        <Form />
      </section>

      {/* Menú flotante */}
      <FloatingMenu />
   
     
    </div>
  );
}