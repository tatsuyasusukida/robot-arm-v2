"use client";

import {
  Box,
  Cylinder,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { atom, useAtom, useAtomValue } from "jotai";
import { FC, useState } from "react";

const axisDegreesAtom = atom([-45, -45, 45, 45, -45]);
const axisRadiansAtom = atom((get) =>
  get(axisDegreesAtom).map((degree) => (degree * Math.PI) / 180)
);

export default function Home() {
  return (
    <main>
      <h1>Robot Arm V2</h1>
      <form>
        {[...Array(5)].map((_, i) => (
          <AxisDegreeSlider index={i} key={i}></AxisDegreeSlider>
        ))}
      </form>
      <Canvas style={{ width: "100vw", height: "100vh" }}>
        <Scene></Scene>
      </Canvas>
    </main>
  );
}

const AxisDegreeSlider: FC<{ index: number }> = ({ index }) => {
  const [axisDegrees, setAxisDegrees] = useAtom(axisDegreesAtom);

  return (
    <div className="flex items-center">
      <label htmlFor={`axis${index}`} className="mr-3">
        Axis {index}
      </label>
      <input
        name={`axis${index}`}
        id={`axis${index}`}
        type="range"
        min={-180}
        max={180}
        step={1}
        value={axisDegrees[index]}
        onChange={(event) =>
          setAxisDegrees((axisDegrees) => [
            ...axisDegrees.slice(0, index),
            parseInt(event.target.value, 10),
            ...axisDegrees.slice(index + 1),
          ])
        }
      />
    </div>
  );
};

function Scene() {
  const axisRadians = useAtomValue(axisRadiansAtom);
  const [currentTime, setCurrentTime] = useState(0);
  const material = <meshPhongMaterial color="#f3f3f3"></meshPhongMaterial>;

  useFrame((state, delta) => setCurrentTime(currentTime + delta));

  const interval = 4000;
  const triangleWave = Math.abs(
    (((currentTime * 1000) % interval) * 2) / interval - 1.0
  );

  const maxRotationDegree = Math.PI / 4;
  const degreeToRotate = triangleWave * maxRotationDegree;

  return (
    <>
      <pointLight position={[10, 10, 10]}></pointLight>
      <OrbitControls></OrbitControls>
      <PerspectiveCamera
        makeDefault
        fov={75}
        near={0.1}
        far={1000}
        position={[0, 5, 15]}
      ></PerspectiveCamera>
      <group rotation={[0, axisRadians[0], 0]}>
        <Cylinder args={[1, 1, 2, 12]}>{material}</Cylinder>
        <Box position={[-0.5, 1.75, 0]} scale={[0.2, 1.5, 1]}>
          {material}
        </Box>
        <group rotation={[axisRadians[1], 0, 0]} position={[0, 2, 0]}>
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
          <group position={[0, 3.4, 0]} rotation={[axisRadians[2], 0, 0]}>
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
            <group position={[0.2, 1.2, 0]} rotation={[0, 0, axisRadians[3]]}>
              <Cylinder
                args={[1, 1, 2, 12]}
                position={[0, 0, 0.06]}
                scale={[0.36, 0.36, 0.36]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                {material}
              </Cylinder>

              <Box
                position={[0, 0, -1.3]}
                scale={[0.6, 1.6, 0.6]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                {material}
              </Box>
              <Box
                position={[-0.25, 0, -1.3 - 1.6 / 2 - 0.8 / 2]}
                scale={[0.1, 0.8, 0.6]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                {material}
              </Box>
              <group position={[0, 0, -2.6]} rotation={[axisRadians[4], 0, 0]}>
                <Cylinder
                  args={[1, 1, 2, 12]}
                  position={[-0.54, 0, 0]}
                  scale={[0.24, 0.24, 0.24]}
                  rotation={[0, 0, Math.PI / 2]}
                >
                  {material}
                </Cylinder>
                <Box
                  position={[0, 0, -0.5]}
                  scale={[0.4, 1.4, 0.4]}
                  rotation={[Math.PI / 2, 0, 0]}
                >
                  {material}
                </Box>
              </group>
            </group>
          </group>
        </group>
      </group>
    </>
  );
}
