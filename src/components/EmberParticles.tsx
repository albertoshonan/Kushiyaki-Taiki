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

const PARTICLE_COUNT = 200;

const EMBER_COLORS: [number, number, number][] = [
  [1.0, 0.3, 0.0],
  [1.0, 0.5, 0.05],
  [1.0, 0.15, 0.0],
  [1.0, 0.65, 0.15],
  [0.85, 0.1, 0.0],
  [1.0, 0.8, 0.25],
  [1.0, 0.42, 0.02],
  [0.95, 0.25, 0.0],
];

const VERTEX_SHADER = `
  attribute float aAlpha;
  attribute float aSize;
  attribute vec3 aColor;
  attribute float aSpeed;
  varying float vAlpha;
  varying vec3 vColor;
  varying float vSpeed;
  void main() {
    vAlpha = aAlpha;
    vColor = aColor;
    vSpeed = aSpeed;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (3.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = `
  varying float vAlpha;
  varying vec3 vColor;
  varying float vSpeed;
  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    // Elongate vertically based on speed to simulate rising trail
    uv.y *= 0.5 + 0.5 * (1.0 - vSpeed);
    float d = length(uv);
    if (d > 0.5) discard;

    // Hot glowing core
    float core = 1.0 - smoothstep(0.0, 0.12, d);
    // Soft outer glow
    float glow = 1.0 - smoothstep(0.0, 0.5, d);
    glow = pow(glow, 2.0);

    // Bright white-yellow core fading to ember color
    vec3 coreColor = vec3(1.0, 0.95, 0.7);
    vec3 color = mix(vColor, coreColor, core * 0.8);

    float strength = glow + core * 0.5;
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

    const flickerRates = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = Math.random() * 10 - 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;

      const color = EMBER_COLORS[Math.floor(Math.random() * EMBER_COLORS.length)];
      colors[i * 3] = color[0];
      colors[i * 3 + 1] = color[1];
      colors[i * 3 + 2] = color[2];

      alphas[i] = Math.random();
      sizes[i] = Math.random() * 30 + 10;
      // More variation in rise speed
      speeds[i] = Math.random() * 0.025 + 0.005;
      drifts[i] = (Math.random() - 0.5) * 0.015;
      phases[i] = Math.random() * Math.PI * 2;
      lifetimes[i] = Math.random();
      flickerRates[i] = Math.random() * 8 + 4;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("aAlpha", new THREE.BufferAttribute(alphas, 1));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute("aSpeed", new THREE.BufferAttribute(speeds, 1));

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

      time += 0.014;
      const pos = geometry.attributes.position as THREE.BufferAttribute;
      const alpha = geometry.attributes.aAlpha as THREE.BufferAttribute;
      const size = geometry.attributes.aSize as THREE.BufferAttribute;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        // Rise with acceleration (faster as they go up, like real embers)
        const speedMult = 1.0 + (pos.array[i * 3 + 1] + 5) * 0.03;
        pos.array[i * 3 + 1] += speeds[i] * speedMult;

        // More turbulent horizontal drift
        pos.array[i * 3] +=
          drifts[i] +
          Math.sin(time * 3.0 + phases[i]) * 0.004 +
          Math.sin(time * 7.0 + phases[i] * 2.3) * 0.001;
        pos.array[i * 3 + 2] +=
          Math.cos(time * 2.0 + phases[i]) * 0.001;

        lifetimes[i] += 0.005;
        const life = lifetimes[i] % 1;
        const fadeIn = Math.min(life * 5, 1);
        const fadeOut = 1 - Math.max((life - 0.5) / 0.5, 0);

        // Rapid flickering like real fire sparks
        const flicker =
          0.7 +
          0.2 * Math.sin(time * flickerRates[i] + phases[i]) +
          0.1 * Math.sin(time * flickerRates[i] * 2.7 + phases[i] * 1.3);
        alpha.array[i] = fadeIn * fadeOut * flicker;

        // Random bright flash (spark catching air)
        if (Math.random() < 0.02) {
          alpha.array[i] = fadeIn * fadeOut * 1.2;
        }
        // Random dim (spark cooling)
        if (Math.random() < 0.06) {
          alpha.array[i] *= 0.15;
        }

        // Shrink as they rise and cool
        size.array[i] = sizes[i] * (1.0 - life * 0.4);

        if (pos.array[i * 3 + 1] > 5) {
          pos.array[i * 3 + 1] = -5 - Math.random() * 2;
          pos.array[i * 3] = (Math.random() - 0.5) * 12;
          pos.array[i * 3 + 2] = (Math.random() - 0.5) * 4;
          lifetimes[i] = 0;
          alpha.array[i] = 0;
          sizes[i] = Math.random() * 30 + 10;
        }
      }

      pos.needsUpdate = true;
      alpha.needsUpdate = true;
      size.needsUpdate = true;
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
