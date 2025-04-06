'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ResourcesScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Configuración básica
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Crear sistema de partículas para representar recursos digitales
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 8000;
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    const sizesArray = new Float32Array(particlesCount);

    // Colores para el tema de recursos digitales
    const colors = [
      new THREE.Color(0x00c4cc), // Cian/Turquesa (datos)
      new THREE.Color(0x0070f3), // Azul brillante (tecnología)
      new THREE.Color(0x6366f1), // Indigo (información)
      new THREE.Color(0x8b5cf6), // Púrpura (conocimiento)
      new THREE.Color(0xeab308), // Amarillo/Dorado (valor)
    ];

    // Crear distribución de partículas en forma de red de conocimiento
    for (let i = 0; i < particlesCount; i++) {
      const i3 = i * 3;
      
      // Distribución en forma de red esférica
      const radius = 5 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      posArray[i3] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i3 + 2] = radius * Math.cos(phi);
      
      // Color aleatorio de la paleta
      const color = colors[Math.floor(Math.random() * colors.length)];
      colorsArray[i3] = color.r;
      colorsArray[i3 + 1] = color.g;
      colorsArray[i3 + 2] = color.b;
      
      // Tamaño variable para las partículas
      sizesArray[i] = 0.02 + Math.random() * 0.08;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizesArray, 1));

    // Shader personalizado para las partículas
    const particlesVertexShader = `
      attribute float size;
      varying vec3 vColor;
      
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    
    const particlesFragmentShader = `
      varying vec3 vColor;
      
      void main() {
        float distance = length(gl_PointCoord - vec2(0.5, 0.5));
        if (distance > 0.5) discard;
        
        float strength = 1.0 - (distance * 2.0);
        strength = pow(strength, 1.5);
        
        gl_FragColor = vec4(vColor, strength);
      }
    `;

    // Material con shaders personalizados
    const particlesMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: particlesVertexShader,
      fragmentShader: particlesFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Crear líneas de conexión para simular red de conocimiento
    const lineGeometry = new THREE.BufferGeometry();
    const lineCount = 200;
    const linePositions = new Float32Array(lineCount * 6);
    const lineColors = new Float32Array(lineCount * 6);
    
    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      
      // Seleccionar dos puntos aleatorios cercanos
      const idx1 = Math.floor(Math.random() * particlesCount);
      const idx2 = Math.floor(Math.random() * particlesCount);
      
      // Solo conectar puntos que estén relativamente cerca
      const x1 = posArray[idx1 * 3];
      const y1 = posArray[idx1 * 3 + 1];
      const z1 = posArray[idx1 * 3 + 2];
      
      const x2 = posArray[idx2 * 3];
      const y2 = posArray[idx2 * 3 + 1];
      const z2 = posArray[idx2 * 3 + 2];
      
      // Calcular distancia
      const distance = Math.sqrt(
        Math.pow(x2 - x1, 2) + 
        Math.pow(y2 - y1, 2) + 
        Math.pow(z2 - z1, 2)
      );
      
      // Solo conectar si están lo suficientemente cerca
      if (distance < 3) {
        linePositions[i6] = x1;
        linePositions[i6 + 1] = y1;
        linePositions[i6 + 2] = z1;
        linePositions[i6 + 3] = x2;
        linePositions[i6 + 4] = y2;
        linePositions[i6 + 5] = z2;
        
        // Usar colores de los puntos para las líneas
        const color1 = new THREE.Color(
          colorsArray[idx1 * 3],
          colorsArray[idx1 * 3 + 1],
          colorsArray[idx1 * 3 + 2]
        );
        
        const color2 = new THREE.Color(
          colorsArray[idx2 * 3],
          colorsArray[idx2 * 3 + 1],
          colorsArray[idx2 * 3 + 2]
        );
        
        lineColors[i6] = color1.r;
        lineColors[i6 + 1] = color1.g;
        lineColors[i6 + 2] = color1.b;
        lineColors[i6 + 3] = color2.r;
        lineColors[i6 + 4] = color2.g;
        lineColors[i6 + 5] = color2.b;
      }
    }
    
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Posicionar cámara
    camera.position.z = 15;
    
    // Variables para interactividad
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;
    
    // Reloj para animación
    const clock = new THREE.Clock();
    
    // Manejar movimiento del mouse
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - windowHalfX) / 100;
      mouseY = (event.clientY - windowHalfY) / 100;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotación suave para el sistema de partículas
      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = Math.sin(elapsedTime * 0.03) * 0.2;
      
      // Rotación para las líneas de conexión
      lineMesh.rotation.y = elapsedTime * 0.05;
      lineMesh.rotation.x = Math.sin(elapsedTime * 0.03) * 0.2;
      
      // Interactividad con el mouse
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };

    animate();

    // Manejar resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // Limpieza
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      scene.remove(particlesMesh);
      scene.remove(lineMesh);
      
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-10" />;
}
