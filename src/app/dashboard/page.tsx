'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import DashboardScene from '../../components/dashboard/DashboardScene';
import StatsCard from '../../components/dashboard/StatsCard';
import CourseCard from '../../components/dashboard/CourseCard';
import RecommendationCard from '../../components/dashboard/RecommendationCard';
import { useAuthContext } from '../../context/AuthContext';

// Datos de ejemplo para el dashboard
const coursesData = [
  {
    id: '1',
    title: 'Fundamentos de Inteligencia Artificial',
    description: 'Aprende los conceptos básicos de la IA y sus aplicaciones en el mundo real.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    progress: 75,
    category: 'IA',
    duration: '8 horas',
    level: 'Principiante' as const
  },
  {
    id: '2',
    title: 'Machine Learning con Python',
    description: 'Domina los algoritmos de aprendizaje automático utilizando Python y scikit-learn.',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    progress: 45,
    category: 'ML',
    duration: '12 horas',
    level: 'Intermedio' as const
  },
  {
    id: '3',
    title: 'Redes Neuronales Profundas',
    description: 'Explora las arquitecturas avanzadas de redes neuronales y sus aplicaciones.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    progress: 20,
    category: 'Deep Learning',
    duration: '15 horas',
    level: 'Avanzado' as const
  },
  {
    id: '4',
    title: 'Introducción a la Computación Cuántica',
    description: 'Descubre los fundamentos de la computación cuántica y sus algoritmos básicos.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    progress: 10,
    category: 'Cuántica',
    duration: '10 horas',
    level: 'Intermedio' as const
  }
];

const recommendationsData = [
  {
    id: '1',
    title: 'Procesamiento de Lenguaje Natural',
    description: 'Aprende a construir modelos que entiendan y generen lenguaje humano.',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'NLP',
    href: '/dashboard/courses/nlp'
  },
  {
    id: '2',
    title: 'Visión por Computadora',
    description: 'Explora técnicas para que las máquinas puedan interpretar y procesar imágenes.',
    image: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    category: 'Computer Vision',
    href: '/dashboard/courses/vision'
  }
];

export default function DashboardPage() {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState('all');
  
  // Filtrar cursos por categoría
  const filteredCourses = activeTab === 'all' 
    ? coursesData 
    : coursesData.filter(course => course.category.toLowerCase() === activeTab);

  return (
    <DashboardLayout>
      <DashboardScene />
      
      <div className="relative z-10">
        {/* Encabezado */}
        <div className="mb-8">
          <motion.h1 
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Bienvenido, {user?.user_metadata?.username || user?.email?.split('@')[0] || 'Explorador'}
          </motion.h1>
          <motion.p 
            className="text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Continúa tu viaje de aprendizaje en IA y computación cuántica
          </motion.p>
        </div>
        
        {/* Estadísticas */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StatsCard 
            title="Cursos Activos" 
            value="4" 
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
            change={{ value: 25, isPositive: true }}
            gradientClass="quantum-gradient"
          />
          
          <StatsCard 
            title="Horas de Estudio" 
            value="32" 
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            change={{ value: 12, isPositive: true }}
            gradientClass="tech-gradient"
          />
          
          <StatsCard 
            title="Proyectos Completados" 
            value="2" 
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            }
            change={{ value: 100, isPositive: true }}
            gradientClass="quantum-gradient"
          />
          
          <StatsCard 
            title="Progreso General" 
            value="37%" 
            icon={
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            change={{ value: 5, isPositive: true }}
            gradientClass="tech-gradient"
          />
        </motion.div>
        
        {/* Mis Cursos */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Mis Cursos</h2>
            <a href="/dashboard/courses" className="text-sm text-[var(--accent)] hover:text-[var(--primary)] transition-colors">
              Ver todos
            </a>
          </div>
          
          {/* Filtros */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--nebula)] text-gray-300 hover:bg-[var(--accent)]/20'
              }`}
              onClick={() => setActiveTab('all')}
            >
              Todos
            </button>
            <button
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'ia'
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--nebula)] text-gray-300 hover:bg-[var(--accent)]/20'
              }`}
              onClick={() => setActiveTab('ia')}
            >
              IA
            </button>
            <button
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'ml'
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--nebula)] text-gray-300 hover:bg-[var(--accent)]/20'
              }`}
              onClick={() => setActiveTab('ml')}
            >
              Machine Learning
            </button>
            <button
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                activeTab === 'cuántica'
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--nebula)] text-gray-300 hover:bg-[var(--accent)]/20'
              }`}
              onClick={() => setActiveTab('cuántica')}
            >
              Cuántica
            </button>
          </div>
          
          {/* Grid de cursos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course) => (
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
        </motion.div>
        
        {/* Recomendaciones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Recomendado para ti</h2>
            <a href="/dashboard/recommendations" className="text-sm text-[var(--accent)] hover:text-[var(--primary)] transition-colors">
              Ver más
            </a>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recommendationsData.map((recommendation) => (
              <RecommendationCard
                key={recommendation.id}
                title={recommendation.title}
                description={recommendation.description}
                image={recommendation.image}
                category={recommendation.category}
                href={recommendation.href}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
