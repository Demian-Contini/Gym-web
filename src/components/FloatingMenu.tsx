'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function FloatingMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-4 z-50">
      {/* Overlay para cerrar al hacer clic fuera */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] transition-all duration-300"
          onClick={closeMenu}
        />
      )}
      {/* Botón principal */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 relative"
        aria-label="Abrir menú de redes sociales"
      >
        <Image
          src="/menuRedes.png"
          alt="Menú"
          width={56}
          height={56}
          className="w-14 h-14"
        />
      </button>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-6 min-w-[280px] z-50">
          <div className="text-center mb-4">
            <h3 className="text-xl font-bold text-black" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}>Mis Redes</h3>
          </div>
          
          <div className="space-y-4">
            {/* Instagram */}
            <a
              href="#"
              onClick={closeMenu}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Image
                src="/instagramMenu.png"
                alt="Instagram"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-black font-bold text-lg" style={{ textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.2)' }}>Instagram</span>
            </a>

            {/* WhatsApp */}
            <a
              href="#"
              onClick={closeMenu}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Image
                src="/whatsappMenu.png"
                alt="WhatsApp"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-black font-bold text-lg" style={{ textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.2)' }}>WhatsApp</span>
            </a>

            {/* Email */}
            <a
              href="#"
              onClick={closeMenu}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Image
                src="/correoMenu.png"
                alt="Email"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-black font-bold text-lg" style={{ textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.2)' }}>Email</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
} 