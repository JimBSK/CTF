import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Scoreboard3D = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <OrbitControls />
      {/* 3D-элементы рейтинга */}
    </Canvas>
  );
};