"use client";

import { Box, Cylinder, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useState } from "react";

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <Canvas style={{ width: "100vw", height: "100vh" }}>
        <Scene></Scene>
      </Canvas>
    </main>
  );
}

function Scene() {
  const [rotation, setRotation] = useState(0);
  const material = <meshPhongMaterial color="#f3f3f3"></meshPhongMaterial>;

  // useFrame((state, delta) => setRotation(rotation + delta));

  return (
    <>
      <pointLight position={[10, 10, 10]}></pointLight>
      <OrbitControls></OrbitControls>
      <group rotation={[0, rotation - Math.PI / 4, 0]}>
        <Cylinder args={[1, 1, 2, 12]}>{material}</Cylinder>
        <Box position={[-0.5, 1.75, 0]} scale={[0.2, 1.5, 1]}>
          {material}
        </Box>
        <group rotation={[rotation - Math.PI / 4, 0, 0]} position={[0, 2, 0]}>
          <Cylinder
            args={[1, 1, 2, 12]}
            position={[-1.1, 0, 0]}
            scale={[0.5, 0.5, 0.5]}
            rotation={[0, 0, Math.PI / 2]}
          >
            {material}
          </Cylinder>
          <Box position={[0.1, 1, 0]} scale={[1, 3, 1]}>
            {material}
          </Box>
          <Box position={[-0.3, 3.2, 0]} scale={[0.2, 1.4, 1]}>
            {material}
          </Box>
          <group
            position={[0, 3.4, 0]}
            rotation={[rotation + Math.PI / 4, 0, 0]}
          >
            <Cylinder
              args={[1, 1, 2, 12]}
              position={[-0.8, 0, 0]}
              scale={[0.4, 0.4, 0.4]}
              rotation={[0, 0, Math.PI / 2]}
            >
              {material}
            </Cylinder>
            <Box position={[0.2, 0.15, 0]} scale={[0.8, 1, 1]}>
              {material}
            </Box>
            <Box position={[0.2, 1.15, -0.4]} scale={[0.8, 1, 0.2]}>
              {material}
            </Box>
            {/* <group
              position={[0, 1.2, 0]}
              rotation={[rotation + (0 * Math.PI) / 4, 0, 0]}
            >
              <Cylinder
                args={[1, 1, 2, 12]}
                position={[0.2, 0, 0.06]}
                scale={[0.36, 0.36, 0.36]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                {material}
              </Cylinder>
            </group> */}
          </group>
        </group>
      </group>
    </>
  );
}
