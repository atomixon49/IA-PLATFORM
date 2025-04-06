'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import DashboardLayout from '../../../../components/dashboard/DashboardLayout';
import CourseHeader from '../../../../components/courses/CourseHeader';
import CourseModuleCard from '../../../../components/courses/CourseModuleCard';
import MLScene from '../../../../components/3d/MLScene';
import AIScene from '../../../../components/3d/AIScene';
import ServerScene from '../../../../components/3d/ServerScene';
import QuantumScene from '../../../../components/3d/QuantumScene';

// Datos de ejemplo para los cursos
const coursesData = {
  'machine-learning': {
    id: 'machine-learning',
    title: 'Curso de Machine Learning',
    description: 'Aprende los fundamentos del aprendizaje automático y cómo aplicarlo en problemas reales sin necesidad de conocimientos avanzados de programación.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    progress: 45,
    category: 'Machine Learning',
    duration: '20 horas',
    level: 'Intermedio' as const,
    instructor: {
      name: 'Dra. Elena Vega',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      title: 'Científica de Datos'
    },
    modules: [
      {
        id: 'ml-module-1',
        title: '¿Qué es Machine Learning? ¡Aprende sin programar!',
        description: 'Introducción a los conceptos básicos del aprendizaje automático y cómo funciona sin entrar en detalles técnicos complejos.',
        duration: '4 horas',
        progress: 100
      },
      {
        id: 'ml-module-2',
        title: 'Algoritmos ¡Como un chef de datos!',
        description: 'Aprende sobre los diferentes tipos de algoritmos de ML y cómo elegir el adecuado para cada problema.',
        duration: '8 horas',
        progress: 60
      },
      {
        id: 'ml-module-3',
        title: 'Herramientas ¡Manos a la obra!',
        description: 'Explora las herramientas más populares para implementar soluciones de ML sin necesidad de programar.',
        duration: '8 horas',
        progress: 0,
        isLocked: true
      }
    ]
  },
  'inteligencia-artificial': {
    id: 'inteligencia-artificial',
    title: 'Curso de Inteligencia Artificial (IA)',
    description: 'Descubre qué es la IA, sus aplicaciones y cómo está cambiando el mundo, con un enfoque especial en los aspectos éticos y sociales.',
    image: 'https://images.unsplash.com/photo-1677442135136-760c813a743d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    progress: 75,
    category: 'IA',
    duration: '15 horas',
    level: 'Principiante' as const,
    instructor: {
      name: 'Dr. Alejandro Reyes',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      title: 'Director de Investigación'
    },
    modules: [
      {
        id: 'ia-module-1',
        title: 'IA: ¡Más que robots!',
        description: 'Comprende qué es realmente la IA, su historia y cómo está presente en nuestra vida cotidiana.',
        duration: '5 horas',
        progress: 100
      },
      {
        id: 'ia-module-2',
        title: 'Ética en IA: ¿Dónde está el límite?',
        description: 'Explora los dilemas éticos que plantea la IA y cómo podemos desarrollarla de manera responsable.',
        duration: '5 horas',
        progress: 100
      },
      {
        id: 'ia-module-3',
        title: 'Herramientas IA: ¡Crea sin código!',
        description: 'Aprende a utilizar herramientas de IA sin necesidad de programar para crear soluciones innovadoras.',
        duration: '5 horas',
        progress: 25
      }
    ]
  },
  'servidores-mcp': {
    id: 'servidores-mcp',
    title: 'Curso de Servidores MCP',
    description: 'Aprende a configurar y gestionar servidores con el protocolo Model Context Protocol, la base de las comunicaciones modernas en IA.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    progress: 10,
    category: 'Servidores',
    duration: '18 horas',
    level: 'Avanzado' as const,
    instructor: {
      name: 'Carlos Mendoza',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      title: 'Desarrollador Full-Stack'
    },
    modules: [
      {
        id: 'mcp-module-1',
        title: 'Servidores: ¡Los camareros de Internet!',
        description: 'Comprende qué son los servidores, cómo funcionan y su papel fundamental en la infraestructura de Internet.',
        duration: '6 horas',
        progress: 30
      },
      {
        id: 'mcp-module-2',
        title: 'MCP: ¡Hablando en código!',
        description: 'Aprende sobre el protocolo Model Context Protocol y cómo facilita la comunicación entre modelos de IA.',
        duration: '6 horas',
        progress: 0,
        isLocked: true
      },
      {
        id: 'mcp-module-3',
        title: 'Herramientas: ¡Maneja tus servidores como un pro!',
        description: 'Explora las herramientas y técnicas para gestionar servidores MCP de manera eficiente.',
        duration: '6 horas',
        progress: 0,
        isLocked: true
      }
    ]
  },
  'computacion-cuantica': {
    id: 'computacion-cuantica',
    title: 'Curso de Computación Cuántica',
    description: 'Explora los fundamentos de la computación cuántica y sus aplicaciones futuras, desde los qubits hasta los algoritmos cuánticos.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    progress: 5,
    category: 'Cuántica',
    duration: '25 horas',
    level: 'Avanzado' as const,
    instructor: {
      name: 'Dra. Sofía Martínez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      title: 'Física Cuántica'
    },
    modules: [
      {
        id: 'quantum-module-1',
        title: 'Qubits: ¡El gato de Schrödinger existe!',
        description: 'Introducción a los conceptos fundamentales de la mecánica cuántica y los qubits como unidad básica de información cuántica.',
        duration: '8 horas',
        progress: 15
      },
      {
        id: 'quantum-module-2',
        title: 'Algoritmos cuánticos: ¡Hackeando el futuro!',
        description: 'Explora los algoritmos cuánticos más importantes y cómo pueden resolver problemas imposibles para computadoras clásicas.',
        duration: '8 horas',
        progress: 0,
        isLocked: true
      },
      {
        id: 'quantum-module-3',
        title: 'Herramientas: ¡Juega con qubits!',
        description: 'Aprende a utilizar simuladores y herramientas para experimentar con computación cuántica sin necesidad de hardware especializado.',
        duration: '9 horas',
        progress: 0,
        isLocked: true
      }
    ]
  }
};

export default function CoursePage() {
  const { courseId } = useParams();
  const [course, setCourse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setLoading(true);
    setTimeout(() => {
      if (typeof courseId === 'string' && coursesData[courseId as keyof typeof coursesData]) {
        setCourse(coursesData[courseId as keyof typeof coursesData]);
      }
      setLoading(false);
    }, 500);
  }, [courseId]);

  // Renderizar escena 3D según el curso
  const renderScene = () => {
    if (!course) return null;
    
    switch (course.id) {
      case 'machine-learning':
        return <MLScene />;
      case 'inteligencia-artificial':
        return <AIScene />;
      case 'servidores-mcp':
        return <ServerScene />;
      case 'computacion-cuantica':
        return <QuantumScene />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 rounded-full quantum-gradient animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-[var(--dark-matter)] flex items-center justify-center">
              <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!course) {
    return (
      <DashboardLayout>
        <div className="space-card p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-xl font-bold mb-2">Curso no encontrado</h3>
          <p className="text-gray-400 mb-4">El curso que estás buscando no existe o no está disponible.</p>
          <a
            href="/dashboard/courses"
            className="px-4 py-2 bg-[var(--accent)]/20 text-[var(--accent)] rounded-lg hover:bg-[var(--accent)]/30 transition-colors"
          >
            Volver a cursos
          </a>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {renderScene()}
      
      <div className="relative z-10">
        {/* Cabecera del curso */}
        <CourseHeader
          id={course.id}
          title={course.title}
          description={course.description}
          image={course.image}
          category={course.category}
          duration={course.duration}
          level={course.level}
          progress={course.progress}
          instructor={course.instructor}
        />
        
        {/* Módulos del curso */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6">Módulos del curso</h2>
          
          <div className="space-y-6">
            {course.modules.map((module: any, index: number) => (
              <CourseModuleCard
                key={module.id}
                id={module.id}
                courseId={course.id}
                title={module.title}
                description={module.description}
                duration={module.duration}
                progress={module.progress}
                index={index}
                isLocked={module.isLocked}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
