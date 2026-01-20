import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef, Suspense, useEffect, useState } from "react";
import * as THREE from "three";

function useResponsiveScale() {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScale(0.5);
        setIsMobile(true);
      } else if (width < 1024) {
        setScale(0.7);
        setIsMobile(false);
      } else {
        setScale(1);
        setIsMobile(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { scale, isMobile };
}

function ResponsiveCamera() {
  const { camera } = useThree();
  const [cameraZ, setCameraZ] = useState(8);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCameraZ(12);
      } else if (width < 1024) {
        setCameraZ(10);
      } else {
        setCameraZ(8);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    camera.position.z = cameraZ;
    camera.updateProjectionMatrix();
  }, [camera, cameraZ]);

  return null;
}

function FloatingShape({ position, scale, speed, distort, color, responsiveScale }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  distort: number;
  color: string;
  responsiveScale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    }
  });

  const adjustedPosition: [number, number, number] = [
    position[0] * responsiveScale,
    position[1] * responsiveScale,
    position[2]
  ];

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={adjustedPosition} scale={scale * responsiveScale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={2}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
    </Float>
  );
}

function TorusShape({ position, scale, speed, responsiveScale }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  responsiveScale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.3;
    }
  });

  const adjustedPosition: [number, number, number] = [
    position[0] * responsiveScale,
    position[1] * responsiveScale,
    position[2]
  ];

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={adjustedPosition} scale={scale * responsiveScale}>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <meshStandardMaterial
          color="#22916a"
          roughness={0.3}
          metalness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </Float>
  );
}

function OctahedronShape({ position, scale, speed, responsiveScale }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  responsiveScale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.4;
      meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.2;
    }
  });

  const adjustedPosition: [number, number, number] = [
    position[0] * responsiveScale,
    position[1] * responsiveScale,
    position[2]
  ];

  return (
    <Float speed={speed * 1.2} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={adjustedPosition} scale={scale * responsiveScale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#1a7a5a"
          roughness={0.2}
          metalness={0.3}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function Scene({ responsiveScale }: { responsiveScale: number }) {
  return (
    <>
      <ResponsiveCamera />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#22916a" />
      
      {/* Main floating sphere */}
      <FloatingShape
        position={[0, 0, 0]}
        scale={2.2}
        speed={1.5}
        distort={0.4}
        color="#2a9d6f"
        responsiveScale={responsiveScale}
      />
      
      {/* Torus ring */}
      <TorusShape
        position={[2.5, -1.5, -2]}
        scale={0.8}
        speed={1}
        responsiveScale={responsiveScale}
      />
      
      {/* Small octahedron */}
      <OctahedronShape
        position={[-2.2, 1.8, -1]}
        scale={0.6}
        speed={1.2}
        responsiveScale={responsiveScale}
      />
      
      {/* Smaller accent spheres */}
      <FloatingShape
        position={[-3, -1, 1]}
        scale={0.5}
        speed={2}
        distort={0.3}
        color="#34b889"
        responsiveScale={responsiveScale}
      />
      <FloatingShape
        position={[3, 2, -1]}
        scale={0.4}
        speed={1.8}
        distort={0.25}
        color="#1e8a5f"
        responsiveScale={responsiveScale}
      />
    </>
  );
}

export function Hero3D() {
  const { scale, isMobile } = useResponsiveScale();

  return (
    <div className={`absolute inset-0 pointer-events-none ${isMobile ? 'opacity-60' : 'opacity-80'}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <Scene responsiveScale={scale} />
        </Suspense>
      </Canvas>
    </div>
  );
}
