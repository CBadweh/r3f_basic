import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import "./App.css";
import { useControls, button } from "leva";

const Cube = ({ position, side, color, aniSpeed, isAnimating }) => {
  const ref = useRef(); 

  useFrame((state, delta) => {
    if (isAnimating) {
      ref.current.rotation.y += delta * 0.2 * aniSpeed;
      ref.current.rotation.z += Math.sin(state.clock.elapsedTime) * 0.1 * aniSpeed;
    }
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={[side, side, side]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Scene = () => {
  // State to control animation and force cube remount for reset.
  const [isAnimating, setIsAnimating] = useState(true);
  const [cubeKey, setCubeKey] = useState(0);

  const { lightColour, animationSpeed, start, pause, reset } = useControls({
    lightColour: "white",
    animationSpeed: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.1,
    },
    start: button(() => setIsAnimating(true)),
    pause: button(() => setIsAnimating(false)),
    reset: button(() => {
      setIsAnimating(false);
      // Change key to remount the Cube and reset its state.
      setCubeKey(Date.now());
    }),
  });

  return (
    <>
      <directionalLight color={lightColour} position={[0, 1, 2]} />
      <Cube 
        key={cubeKey} 
        position={[0, 0, 0]} 
        color="green" 
        side={1} 
        aniSpeed={animationSpeed} 
        isAnimating={isAnimating} 
      />
    </>
  );
};

const App = () => {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  );
};

export default App;
