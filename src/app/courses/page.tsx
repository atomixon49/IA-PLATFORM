'use client';

import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import StarField from '../../components/StarField';
import CourseCard from '../../components/CourseCard';

export default function CoursesPage() {
  const courses = [
    {
      title: "Machine Learning",
      description: "Domina los algoritmos y técnicas de aprendizaje automático. Aprende a construir modelos predictivos y sistemas inteligentes con Python y TensorFlow.",
      gradientClass: "tech-gradient",
      href: "/courses/machine-learning",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Inteligencia Artificial",
      description: "Explora los fundamentos de la IA, desde redes neuronales hasta procesamiento del lenguaje natural. Desarrolla sistemas que piensan y aprenden.",
      gradientClass: "quantum-gradient",
      href: "/courses/artificial-intelligence",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      title: "Servidores MCP",
      description: "Aprende a implementar el Model Context Protocol para crear servidores escalables y eficientes. Domina las arquitecturas modernas de IA.",
      gradientClass: "tech-gradient",
      href: "/courses/mcp-servers",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      )
    },
    {
      title: "Computación Cuántica",
      description: "Sumérgete en el mundo de la computación cuántica. Aprende los principios fundamentales y programa algoritmos cuánticos con Qiskit.",
      gradientClass: "quantum-gradient",
      href: "/courses/quantum-computing",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--dark-matter)]">
      <StarField />
      <Navbar />
      
      <main className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold space-text mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Explora Nuestros Cursos
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Domina las tecnologías del futuro con nuestros cursos especializados en IA y computación cuántica
          </motion.p>
        </div>

        {/* Grid de cursos */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {courses.map((course, index) => (
              <motion.div
                key={course.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CourseCard {...course} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decoración de fondo */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -right-1/2 w-full h-full opacity-30">
            <div className="absolute w-96 h-96 rounded-full quantum-gradient blur-3xl"></div>
          </div>
          <div className="absolute -bottom-1/2 -left-1/2 w-full h-full opacity-30">
            <div className="absolute w-96 h-96 rounded-full tech-gradient blur-3xl"></div>
          </div>
        </div>
      </main>
    </div>
  );
}
