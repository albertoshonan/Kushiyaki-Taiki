"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { BLUR_DATA_URL, IMAGE_QUALITY } from "@/lib/image";

gsap.registerPlugin(ScrollTrigger);

interface EmberParticlesProps {
  image: string;
}

const PARTICLE_COUNT = 160;

const EMBER_COLORS: [number, number, number][] = [
  [1.0, 0.35, 0.05],
  [1.0, 0.55, 0.1],
  [1.0, 0.2, 0.0],
  [1.0, 0.7, 0.2],
  [0.9, 0.15, 0.0],
  [1.0, 0.85, 0.3],
];

const VERTEX_SHADER = `
  attribute float aAlpha;
  attribute float aSize;
  attribute vec3 aColor;
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    vAlpha = aAlpha;
    vColor = aColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (3.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = `
  varying float vAlpha;
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float strength = 1.0 - smoothstep(0.0, 0.5, d);
    strength = pow(strength, 1.2);
    float core = 1.0 - smoothstep(0.0, 0.2, d);
    vec3 color = mix(vColor, vec3(1.0, 0.95, 0.8), core * 0.6);
    gl_FragColor = vec4(color, strength * vAlpha);
  }
`;

export default function EmberParticles({ image }: EmberParticlesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Parallax
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  // Three.js particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 50);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvas.appendChild(renderer.domElement);

    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const alphas = new Float32Array(PARTICLE_COUNT);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const speeds = new Float32Array(PARTICLE_COUNT);
    const drifts = new Float32Array(PARTICLE_COUNT);
    const phases = new Float32Array(PARTICLE_COUNT);
    const lifetimes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = Math.random() * 10 - 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 3;

      const color = EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)];
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];

      alphas[i] = Math.random();
      sizes[i] = Math.random() * 28 + 8;
      speeds[i] = Math.random() * 0.018 + 0.006;
      drifts[i] = (Math.random() - 0.5) * 0.01;
      phases[i] = Math.random() * Math.PI * 2;
      lifetimes[i] = Math.random();
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let time = 0;
    let animationId: number;
    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    const container = containerRef.current;
    if (container) observer.observe(container);

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (!isVisible) return;

      time += 0.012;
      const pos = geometry.attributes.position as THREE.BufferAttribute;
      const alpha = geometry.attributes.aAlpha as THREE.BufferAttribute;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos.array[i * 3 + 1] += speeds[i];
        pos.array[i * 3] +=
          drifts[i] + Math.sin(time * 2.5 + phases[i]) * 0.002;
        pos.array[i * 3 + 2] += Math.cos(time * 1.5 + phases[i]) * 0.0005;

        lifetimes[i] += 0.004;
        const life = lifetimes[i] % 1;
        const fadeIn = Math.min(life * 4, 1);
        const fadeOut = 1 - Math.max((life - 0.6) / 0.4, 0);
        alpha.array[i] =
          fadeIn * fadeOut * (0.6 + 0.4 * Math.sin(time * 4 + phases[i]));

        // Stronger flicker
        if (Math.random() < 0.04) {
          alpha.array[i] *= 0.2;
        }

        if (pos.array[i * 3 + 1] > 5) {
          pos.array[i * 3 + 1] = -5;
          pos.array[i * 3] = (Math.random() - 0.5) * 12;
          lifetimes[i] = 0;
          alpha.array[i] = 0;
        }
      }

      pos.needsUpdate = true;
      alpha.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (container) observer.unobserve(container);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (canvas.contains(renderer.domElement)) {
        canvas.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden"
    >
      <div ref={imgRef} className="absolute inset-0 w-full h-[130%]">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover brightness-50"
          sizes="100vw"
          quality={IMAGE_QUALITY}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
        />
      </div>
      <div className="absolute inset-0 bg-black/30" />
      <div
        ref={canvasRef}
        className="absolute inset-0 z-[2] pointer-events-none mix-blend-screen"
      />
      <div className="absolute bottom-0 left-0 right-0 h-1/3 z-[1] pointer-events-none bg-gradient-to-t from-burgundy/15 to-transparent" />
    </div>
  );
}
