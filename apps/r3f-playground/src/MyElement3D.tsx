import { Environment, OrbitControls, useHelper } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import {
	DoubleSide,
	MeshStandardMaterial,
	RectAreaLight,
	TorusGeometry,
	Vector3,
	type Mesh,
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
	const light = useRef<RectAreaLight>(new RectAreaLight());

	useFrame((state) => {
		const time = state.clock.elapsedTime;
		const smallSpherePivot = state.scene.getObjectByName("smallSpherePivot")!;
		smallSpherePivot.rotation.y = degToRad(time * 50);

		const target = new Vector3();
		smallSpherePivot.children[0].getWorldPosition(target);
		state.camera.position.copy(target);

		const ghostSpherePivot = state.scene.getObjectByName("ghostSpherePivot")!;
		ghostSpherePivot.rotation.y = degToRad(time * 50 + 30);
		ghostSpherePivot.children[0].getWorldPosition(target);
		state.camera.lookAt(target);
	});

	return (
		<>
			{/* <OrbitControls /> */}
			<axesHelper scale={10} />

			<Environment blur={0} files={"/hayloft_2k.hdr"} />

			<mesh ref={mesh1} rotation-x={degToRad(-90)}>
				<planeGeometry args={[10, 10]} />
				<meshStandardMaterial
					color="#2c3e50"
					roughness={0.5}
					metalness={0.5}
					side={DoubleSide}
				/>
			</mesh>

			<mesh rotation-x={degToRad(-90)}>
				<sphereGeometry args={[1.5, 64, 64, 0, Math.PI]} />
				<meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.2} />
			</mesh>

			{new Array(8).fill(undefined).map((item, index) => {
				return (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<group key={index} rotation-y={degToRad(45 * index)}>
						<mesh
							geometry={torusGeometry}
							material={torusMaterial}
							position={[3, 0.5, 0]}
						/>
					</group>
				);
			})}

			<group name="smallSpherePivot">
				<mesh position={[3, 0.5, 0]}>
					<sphereGeometry args={[0.3, 32, 32]} />
					<meshStandardMaterial
						color="#e74c3c"
						roughness={0.2}
						metalness={0.5}
					/>
				</mesh>
			</group>

			<group name="ghostSpherePivot">
				<object3D position={[3, 0.5, 0]} />
			</group>
		</>
	);
}

export default MyElement3D;
