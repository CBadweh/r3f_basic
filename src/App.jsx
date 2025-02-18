import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";

// React component and props for the Box
// props: position, side, color
const Cube = ({ position, side, color }) => {
  // const ref = useRef();

  return (
    <mesh position={position}>
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
