'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Scene3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Configuración básica
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.03); // Niebla más sutil
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 1);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimización para dispositivos de alta densidad
    containerRef.current.appendChild(renderer.domElement);

    // Crear partículas para efecto de fondo espacial
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 10000; // Aumentamos la cantidad de partículas
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);
    const sizesArray = new Float32Array(particlesCount); // Tamaños variables para las partículas

    // Colores para el tema espacial y cuántico
    const colors = [
      new THREE.Color(0x7928ca), // Púrpura intenso
      new THREE.Color(0x0070f3), // Azul brillante
      new THREE.Color(0x00c4cc), // Cian/Turquesa
      new THREE.Color(0x6366f1), // Indigo
      new THREE.Color(0x3b82f6), // Azul
      new THREE.Color(0x8b5cf6), // Púrpura
      new THREE.Color(0xeab308), // Amarillo/Dorado (para simular estrellas)
    ];

    // Crear distribuciones de partículas
    for (let i = 0; i < particlesCount; i++) {
      // Posición
      const i3 = i * 3;
      
      // Distribución mixta para un efecto más realista
      let x, y, z;
      
      if (i < particlesCount * 0.7) {
        // 70% de partículas en distribución esférica (galaxia)
        const radius = 3 + Math.random() * 10;
        const theta = Math.random() * Math.PI * 2;
        const phi = (Math.random() - 0.5) * Math.PI * 0.5; // Aplanar un poco para simular una galaxia
        
        x = radius * Math.cos(theta) * Math.cos(phi);
        y = radius * Math.sin(phi);
        z = radius * Math.sin(theta) * Math.cos(phi);
        
        // Añadir un poco de desplazamiento aleatorio para hacerlo más natural
        x += (Math.random() - 0.5) * 0.5;
        y += (Math.random() - 0.5) * 0.5;
        z += (Math.random() - 0.5) * 0.5;
      } else if (i < particlesCount * 0.9) {
        // 20% en distribución de nebulosa
        const radius = Math.random() * 15;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        x = radius * Math.sin(phi) * Math.cos(theta);
        y = radius * Math.sin(phi) * Math.sin(theta);
        z = radius * Math.cos(phi);
      } else {
        // 10% como estrellas distantes
        const radius = 15 + Math.random() * 20;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        x = radius * Math.sin(phi) * Math.cos(theta);
        y = radius * Math.sin(phi) * Math.sin(theta);
        z = radius * Math.cos(phi);
      }
      
      posArray[i3] = x;
      posArray[i3 + 1] = y;
      posArray[i3 + 2] = z;
      
      // Color aleatorio de la paleta con probabilidades
      let color;
      const colorRandom = Math.random();
      
      if (i >= particlesCount * 0.9) {
        // Las estrellas distantes son más brillantes (blancas/amarillas)
        color = colors[6]; // Amarillo/Dorado
        sizesArray[i] = 0.05 + Math.random() * 0.1; // Estrellas más grandes
      } else {
        // Resto de partículas con colores variados
        color = colors[Math.floor(Math.random() * (colors.length - 1))];
        sizesArray[i] = 0.01 + Math.random() * 0.03; // Tamaño variable
      }
      
      colorsArray[i3] = color.r;
      colorsArray[i3 + 1] = color.g;
      colorsArray[i3 + 2] = color.b;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizesArray, 1));

    // Shader personalizado para partículas con brillo
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
        // Crear un efecto de partícula brillante con degradado radial
        float distance = length(gl_PointCoord - vec2(0.5, 0.5));
        if (distance > 0.5) discard;
        
        // Degradado suave desde el centro
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

    // Crear un segundo sistema de partículas para efecto cuántico
    const quantumGeometry = new THREE.BufferGeometry();
    const quantumCount = 1500; // Más partículas cuánticas
    const quantumPos = new Float32Array(quantumCount * 3);
    const quantumColors = new Float32Array(quantumCount * 3);
    const quantumSizes = new Float32Array(quantumCount);

    // Crear partículas cuánticas en forma de toro (anillo cuántico)
    for (let i = 0; i < quantumCount; i++) {
      const i3 = i * 3;
      
      // Distribución en forma de toro para el efecto cuántico
      const radius = 2.5 + Math.random() * 0.5; // Radio del toro
      const tubeRadius = 0.5 + Math.random() * 0.3; // Grosor del tubo
      const theta = Math.random() * Math.PI * 2; // Posición alrededor del círculo principal
      const phi = Math.random() * Math.PI * 2; // Posición alrededor del tubo
      
      // Ecuaciones paramétricas del toro
      quantumPos[i3] = (radius + tubeRadius * Math.cos(phi)) * Math.cos(theta);
      quantumPos[i3 + 1] = (radius + tubeRadius * Math.cos(phi)) * Math.sin(theta);
      quantumPos[i3 + 2] = tubeRadius * Math.sin(phi);
      
      // Colores más brillantes para partículas cuánticas
      const color = new THREE.Color();
      color.setHSL(Math.random() * 0.2 + 0.6, 1, 0.5 + Math.random() * 0.5);
      quantumColors[i3] = color.r;
      quantumColors[i3 + 1] = color.g;
      quantumColors[i3 + 2] = color.b;
      
      // Tamaños variables para partículas cuánticas
      quantumSizes[i] = 0.02 + Math.random() * 0.04;
    }

    quantumGeometry.setAttribute('position', new THREE.BufferAttribute(quantumPos, 3));
    quantumGeometry.setAttribute('color', new THREE.BufferAttribute(quantumColors, 3));
    quantumGeometry.setAttribute('size', new THREE.BufferAttribute(quantumSizes, 1));

    // Material con shaders personalizados para partículas cuánticas
    const quantumMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: particlesVertexShader, // Reusamos el shader
      fragmentShader: particlesFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const quantumMesh = new THREE.Points(quantumGeometry, quantumMaterial);
    scene.add(quantumMesh);

    // Crear líneas de conexión cuántica (entrelazamiento)
    const lineGeometry = new THREE.BufferGeometry();
    const lineCount = 100; // Número de líneas
    const linePositions = new Float32Array(lineCount * 6); // Cada línea tiene 2 puntos (x,y,z) * 2
    const lineColors = new Float32Array(lineCount * 6); // Colores para cada vértice
    
    for (let i = 0; i < lineCount; i++) {
      const i6 = i * 6;
      
      // Seleccionar dos partículas cuánticas aleatorias para conectar
      const index1 = Math.floor(Math.random() * quantumCount) * 3;
      const index2 = Math.floor(Math.random() * quantumCount) * 3;
      
      // Posiciones de inicio y fin de la línea
      linePositions[i6] = quantumPos[index1];
      linePositions[i6 + 1] = quantumPos[index1 + 1];
      linePositions[i6 + 2] = quantumPos[index1 + 2];
      
      linePositions[i6 + 3] = quantumPos[index2];
      linePositions[i6 + 4] = quantumPos[index2 + 1];
      linePositions[i6 + 5] = quantumPos[index2 + 2];
      
      // Colores para las líneas (degradado entre dos colores)
      const color1 = new THREE.Color(0x7928ca); // Púrpura
      const color2 = new THREE.Color(0x00c4cc); // Cian
      
      lineColors[i6] = color1.r;
      lineColors[i6 + 1] = color1.g;
      lineColors[i6 + 2] = color1.b;
      
      lineColors[i6 + 3] = color2.r;
      lineColors[i6 + 4] = color2.g;
      lineColors[i6 + 5] = color2.b;
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
    camera.position.z = 5;
    camera.position.y = 0.5;

    // Animación
    const clock = new THREE.Clock();
    let mouseX = 0;
    let mouseY = 0;
    
    // Seguimiento del mouse para interactividad
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      const elapsedTime = clock.getElapsedTime();
      
      // Rotación suave para el sistema principal de partículas
      particlesMesh.rotation.y = elapsedTime * 0.03;
      particlesMesh.rotation.x = Math.sin(elapsedTime * 0.01) * 0.1;
      
      // Rotación más rápida para el sistema cuántico
      quantumMesh.rotation.y = elapsedTime * 0.1;
      quantumMesh.rotation.z = elapsedTime * 0.05;
      
      // Rotación para las líneas de conexión
      lineMesh.rotation.y = elapsedTime * 0.1;
      lineMesh.rotation.z = elapsedTime * 0.05;
      
      // Efecto de pulsación para simular comportamiento cuántico
      const pulseFactor = Math.sin(elapsedTime * 2) * 0.05 + 1;
      quantumMesh.scale.set(pulseFactor, pulseFactor, pulseFactor);
      lineMesh.scale.set(pulseFactor, pulseFactor, pulseFactor);
      
      // Interactividad con el mouse
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.02;
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
      scene.remove(quantumMesh);
      scene.remove(lineMesh);
      
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      quantumGeometry.dispose();
      quantumMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-10" />;
}
