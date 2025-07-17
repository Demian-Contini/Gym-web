'use client';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white border-t-2 border-red-700 py-8 px-4">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
        {/* Mini menú de navegación */}
        <nav className="mb-4">
          <ul className="flex flex-nowrap justify-center w-full max-w-2xl mx-auto gap-4 text-xs md:text-sm font-semibold">
            <li><a href="#inicio" className="hover:text-orange-400 transition-colors">Inicio</a></li>
            <li><a href="#cambios-fisicos" className="hover:text-orange-400 transition-colors">Cambios Físicos</a></li>
            <li><a href="#testimonios" className="hover:text-orange-400 transition-colors">Comentarios</a></li>
            <li><a href="#contacto" className="hover:text-orange-400 transition-colors">Contacto</a></li>
          </ul>
        </nav>
        {/* Nombre y eslogan */}
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-wide text-center">Lucas Moris</h3>
        <p className="text-white text-base md:text-lg font-semibold text-center mb-2">&ldquo;Transforma tu vida, no solo tu cuerpo&rdquo;</p>

        {/* Redes sociales (sin acción) */}
        <div className="flex items-center justify-center gap-6 mt-2">
          {/* TikTok */}
          <a href="https://www.tiktok.com/@lucamoriss.fit" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="flex flex-col items-center group focus:outline-none text-xs font-bold text-white group-hover:text-blue-200" style={{ textDecoration: 'none', textShadow: '0.25px 0.25px 0.5px rgba(0,0,0,0.15)' }}>
            <Image src="/tik-tok.png" alt="TikTok" width={32} height={32} className="w-8 h-8 mb-1" />
            TikTok
          </a>
          {/* WhatsApp */}
          <a
            href="https://wa.me/5493516579114"
            onClick={e => e.preventDefault()}
            className="flex flex-col items-center group focus:outline-none text-xs font-bold text-white group-hover:text-blue-200"
            aria-label="WhatsApp"
            style={{ textDecoration: 'none', textShadow: '0.25px 0.25px 0.5px rgba(0,0,0,0.15)' }}
          >
            <Image src="/whats-app.png" alt="WhatsApp" width={32} height={32} className="w-8 h-8 mb-1" />
            WhatsApp
          </a>
          {/* Email */}
          <a
            href="#"
            onClick={e => e.preventDefault()}
            className="flex flex-col items-center group focus:outline-none text-xs font-bold text-white group-hover:text-blue-200"
            aria-label="Email"
            style={{ textDecoration: 'none', textShadow: '0.25px 0.25px 0.5px rgba(0,0,0,0.15)' }}
          >
            <Image src="/e-mail.png" alt="Email" width={32} height={32} className="w-8 h-8 mb-1" />
            Email
          </a>
        </div>

        <div className="mt-4 text-center text-xs text-white">
          &copy; {new Date().getFullYear()} Lucas Moriss. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
} 