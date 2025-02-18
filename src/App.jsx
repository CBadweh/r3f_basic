import { Canvas, useFrame } from "@react-three/fiber";
import "./App.css";

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

    </Canvas>
  );
};


export default App;
