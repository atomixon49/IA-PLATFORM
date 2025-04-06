'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import Navbar from '../../components/Navbar';
import TeamMember from '../../components/TeamMember';
import Footer from '../../components/Footer';
import StarField from '../../components/StarField';

// Importación dinámica del componente 3D para mejor rendimiento
const AboutScene = dynamic(() => import('../../components/3d/AboutScene'), {
  ssr: false,
  loading: () => <div className="w-full h-[50vh] bg-[var(--dark-matter)] animate-pulse" />
});

// Datos del equipo
const teamMembers = [
  {
    id: 1,
    name: 'Dra. Elena Vega',
    role: 'Fundadora & Científica de Datos',
    bio: 'Doctora en Inteligencia Artificial con más de 10 años de experiencia en investigación. Apasionada por democratizar el acceso al conocimiento en IA.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    socialLinks: {
      github: 'https://github.com/',
      linkedin: 'https://linkedin.com/',
      twitter: 'https://twitter.com/'
    }
  },
  {
    id: 2,
    name: 'Dr. Alejandro Reyes',
    role: 'Director de Investigación en Computación Cuántica',
    bio: 'Físico teórico especializado en computación cuántica. Ha trabajado en IBM Quantum y lidera nuestros cursos avanzados de algoritmos cuánticos.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    socialLinks: {
      github: 'https://github.com/',
      linkedin: 'https://linkedin.com/'
    }
  },
  {
    id: 3,
    name: 'Sofía Martínez',
    role: 'Ingeniera de ML & Educadora',
    bio: 'Ingeniera de software especializada en sistemas de aprendizaje automático. Apasionada por crear experiencias educativas interactivas y accesibles.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    socialLinks: {
      github: 'https://github.com/',
      twitter: 'https://twitter.com/'
    }
  },
  {
    id: 4,
    name: 'Carlos Mendoza',
    role: 'Desarrollador Full-Stack',
    bio: 'Especialista en desarrollo web con experiencia en plataformas educativas. Responsable de la arquitectura técnica y la experiencia de usuario de la plataforma.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
    socialLinks: {
      github: 'https://github.com/',
      linkedin: 'https://linkedin.com/'
    }
  }
];

// Datos de la misión y valores
const missionValues = [
  {
    id: 'mission',
    title: 'Nuestra Misión',
    description: 'Democratizar el acceso al conocimiento en Inteligencia Artificial, Machine Learning y Computación Cuántica a través de una plataforma educativa innovadora, interactiva y accesible para todos.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    )
  },
  {
    id: 'vision',
    title: 'Nuestra Visión',
    description: 'Ser la plataforma líder en educación tecnológica avanzada, formando la próxima generación de innovadores que resolverán los desafíos más importantes del mundo utilizando IA y computación cuántica.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    )
  },
  {
    id: 'innovation',
    title: 'Innovación',
    description: 'Nos comprometemos a estar a la vanguardia de la tecnología educativa, incorporando las últimas investigaciones y herramientas para ofrecer una experiencia de aprendizaje única.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  },
  {
    id: 'accessibility',
    title: 'Accesibilidad',
    description: 'Creemos que el conocimiento debe ser accesible para todos, independientemente de su ubicación o recursos. Trabajamos para eliminar barreras y crear contenido inclusivo.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    )
  },
  {
    id: 'community',
    title: 'Comunidad',
    description: 'Fomentamos una comunidad global de estudiantes, educadores e investigadores que colaboran, comparten conocimientos y se apoyan mutuamente en su viaje de aprendizaje.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: 'ethics',
    title: 'Ética',
    description: 'Promovemos el desarrollo y uso responsable de la IA y la tecnología cuántica, enfatizando consideraciones éticas en todos nuestros cursos y materiales.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--dark-matter)]">
      <StarField />
      <Navbar />
      
      <main className="relative pt-20">
        {/* Hero Section con efecto 3D */}
        <section className="relative h-[50vh] overflow-hidden">
          <AboutScene />
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
                Sobre Nosotros
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Explorando el universo de la inteligencia artificial y la computación cuántica, un curso a la vez.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Nuestra Historia */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <motion.div 
            className="space-card p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 space-text">Nuestra Historia</h2>
                <p className="text-gray-300 mb-4">
                  AI Learning Platform nació en 2022 de la visión de un grupo de investigadores y educadores apasionados por la inteligencia artificial y la computación cuántica. Observamos que, a pesar del creciente interés en estas tecnologías transformadoras, existía una brecha significativa entre el conocimiento académico avanzado y los recursos educativos accesibles.
                </p>
                <p className="text-gray-300 mb-4">
                  Nuestra misión era clara: crear una plataforma que democratizara el acceso a la educación en IA y computación cuántica, haciendo que conceptos complejos fueran comprensibles y aplicables para estudiantes de todos los niveles.
                </p>
                <p className="text-gray-300">
                  Hoy, continuamos expandiendo nuestra biblioteca de cursos, herramientas interactivas y recursos, guiados por nuestra pasión por la educación y la innovación tecnológica.
                </p>
              </div>
              <div className="md:w-1/2 relative">
                <motion.div 
                  className="w-full h-64 md:h-80 rounded-xl overflow-hidden quantum-gradient"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-1 rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                      alt="Equipo de AI Learning Platform" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
                
                {/* Partículas decorativas */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20"
                  animate={{
                    rotate: 360
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-3 h-3 rounded-full bg-[var(--accent)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16"
                  animate={{
                    rotate: -360
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-2 h-2 rounded-full bg-[var(--primary)] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Misión y Valores */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center space-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Misión y Valores
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missionValues.map((item, index) => (
              <motion.div
                key={item.id}
                className="space-card p-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-16 h-16 rounded-full quantum-gradient flex items-center justify-center mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Nuestro Equipo */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center space-text"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Nuestro Equipo Estelar
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <TeamMember
                key={member.id}
                name={member.name}
                role={member.role}
                bio={member.bio}
                image={member.image}
                socialLinks={member.socialLinks}
              />
            ))}
          </div>
        </section>

        {/* Contacto */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <motion.div 
            className="space-card p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 space-text">¿Quieres unirte a nuestra misión?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Estamos siempre buscando colaboradores apasionados por la educación en tecnología. Si eres educador, investigador o desarrollador y compartes nuestra visión, nos encantaría saber de ti.
            </p>
            <motion.a
              href="mailto:contact@ai-learning-platform.com"
              className="quantum-button px-6 py-3 inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contáctanos
            </motion.a>
          </motion.div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
