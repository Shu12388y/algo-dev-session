import { Canvas, useThree } from "@react-three/fiber";
import { Float, useGLTF } from "@react-three/drei";
import {  Suspense, useEffect, useState } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";


function useResponsiveScale() {
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScale(0.6);
        setIsMobile(true);
      } else if (width < 1024) {
        setScale(0.8);
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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 640) {
        camera.position.set(0, 0, 12);
      } else if (width < 1024) {
        camera.position.set(0, 0, 10);
      } else {
        camera.position.set(0, 0, 8);
      }

      camera.updateProjectionMatrix();
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [camera]);

  return null;
}

function Model({ responsiveScale }: { responsiveScale: number }) {
  const { scene } = useGLTF("/dog.glb");
  const modelRef = useRef(null);

  // Rotate every frame
  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta; // smooth 360 rotation
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={1}>
      <primitive
        ref={modelRef}
        object={scene}
        scale={responsiveScale * 0.7}
        position={[0, -1, 0]}
      />
    </Float>
  );
}

function Scene({ responsiveScale }: { responsiveScale: number }) {
  return (
    <>
      <ResponsiveCamera  />
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#22916a" />
      <Model responsiveScale={responsiveScale} />
    </>
  );
}

export function Hero3D() {
  const { scale, isMobile } = useResponsiveScale();

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${
        isMobile ? "opacity-60" : "opacity-80"
      }`}
    >
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