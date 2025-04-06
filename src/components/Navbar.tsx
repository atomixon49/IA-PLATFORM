'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useAuthContext } from '../context/AuthContext';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

function NavLink({ href, children }: NavLinkProps) {
  return (
    <Link href={href}>
      <motion.span
        className="text-gray-300 hover:text-white text-sm font-medium relative cursor-pointer"
        whileHover={{ y: -2 }}
      >
        {children}
        <motion.span
          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--accent)]"
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.2 }}
        />
      </motion.span>
    </Link>
  );
}

function MobileNavLink({ href, children }: NavLinkProps) {
  return (
    <Link href={href}>
      <motion.span
        className="block text-gray-300 hover:text-white hover:bg-[var(--accent)]/10 px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200"
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.span>
    </Link>
  );
}

export default function Navbar(): React.ReactNode {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, loading } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 backdrop-blur-xl border-b transition-colors duration-200 ${
        scrolled
          ? 'bg-[var(--dark-matter)]/90 border-[var(--accent)]/20'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg quantum-gradient flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-2xl font-bold space-text">AI Learning</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <NavLink href="/courses">Cursos</NavLink>
              <NavLink href="/resources">Recursos</NavLink>
              <NavLink href="/about">Acerca de</NavLink>

              {!loading && (
                user ? (
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-300">
                      Hola, {user.user_metadata?.username || user.email}
                    </span>
                    <motion.button
                      onClick={signOut}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="quantum-button px-6 py-2 text-sm inline-block"
                    >
                      Cerrar Sesión
                    </motion.button>
                  </div>
                ) : (
                  <motion.a
                    href="/auth?tab=login"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="quantum-button px-6 py-2 text-sm inline-block"
                  >
                    Iniciar Sesión
                  </motion.a>
                )
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-[var(--accent)] hover:bg-[var(--accent)]/10 focus:outline-none"
          >
            <span className="sr-only">Abrir menú principal</span>
            {!isOpen ? (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-[var(--dark-matter)]/90 backdrop-blur-xl"
      >
        <div className="px-4 pt-2 pb-3 space-y-2">
          <MobileNavLink href="/courses">Cursos</MobileNavLink>
          <MobileNavLink href="/resources">Recursos</MobileNavLink>
          <MobileNavLink href="/about">Acerca de</MobileNavLink>

          {!loading && (
            user ? (
              <div className="pt-2 border-t border-gray-700 mt-2">
                <p className="text-sm text-gray-300 mb-2">
                  Hola, {user.user_metadata?.username || user.email}
                </p>
                <motion.button
                  onClick={signOut}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full quantum-button py-3 text-sm inline-block text-center"
                >
                  Cerrar Sesión
                </motion.button>
              </div>
            ) : (
              <motion.a
                href="/auth?tab=login"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full quantum-button py-3 text-sm mt-4 inline-block text-center"
              >
                Iniciar Sesión
              </motion.a>
            )
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
}
