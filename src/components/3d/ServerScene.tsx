'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ServerScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Configuración básica
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.01);
    
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

    // Crear sistema de servidores y conexiones
    const serverCount = 12;
    const servers = [];
    
    // Colores para los servidores
    const serverColors = [
      new THREE.Color(0x7928ca), // --accent
      new THREE.Color(0x0070f3), // --primary
      new THREE.Color(0x00c4cc), // --secondary
    ];
    
    // Crear geometrías para los servidores (cubos)
    const serverGeometry = new THREE.BoxGeometry(1, 1.5, 0.5);
    
    // Crear servidores en forma de grid
    const gridSize = Math.ceil(Math.sqrt(serverCount));
    const spacing = 3;
    
    for (let i = 0; i < serverCount; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      
      const x = (col - gridSize / 2 + 0.5) * spacing;
      const y = (row - gridSize / 2 + 0.5) * spacing;
      const z = 0;
      
      // Material con brillo para el servidor
      const serverMaterial = new THREE.MeshBasicMaterial({
        color: serverColors[i % serverColors.length],
        transparent: true,
        opacity: 0.8,
        wireframe: false
      });
      
      const server = new THREE.Mesh(serverGeometry, serverMaterial);
      server.position.set(x, y, z);
      scene.add(server);
      
      // Añadir luces parpadeantes en los servidores
      const lightGeometry = new THREE.SphereGeometry(0.1, 8, 8);
      const lightMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9
      });
      
      const light1 = new THREE.Mesh(lightGeometry, lightMaterial.clone());
      light1.position.set(0.3, 0.6, 0.3);
      server.add(light1);
      
      const light2 = new THREE.Mesh(lightGeometry, lightMaterial.clone());
      light2.position.set(-0.3, 0.6, 0.3);
      server.add(light2);
      
      servers.push({
        mesh: server,
        lights: [light1, light2],
        blinkRate: 0.5 + Math.random() * 2,
        blinkOffset: Math.random() * Math.PI * 2
      });
    }
    
    // Crear conexiones entre servidores
    const connectionLines = [];
    
    for (let i = 0; i < serverCount; i++) {
      // Conectar con algunos servidores cercanos
      for (let j = i + 1; j < serverCount; j++) {
        // No conectar todos con todos para evitar sobrecarga visual
        if (Math.random() > 0.7) continue;
        
        const server1 = servers[i].mesh;
        const server2 = servers[j].mesh;
        
        // Crear geometría para la línea
        const lineGeometry = new THREE.BufferGeometry();
        const linePositions = new Float32Array(6);
        
        // Posiciones iniciales
        linePositions[0] = server1.position.x;
        linePositions[1] = server1.position.y;
        linePositions[2] = server1.position.z;
        linePositions[3] = server2.position.x;
        linePositions[4] = server2.position.y;
        linePositions[5] = server2.position.z;
        
        lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        
        // Material para la línea
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x0070f3,
          transparent: true,
          opacity: 0.3,
          blending: THREE.AdditiveBlending
        });
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(line);
        
        connectionLines.push({
          line,
          server1Index: i,
          server2Index: j,
          pulses: []
        });
      }
    }
    
    // Crear partículas de datos que viajan entre servidores
    const createDataPulse = (connectionIndex) => {
      const connection = connectionLines[connectionIndex];
      const server1 = servers[connection.server1Index].mesh;
      const server2 = servers[connection.server2Index].mesh;
      
      // Geometría para el pulso
      const pulseGeometry = new THREE.SphereGeometry(0.1, 8, 8);
      
      // Material con color aleatorio
      const pulseColor = new THREE.Color();
      pulseColor.setHSL(Math.random(), 0.8, 0.5);
      
      const pulseMaterial = new THREE.MeshBasicMaterial({
        color: pulseColor,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
      });
      
      const pulseMesh = new THREE.Mesh(pulseGeometry, pulseMaterial);
      scene.add(pulseMesh);
      
      // Dirección aleatoria
      const fromServer1 = Math.random() > 0.5;
      
      connection.pulses.push({
        mesh: pulseMesh,
        progress: 0,
        speed: 0.01 + Math.random() * 0.02,
        fromServer1,
        active: true
      });
    };
    
    // Crear pulsos iniciales
    for (let i = 0; i < connectionLines.length; i++) {
      if (Math.random() > 0.5) {
        createDataPulse(i);
      }
    }

    // Posicionar cámara
    camera.position.z = 10;
    
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
      
      // Animar luces parpadeantes en los servidores
      servers.forEach(server => {
        server.lights.forEach((light, index) => {
          const blinkValue = Math.sin(elapsedTime * server.blinkRate + server.blinkOffset + index) * 0.5 + 0.5;
          (light.material as THREE.MeshBasicMaterial).opacity = blinkValue * 0.9;
        });
        
        // Pequeña rotación para los servidores
        server.mesh.rotation.y = Math.sin(elapsedTime * 0.2) * 0.1;
      });
      
      // Animar pulsos de datos
      connectionLines.forEach((connection, connectionIndex) => {
        const server1 = servers[connection.server1Index].mesh;
        const server2 = servers[connection.server2Index].mesh;
        
        // Actualizar pulsos existentes
        connection.pulses = connection.pulses.filter(pulse => {
          // Actualizar progreso
          pulse.progress += pulse.speed;
          
          if (pulse.progress >= 1) {
            // Eliminar pulso
            scene.remove(pulse.mesh);
            pulse.mesh.geometry.dispose();
            pulse.mesh.material.dispose();
            return false;
          }
          
          // Interpolar posición
          const startPos = pulse.fromServer1 ? server1.position : server2.position;
          const endPos = pulse.fromServer1 ? server2.position : server1.position;
          
          const x = startPos.x + (endPos.x - startPos.x) * pulse.progress;
          const y = startPos.y + (endPos.y - startPos.y) * pulse.progress;
          const z = startPos.z + (endPos.z - startPos.z) * pulse.progress;
          
          pulse.mesh.position.set(x, y, z);
          
          // Efecto de pulso en la opacidad
          const opacity = Math.sin(pulse.progress * Math.PI);
          (pulse.mesh.material as THREE.MeshBasicMaterial).opacity = opacity * 0.8;
          
          return true;
        });
        
        // Crear nuevos pulsos aleatoriamente
        if (Math.random() < 0.01 && connection.pulses.length < 3) {
          createDataPulse(connectionIndex);
        }
      });
      
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
      
      // Limpiar servidores
      servers.forEach(server => {
        scene.remove(server.mesh);
        server.lights.forEach(light => {
          server.mesh.remove(light);
          light.geometry.dispose();
          light.material.dispose();
        });
        server.mesh.geometry.dispose();
        server.mesh.material.dispose();
      });
      
      // Limpiar conexiones y pulsos
      connectionLines.forEach(connection => {
        scene.remove(connection.line);
        connection.line.geometry.dispose();
        connection.line.material.dispose();
        
        connection.pulses.forEach(pulse => {
          scene.remove(pulse.mesh);
          pulse.mesh.geometry.dispose();
          pulse.mesh.material.dispose();
        });
      });
      
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 -z-10" />;
}
