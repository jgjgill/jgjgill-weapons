import {
	AccumulativeShadows,
	ContactShadows,
	Environment,
	OrbitControls,
	RandomizedLight,
	SoftShadows,
	useHelper,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import {
	Camera,
	type CameraHelper,
	DirectionalLight,
	DoubleSide,
	MeshStandardMaterial,
	RectAreaLight,
	TorusGeometry,
	Vector3,
	type Mesh,
	type PointLight,
} from "three";
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";
import { degToRad } from "three/src/math/MathUtils.js";

const torusGeometry = new TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new MeshStandardMaterial({
	color: "#9b59b6",
	roughness: 0.5,
	metalness: 0.9,
});

function MyElement3D() {
	const mesh1 = useRef<Mesh>(null);
	const light = useRef<PointLight>(null);
	const shadowCamera = useRef<CameraHelper>();

	const { scene } = useThree();

	useFrame((state) => {
		const time = state.clock.elapsedTime;
		const smallSpherePivot = state.scene.getObjectByName("smallSpherePivot")!;
		smallSpherePivot.rotation.y = degToRad(time * 50);
	});

	return (
		<>
			<OrbitControls />
			<axesHelper scale={10} />

			<ambientLight intensity={0.1} />
			<directionalLight
				color="#ffffff"
				intensity={5}
				position={[0, 5, 0]}
				castShadow
			/>

			<ContactShadows
				position={[0, 0, 0]}
				scale={10}
				resolution={512}
				color="#000000"
				opacity={0.5}
				blur={0.5}
			/>

			{/* <mesh receiveShadow rotation-x={degToRad(-90)}>
				<planeGeometry args={[10, 10]} />
				<meshStandardMaterial
					color="#2c3e50"
					roughness={0.5}
					metalness={0.5}
					side={DoubleSide}
				/>
			</mesh> */}

			<mesh castShadow receiveShadow position-y={1.7}>
				<torusKnotGeometry args={[1, 0.2, 128, 32]} />
				<meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} />
			</mesh>

			{new Array(10).fill().map((item, index) => {
				return (
					<group key={index} rotation-y={degToRad(45 * index)}>
						<mesh
							castShadow
							receiveShadow
							geometry={torusGeometry}
							material={torusMaterial}
							position={[3, 0.5, 0]}
						/>
					</group>
				);
			})}

			<group name="smallSpherePivot">
				<mesh castShadow receiveShadow position={[3, 0.5, 0]}>
					<sphereGeometry args={[0.3, 32, 32]} />
					<meshStandardMaterial
						color="#e74c3c"
						roughness={0.2}
						metalness={0.5}
					/>
				</mesh>
			</group>
		</>
	);
}

export default MyElement3D;
