'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuthContext } from '../../context/AuthContext';

// Iconos para el menú
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const CoursesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const ProgressIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

const ResourcesIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { user, signOut } = useAuthContext();
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon />, href: '/dashboard' },
    { id: 'courses', label: 'Mis Cursos', icon: <CoursesIcon />, href: '/dashboard/courses' },
    { id: 'progress', label: 'Progreso', icon: <ProgressIcon />, href: '/dashboard/progress' },
    { id: 'resources', label: 'Recursos', icon: <ResourcesIcon />, href: '/dashboard/resources' },
    { id: 'settings', label: 'Configuración', icon: <SettingsIcon />, href: '/dashboard/settings' },
  ];

  return (
    <>
      {/* Overlay para móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <motion.div
        className={`fixed top-0 left-0 h-full bg-[var(--dark-matter)] border-r border-[var(--accent)]/20 z-50 md:z-30 transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-0 md:w-20'
        } overflow-hidden`}
        initial={false}
      >
        <div className="flex flex-col h-full">
          {/* Logo y título */}
          <div className="p-4 border-b border-[var(--accent)]/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg quantum-gradient flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <motion.span 
                className="text-xl font-bold space-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                AI Learning
              </motion.span>
            </div>
          </div>

          {/* Perfil de usuario */}
          <div className="p-4 border-b border-[var(--accent)]/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold">
                  {user?.user_metadata?.username?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <motion.div
                className="flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm font-medium text-white">
                  {user?.user_metadata?.username || user?.email?.split('@')[0] || 'Usuario'}
                </span>
                <span className="text-xs text-gray-400">
                  {user?.email || ''}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Menú de navegación */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <Link href={item.href}>
                    <motion.div
                      className={`flex items-center px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                        activeItem === item.id
                          ? 'bg-[var(--accent)]/20 text-white'
                          : 'text-gray-400 hover:bg-[var(--accent)]/10 hover:text-white'
                      }`}
                      onClick={() => setActiveItem(item.id)}
                      whileHover={{ x: isOpen ? 5 : 0 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      <motion.span
                        className="ml-3 text-sm font-medium"
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ 
                          opacity: isOpen ? 1 : 0,
                          width: isOpen ? 'auto' : 0
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                      {activeItem === item.id && (
                        <motion.div
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
                          layoutId="activeIndicator"
                        />
                      )}
                    </motion.div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Botón de cerrar sesión */}
          <div className="p-4 border-t border-[var(--accent)]/20">
            <motion.button
              className="flex items-center w-full px-4 py-3 rounded-lg text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-colors"
              onClick={signOut}
              whileHover={{ x: isOpen ? 5 : 0 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex-shrink-0"><LogoutIcon /></span>
              <motion.span
                className="ml-3 text-sm font-medium"
                initial={{ opacity: 0, width: 0 }}
                animate={{ 
                  opacity: isOpen ? 1 : 0,
                  width: isOpen ? 'auto' : 0
                }}
                transition={{ duration: 0.2 }}
              >
                Cerrar Sesión
              </motion.span>
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
