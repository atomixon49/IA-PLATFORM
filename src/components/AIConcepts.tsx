'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Concept = {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
};

const concepts: Concept[] = [
  {
    id: 1,
    title: 'Redes Neuronales',
    description: 'Modelos inspirados en el cerebro humano que aprenden a reconocer patrones a través de capas interconectadas de nodos.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>`,
    color: 'from-blue-500 to-blue-700',
  },
  {
    id: 2,
    title: 'Aprendizaje Profundo',
    description: 'Técnicas avanzadas de machine learning que utilizan múltiples capas para extraer progresivamente características de mayor nivel.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>`,
    color: 'from-purple-500 to-purple-700',
  },
  {
    id: 3,
    title: 'Procesamiento de Lenguaje Natural',
    description: 'Técnicas que permiten a las máquinas entender, interpretar y generar lenguaje humano de manera natural.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>`,
    color: 'from-green-500 to-green-700',
  },
  {
    id: 4,
    title: 'Visión por Computadora',
    description: 'Sistemas que pueden identificar y procesar objetos en imágenes y videos de manera similar a la visión humana.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>`,
    color: 'from-red-500 to-red-700',
  },
  {
    id: 5,
    title: 'Computación Cuántica',
    description: 'Paradigma de computación que utiliza fenómenos cuánticos como la superposición y el entrelazamiento para realizar operaciones en datos.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>`,
    color: 'from-yellow-500 to-yellow-700',
  },
  {
    id: 6,
    title: 'Aprendizaje por Refuerzo',
    description: 'Tipo de aprendizaje automático donde un agente aprende a comportarse en un entorno mediante la realización de acciones y la observación de resultados.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>`,
    color: 'from-indigo-500 to-indigo-700',
  },
];

export default function AIConcepts() {
  const [activeConcept, setActiveConcept] = useState<Concept | null>(null);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Conceptos Fundamentales</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explora los conceptos clave que forman la base de la inteligencia artificial moderna y la computación cuántica.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {concepts.map((concept, index) => (
            <motion.div
              key={concept.id}
              className={`relative cursor-pointer rounded-xl overflow-hidden hover:shadow-lg transition-all ${
                activeConcept?.id === concept.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              onClick={() => setActiveConcept(concept)}
            >
              <div className={`bg-gradient-to-br ${concept.color} p-6 text-white h-full flex flex-col items-center justify-center text-center`}>
                <div className="w-12 h-12 mb-4" dangerouslySetInnerHTML={{ __html: concept.icon }} />
                <h3 className="font-bold">{concept.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeConcept && (
            <motion.div
              key={activeConcept.id}
              className="bg-white rounded-xl p-6 shadow-xl max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${activeConcept.color} p-2 text-white mr-4`} 
                    dangerouslySetInnerHTML={{ __html: activeConcept.icon }} />
                  <h3 className="text-xl font-bold">{activeConcept.title}</h3>
                </div>
                <button 
                  onClick={() => setActiveConcept(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-gray-600">{activeConcept.description}</p>
              <div className="mt-4 flex justify-end">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  Aprender más
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!activeConcept && (
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500 italic">Selecciona un concepto para ver más detalles</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
