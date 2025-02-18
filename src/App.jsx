import { Canvas, useFrame } from "@react-three/fiber";
import { useRef} from "react"
import "./App.css";

// React component and props for the Box
// props: position, side, color
const Cube = ({ position, side, color }) => {
  const ref = useRef(); // with the ref, we can access the cube's properties

  /*
  Animation with React hook useFrame()
  des: useFrame() run a callback function on every frame
  argument: 
     state - contain properites and details about currenet scene
     delta - time in second sine the last frame
  */
  useFrame((state, delta, frame) => {
    ref.current.rotation.y += delta * 0.2;                              // Basic rotation animation around y axis
    ref.current.rotation.z += Math.sin(state.clock.elapsedTime) * 0.1;  // Rotation animation based on sine equation on z axis
    console.log(state);
  });

  return (
    <mesh position={position} ref={ref}>
      <boxGeometry args={[side, side, side]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};


const App = () => {
  return (
    <Canvas>
      {/* add lighting */}
      <directionalLight
        position={[0, 1, 2]}
      />

      {/* Box Mesh include the geometry and the material */}
      <mesh position= {[1,0,0]} >
        <boxGeometry args={[2, 2, 4]} /> 
        <meshStandardMaterial color={"orange"} />  
      </mesh>

      {/* adding Box using React component */}
      <Cube position={[-1, 0, 0]} color={"green"} args={[1,1,1]} />

    </Canvas>
  );
};

export default App;
