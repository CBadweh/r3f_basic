import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState} from "react"
import "./App.css";
import { useControls } from "leva";


// Box component
const Cube = ({ position, side, color, aniSpeed }) => {
  const ref = useRef(); 

  // Box Animation
  useFrame((state, delta, frame) => {
    ref.current.rotation.y += delta * 0.2*aniSpeed;                              // Basic rotation animation around y axis
    ref.current.rotation.z += Math.sin(state.clock.elapsedTime) * 0.1*aniSpeed;  // Rotation animation based on sine equation on z axis
    console.log(state);
  });

  // Create BOX
  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={[side, side, side]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// Scene
const Scene = () => {
  // Lava GUI
  const { lightColour, animationSpeed } = useControls({
    lightColour: "white",
    animationSpeed: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.1,
    },
  });
  
  // Add Box component in Scene
  return (
    <>
      <directionalLight position={[0, 1, 2]} /> 
      <Cube position={[0, 0, 0]} color={"green"} args={[1,1,1]} aniSpeed = {animationSpeed} />
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
