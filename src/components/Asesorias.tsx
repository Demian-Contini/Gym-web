import Link from 'next/link';
import React from 'react';

export default function Asesorias() {
  return (
    <div className="w-full flex justify-center py-8 px-2">
      <div className="max-w-md w-full bg-black border-2 border-red-700 rounded-xl p-8 flex flex-col items-center shadow-lg">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4 text-center italic">ASESORÍAS</h2>
        <p className="text-white text-base md:text-lg text-center mb-6">
          Asesorías personalizadas con seguimiento 1 a 1 para llegar al siguiente nivel.
        </p>
        <Link href="/asesorias">
        <button
          className="bg-red-700 hover:bg-red-600 active:bg-red-800 text-white font-semibold px-8 py-3 rounded-lg shadow transition-all duration-200 text-base md:text-lg italic"
        >
          ASESORÍAS
        </button>
        </Link>
      </div>
    </div>
  );
}