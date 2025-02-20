import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState} from "react"
import "./App.css";
import { useControls } from "leva";

// React component and props for the Box
// props: position, side, color
const Cube = ({ position, side, color, aniSpeed }) => {
  // ANIMATION: // with the ref, we can access the cube's properties to animate our object
  const ref = useRef(); 

  /*
  Animation with React hook useFrame()
  des: useFrame() run a callback function on every frame. To access the state of each frame, we need useRef().
  argument: 
     state - contain properites and details about currenet scene
     delta - time in second sine the last frame
  */
  useFrame((state, delta, frame) => {
    ref.current.rotation.y += delta * 0.2*aniSpeed;                              // Basic rotation animation around y axis
    ref.current.rotation.z += Math.sin(state.clock.elapsedTime) * 0.1*aniSpeed;  // Rotation animation based on sine equation on z axis
    console.log(state);
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={[side, side, side]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

/*
  INTERACTIVE: Hover and click ability with Sphere object
  des. 
    1. When mouse hover the sphere, 
            change color with color={isHovered ? "lightblue" : "orange"}
            change speed with ref.current.rotation.y += delta * speed;
    2. when mouse is clicked,
            change size with scale={isClicked ? 1.5 : 1}
*/
const Sphere = ({ position, args, color }) => {
  const ref = useRef();

  const [isHovered, setIsHovered] = useState(false); // Change color to light blue when mouse is hover 
  const [isClicked, setIsClicked] = useState(false);

  useFrame((state, delta, frame) => {
    const speed = isHovered ? 1 : 0.2;  // INTERACTIVE: Change Speed when hover
    ref.current.rotation.y += delta * speed;
  });

  return (
    <mesh
      position={position}
      ref={ref}
      onPointerEnter={(event) => (event.stopPropagation(), setIsHovered(true))} //INTERACITVE: Change color when hover
      onPointerLeave={() => setIsHovered(false)}
      onClick={() => setIsClicked(!isClicked)}
      scale={isClicked ? 1.5 : 1}               //INTERACITVE: Change size when click
    >
      <sphereGeometry args={args} />
      <meshStandardMaterial
        color={isHovered ? "lightblue" : "orange"} // INTERACITVE: Change color when hover
        wireframe
      />
    </mesh>
  );
};

const Scene = () => {
 
  const { lightColour, animationSpeed } = useControls({
    lightColour: "white",
    animationSpeed: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.1,
    },
  });

  // useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "white");

  return (
    <>
      {/* add lighting */}
      <directionalLight position={[0, 1, 2]} />

      {/* 1.ADDING Box using React component 2. ANIMATION */}
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
