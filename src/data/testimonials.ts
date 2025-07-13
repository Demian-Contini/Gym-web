export interface Testimonial {
  id: number;
  name: string;
  image: string; // legacy, mantener para compatibilidad
  images: string[]; // nuevo: puede ser una o dos imágenes
  results: string;
  comment: string;
}

export const testimonialsData: Testimonial[] = [
  {
    id: 1,
    name: "María, 42 años",
    image: "/Perfil.png",
    images: ["/C1.jpg", "/C2.jpg"], // ejemplo collage antes/después
    results: "Mamá ocupada - Perdió 12kg en 6 meses",
    comment: "Antes iba sola al gym y me perdía. Luca me enseñó las técnicas correctas y me ayudó con la alimentación. Ahora veo mi progreso semana a semana."
  },
  {
    id: 2,
    name: "Carlos, 35 años",
    image: "/Perfil.png",
    images: ["/Perfil.png"],
    results: "Ejecutivo - Ganó 8kg de músculo en 8 meses",
    comment: "Me sorprendió lo mucho que sabe Luca sobre nutrición. Las rutinas personalizadas me permiten ver mi progreso real. Además, conocí gente copada en el gym."
  },
  {
    id: 3,
    name: "Ana, 28 años",
    image: "/Perfil.png",
    images: ["/Perfil.png"],
    results: "Principiante - Transformación completa en 5 meses",
    comment: "Nunca había pisado un gym. Luca me enseñó todo desde cero y me corrigió las posturas. Ahora me siento segura entrenando."
  },
  {
    id: 4,
    name: "Luis, 45 años",
    image: "/Perfil.png",
    images: ["/Perfil.png"],
    results: "Papá - Recuperó su forma física en 10 meses",
    comment: "Iba solo al gym y no veía resultados. Con Luca todo cambió. Me guía con la alimentación y me corrige las técnicas."
  },
  {
    id: 5,
    name: "Sofía, 31 años",
    image: "/Perfil.png",
    images: ["/Perfil.png"],
    results: "Deportista - Mejoró su rendimiento en 6 meses",
    comment: "Ya hacía deporte pero quería optimizar mi entrenamiento. Luca me enseñó técnicas que nunca había visto y me dio rutinas específicas."
  },
  {
    id: 6,
    name: "Roberto, 38 años",
    image: "/Perfil.png",
    images: ["/Perfil.png"],
    results: "Emprendedor - Recuperó su energía en 4 meses",
    comment: "Trabajaba 12 horas por día y me sentía agotado. Luca me ayudó a organizar mi tiempo y ahora tengo energía para todo el día."
  }
]; 