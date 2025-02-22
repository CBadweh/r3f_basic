import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import "./App.css";
import { useControls, button } from "leva";
import { TextureLoader } from "three";
import Cube from "./components/Cube";
import Background from "./components/Background";
import Mountain from "./assets/mountain.jpg"
import ground from "./assets/ground.png"


const Scene = () => {
  // State to control animation running and resetting.
  const [isRunning, setIsRunning] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);

  // Controls for light and animation speed.
  const { lightColour, animationSpeed } = useControls({
    lightColour: "white",
    animationSpeed: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.1,
    },
  });

  // Leva buttons for controlling the animation.
  useControls({
    start: button(() => setIsRunning(true)),
    pause: button(() => setIsRunning(false)),
    reset: button(() => setResetCounter((prev) => prev + 1)),
  });


  return (
    <>
      <directionalLight position={[0, 1, 2]} color={lightColour} />
      <gridHelper args={[10, 10]} rotation={[-Math.PI / 2, 0, 0]}/>

      <Cube 
        position={[0, 0, 0]} 
        color="green" 
        side={1} 
        aniSpeed={animationSpeed} 
        running={isRunning} 
        reset={resetCounter} 
      />
      <Background url={Mountain}  width = {40} height = {20}/>
    </>
  );
};

const App = () => {
  return (
    <Canvas camera={{ position: [0, 0, 30] }}>
      <Scene />
    </Canvas>
  );
};

export default App;
