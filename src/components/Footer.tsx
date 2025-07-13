import { FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="w-full bg-blue-600/80 text-white py-8 px-4 mt-12">
      <div className="max-w-3xl mx-auto flex flex-col items-center gap-4">
        {/* Nombre y eslogan */}
        <h3 className="text-xl font-bold tracking-wide text-center">Lucas Moriss</h3>
        <p className="text-sm text-blue-200 text-center mb-2">"Transforma tu vida, no solo tu cuerpo"</p>

        <a
          href="https://wa.me/549XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-500 hover:bg-green-600 transition-colors shadow-lg mb-2"
          aria-label="WhatsApp"
        >
          <FaWhatsapp className="w-5 h-5 text-white" />
        </a>
        <div className="mt-2 text-center text-xs text-blue-300">
          &copy; {new Date().getFullYear()} Lucas Moriss. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
} 