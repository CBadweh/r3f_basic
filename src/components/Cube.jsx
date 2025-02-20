import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";

const Cube = ({ position, side, color, aniSpeed, running, reset }) => {
  const ref = useRef();

  // When the reset button is pressed (reset value changes), set rotation to zero.
  useEffect(() => {
    if (ref.current) {
      ref.current.rotation.set(0, 0, 0);
    }
  }, [reset]);

  useFrame((state, delta) => {
    if (!running) return; // Pause the animation when not running.
    // ref.current.rotation.y += delta * 0.2 * aniSpeed;
    ref.current.position.x += Math.sin(state.clock.elapsedTime) * 0.1 * aniSpeed;
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={[side, side, side]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};
export default Cube;