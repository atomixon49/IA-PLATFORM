'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import CourseCard from '../../../components/dashboard/CourseCard';

// Datos de ejemplo para los cursos
const coursesData = [
  {
    id: 'machine-learning',
    title: 'Curso de Machine Learning',
    description: 'Aprende los fundamentos del aprendizaje automático y cómo aplicarlo en problemas reales.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    progress: 45,
    category: 'Machine Learning',
    duration: '20 horas',
    level: 'Intermedio' as const
  },
  {
    id: 'inteligencia-artificial',
    title: 'Curso de Inteligencia Artificial (IA)',
    description: 'Descubre qué es la IA, sus aplicaciones y cómo está cambiando el mundo.',
    image: 'https://images.unsplash.com/photo-1677442135136-760c813a743d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    progress: 75,
    category: 'IA',
    duration: '15 horas',
    level: 'Principiante' as const
  },
  {
    id: 'servidores-mcp',
    title: 'Curso de Servidores MCP',
    description: 'Aprende a configurar y gestionar servidores con el protocolo Model Context Protocol.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    progress: 10,
    category: 'Servidores',
    duration: '18 horas',
    level: 'Avanzado' as const
  },
  {
    id: 'computacion-cuantica',
    title: 'Curso de Computación Cuántica',
    description: 'Explora los fundamentos de la computación cuántica y sus aplicaciones futuras.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    progress: 5,
    category: 'Cuántica',
    duration: '25 horas',
    level: 'Avanzado' as const
  }
];

// Categorías para filtrar
const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'machine-learning', name: 'Machine Learning' },
  { id: 'ia', name: 'Inteligencia Artificial' },
  { id: 'servidores', name: 'Servidores' },
  { id: 'cuantica', name: 'Computación Cuántica' }
];

// Niveles para filtrar
const levels = [
  { id: 'all', name: 'Todos los niveles' },
  { id: 'principiante', name: 'Principiante' },
  { id: 'intermedio', name: 'Intermedio' },
  { id: 'avanzado', name: 'Avanzado' }
];

export default function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('title');

  // Filtrar cursos
  const filteredCourses = coursesData
    .filter(course => {
      // Filtrar por término de búsqueda
      if (searchTerm && !course.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
          !course.description.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Filtrar por categoría
      if (selectedCategory !== 'all' && !course.category.toLowerCase().includes(selectedCategory)) {
        return false;
      }
      
      // Filtrar por nivel
      if (selectedLevel !== 'all' && course.level.toLowerCase() !== selectedLevel) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Ordenar cursos
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'progress') {
        return b.progress - a.progress;
      } else if (sortBy === 'duration') {
        return parseInt(a.duration) - parseInt(b.duration);
      }
      return 0;
    });

  return (
    <DashboardLayout>
      <div className="relative z-10">
        {/* Encabezado */}
        <div className="mb-8">
          <motion.h1 
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Mis Cursos
          </motion.h1>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Explora y continúa tu aprendizaje en IA, Machine Learning y más
          </motion.p>
        </div>
        
        {/* Filtros y búsqueda */}
        <motion.div 
          className="space-card p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Búsqueda */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Buscar</label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-[var(--nebula)] border border-[var(--accent)]/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                  placeholder="Buscar cursos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Filtro por categoría */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Categoría</label>
              <select
                className="w-full px-4 py-2 bg-[var(--nebula)] border border-[var(--accent)]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            
            {/* Filtro por nivel */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Nivel</label>
              <select
                className="w-full px-4 py-2 bg-[var(--nebula)] border border-[var(--accent)]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
              >
                {levels.map(level => (
                  <option key={level.id} value={level.id}>{level.name}</option>
                ))}
              </select>
            </div>
            
            {/* Ordenar por */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Ordenar por</label>
              <select
                className="w-full px-4 py-2 bg-[var(--nebula)] border border-[var(--accent)]/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="title">Nombre</option>
                <option value="progress">Progreso</option>
                <option value="duration">Duración</option>
              </select>
            </div>
          </div>
        </motion.div>
        
        {/* Lista de cursos */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                image={course.image}
                progress={course.progress}
                category={course.category}
                duration={course.duration}
                level={course.level}
              />
            ))}
          </div>
        ) : (
          <motion.div 
            className="space-card p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold mb-2">No se encontraron cursos</h3>
            <p className="text-gray-400 mb-4">Prueba con otros filtros o términos de búsqueda</p>
            <button
              className="px-4 py-2 bg-[var(--accent)]/20 text-[var(--accent)] rounded-lg hover:bg-[var(--accent)]/30 transition-colors"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedLevel('all');
              }}
            >
              Limpiar filtros
            </button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
}
