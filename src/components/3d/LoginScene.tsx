'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LoginScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Configuración básica
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Crear partículas para el efecto de portal
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 5;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material con gradiente para las partículas
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.005,
      map: new THREE.TextureLoader().load('/particle.png'),
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });

    // Añadir colores a las partículas
    const colors = new Float32Array(particlesCount * 3);
    const color1 = new THREE.Color(0x7928ca); // --accent
    const color2 = new THREE.Color(0x0070f3); // --primary
    
    for(let i = 0; i < particlesCount; i++) {
      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Crear el sistema de partículas
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Posicionar la cámara
    camera.position.z = 2;

    // Variables para la animación
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    // Event listeners para el mouse
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX);
      mouseY = (event.clientY - windowHalfY);
    };

    document.addEventListener('mousemove', onDocumentMouseMove);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);

      targetX = mouseX * 0.001;
      targetY = mouseY * 0.001;

      particlesMesh.rotation.y += 0.01 * (targetX - particlesMesh.rotation.y);
      particlesMesh.rotation.x += 0.01 * (targetY - particlesMesh.rotation.x);
      particlesMesh.rotation.z += 0.001;

      renderer.render(scene, camera);
    };

    animate();

    // Manejar resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
