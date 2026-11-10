/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface ThreeWatchProps {
  currentGlucose: number;
  glucoseStatus: 'Good' | 'High' | 'Low';
  onLaunchApp: () => void;
}

export default function ThreeWatch({ currentGlucose, glucoseStatus, onLaunchApp }: ThreeWatchProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [finish, setFinish] = useState<'titanium' | 'gold' | 'ceramic'>('titanium');
  const [exploded, setExploded] = useState<boolean>(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Software WebGL Guard
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf7f9ff, 0.015);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 1.5, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    container.appendChild(renderer.domElement);

    // Studio Environment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(4, 6, 4);
    keyLight.castShadow = !isSoftwareGl;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd1dbe8, 1.0);
    fillLight.position.set(-4, 2, -2);
    scene.add(fillLight);

    // Procedural Watch Group
    const watchGroup = new THREE.Group();
    scene.add(watchGroup);

    // 1. Watch Case Material based on finish
    const getCaseColor = () => {
      if (finish === 'gold') return 0xd4af37;
      if (finish === 'ceramic') return 0x161e26;
      return 0x8a9ba8; // titanium
    };

    const caseMaterial = new THREE.MeshStandardMaterial({
      color: getCaseColor(),
      metalness: finish === 'ceramic' ? 0.2 : 0.9,
      roughness: finish === 'ceramic' ? 0.3 : 0.2,
    });

    // Outer Case
    const caseGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.35, 64);
    const caseMesh = new THREE.Mesh(caseGeo, caseMaterial);
    watchGroup.add(caseMesh);

    // Top Bezel Ring
    const bezelGeo = new THREE.TorusGeometry(1.4, 0.08, 16, 64);
    const bezelMesh = new THREE.Mesh(bezelGeo, caseMaterial);
    bezelMesh.rotation.x = Math.PI / 2;
    bezelMesh.position.y = 0.18;
    watchGroup.add(bezelMesh);

    // Crown Button on Right
    const crownGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.3, 32);
    const crownMesh = new THREE.Mesh(crownGeo, caseMaterial);
    crownMesh.rotation.z = Math.PI / 2;
    crownMesh.position.set(1.45, 0, 0);
    watchGroup.add(crownMesh);

    // Straps (Top & Bottom)
    const strapGeo = new THREE.BoxGeometry(1.2, 0.1, 2.5);
    const strapMaterial = new THREE.MeshStandardMaterial({ color: 0x1f2933, roughness: 0.8 });
    const topStrap = new THREE.Mesh(strapGeo, strapMaterial);
    topStrap.position.set(0, 0, -1.8);
    watchGroup.add(topStrap);

    const bottomStrap = new THREE.Mesh(strapGeo, strapMaterial);
    bottomStrap.position.set(0, 0, 1.8);
    watchGroup.add(bottomStrap);

    // Dynamic AMOLED Screen Canvas Texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;

    const updateScreenTexture = () => {
      ctx.fillStyle = '#0b0f14';
      ctx.fillRect(0, 0, 512, 512);

      // Status pill
      ctx.fillStyle = glucoseStatus === 'Good' ? '#1f7a4d' : '#9a5b00';
      ctx.beginPath();
      ctx.roundRect(136, 80, 240, 50, 25);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(glucoseStatus === 'Good' ? '● Good | Stable' : '▲ High | Rising', 256, 113);

      // Value
      ctx.font = 'bold 110px sans-serif';
      ctx.fillText(currentGlucose.toString(), 256, 260);

      ctx.font = '24px sans-serif';
      ctx.fillStyle = '#8a9ba8';
      ctx.fillText('mg/dL • CGM Active', 256, 310);

      // Sub text
      ctx.font = '20px sans-serif';
      ctx.fillStyle = '#7fd1a8';
      ctx.fillText('Serene Metric OS', 256, 380);

      screenTex.needsUpdate = true;
    };

    const screenTex = new THREE.CanvasTexture(canvas);
    screenTex.colorSpace = THREE.SRGBColorSpace;
    updateScreenTexture();

    // Screen Mesh
    const screenGeo = new THREE.CircleGeometry(1.25, 64);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTex });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.rotation.x = -Math.PI / 2;
    screenMesh.position.y = 0.19;
    watchGroup.add(screenMesh);

    // Sapphire Crystal Glass Cover (Transparent Physical Material)
    const glassGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.05, 64);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0,
      roughness: 0.1,
      transmission: 0.9,
      ior: 1.5,
      transparent: true,
      opacity: 0.85,
    });
    const glassMesh = new THREE.Mesh(glassGeo, glassMat);
    glassMesh.position.y = 0.22;
    watchGroup.add(glassMesh);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth hover rotation & exploded view offset
      const targetY = exploded ? 0.8 : 0.2;
      glassMesh.position.y = THREE.MathUtils.damp(glassMesh.position.y, targetY + 0.22, 4, delta);
      screenMesh.position.y = THREE.MathUtils.damp(screenMesh.position.y, targetY + 0.19, 4, delta);

      watchGroup.rotation.y += 0.005;
      watchGroup.rotation.x = Math.sin(clock.getElapsedTime() * 0.5) * 0.1 + 0.2;

      renderer.render(scene, camera);
    };
    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container) container.innerHTML = '';
      renderer.dispose();
    };
  }, [finish, exploded, currentGlucose, glucoseStatus]);

  return (
    <div className="relative w-full h-[450px] flex flex-col items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Interactive 3D Controls Dock */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/80 dark:bg-[#161e26]/80 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl z-20">
        <div className="flex items-center gap-1.5 text-xs font-bold">
          <span>Finish:</span>
          <button onClick={() => setFinish('titanium')} className={`px-2 py-1 rounded-lg ${finish === 'titanium' ? 'bg-[#006038] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Titanium</button>
          <button onClick={() => setFinish('gold')} className={`px-2 py-1 rounded-lg ${finish === 'gold' ? 'bg-[#006038] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Gold</button>
          <button onClick={() => setFinish('ceramic')} className={`px-2 py-1 rounded-lg ${finish === 'ceramic' ? 'bg-[#006038] text-white' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Ceramic</button>
        </div>
        <div className="w-[1px] h-5 bg-gray-300 dark:bg-gray-700" />
        <button 
          onClick={() => setExploded(!exploded)} 
          className="text-xs font-bold px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 hover:opacity-75"
        >
          {exploded ? 'Assemble Watch' : 'Explode View'}
        </button>
        <div className="w-[1px] h-5 bg-gray-300 dark:bg-gray-700" />
        <button 
          onClick={onLaunchApp}
          className="px-4 py-1.5 rounded-xl bg-[#006038] text-white text-xs font-bold shadow-md hover:opacity-90"
        >
          Launch Companion App →
        </button>
      </div>
    </div>
  );
}
