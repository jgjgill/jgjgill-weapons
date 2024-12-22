import { RoundedBox } from "@react-three/drei";
import { type GroupProps, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

const HALF_PI = Math.PI / 2;
const TWO_PI = Math.PI * 2;

interface DiceProps extends GroupProps {
	onFinish?: (value: 1 | 2 | 3 | 4 | 5 | 6) => void;
}

export function Dice({ onFinish, ...props }: DiceProps) {
	const [isRotating, setIsRotating] = useState(false);
	const [targetRotation, setTargetRotation] = useState(
		() =>
			new THREE.Euler(
				Math.random() * TWO_PI,
				Math.random() * TWO_PI,
				Math.random() * TWO_PI,
			),
	);

	const groupRef = useRef<THREE.Group>(null);
	const resultNumber = useRef<1 | 2 | 3 | 4 | 5 | 6>(1);
	const initialRotation = useRef(new THREE.Euler(0, 0, 0));
	const rotationProgress = useRef(0);

	const FACE_ROTATIONS = {
		1: { x: HALF_PI, y: 0, z: 0 },
		2: { x: Math.PI, y: 0, z: 0 },
		3: { x: 0, y: -HALF_PI, z: 0 },
		4: { x: 0, y: HALF_PI, z: 0 },
		5: { x: 0, y: 0, z: 0 },
		6: { x: -HALF_PI, y: 0, z: 0 },
	};

	const handleClick = () => {
		if (!isRotating && groupRef.current) {
			initialRotation.current.copy(groupRef.current.rotation);

			resultNumber.current = (Math.floor(Math.random() * 6) + 1) as
				| 1
				| 2
				| 3
				| 4
				| 5
				| 6;

			const finalRotation = FACE_ROTATIONS[resultNumber.current];
			const spins = TWO_PI * 4;
			setTargetRotation(
				new THREE.Euler(
					spins + finalRotation.x,
					spins + finalRotation.y,
					spins + finalRotation.z,
				),
			);

			rotationProgress.current = 0;
			setIsRotating(true);
		}
	};

	useFrame((state, delta) => {
		if (isRotating && groupRef.current) {
			const speed = 2.5 * (1 - rotationProgress.current);
			rotationProgress.current += delta * speed;

			const eased = easeOutCubic(rotationProgress.current);

			groupRef.current.rotation.x = THREE.MathUtils.lerp(
				initialRotation.current.x,
				targetRotation.x,
				eased,
			);
			groupRef.current.rotation.y = THREE.MathUtils.lerp(
				initialRotation.current.y,
				targetRotation.y,
				eased,
			);
			groupRef.current.rotation.z = THREE.MathUtils.lerp(
				initialRotation.current.z,
				targetRotation.z,
				eased,
			);

			if (rotationProgress.current >= 0.9 && isRotating) {
				const finalRotation = FACE_ROTATIONS[resultNumber.current];
				groupRef.current.rotation.set(
					finalRotation.x,
					finalRotation.y,
					finalRotation.z,
				);

				setIsRotating(false);
				rotationProgress.current = 1;

				onFinish?.(resultNumber.current);
			}
		}
	});

	return (
		<group {...props} ref={groupRef} onClick={handleClick}>
			<RoundedBox args={[1, 1, 1]} radius={0.05} smoothness={4}>
				<meshPhysicalMaterial
					color="#ff0000"
					transparent
					opacity={0.7}
					transmission={0.2}
					thickness={1}
					roughness={0.1}
					clearcoat={1}
					clearcoatRoughness={0.1}
					ior={1.5}
				/>
			</RoundedBox>

			{Object.entries(dicePatterns).map(([face, dots], faceIndex) => (
				<group key={`${faceIndex}-${face}`} position={[0, 0, 0]}>
					{dots.map((pos, dotIndex) => {
						if (!pos[0] || !pos[1]) {
							return;
						}

						let dotPosition: [number, number, number] = [0, 0, 0];
						let cylinderRotation: [number, number, number] = [0, 0, 0];
						const offset = 0.501;

						switch (faceIndex) {
							case 0:
								dotPosition = [0.5 - pos[0], offset, 0.5 - pos[1]];
								break;
							case 1:
								dotPosition = [pos[0] - 0.5, pos[1] - 0.5, -offset];
								cylinderRotation = [HALF_PI, 0, 0];
								break;
							case 2:
								dotPosition = [offset, pos[1] - 0.5, pos[0] - 0.5];
								cylinderRotation = [0, 0, HALF_PI];
								break;
							case 3:
								dotPosition = [-offset, pos[1] - 0.5, 0.5 - pos[0]];
								cylinderRotation = [0, 0, HALF_PI];
								break;
							case 4:
								dotPosition = [pos[0] - 0.5, 0.5 - pos[1], offset];
								cylinderRotation = [Math.PI / 2, 0, 0];
								break;
							case 5:
								dotPosition = [0.5 - pos[0], -offset, pos[1] - 0.5];
								break;
						}

						return (
							<mesh
								key={`face-${faceIndex}-dot-${dotIndex}-${pos.length}`}
								position={dotPosition}
								rotation={cylinderRotation}
							>
								<cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
								<meshStandardMaterial color="white" transparent />
							</mesh>
						);
					})}
				</group>
			))}
		</group>
	);
}

const dicePatterns = {
	1: [[0.5, 0.5]],
	2: [
		[0.3, 0.3],
		[0.7, 0.7],
	],
	3: [
		[0.3, 0.3],
		[0.5, 0.5],
		[0.7, 0.7],
	],
	4: [
		[0.3, 0.3],
		[0.3, 0.7],
		[0.7, 0.3],
		[0.7, 0.7],
	],
	5: [
		[0.3, 0.3],
		[0.3, 0.7],
		[0.5, 0.5],
		[0.7, 0.3],
		[0.7, 0.7],
	],
	6: [
		[0.3, 0.3],
		[0.3, 0.5],
		[0.3, 0.7],
		[0.7, 0.3],
		[0.7, 0.5],
		[0.7, 0.7],
	],
};

function easeOutCubic(x: number): number {
	return 1 - (1 - x) ** 3;
}
