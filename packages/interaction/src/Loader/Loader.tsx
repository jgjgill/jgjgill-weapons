import { useTexture } from "@react-three/drei";
import Test from "../../asset/temp.jpg";
import { DoubleSide } from "three";

export function Loader() {
	const texture = useTexture({
		map: Test,
	});

	return (
		<mesh>
			<cylinderGeometry args={[2, 2, 3, 16, 3, true]} />
			<meshStandardMaterial side={DoubleSide} map={texture.map} />
		</mesh>
	);
}
