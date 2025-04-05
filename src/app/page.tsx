'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import FeaturedCourses from '../components/FeaturedCourses';
import AIConcepts from '../components/AIConcepts';
import CodeEditor from '../components/CodeEditor';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import StarField from '../components/StarField';

// Importación dinámica del componente 3D para mejor rendimiento
const Scene3D = dynamic(() => import('../components/3d/Scene'), {
  ssr: false,
  loading: () => <div className="w-full h-screen bg-[var(--dark-matter)] animate-pulse" />
});

export default function Home() {
  return (
    <div className="bg-[var(--dark-matter)] min-h-screen">
      <StarField />
      <Navbar />
      <main className="relative">
        {/* Hero Section con efecto 3D */}
        <section className="relative h-screen overflow-hidden">
          <Scene3D />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4 bg-gradient-to-b from-transparent via-[var(--dark-matter)]/30 to-[var(--dark-matter)]">
            <motion.div 
              className="max-w-4xl z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="mb-8"
              >
                <div className="w-24 h-24 mx-auto mb-6 relative">
                  <div className="absolute inset-0 rounded-full quantum-gradient animate-pulse"></div>
                  <div className="absolute inset-2 rounded-full bg-[var(--dark-matter)] flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[var(--accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </motion.div>
              
              <h1 className="text-4xl md:text-7xl font-bold mb-6 space-text tracking-tight">
                El Futuro del
                <span className="block mt-2 text-[var(--accent)]">Aprendizaje AI</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Explora el fascinante universo de la Inteligencia Artificial y la Computación Cuántica a través de experiencias inmersivas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a 
                  href="/courses"
                  className="quantum-button space-glow text-lg px-8 py-4 inline-block"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explorar Cursos
                </motion.a>
                
                <motion.button
                  className="tech-button space-glow text-lg px-8 py-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Ver Demo
                </motion.button>
              </div>
            </motion.div>
          </div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-6 h-10 rounded-full border-2 border-[var(--accent)] p-1">
              <div className="w-2 h-2 bg-[var(--accent)] rounded-full mx-auto animate-bounce"></div>
            </div>
          </motion.div>
        </section>

        {/* Sección de Características */}
        <section className="py-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--dark-matter)] via-[var(--nebula)]/10 to-[var(--dark-matter)]"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 space-text">
                Tecnologías del Futuro
              </h2>
              <p className="text-gray-300 text-xl max-w-3xl mx-auto">
                Domina las tecnologías que están transformando el mundo
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Efecto de conexión entre tarjetas */}
              <div className="absolute inset-0 md:grid grid-cols-3 gap-8 hidden">
                <div className="col-span-3 h-full">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'var(--primary)', stopOpacity: 0.2 }} />
                        <stop offset="100%" style={{ stopColor: 'var(--accent)', stopOpacity: 0.2 }} />
                      </linearGradient>
                    </defs>
                    <path d="M100,50 L300,150 L500,50" stroke="url(#techGradient)" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>
              
              {/* Tarjetas de Características */}
              <motion.div 
                className="space-card p-8 relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 rounded-lg quantum-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="h-16 w-16 rounded-full quantum-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--accent)] group-hover:text-[var(--primary)] transition-colors duration-300">
                  Inteligencia Artificial
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Aprende los fundamentos y aplicaciones prácticas de la IA moderna con tutoriales paso a paso y proyectos reales.
                </p>
                <motion.a 
                  href="#" 
                  className="inline-flex items-center text-[var(--accent)] hover:text-[var(--primary)] transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  Explorar IA
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </motion.div>
              
              <motion.div 
                className="space-card p-8 relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 rounded-lg tech-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="h-16 w-16 rounded-full tech-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--secondary)] group-hover:text-[var(--accent)] transition-colors duration-300">
                  Machine Learning
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Domina algoritmos y técnicas de aprendizaje automático con ejemplos prácticos y datasets reales.
                </p>
                <motion.a 
                  href="#" 
                  className="inline-flex items-center text-[var(--secondary)] hover:text-[var(--accent)] transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  Explorar ML
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </motion.div>
              
              <motion.div 
                className="space-card p-8 relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 rounded-lg quantum-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <div className="h-16 w-16 rounded-full quantum-gradient flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-[var(--primary)] group-hover:text-[var(--quantum)] transition-colors duration-300">
                  Computación Cuántica
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Explora los principios y aplicaciones de la computación cuántica con simuladores interactivos.
                </p>
                <motion.a 
                  href="#" 
                  className="inline-flex items-center text-[var(--primary)] hover:text-[var(--quantum)] transition-colors duration-300"
                  whileHover={{ x: 5 }}
                >
                  Explorar Cuántica
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Conceptos de IA */}
        <AIConcepts />

        {/* Cursos Destacados */}
        <FeaturedCourses />

        {/* Editor de Código */}
        <CodeEditor />

        {/* Testimonios */}
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
