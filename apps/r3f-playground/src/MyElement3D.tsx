import {
	MeshReflectorMaterial,
	OrbitControls,
	useTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useEffect, useRef } from "react";
import {
	BackSide,
	BufferAttribute,
	DoubleSide,
	FrontSide,
	MirroredRepeatWrapping,
	NoColorSpace,
	Vector2,
	type Mesh,
} from "three";
import { degToRad } from "three/src/math/MathUtils.js";

function MyElement3D() {
	const mesh1 = useRef<Mesh>(null);
	const mesh2 = useRef<Mesh>(null);

	const textures = useTexture({
		map: "/Glass_Window_002_basecolor.jpg",
		roughnessMap: "/Glass_Window_002_roughness.jpg",
		metalnessMap: "/Glass_Window_002_metallic.jpg",
		normalMap: "/Glass_Window_002_normal.jpg",
		displacementMap: "/Glass_Window_002_height.png",
		aoMap: "/Glass_Window_002_ambientOcclusion.jpg",
		alphaMap: "/Glass_Window_002_opacity.jpg",
	});

	useEffect(() => {
		if (!mesh1.current) {
			return;
		}

		textures.map.repeat.x =
			textures.displacementMap.repeat.x =
			textures.aoMap.repeat.x =
			textures.roughnessMap.repeat.x =
			textures.metalnessMap.repeat.x =
			textures.normalMap.repeat.x =
			textures.alphaMap.repeat.x =
				4;

		textures.map.wrapS =
			textures.displacementMap.wrapS =
			textures.aoMap.wrapS =
			textures.roughnessMap.wrapS =
			textures.metalnessMap.wrapS =
			textures.normalMap.wrapS =
			textures.alphaMap.wrapS =
				MirroredRepeatWrapping;

		textures.map.needsUpdate =
			textures.displacementMap.needsUpdate =
			textures.aoMap.needsUpdate =
			textures.roughnessMap.needsUpdate =
			textures.metalnessMap.needsUpdate =
			textures.normalMap.needsUpdate =
			textures.alphaMap.needsUpdate =
				true;

		mesh1.current.geometry.setAttribute(
			"uv2",
			new BufferAttribute(mesh1.current.geometry.attributes.uv.array, 2),
		);
	}, [textures]);

	return (
		<>
			<OrbitControls />
			<axesHelper scale={10} />

			<ambientLight intensity={0.1} />
			<directionalLight position={[0, 1, -8]} intensity={0.4} />
			<directionalLight position={[1, 2, 8]} intensity={0.4} />

			<mesh ref={mesh1}>
				<cylinderGeometry args={[2, 2, 3, 256, 256, true]} />
				<meshStandardMaterial
					side={DoubleSide}
					map={textures.map}
					metalness={0.5}
					roughnessMap={textures.roughnessMap}
					roughnessMap-colorSpace={NoColorSpace}
					metalnessMap={textures.metalnessMap}
					metalnessMap-colorSpace={NoColorSpace}
					normalMap={textures.normalMap}
					normalMap-colorSpace={NoColorSpace}
					normalScale={new Vector2(1, 1)}
					displacementMap={textures.displacementMap}
					displacementMap-colorSpace={NoColorSpace}
					displacementScale={0.2}
					displacementBias={-0.2}
					aoMap={textures.aoMap}
					// alphaMap={textures.alphaMap}
					transparent
					alphaToCoverage
				/>
			</mesh>
		</>
	);
}

export default MyElement3D;
