'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Carlos Rodríguez',
    role: 'Ingeniero de Datos',
    company: 'TechInnovate',
    image: '/images/testimonial-1.jpg',
    content: 'Los cursos de IA de esta plataforma transformaron mi carrera. Pasé de ser un analista de datos básico a implementar modelos de machine learning en producción en menos de 6 meses.',
  },
  {
    id: 2,
    name: 'Laura Martínez',
    role: 'Científica de Datos',
    company: 'DataVision',
    image: '/images/testimonial-2.jpg',
    content: 'La calidad del contenido es excepcional. Los conceptos complejos se explican de manera clara y las actividades prácticas realmente refuerzan el aprendizaje. Totalmente recomendado.',
  },
  {
    id: 3,
    name: 'Miguel Sánchez',
    role: 'Desarrollador de Software',
    company: 'Innovatech',
    image: '/images/testimonial-3.jpg',
    content: 'Como desarrollador, quería entender mejor cómo integrar IA en mis aplicaciones. Esta plataforma me dio exactamente lo que necesitaba, con ejemplos prácticos y código reutilizable.',
  },
  {
    id: 4,
    name: 'Ana García',
    role: 'Estudiante de Posgrado',
    company: 'Universidad Tecnológica',
    image: '/images/testimonial-4.jpg',
    content: 'Los módulos de computación cuántica son fascinantes. Me han ayudado enormemente en mi investigación y me han dado una ventaja competitiva en mi campo de estudio.',
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay]);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    setAutoplay(false);
  };

  const handleNext = () => {
    setActiveIndex((current) => (current + 1) % testimonials.length);
    setAutoplay(false);
  };

  const handlePrev = () => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
    setAutoplay(false);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Lo Que Dicen Nuestros Estudiantes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Descubre cómo nuestra plataforma ha ayudado a profesionales y estudiantes a dominar la inteligencia artificial y transformar sus carreras.
          </p>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="mb-6 md:mb-0 md:mr-8">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                    <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-6">
                    <svg className="h-8 w-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg italic mb-6">{testimonials[activeIndex].content}</p>
                  <div>
                    <h4 className="font-bold text-lg">{testimonials[activeIndex].name}</h4>
                    <p className="text-gray-600">{testimonials[activeIndex].role}, {testimonials[activeIndex].company}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-4">
            <button 
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-4">
            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 mx-1 rounded-full ${
                index === activeIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Ir al testimonio ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
