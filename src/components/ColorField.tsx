import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ColorField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 3.5;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const geometry = new THREE.IcosahedronGeometry(1.42, 4);
    const material = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: { uTime: { value: 0 }, uPointer: { value: new THREE.Vector2(0, 0) } },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uPointer;
        varying vec3 vNormal;
        varying float vWave;
        void main() {
          vNormal = normal;
          vec3 p = position;
          float wave = sin(p.y * 4.0 + uTime * 0.8) * 0.08 + sin(p.x * 3.0 - uTime * 0.5) * 0.06;
          p += normal * wave;
          p.x += uPointer.x * 0.06 * (1.0 - abs(p.z));
          p.y += uPointer.y * 0.06 * (1.0 - abs(p.z));
          vWave = wave;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        varying vec3 vNormal;
        varying float vWave;
        void main() {
          vec3 neon = mix(vec3(0.35, 0.04, 1.0), vec3(0.0, 0.9, 0.88), smoothstep(-0.1, 0.13, vNormal.y + vWave));
          neon = mix(neon, vec3(0.72, 1.0, 0.1), smoothstep(0.35, 0.9, vNormal.x));
          float glow = 0.55 + 0.35 * sin(uTime * 0.7 + vNormal.z * 5.0);
          gl_FragColor = vec4(neon * glow, 0.68);
        }
      `,
    });

    const orb = new THREE.Mesh(geometry, material);
    scene.add(orb);

    const pointer = new THREE.Vector2(0, 0);
    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    let frame = 0;
    const animate = (time: number) => {
      frame = window.requestAnimationFrame(animate);
      material.uniforms.uTime.value = time * 0.001;
      material.uniforms.uPointer.value.lerp(pointer, 0.035);
      orb.rotation.y += 0.0018;
      orb.rotation.x = Math.sin(time * 0.00025) * 0.12;
      renderer.render(scene, camera);
    };
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="color-field" aria-hidden="true" />;
}
