'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import DashboardLayout from '../../../../../../components/dashboard/DashboardLayout';
import MLScene from '../../../../../../components/3d/MLScene';
import AIScene from '../../../../../../components/3d/AIScene';
import ServerScene from '../../../../../../components/3d/ServerScene';
import QuantumScene from '../../../../../../components/3d/QuantumScene';

// Datos de ejemplo para los módulos
const modulesData = {
  'ml-module-1': {
    id: 'ml-module-1',
    courseId: 'machine-learning',
    title: '¿Qué es Machine Learning? ¡Aprende sin programar!',
    description: 'Introducción a los conceptos básicos del aprendizaje automático y cómo funciona sin entrar en detalles técnicos complejos.',
    duration: '4 horas',
    progress: 100,
    content: `
      <h1>¿Qué es Machine Learning?</h1>
      <p>El Machine Learning o Aprendizaje Automático es una rama de la Inteligencia Artificial que permite a las computadoras aprender patrones a partir de datos sin ser explícitamente programadas para ello.</p>
      
      <h2>Conceptos clave</h2>
      <ul>
        <li><strong>Datos:</strong> La materia prima del Machine Learning. Sin datos, no hay aprendizaje.</li>
        <li><strong>Algoritmos:</strong> Las recetas que utilizamos para encontrar patrones en los datos.</li>
        <li><strong>Modelos:</strong> El resultado de aplicar algoritmos a los datos. Un modelo puede hacer predicciones.</li>
        <li><strong>Entrenamiento:</strong> El proceso de ajustar un modelo para que aprenda de los datos.</li>
      </ul>
      
      <h2>Tipos de Machine Learning</h2>
      <p>Existen tres tipos principales de aprendizaje automático:</p>
      
      <h3>Aprendizaje Supervisado</h3>
      <p>Es como aprender con un profesor. Los datos de entrenamiento incluyen las respuestas correctas (etiquetas), y el algoritmo aprende a predecir estas etiquetas para nuevos datos.</p>
      <p>Ejemplos: Clasificación de correos electrónicos como spam o no spam, predicción de precios de casas.</p>
      
      <h3>Aprendizaje No Supervisado</h3>
      <p>Es como aprender sin profesor. El algoritmo busca patrones en los datos sin tener etiquetas previas.</p>
      <p>Ejemplos: Agrupación de clientes por comportamiento de compra, detección de anomalías.</p>
      
      <h3>Aprendizaje por Refuerzo</h3>
      <p>Es como aprender por prueba y error. El algoritmo aprende a tomar decisiones recibiendo recompensas o penalizaciones.</p>
      <p>Ejemplos: Robots que aprenden a caminar, programas que juegan videojuegos.</p>
    `
  },
  'ml-module-2': {
    id: 'ml-module-2',
    courseId: 'machine-learning',
    title: 'Algoritmos ¡Como un chef de datos!',
    description: 'Aprende sobre los diferentes tipos de algoritmos de ML y cómo elegir el adecuado para cada problema.',
    duration: '8 horas',
    progress: 60,
    content: `
      <h1>Algoritmos de Machine Learning</h1>
      <p>Los algoritmos de Machine Learning son como recetas de cocina. Cada uno tiene sus ingredientes (datos), su proceso de preparación (entrenamiento) y su resultado final (modelo).</p>
      
      <h2>Algoritmos de Clasificación</h2>
      <p>Estos algoritmos predicen a qué categoría pertenece un dato.</p>
      <ul>
        <li><strong>Árboles de Decisión:</strong> Como un juego de "20 preguntas" para clasificar datos.</li>
        <li><strong>Naive Bayes:</strong> Utiliza probabilidades para hacer predicciones.</li>
        <li><strong>K-Nearest Neighbors:</strong> Clasifica según los vecinos más cercanos.</li>
        <li><strong>Support Vector Machines:</strong> Encuentra la mejor línea o hiperplano para separar categorías.</li>
      </ul>
      
      <h2>Algoritmos de Regresión</h2>
      <p>Estos algoritmos predicen valores numéricos continuos.</p>
      <ul>
        <li><strong>Regresión Lineal:</strong> Encuentra la mejor línea que se ajusta a los datos.</li>
        <li><strong>Regresión Polinómica:</strong> Para relaciones no lineales entre variables.</li>
        <li><strong>Random Forest:</strong> Combina múltiples árboles de decisión para mayor precisión.</li>
      </ul>
      
      <h2>Algoritmos de Clustering</h2>
      <p>Estos algoritmos agrupan datos similares sin etiquetas previas.</p>
      <ul>
        <li><strong>K-Means:</strong> Agrupa datos en K clusters basados en la similitud.</li>
        <li><strong>DBSCAN:</strong> Agrupa basándose en la densidad de los puntos.</li>
        <li><strong>Hierarchical Clustering:</strong> Crea una jerarquía de clusters.</li>
      </ul>
    `
  },
  'ml-module-3': {
    id: 'ml-module-3',
    courseId: 'machine-learning',
    title: 'Herramientas ¡Manos a la obra!',
    description: 'Explora las herramientas más populares para implementar soluciones de ML sin necesidad de programar.',
    duration: '8 horas',
    progress: 0,
    isLocked: true,
    content: `
      <h1>Herramientas de Machine Learning sin código</h1>
      <p>Actualmente existen muchas herramientas que permiten implementar soluciones de Machine Learning sin necesidad de programar. Estas plataformas democratizan el acceso a la IA.</p>
      
      <h2>Plataformas No-Code para Machine Learning</h2>
      <ul>
        <li><strong>Google AutoML:</strong> Permite crear modelos personalizados sin código.</li>
        <li><strong>Obviously AI:</strong> Predicciones y análisis sin código.</li>
        <li><strong>Lobe:</strong> Entrena modelos de visión por computadora con una interfaz visual.</li>
        <li><strong>CreateML:</strong> Herramienta de Apple para crear modelos de ML sin código.</li>
      </ul>
      
      <h2>Herramientas de visualización</h2>
      <p>Estas herramientas te ayudan a entender y comunicar tus datos y resultados.</p>
      <ul>
        <li><strong>Tableau:</strong> Plataforma líder en visualización de datos.</li>
        <li><strong>Power BI:</strong> Herramienta de Microsoft para análisis de datos.</li>
        <li><strong>Google Data Studio:</strong> Crea dashboards interactivos fácilmente.</li>
      </ul>
      
      <h2>Plataformas de automatización</h2>
      <p>Estas herramientas te permiten integrar tus modelos de ML en flujos de trabajo.</p>
      <ul>
        <li><strong>Zapier:</strong> Conecta aplicaciones y automatiza flujos de trabajo.</li>
        <li><strong>IFTTT:</strong> "If This Then That" para automatizar tareas simples.</li>
        <li><strong>Microsoft Flow:</strong> Automatiza procesos empresariales.</li>
      </ul>
    `
  },
  'ia-module-1': {
    id: 'ia-module-1',
    courseId: 'inteligencia-artificial',
    title: 'IA: ¡Más que robots!',
    description: 'Comprende qué es realmente la IA, su historia y cómo está presente en nuestra vida cotidiana.',
    duration: '5 horas',
    progress: 100,
    content: `
      <h1>Inteligencia Artificial: Más allá de los robots</h1>
      <p>La Inteligencia Artificial (IA) es mucho más que robots humanoides. Es la ciencia de hacer que las máquinas realicen tareas que normalmente requerirían inteligencia humana.</p>
      
      <h2>Historia de la IA</h2>
      <p>La IA tiene una historia fascinante que se remonta a mediados del siglo XX:</p>
      <ul>
        <li><strong>1950s:</strong> Alan Turing propone la "Prueba de Turing" para determinar si una máquina puede pensar.</li>
        <li><strong>1956:</strong> Conferencia de Dartmouth, donde se acuña el término "Inteligencia Artificial".</li>
        <li><strong>1960s-70s:</strong> Primeros sistemas expertos y desarrollo de ELIZA, un programa de procesamiento de lenguaje natural.</li>
        <li><strong>1980s-90s:</strong> Desarrollo de sistemas basados en reglas y auge de la IA simbólica.</li>
        <li><strong>2000s-presente:</strong> Explosión del aprendizaje profundo, big data y la IA en la nube.</li>
      </ul>
      
      <h2>IA en nuestra vida cotidiana</h2>
      <p>La IA está presente en muchos aspectos de nuestra vida diaria, aunque a veces no nos demos cuenta:</p>
      <ul>
        <li><strong>Asistentes virtuales:</strong> Siri, Alexa, Google Assistant.</li>
        <li><strong>Recomendaciones:</strong> Netflix, Spotify, Amazon.</li>
        <li><strong>Filtros de spam:</strong> En nuestro correo electrónico.</li>
        <li><strong>Navegación GPS:</strong> Predicción de rutas y tráfico.</li>
        <li><strong>Reconocimiento facial:</strong> En nuestros teléfonos y redes sociales.</li>
        <li><strong>Traducción automática:</strong> Google Translate y otras herramientas.</li>
      </ul>
      
      <h2>Tipos de IA</h2>
      <p>Existen diferentes clasificaciones de la IA:</p>
      <ul>
        <li><strong>IA Estrecha (ANI):</strong> Especializada en una tarea específica (toda la IA actual).</li>
        <li><strong>IA General (AGI):</strong> Capaz de realizar cualquier tarea intelectual humana (aún teórica).</li>
        <li><strong>IA Superinteligente (ASI):</strong> Superaría la inteligencia humana en todos los aspectos (ciencia ficción por ahora).</li>
      </ul>
    `
  },
  // Otros módulos...
};

export default function ModulePage() {
  const { courseId, moduleId } = useParams();
  const router = useRouter();
  const [module, setModule] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos
    setLoading(true);
    setTimeout(() => {
      if (typeof moduleId === 'string' && modulesData[moduleId as keyof typeof modulesData]) {
        const moduleData = modulesData[moduleId as keyof typeof modulesData];
        
        // Verificar que el módulo pertenece al curso correcto
        if (moduleData.courseId === courseId) {
          setModule(moduleData);
        }
      }
      setLoading(false);
    }, 500);
  }, [moduleId, courseId]);

  // Renderizar escena 3D según el curso
  const renderScene = () => {
    if (!module) return null;
    
    switch (module.courseId) {
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

  if (!module || module.isLocked) {
    return (
      <DashboardLayout>
        <div className="space-card p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h3 className="text-xl font-bold mb-2">Módulo no disponible</h3>
          <p className="text-gray-400 mb-4">Este módulo no existe, está bloqueado o no pertenece al curso seleccionado.</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-[var(--accent)]/20 text-[var(--accent)] rounded-lg hover:bg-[var(--accent)]/30 transition-colors"
          >
            Volver al curso
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {renderScene()}
      
      <div className="relative z-10">
        {/* Migas de pan */}
        <div className="flex items-center text-sm text-gray-300 mb-6">
          <a href="/dashboard" className="hover:text-white transition-colors">
            Dashboard
          </a>
          <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <a href="/dashboard/courses" className="hover:text-white transition-colors">
            Cursos
          </a>
          <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <a href={`/dashboard/courses/${module.courseId}`} className="hover:text-white transition-colors">
            {module.courseId === 'machine-learning' ? 'Machine Learning' : 
             module.courseId === 'inteligencia-artificial' ? 'Inteligencia Artificial' :
             module.courseId === 'servidores-mcp' ? 'Servidores MCP' :
             module.courseId === 'computacion-cuantica' ? 'Computación Cuántica' : 
             'Curso'}
          </a>
          <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-white">{module.title}</span>
        </div>
        
        {/* Contenido del módulo */}
        <motion.div
          className="space-card p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{module.title}</h1>
              <p className="text-gray-400">{module.description}</p>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {module.duration}
            </div>
          </div>
          
          {/* Barra de progreso */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-400">Progreso del módulo</span>
              <span className="text-[var(--accent)]">{module.progress}%</span>
            </div>
            <div className="h-2 w-full bg-[var(--nebula)] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]"
                initial={{ width: 0 }}
                animate={{ width: `${module.progress}%` }}
                transition={{ duration: 1, delay: 0.4 }}
              />
            </div>
          </div>
          
          {/* Contenido HTML */}
          <div 
            className="prose prose-invert max-w-none prose-headings:text-white prose-headings:font-bold prose-p:text-gray-300 prose-a:text-[var(--accent)] prose-strong:text-white prose-li:text-gray-300"
            dangerouslySetInnerHTML={{ __html: module.content }}
          />
          
          {/* Navegación entre módulos */}
          <div className="mt-12 flex justify-between">
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-[var(--nebula)] text-white rounded-lg hover:bg-[var(--nebula)]/70 transition-colors flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al curso
            </button>
            
            <button
              onClick={() => {
                // Simular completar el módulo
                alert('¡Módulo completado! En una implementación real, esto actualizaría tu progreso.');
              }}
              className="px-4 py-2 bg-[var(--accent)] text-white rounded-lg hover:bg-[var(--accent)]/80 transition-colors flex items-center"
            >
              Marcar como completado
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
