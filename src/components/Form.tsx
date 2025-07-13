import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

export default function Form() {
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    comentario: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nombre || !form.apellido || !form.email || !form.comentario) {
      setError('Por favor completa todos los campos.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('El email no es válido.');
      return;
    }
    setSuccess('¡Mensaje enviado! (esto es solo una demo)');
    setForm({ nombre: '', apellido: '', email: '', comentario: '' });
  };

  return (
    <section className="relative py-16 px-4 bg-gray-50">
      {/* Fondo con imagen y overlay */}
      <div className="absolute inset-0">
        <img
          src="/Img-inicioPC.jpg" //CAMBIAAAAAAAAAAAR
          alt="Clientes felices"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative max-w-lg mx-auto flex flex-col items-center z-10">
        <span className="text-white text-lg font-semibold bg-blue-700 px-4 py-1 rounded-lg mb-4 shadow">
          Ya diste el primer paso
        </span>
        <a
          href="https://wa.me/549XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-lg shadow mb-4 transition flex items-center gap-2"
        >
          <FaWhatsapp className="w-5 h-5" />
          Comunicate por Whatsapp
        </a>
        <h3 className="text-white text-2xl font-bold mb-2 text-center">
          o enviame tu consulta por correo
        </h3>


        <form onSubmit={handleSubmit} className="w-full bg-white bg-opacity-95 rounded-2xl shadow-lg p-6 flex flex-col gap-4 mt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none text-black placeholder:text-gray-500"
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={form.apellido}
              onChange={handleChange}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none text-black placeholder:text-gray-500"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none text-black placeholder:text-gray-500"
          />
          <textarea
            name="comentario"
            placeholder="Deja tu comentario o duda..."
            value={form.comentario}
            onChange={handleChange}
            rows={4}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none resize-none text-black placeholder:text-gray-500"
          />
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-colors mt-2"
          >
            Enviar
          </button>
        </form>


      </div>
    </section>
  );
} 