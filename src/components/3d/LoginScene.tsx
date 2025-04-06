'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function LoginScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Configuración básica
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.02);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Crear sistema de partículas principal (portal de energía)
    const portalGeometry = new THREE.BufferGeometry();
    const portalCount = 8000;
    const portalPos = new Float32Array(portalCount * 3);
    const portalColors = new Float32Array(portalCount * 3);
    const portalSizes = new Float32Array(portalCount);

    // Colores para el portal
    const portalColor1 = new THREE.Color(0x7928ca); // --accent
    const portalColor2 = new THREE.Color(0x0070f3); // --primary
    const portalColor3 = new THREE.Color(0x8b5cf6); // --quantum

    // Crear distribución de partículas en forma de vórtice/portal
    for (let i = 0; i < portalCount; i++) {
      const i3 = i * 3;

      // Distribución en espiral/vórtice
      const radius = Math.random() * 3;
      const spinAngle = radius * 5;
      const branchAngle = (Math.PI * 2) * (i % 3) / 3; // 3 brazos en la espiral

      const x = Math.cos(branchAngle + spinAngle) * radius;
      const y = (Math.random() - 0.5) * 0.5 * radius; // Más plano en Y
      const z = Math.sin(branchAngle + spinAngle) * radius;

      portalPos[i3] = x;
      portalPos[i3 + 1] = y;
      portalPos[i3 + 2] = z;

      // Color basado en la distancia al centro
      let color;
      if (radius < 1) {
        color = portalColor1.clone().lerp(portalColor3, Math.random());
      } else if (radius < 2) {
        color = portalColor3.clone().lerp(portalColor2, Math.random());
      } else {
        color = portalColor2.clone();
      }

      portalColors[i3] = color.r;
      portalColors[i3 + 1] = color.g;
      portalColors[i3 + 2] = color.b;

      // Tamaño variable para las partículas
      portalSizes[i] = Math.random() * 0.05 + 0.01;
    }

    portalGeometry.setAttribute('position', new THREE.BufferAttribute(portalPos, 3));
    portalGeometry.setAttribute('color', new THREE.BufferAttribute(portalColors, 3));
    portalGeometry.setAttribute('size', new THREE.BufferAttribute(portalSizes, 1));

    // Shader personalizado para las partículas del portal
    const portalVertexShader = `
      attribute float size;
      varying vec3 vColor;

      void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (300.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const portalFragmentShader = `
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
    const portalMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: portalVertexShader,
      fragmentShader: portalFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const portalMesh = new THREE.Points(portalGeometry, portalMaterial);
    scene.add(portalMesh);

    // Crear partículas de fondo (estrellas y polvo cósmico)
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 3000;
    const starsPos = new Float32Array(starsCount * 3);
    const starsColors = new Float32Array(starsCount * 3);
    const starsSizes = new Float32Array(starsCount);

    // Distribuir estrellas aleatoriamente en un espacio más grande
    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;

      // Posición aleatoria en un espacio más grande
      starsPos[i3] = (Math.random() - 0.5) * 20;
      starsPos[i3 + 1] = (Math.random() - 0.5) * 20;
      starsPos[i3 + 2] = (Math.random() - 0.5) * 20 - 5; // Más lejos que el portal

      // Color blanco/azulado para las estrellas
      const brightness = 0.7 + Math.random() * 0.3;
      starsColors[i3] = brightness;
      starsColors[i3 + 1] = brightness;
      starsColors[i3 + 2] = brightness + Math.random() * 0.2;

      // Tamaño variable para las estrellas
      starsSizes[i] = Math.random() * 0.03 + 0.01;
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPos, 3));
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(starsColors, 3));
    starsGeometry.setAttribute('size', new THREE.BufferAttribute(starsSizes, 1));

    const starsMaterial = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: portalVertexShader, // Reutilizamos el shader
      fragmentShader: portalFragmentShader,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true
    });

    const starsMesh = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starsMesh);

    // Crear anillos de energía alrededor del portal
    const ringGeometry = new THREE.TorusGeometry(2.5, 0.05, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x7928ca,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
    ring1.rotation.x = Math.PI / 2;
    scene.add(ring1);

    const ring2Geometry = new THREE.TorusGeometry(3, 0.03, 16, 100);
    const ring2Material = new THREE.MeshBasicMaterial({
      color: 0x0070f3,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    const ring2 = new THREE.Mesh(ring2Geometry, ring2Material);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    scene.add(ring2);

    // Posicionar cámara
    camera.position.z = 5;

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

      // Rotación dinámica para el portal
      portalMesh.rotation.y = elapsedTime * 0.1;
      portalMesh.rotation.z = elapsedTime * 0.05;

      // Efecto de pulsación para el portal
      const pulseFactor = Math.sin(elapsedTime * 2) * 0.05 + 1;
      portalMesh.scale.set(pulseFactor, pulseFactor, pulseFactor);

      // Rotación más lenta para las estrellas de fondo
      starsMesh.rotation.y = elapsedTime * 0.02;
      starsMesh.rotation.x = Math.sin(elapsedTime * 0.01) * 0.1;

      // Animación de los anillos
      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.15;

      // Efecto de respiración para los anillos
      const ringPulse = Math.sin(elapsedTime * 1.5) * 0.1 + 1;
      ring1.scale.set(ringPulse, ringPulse, ringPulse);
      ring2.scale.set(ringPulse * 0.9, ringPulse * 0.9, ringPulse * 0.9);

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

      scene.remove(portalMesh);
      scene.remove(starsMesh);
      scene.remove(ring1);
      scene.remove(ring2);

      portalGeometry.dispose();
      portalMaterial.dispose();
      starsGeometry.dispose();
      starsMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ring2Geometry.dispose();
      ring2Material.dispose();

      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
