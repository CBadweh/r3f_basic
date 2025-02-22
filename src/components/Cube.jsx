import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";

const Cube = ({ position, side, color, aniSpeed, running, reset, add }) => {
  const ref = useRef(); // for accessing threejs element properties

  // When the reset button is pressed (reset value changes), set rotation to zero.
  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(0, 0, 0);
    }
  }, [reset]);

  useFrame((state, delta) => {
    if (!running) return; // Pause the animation when not running.
    ref.current.position.x += Math.sin(state.clock.elapsedTime) * aniSpeed;
    // add(aniSpeed+2);
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={[side, side, side]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
export default Cube;