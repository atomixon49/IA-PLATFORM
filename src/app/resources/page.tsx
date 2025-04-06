'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import ResourceCard from '../../components/ResourceCard';
import Footer from '../../components/Footer';
import StarField from '../../components/StarField';

// Importación dinámica del componente 3D para mejor rendimiento
const ResourcesScene = dynamic(() => import('../../components/3d/ResourcesScene'), {
  ssr: false,
  loading: () => <div className="w-full h-[50vh] bg-[var(--dark-matter)] animate-pulse" />
});

// Categorías de recursos
const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'ai', name: 'Inteligencia Artificial' },
  { id: 'ml', name: 'Machine Learning' },
  { id: 'quantum', name: 'Computación Cuántica' },
  { id: 'tools', name: 'Herramientas' },
  { id: 'courses', name: 'Cursos' },
];

// Datos de recursos
const resources = [
  {
    id: 1,
    title: 'TensorFlow',
    description: 'Biblioteca de código abierto para aprendizaje automático y redes neuronales desarrollada por Google.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    link: 'https://www.tensorflow.org/',
    category: 'ml',
    gradientClass: 'tech-gradient'
  },
  {
    id: 2,
    title: 'PyTorch',
    description: 'Framework de aprendizaje profundo de código abierto basado en la biblioteca Torch.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
      </svg>
    ),
    link: 'https://pytorch.org/',
    category: 'ml',
    gradientClass: 'tech-gradient'
  },
  {
    id: 3,
    title: 'Qiskit',
    description: 'SDK de código abierto para trabajar con computadoras cuánticas a nivel de pulsos, circuitos y algoritmos.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    link: 'https://qiskit.org/',
    category: 'quantum',
    gradientClass: 'quantum-gradient'
  },
  {
    id: 4,
    title: 'Hugging Face',
    description: 'Plataforma de colaboración para construir, entrenar y desplegar modelos de aprendizaje automático.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    link: 'https://huggingface.co/',
    category: 'ai',
    gradientClass: 'tech-gradient'
  },
  {
    id: 5,
    title: 'Curso de IA de Stanford',
    description: 'Curso completo de Inteligencia Artificial de la Universidad de Stanford, disponible gratuitamente.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    link: 'https://www.coursera.org/learn/machine-learning',
    category: 'courses',
    gradientClass: 'quantum-gradient'
  },
  {
    id: 6,
    title: 'Kaggle',
    description: 'Plataforma para competiciones de ciencia de datos, conjuntos de datos públicos y cuadernos de código.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    link: 'https://www.kaggle.com/',
    category: 'tools',
    gradientClass: 'tech-gradient'
  },
  {
    id: 7,
    title: 'IBM Quantum',
    description: 'Acceso a computadoras cuánticas reales a través de la nube y recursos educativos sobre computación cuántica.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    link: 'https://quantum-computing.ibm.com/',
    category: 'quantum',
    gradientClass: 'quantum-gradient'
  },
  {
    id: 8,
    title: 'OpenAI',
    description: 'Organización de investigación en IA que desarrolla tecnologías como GPT y DALL-E.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    link: 'https://openai.com/',
    category: 'ai',
    gradientClass: 'tech-gradient'
  },
  {
    id: 9,
    title: 'Fast.ai',
    description: 'Curso práctico de aprendizaje profundo para programadores con enfoque en aplicaciones reales.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    link: 'https://www.fast.ai/',
    category: 'courses',
    gradientClass: 'quantum-gradient'
  }
];

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filtrar recursos por categoría
  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--dark-matter)]">
      <StarField />
      <Navbar />
      
      <main className="relative pt-20">
        {/* Hero Section con efecto 3D */}
        <section className="relative h-[50vh] overflow-hidden">
          <ResourcesScene />
          <div className="absolute inset-0 flex items-center justify-center text-center px-4 bg-gradient-to-b from-transparent via-[var(--dark-matter)]/30 to-[var(--dark-matter)]">
            <motion.div 
              className="max-w-4xl z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 space-text"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Recursos Galácticos
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Explora nuestra colección de herramientas, bibliotecas y cursos para tu viaje por el universo de la IA y la computación cuántica.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Filtros de categoría */}
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.id
                    ? 'bg-[var(--accent)] text-white'
                    : 'bg-[var(--nebula)] text-gray-300 hover:bg-[var(--accent)]/20'
                }`}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>

          {/* Grid de recursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                description={resource.description}
                icon={resource.icon}
                link={resource.link}
                category={categories.find(cat => cat.id === resource.category)?.name || ''}
                gradientClass={resource.gradientClass}
              />
            ))}
          </div>
        </section>

        {/* Sección de contribución */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <motion.div 
            className="space-card p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 space-text">¿Conoces algún recurso valioso?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Nuestra misión es crear la mejor colección de recursos para aprender IA, Machine Learning y Computación Cuántica. Si conoces algún recurso que debería estar aquí, ¡compártelo con nosotros!
            </p>
            <motion.a
              href="mailto:info@ai-learning-platform.com"
              className="quantum-button px-6 py-3 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sugerir un recurso
            </motion.a>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
