'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Architectural3DCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check device performance (reduce load on small mobile screens)
    const isMobile = window.innerWidth < 768;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 18);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xc9a96e, 1.8);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const goldPoint = new THREE.PointLight(0xd4af37, 2, 25);
    goldPoint.position.set(-6, -4, 4);
    scene.add(goldPoint);

    // Architectural Group
    const archGroup = new THREE.Group();
    scene.add(archGroup);

    // 1. Abstract Architectural Wireframe Towers / Pavilions
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0xc9a96e,
      transparent: true,
      opacity: 0.32,
      linewidth: 1,
    });

    const towerConfigs = [
      { size: [4, 9, 4], pos: [-6, -1, -4], rot: [0.1, 0.4, 0] },
      { size: [5, 12, 5], pos: [7, -2, -6], rot: [-0.1, -0.3, 0.05] },
      { size: [3.5, 6, 3.5], pos: [0, -3.5, -2], rot: [0.05, 0.2, 0] },
      { size: [6, 4, 6], pos: [-2, 4, -8], rot: [0.2, -0.4, 0.1] },
    ];

    const disposables: (THREE.BufferGeometry | THREE.Material)[] = [wireframeMaterial];

    towerConfigs.forEach((cfg) => {
      const boxGeo = new THREE.BoxGeometry(cfg.size[0], cfg.size[1], cfg.size[2]);
      const edgesGeo = new THREE.EdgesGeometry(boxGeo);
      const wireframe = new THREE.LineSegments(edgesGeo, wireframeMaterial);
      wireframe.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      wireframe.rotation.set(cfg.rot[0], cfg.rot[1], cfg.rot[2]);
      archGroup.add(wireframe);
      disposables.push(boxGeo, edgesGeo);
    });

    // 2. Floating Minimalist Glass Prisms
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.12,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6,
      ior: 1.5,
    });
    disposables.push(glassMaterial);

    const prismGeo = new THREE.BoxGeometry(2.5, 2.5, 2.5);
    disposables.push(prismGeo);

    const prism1 = new THREE.Mesh(prismGeo, glassMaterial);
    prism1.position.set(-4.5, 2, -2);
    prism1.rotation.set(0.4, 0.5, 0.2);
    archGroup.add(prism1);

    const prism2 = new THREE.Mesh(prismGeo, glassMaterial);
    prism2.position.set(5.5, -1.5, -1);
    prism2.rotation.set(-0.3, -0.6, 0.1);
    archGroup.add(prism2);

    // 3. Floating Ambient Luxury Dust Particles
    const particleCount = isMobile ? 60 : 180;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      particleScales[i] = Math.random();
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: isMobile ? 0.08 : 0.12,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    disposables.push(particleGeo, particleMat);

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse Tracking with smooth lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 1.2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 1.2;
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
    }

    // Scroll Tracking
    let scrollProgress = 0;
    const handleScroll = () => {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollMax > 0) {
        scrollProgress = window.scrollY / scrollMax;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) / 1000;

      // Smooth mouse lerp
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      if (!prefersReducedMotion) {
        // Slow organic rotation
        archGroup.rotation.y = mouseX * 0.4 + elapsedTime * 0.02 + scrollProgress * 1.5;
        archGroup.rotation.x = -mouseY * 0.3 + Math.sin(elapsedTime * 0.15) * 0.05 + scrollProgress * 0.6;

        // Camera moves through architectural space on scroll
        camera.position.z = 18 - scrollProgress * 8;
        camera.position.y = -scrollProgress * 4;

        // Prisms gentle float
        prism1.rotation.x += 0.003;
        prism1.rotation.y += 0.004;
        prism2.rotation.x -= 0.003;
        prism2.rotation.y -= 0.005;

        // Particles gentle float
        particles.rotation.y = elapsedTime * 0.01 + scrollProgress * 0.4;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      disposables.forEach((item) => item.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden opacity-85"
      aria-hidden="true"
    />
  );
}
