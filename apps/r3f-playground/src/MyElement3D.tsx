import {
	AccumulativeShadows,
	ContactShadows,
	Environment,
	OrbitControls,
	RandomizedLight,
	SoftShadows,
	useAnimations,
	useGLTF,
	useHelper,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import {
	Bloom,
	BrightnessContrast,
	DotScreen,
	EffectComposer,
	HueSaturation,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
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
import { degToRad } from "three/src/math/MathUtils.js";

const torusGeometry = new TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new MeshStandardMaterial({
	color: "#9b59b6",
	roughness: 0.5,
	metalness: 0.9,
});

function MyElement3D() {
	useFrame((state) => {
		const time = state.clock.elapsedTime;
		const smallSpherePivot = state.scene.getObjectByName("smallSpherePivot");
		smallSpherePivot.rotation.y = degToRad(time * 50);
	});

	const { enabled, hue, saturation } = useControls("HueSaturation", {
		enabled: { value: true },
		hue: {
			value: 0,
			min: 0,
			max: Math.PI,
			step: 0.1,
		},
		saturation: {
			value: 0,
			min: 0,
			max: Math.PI,
			step: 0.1,
		},
	});

	const { brightness, contrast } = useControls({
		brightness: {
			value: 0,
			min: -1,
			max: 1,
			step: 0.1,
		},
		contrast: {
			value: 0,
			min: -1,
			max: 1,
			step: 0.1,
		},
	});

	const { angle, scale } = useControls("dotScreen", {
		angle: { value: 1.57, min: 0, max: Math.PI * 2, step: 0.1 },
		scale: { value: 1.57, min: 0, max: 10, step: 0.1 },
	});

	const { intensity, mipmapBlur, luminanceThreshold, luminanceSmoothing } =
		useControls("Bloom", {
			intensity: { value: 1, min: 0, max: 10, step: 0.01 },
			mipmapBlur: { value: false },
			luminanceThreshold: { value: 0.9, min: 0, max: 1, step: 0.01 },
			luminanceSmoothing: { value: 0.025, min: 0, max: 2, step: 0.01 },
		});

	return (
		<>
			<OrbitControls />
			<axesHelper scale={10} />

			<EffectComposer>
				<Bloom
					intensity={intensity}
					mipmapBlur={mipmapBlur}
					luminanceThreshold={luminanceThreshold}
					luminanceSmoothing={luminanceSmoothing}
				/>
				{/* <DotScreen angle={angle} scale={scale} /> */}
				{/* <HueSaturation hue={hue} saturation={saturation} /> */}
				{/* <BrightnessContrast brightness={brightness} contrast={contrast} /> */}
			</EffectComposer>

			<ambientLight intensity={0.1} />

			<directionalLight
				castShadow
				color={0xffffff}
				intensity={5}
				position={[-3, 3, 3]}
				shadow-mapSize={[1024 * 2, 1024 * 2]}
			/>

			<mesh receiveShadow rotation-x={degToRad(-90)}>
				<planeGeometry args={[10, 10]} />
				<meshStandardMaterial
					color="#2c3e50"
					roughness={0.5}
					metalness={0.5}
					side={DoubleSide}
				/>
			</mesh>

			<mesh castShadow receiveShadow position-y={0.6} rotation-x={-Math.PI / 2}>
				<torusKnotGeometry args={[0.6, 0.2, 128, 32]} />
				<meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.6} />
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
						emissive="#e74c3c"
						emissiveIntensity={50}
					/>
					<pointLight color="#ff4c3c" intensity={3} />
				</mesh>
			</group>
		</>
	);
}

export default MyElement3D;
