import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate galaxy particles with a spiral shape
const generateGalaxy = (count) => {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  const colorInside = new THREE.Color('#ffffff');
  const colorOutside = new THREE.Color('#444444'); // Soft gray

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * 20; // 0 to 20
    const spinAngle = radius * 0.5;
    const branchAngle = ((i % 3) / 3) * Math.PI * 2; // 3 branches
    
    // Randomness for thickness of the arms
    const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2;
    const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2;
    const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * 2;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY * 0.5; // Flattened Y to make it look like a disc
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    // Mixed Color
    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / 20);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }
  return { positions, colors };
};

// Generate background stars
const generateStars = (count) => {
  const positions = new Float32Array(count * 3);
  for(let i=0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 100;
  }
  return positions;
};

const Galaxy = () => {
  const ref = useRef();
  const { positions, colors } = useMemo(() => generateGalaxy(25000), []);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  // Track mouse for interaction
  React.useEffect(() => {
    const handleMouseMove = (event) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      // Rotate the entire galaxy very slowly
      ref.current.rotation.y += delta * 0.02;
      
      // Gentle parallax based on mouse
      ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, mouse.current.y * 0.2, 0.05);
      ref.current.rotation.z = THREE.MathUtils.lerp(ref.current.rotation.z, -mouse.current.x * 0.2, 0.05);
    }
  });

  return (
    <group rotation={[Math.PI / 4, 0, Math.PI / 8]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          vertexColors
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const Stars = () => {
  const ref = useRef();
  const positions = useMemo(() => generateStars(15000), []);

  useFrame((state, delta) => {
    if(ref.current) {
      ref.current.rotation.y -= delta * 0.01;
      ref.current.rotation.x -= delta * 0.005;
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
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

const InteractiveLight = () => {
  const lightRef = useRef();
  const { viewport } = useThree();

  useFrame(({ mouse }) => {
    if(lightRef.current) {
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      lightRef.current.position.set(x, y, 2);
    }
  });

  return (
    <pointLight ref={lightRef} distance={10} intensity={2} color="#ffffff" />
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
      <color attach="background" args={['#000000']} />
      <ambientLight intensity={0.1} />
      <InteractiveLight />
      <Stars />
      <Galaxy />
    </Canvas>
  );
};

export default Scene;
