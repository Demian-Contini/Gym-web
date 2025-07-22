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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.nombre || !form.apellido || !form.email || !form.comentario) {
      setError('Por favor completa todos los campos.');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('El email no es válido.');
      return;
    }
  
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.nombre} ${form.apellido}`,
          email: form.email,
          message: form.comentario,
        }),
      });
  
      const data = await res.json();
      if (data.success) {
        setSuccess('Mensaje enviado correctamente! Pronto nos pondremos en contacto con vos.');
        setForm({ nombre: '', apellido: '', email: '', comentario: '' });
      } else {
        setError('Hubo un error al enviar el mensaje. Intenta nuevamente.');
      }
    } catch (err) {
      setError('Hubo un error al enviar el mensaje. Intenta nuevamente.');
    }
  };

  return (
    <section className="relative py-16 px-4 bg-black">
      <div className="relative max-w-lg mx-auto flex flex-col items-center z-10">
        <span className="text-black text-lg font-semibold bg-red-100 px-4 py-1 rounded-lg mb-6 shadow border border-red-200">
          Ya diste el primer paso
        </span>
        <a
         href="https://wa.me/5493516579114"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#128C4B] hover:bg-[#0d6c37] text-white font-bold px-6 py-2 rounded-lg shadow mb-4 transition flex items-center gap-2"
        >
          <FaWhatsapp className="w-6 h-6" />
          Comunicate por Whatsapp
        </a>
        <h3 className="text-black text-2xl font-bold mb-2 text-center drop-shadow-lg">
          o enviame tu consulta por correo
        </h3>

        <form onSubmit={handleSubmit} className="w-full bg-gray-200 rounded-2xl shadow-lg p-6 flex flex-col gap-4 mt-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border-0 border-b-2 border-black focus:border-black focus:outline-none text-black placeholder:text-black transition-all duration-200 shadow-none bg-gray-200 rounded-none"
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={form.apellido}
              onChange={handleChange}
              className="flex-1 px-4 py-2 border-0 border-b-2 border-black focus:border-black focus:outline-none text-black placeholder:text-black transition-all duration-200 shadow-none bg-gray-200 rounded-none"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-2 border-0 border-b-2 border-black focus:border-black focus:outline-none text-black placeholder:text-black transition-all duration-200 shadow-none bg-gray-200 rounded-none"
          />
          <textarea
            name="comentario"
            placeholder="Deja tu comentario o duda..."
            value={form.comentario}
            onChange={handleChange}
            rows={4}
            className="px-4 py-2 border-0 border-b-2 border-black focus:border-black focus:outline-none resize-none text-black placeholder:text-black transition-all duration-200 shadow-none bg-gray-200 rounded-none"
          />
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          <button
            type="submit"
            className="bg-red-700 text-white font-bold py-2 rounded-lg hover:bg-red-800 transition-colors mt-2"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
} 