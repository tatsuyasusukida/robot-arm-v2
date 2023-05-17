"use client";

import { Box } from "@react-three/drei";
import { Canvas, ThreeElements, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

function MyBox(props: ThreeElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null!);
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);

  useFrame((state, delta) => (ref.current.rotation.x += delta));

  return (
    <Box
      {...props}
      ref={ref}
      args={[1, 1, 1]}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}
      material-color={hovered ? "hotpink" : "orange"}
    ></Box>
  );
}

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <Canvas>
        <pointLight position={[10, 10, 10]}></pointLight>
        <MyBox position={[-1.2, 0, 0]}></MyBox>
        <MyBox position={[1.2, 0, 0]}></MyBox>
      </Canvas>
    </main>
  );
}
