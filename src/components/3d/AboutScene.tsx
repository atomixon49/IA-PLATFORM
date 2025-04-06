'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function AboutScene() {
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

    // Crear sistema de partículas para representar una galaxia/universo
    const galaxyGeometry = new THREE.BufferGeometry();
    const galaxyCount = 15000;
    const posArray = new Float32Array(galaxyCount * 3);
    const colorsArray = new Float32Array(galaxyCount * 3);
    const sizesArray = new Float32Array(galaxyCount);

    // Colores para el tema galáctico
    const colors = [
      new THREE.Color(0x7928ca), // Púrpura intenso
      new THREE.Color(0x0070f3), // Azul brillante
      new THREE.Color(0x00c4cc), // Cian/Turquesa
      new THREE.Color(0x8b5cf6), // Púrpura
      new THREE.Color(0xeab308), // Amarillo/Dorado
    ];

    // Parámetros para la forma de galaxia espiral
    const branches = 5;
    const radius = 10;
    const spin = 1;
    const randomness = 0.5;
    const randomnessPower = 3;

    // Crear distribución de partículas en forma de galaxia espiral
    for (let i = 0; i < galaxyCount; i++) {
      const i3 = i * 3;
      
      // Posición en forma de galaxia espiral
      const branchAngle = (i % branches) / branches * Math.PI * 2;
      const distance = Math.random() * radius;
      const spinAngle = spin * distance;
      
      // Añadir aleatoriedad a la posición
      const randomX = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * distance;
      const randomY = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * distance;
      const randomZ = Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * distance;
      
      posArray[i3] = Math.cos(branchAngle + spinAngle) * distance + randomX;
      posArray[i3 + 1] = randomY;
      posArray[i3 + 2] = Math.sin(branchAngle + spinAngle) * distance + randomZ;
      
      // Color basado en la distancia al centro
      const colorIndex = Math.floor((distance / radius) * colors.length);
      const color = colors[Math.min(colorIndex, colors.length - 1)];
      
      colorsArray[i3] = color.r;
      colorsArray[i3 + 1] = color.g;
      colorsArray[i3 + 2] = color.b;
      
      // Tamaño variable para las partículas
      sizesArray[i] = Math.random() * 0.1 + 0.03;
    }
    
    galaxyGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    galaxyGeometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));
    galaxyGeometry.setAttribute('size', new THREE.BufferAttribute(sizesArray, 1));

    // Shader personalizado para las partículas
    const galaxyVertexShader = `
      attribute float size;
      varying vec3 vColor;
      
      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;
    
    const galaxyFragmentShader = `
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
    const galaxyMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: galaxyVertexShader,
      fragmentShader: galaxyFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const galaxyMesh = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxyMesh);

    // Crear un segundo sistema de partículas para estrellas de fondo
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 2000;
    const starsPos = new Float32Array(starsCount * 3);
    const starsColors = new Float32Array(starsCount * 3);
    const starsSizes = new Float32Array(starsCount);
    
    // Distribuir estrellas aleatoriamente en un espacio más grande
    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      
      // Posición aleatoria en un espacio más grande
      starsPos[i3] = (Math.random() - 0.5) * 50;
      starsPos[i3 + 1] = (Math.random() - 0.5) * 50;
      starsPos[i3 + 2] = (Math.random() - 0.5) * 50;
      
      // Color blanco/azulado para las estrellas
      const brightness = 0.7 + Math.random() * 0.3;
      starsColors[i3] = brightness;
      starsColors[i3 + 1] = brightness;
      starsColors[i3 + 2] = brightness + Math.random() * 0.2;
      
      // Tamaño variable para las estrellas
      starsSizes[i] = Math.random() * 0.08 + 0.02;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(starsColors, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(starsSizes, 1));
    
    const starsMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: galaxyVertexShader, // Reutilizamos el shader
      fragmentShader: galaxyFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });
    
    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);

    // Posicionar cámara
    camera.position.z = 15;
    camera.position.y = 5;
    camera.lookAt(0, 0, 0);
    
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
      
      // Rotación suave para la galaxia
      galaxyMesh.rotation.y = elapsedTime * 0.05;
      galaxyMesh.rotation.z = elapsedTime * 0.02;
      
      // Rotación más lenta para las estrellas de fondo
      starsMesh.rotation.y = elapsedTime * 0.01;
      
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
      
      scene.remove(galaxyMesh);
      scene.remove(starsMesh);
      
      galaxyGeometry.dispose();
      galaxyMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-10" />;
}
