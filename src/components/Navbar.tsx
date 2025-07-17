'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
  //Sticky en el navbar y static en el PC para que el navbar se mantenga en la parte superior de la pantalla y no se mueva cuando se hace scroll 
    <nav className="sticky top-0 z-50 bg-white shadow-lg lg:static">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              {/* Original: className="rounded-full mr-3 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16" */}
              <Image
                src="/image.png"
                alt="#"
                width={48}
                height={48}
                className="rounded-full mr-3 w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 border border-black/20 shadow"
              />
            </Link>
          </div>

          {/* Título centrado en móvil y ubicado normalmente en PC */}
          <div className="flex-1 flex justify-center lg:justify-center">
            <h1 className="text-2xl md:text-3xl font-bold text-black text-center lg:text-left tracking-wide">
              Lucas Moris
            </h1>
          </div>

          {/* Botón menú móvil - visible solo en móvil */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              // Original: className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menú escritorio - visible solo en PC */}
          <div className="hidden lg:flex items-center space-x-6">
            {/* Original: className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:bg-blue-50 hover:scale-105" */}
            <a href="#inicio" className="text-black hover:text-red-600 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:bg-red-100">Inicio</a>
            <a href="#cambios-fisicos" className="text-black hover:text-red-600 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:bg-red-100">Cambios Físicos</a>
            <a href="#testimonios" className="text-black hover:text-red-600 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:bg-red-100">Comentarios</a>
            <a href="#acerca" className="text-black hover:text-red-600 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:bg-red-100">Acerca de mi</a>
            <a href="#asesorias" className="text-black hover:text-red-600 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:bg-red-100">Asesorias</a>
            <a href="#contacto" className="text-black hover:text-red-600 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 hover:bg-red-100">Contacto</a>
          </div>
        </div>
      </div>

      {/* Menú visible solo en móvil */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-black/10">
          {/* Original: className="text-gray-700 hover:text-gray-900 block px-4 py-3 rounded-lg text-base font-bold border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200" */}
          <a href="#inicio" className="text-black hover:text-red-600 block px-4 py-3 rounded-lg text-base font-bold border-2 border-gray-200 hover:border-red-400 hover:bg-red-100 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>Inicio</a>
          <a href="#cambios-fisicos" className="text-black hover:text-red-600 block px-4 py-3 rounded-lg text-base font-bold border-2 border-gray-200 hover:border-red-400 hover:bg-red-100 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>Cambios Físicos</a>
          <a href="#testimonios" className="text-black hover:text-red-600 block px-4 py-3 rounded-lg text-base font-bold border-2 border-gray-200 hover:border-red-400 hover:bg-red-100 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>Comentarios</a>
          <a href="#acerca" className="text-black hover:text-red-600 block px-4 py-3 rounded-lg text-base font-bold border-2 border-gray-200 hover:border-red-400 hover:bg-red-100 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>Acerca de mi</a>
          <a href="#asesorias" className="text-black hover:text-red-600 block px-4 py-3 rounded-lg text-base font-bold border-2 border-gray-200 hover:border-red-400 hover:bg-red-100 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>Asesorias</a>
          <a href="#contacto" className="text-black hover:text-red-600 block px-4 py-3 rounded-lg text-base font-bold border-2 border-gray-200 hover:border-red-400 hover:bg-red-100 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>Contacto</a>
        </div>
      </div>
    </nav>
  );
}
