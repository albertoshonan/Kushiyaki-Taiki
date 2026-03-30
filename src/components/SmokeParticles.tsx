"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function SmokeParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Smoke particle count
    const particleCount = 80;
    const positions = new Float32Array(particleCount * 3);
    const alphas = new Float32Array(particleCount);
    const sizes = new Float32Array(particleCount);
    const speeds = new Float32Array(particleCount);
    const drifts = new Float32Array(particleCount);
    const phases = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 1] = Math.random() * 10 - 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2;
      alphas[i] = Math.random();
      sizes[i] = Math.random() * 100 + 60;
      speeds[i] = Math.random() * 0.005 + 0.002;
      drifts[i] = (Math.random() - 0.5) * 0.003;
      phases[i] = Math.random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const vertexShader = `
      attribute float aAlpha;
      attribute float aSize;
      varying float vAlpha;
      void main() {
        vAlpha = aAlpha;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = aSize * (3.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float strength = 1.0 - smoothstep(0.0, 0.5, d);
        strength = pow(strength, 1.5);
        gl_FragColor = vec4(0.9, 0.85, 0.78, strength * vAlpha * 0.45);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Animation
    let time = 0;
    let animationId: number;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      const pos = geometry.attributes.position as THREE.BufferAttribute;
      const alpha = geometry.attributes.aAlpha as THREE.BufferAttribute;

      for (let i = 0; i < particleCount; i++) {
        // Rise upward
        pos.array[i * 3 + 1] += speeds[i];
        // Gentle horizontal drift with sine wave
        pos.array[i * 3] += drifts[i] + Math.sin(time + phases[i]) * 0.0005;

        // Fade based on vertical position
        const y = pos.array[i * 3 + 1];
        const normalizedY = (y + 5) / 10;
        alpha.array[i] = Math.sin(normalizedY * Math.PI) * (0.6 + 0.4 * Math.sin(time * 0.5 + phases[i]));

        // Reset particle when it goes too high
        if (pos.array[i * 3 + 1] > 5) {
          pos.array[i * 3 + 1] = -5;
          pos.array[i * 3] = (Math.random() - 0.5) * 8;
          alpha.array[i] = 0;
        }
      }

      pos.needsUpdate = true;
      alpha.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-[2] pointer-events-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
