import type { MeshProps } from "@react-three/fiber";

interface BoxProps extends MeshProps {}

export const Box = ({ ...props }: BoxProps) => {
	return (
		<mesh {...props}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color="orange" />
		</mesh>
	);
};
