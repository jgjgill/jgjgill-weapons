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
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";
import { degToRad } from "three/src/math/MathUtils.js";

const torusGeometry = new TorusGeometry(0.4, 0.1, 32, 32);
const torusMaterial = new MeshStandardMaterial({
	color: "#9b59b6",
	roughness: 0.5,
	metalness: 0.9,
});

function MyElement3D() {
	const model = useGLTF("/model.glb");
	const animations = useAnimations(model.animations, model.scene);
	const { actionName } = useControls({
		actionName: {
			value: animations.names[1],
			options: animations.names,
		},
	});
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const action = animations.actions[actionName];
		action?.reset().fadeIn(0.5).play();

		return () => {
			action?.fadeOut(0.5);
		};
	}, [actionName, animations]);

	useEffect(() => {
		let minY = Number.POSITIVE_INFINITY,
			maxY = Number.NEGATIVE_INFINITY;

		model.scene.traverse((item) => {
			if (item.isMesh) {
				const geomBbox = item.geometry.boundingBox;
				if (minY > geomBbox.min.y) minY = geomBbox.min.y;
				if (maxY < geomBbox.max.y) maxY = geomBbox.max.y;
			}
		});

		const h = maxY - minY;
		setHeight(h);
	}, [model.scene]);

	return (
		<>
			<OrbitControls />
			<axesHelper scale={10} />

			<Environment preset="sunset" />

			<primitive
				scale={5}
				position-y={-(height / 2) * 5}
				object={model.scene}
			/>
		</>
	);
}

export default MyElement3D;
