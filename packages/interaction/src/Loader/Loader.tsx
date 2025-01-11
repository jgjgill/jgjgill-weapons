import { useTexture } from "@react-three/drei";
import test from "../asset/temp.jpg";
import { DoubleSide } from "three";

export function Loader() {
	console.log(3333, test);
	const texture = useTexture({
		map: test,
	});

	return (
		<mesh>
			<cylinderGeometry args={[2, 2, 3, 16, 3, true]} />
			{/* <meshStandardMaterial side={DoubleSide} map={texture.map} /> */}
		</mesh>
	);
}
