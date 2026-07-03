import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Generate Black Hole Particles (Format of background, shape of uploaded image)
const generateBlackHole = (count) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  const colorInside = new THREE.Color('#ffffff');
  const colorOutside = new THREE.Color('#333333');

  const innerRadius = 12;
  const outerRadius = 45;

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    
    // Dense clustering at the event horizon, but spreading further out
    const rNorm = Math.pow(Math.random(), 2.5); 
    const radius = innerRadius + rNorm * (outerRadius - innerRadius);
    
    const angle = Math.random() * Math.PI * 2;
    
    // Add swirl effect similar to the image
    const swirl = (radius - innerRadius) * -0.3;
    const finalAngle = angle + swirl;

    // Placed on X-Y plane so it faces the camera perfectly circularly
    const zNoise = (Math.random() - 0.5) * 0.8;

    positions[i3] = Math.cos(finalAngle) * radius;
    positions[i3 + 1] = Math.sin(finalAngle) * radius;
    positions[i3 + 2] = zNoise;

    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, Math.min(1, rNorm * 3));

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }
  return { positions, colors };
};

const generateStars = (count) => {
  const positions = new Float32Array(count * 3);
  for(let i=0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 250; // Spread all over screen
    positions[i3 + 1] = (Math.random() - 0.5) * 250;
    positions[i3 + 2] = (Math.random() - 0.5) * 80 - 40; // Push to background
  }
  return positions;
};

const BlackHoleRing = () => {
  const ref = useRef();
  const { positions, colors } = useMemo(() => generateBlackHole(60000), []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Ultra slow rotation
      ref.current.rotation.z -= delta * 0.01; 
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.025}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const Stars = () => {
  const ref = useRef();
  const positions = useMemo(() => generateStars(10000), []);

  useFrame((state, delta) => {
    if(ref.current) {
      // Stars rotate in the exact SAME direction as the galaxy, slightly slower for depth
      ref.current.rotation.z -= delta * 0.008;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 6, times: [0, 0.9, 1], ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#000',
        zIndex: 9999,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {/* 3D Particle Scene (Matches background format, shapes uploaded image) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
          <color attach="background" args={['#000000']} />
          <Stars />
          <BlackHoleRing />
        </Canvas>
      </div>

      {/* Text Layer */}
      <motion.div
        initial={{ opacity: 0, filter: 'blur(12px)' }}
        animate={{ opacity: [0, 1, 1, 0], filter: ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(12px)'] }}
        transition={{ duration: 6, times: [0, 0.3, 0.75, 0.9], ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          zIndex: 10
        }}
      >
        <div style={{
          fontFamily: 'Outfit, sans-serif',
          fontSize: '2rem',
          letterSpacing: '0.2em',
          fontWeight: 300,
          marginBottom: '1rem',
          textAlign: 'center'
        }}>
          AKSHAYA CHITTIMILLA
        </div>
        <div style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.9rem',
          color: 'rgba(255, 255, 255, 0.5)',
          letterSpacing: '0.1em',
          textAlign: 'center'
        }}>
          Initializing Portfolio...
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
