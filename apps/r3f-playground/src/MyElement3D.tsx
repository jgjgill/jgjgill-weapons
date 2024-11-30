import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
import { degToRad } from "three/src/math/MathUtils.js";

function MyElement3D() {
	const refMesh = useRef<Mesh>(null);

	useFrame((state, delta) => {
		if (!refMesh.current) {
			return;
		}

		refMesh.current.rotation.z += delta;
	});

	return (
		<>
			<directionalLight position={[1, 1, 1]} />

			<axesHelper scale={10} />
			<OrbitControls />

			<mesh
				ref={refMesh}
				position-y={2}
				rotation-z={degToRad(45)}
				scale={[2, 1, 1]}
			>
				<boxGeometry />
				<meshStandardMaterial color="#e67e22" opacity={0.5} transparent />
				<axesHelper />

				<mesh scale={[0.1, 0.1, 0.1]} position-y={2}>
					<sphereGeometry />
					<meshStandardMaterial color="red" />
					<axesHelper scale={5} />
				</mesh>
			</mesh>
		</>
	);
}

export default MyElement3D;
