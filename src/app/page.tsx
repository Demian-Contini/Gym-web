import ImageCarousel from '../components/ImageCarousel';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Sección Inicio */}
      <section
        id="inicio"
        className="flex flex-col items-center justify-center min-h-[60vh] py-16 px-4 text-center relative overflow-hidden"
        style={{
          backgroundImage: `url(/Img-inicioPC.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay semitransparente */}
        <div className="absolute inset-0 bg-black/40 z-0 pointer-events-none" />
        <style>{`
          @media (max-width: 768px) {
            #inicio {
              background-image: url('/gym_imgcelu.jpg') !important;
              background-position: center !important;
            }
          }
        `}</style>
        <div className="absolute top-6 right-2 md:top-10 md:right-12 flex flex-col items-end z-10">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-2 bg-blue-600/80 px-4 py-2 rounded-lg shadow flex items-center gap-2">
            Personal Trainer
            <img src="/Verificado.png" alt="Verificado" className="w-7 h-7 md:w-8 md:h-8 inline-block align-middle" />
          </h2>
          <button
            type="button"
            className="inline-block bg-white/20 text-white px-4 py-2 rounded-full font-semibold shadow border border-white/40 hover:bg-white/30 hover:text-blue-200 active:bg-blue-600/80 active:text-white transition-colors duration-200 cursor-pointer"
          >
          ¡Inicia tus cambios!
          
          </button>
        </div>
      </section>

      {/* Sección Cambios Físicos */}
      <section id="cambios-fisicos" className="py-16 px-4 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 text-center">Cambios Físicos</h2>
          <p className="text-gray-700 text-lg text-center mb-8 text-balance">
            Aquí podrás ver el progreso de mis clientes a lo largo del tiempo.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="w-full aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden shadow">
                <img
                  src="/Cambiosfisic.png"
                  alt={`Cambio físico ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Carrusel de Imágenes */}
      <section id="carrusel" className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <ImageCarousel
            images={[
              '/Cambiosfisic.png',
              '/C1.jpg',
              '/C2.jpg',
              '/Cambiosfisic.png',
              '/C1.jpg',
              '/C2.jpg'
            ]}
            title="Galería de Cambios"
            description="Las transformaciones más impresionantes de nuestros clientes"
          />
        </div>
      </section>
    </div>
  );
}