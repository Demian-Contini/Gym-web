'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MdEmail } from "react-icons/md";
import { SiTiktok } from "react-icons/si";
export default function FloatingMenu() {
  // Nuevo botón flotante WhatsApp con despliegue de iconos
  const [isFabOpen, setIsFabOpen] = useState(false);
  const closeFab = () => setIsFabOpen(false);

  return (
    <>
      {/* Overlay para cerrar al hacer clic fuera del menú rápido */}
      {isFabOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={closeFab}
        />
      )}
      <div className="fixed bottom-6 right-4 z-50">
        {/* Botones flotantes desplegables */}
        <div className={`flex flex-col items-end space-y-4 mb-2 transition-all duration-300 z-50 pointer-events-none ${isFabOpen ? 'opacity-100 translate-y-0' : 'opacity-0 pointer-events-none translate-y-4'}`}>  
          {/* TikTok */}
          <a href="https://www.tiktok.com/@lucamoriss.fit" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="">
          <span className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-red-500">
            <SiTiktok width={40} height={40} className="w-10 h-10" />
            </span>
          </a>
          {/* Mail */}
          <a
            href="mailto:lucasmorisok@gmail.com"
            className="w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-all pointer-events-auto"
            aria-label="Email"
            onClick={closeFab}
          >
           <MdEmail className=" width={40} height={40} text-[#333] w-10 h-10  text-white" /> 
          </a>
        </div>
        {/* Botón principal WhatsApp */}
        <button
          onClick={() => {
            if (!isFabOpen) {
              setIsFabOpen(true);
            } else {
              window.open('https://wa.me/5493516579114', '_blank');
              setIsFabOpen(false);
            }
          }}
          className="w-12 h-12 flex items-center justify-center rounded-full hover:scale-110 transition-all focus:outline-none pointer-events-auto"
          aria-label="Abrir chat de WhatsApp"
          style={{ marginBottom: '8px' }}
        >
          <Image src="/whatsappMenu.png" alt="WhatsApp" width={40} height={40} className="w-10 h-10" />
        </button>
      </div>
    </>
  );
} 