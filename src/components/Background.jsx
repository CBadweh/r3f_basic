import { useLoader } from '@react-three/fiber';
import { TextureLoader, DoubleSide } from 'three';

const BackgroundPlane = ({ url }) => {
  const texture = useLoader(TextureLoader, url);
  return (
    <group>
        <mesh position={[0, 8, -1]}>
            <planeGeometry args={[60, 30]} /> 
            <meshBasicMaterial map={texture} side={DoubleSide} />
        </mesh>

        <mesh position={[0, -1, 0]} >
            <planeGeometry args={[60, 0.5]} />
            <meshStandardMaterial color={"red"} />
        </mesh>
    </group>
  );
};

export default BackgroundPlane;
