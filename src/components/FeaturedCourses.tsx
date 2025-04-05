'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

type Course = {
  id: number;
  title: string;
  description: string;
  level: string;
  duration: string;
  image: string;
  category: 'ia' | 'ml' | 'quantum';
};

const courses: Course[] = [
  {
    id: 1,
    title: 'Fundamentos de Inteligencia Artificial',
    description: 'Aprende los conceptos básicos de la IA y cómo está transformando el mundo actual.',
    level: 'Principiante',
    duration: '6 semanas',
    image: '/images/ai-fundamentals.jpg',
    category: 'ia',
  },
  {
    id: 2,
    title: 'Machine Learning Práctico',
    description: 'Implementa algoritmos de ML desde cero y aplícalos a problemas reales.',
    level: 'Intermedio',
    duration: '8 semanas',
    image: '/images/ml-practical.jpg',
    category: 'ml',
  },
  {
    id: 3,
    title: 'Redes Neuronales Avanzadas',
    description: 'Domina las arquitecturas de redes neuronales más potentes y sus aplicaciones.',
    level: 'Avanzado',
    duration: '10 semanas',
    image: '/images/neural-networks.jpg',
    category: 'ml',
  },
  {
    id: 4,
    title: 'Introducción a la Computación Cuántica',
    description: 'Descubre los principios básicos de la computación cuántica y sus algoritmos fundamentales.',
    level: 'Principiante',
    duration: '6 semanas',
    image: '/images/quantum-intro.jpg',
    category: 'quantum',
  },
  {
    id: 5,
    title: 'Procesamiento de Lenguaje Natural',
    description: 'Aprende a trabajar con texto y construye modelos de NLP efectivos.',
    level: 'Intermedio',
    duration: '7 semanas',
    image: '/images/nlp.jpg',
    category: 'ia',
  },
  {
    id: 6,
    title: 'Algoritmos Cuánticos',
    description: 'Explora los algoritmos cuánticos más importantes y sus ventajas sobre los clásicos.',
    level: 'Avanzado',
    duration: '9 semanas',
    image: '/images/quantum-algorithms.jpg',
    category: 'quantum',
  },
];

export default function FeaturedCourses() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ia' | 'ml' | 'quantum'>('all');
  
  const filteredCourses = activeFilter === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeFilter);

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Cursos Destacados</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explora nuestra selección de cursos diseñados para llevarte desde los conceptos básicos hasta aplicaciones avanzadas.
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            <FilterButton 
              active={activeFilter === 'all'} 
              onClick={() => setActiveFilter('all')}
              label="Todos"
            />
            <FilterButton 
              active={activeFilter === 'ia'} 
              onClick={() => setActiveFilter('ia')}
              label="Inteligencia Artificial"
            />
            <FilterButton 
              active={activeFilter === 'ml'} 
              onClick={() => setActiveFilter('ml')}
              label="Machine Learning"
            />
            <FilterButton 
              active={activeFilter === 'quantum'} 
              onClick={() => setActiveFilter('quantum')}
              label="Computación Cuántica"
            />
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all">
            Ver Todos los Cursos
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function FilterButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full transition-all ${
        active 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
          : 'bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {label}
    </button>
  );
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  return (
    <motion.div
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="h-48 bg-gray-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 to-purple-600/30 z-10" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold z-20">
          {course.title}
        </div>
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
            {course.level}
          </span>
          <span className="text-sm text-gray-500">{course.duration}</span>
        </div>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <button className="w-full py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
          Ver Detalles
        </button>
      </div>
    </motion.div>
  );
}
