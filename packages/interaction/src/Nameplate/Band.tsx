import {
	useFrame,
	extend,
	type ThreeEvent,
	type Object3DNode,
} from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
	BallCollider,
	CuboidCollider,
	useRopeJoint,
	RigidBody,
	useSphericalJoint,
	type RapierRigidBody,
	type RigidBodyProps,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { Text, useGLTF, useTexture } from "@react-three/drei";
import FabicBand from "../../asset/fabic-band.jpg";
import Tag from "../../asset/tag.glb?url";

declare module "@react-three/fiber" {
	interface ThreeElements {
		meshLineGeometry: Object3DNode<MeshLineGeometry, typeof MeshLineGeometry>;
		meshLineMaterial: Object3DNode<MeshLineMaterial, typeof MeshLineMaterial>;
	}
}

extend({ MeshLineGeometry, MeshLineMaterial });

useTexture.preload(Tag);

interface DragPosition extends THREE.Vector3 {
	x: number;
	y: number;
	z: number;
}

interface BandProps {
	src?: string;
	mainText: string;
	subText: string;
}

export function Band({ src, mainText, subText }: BandProps) {
	const band = useRef<THREE.Mesh>(null);
	const fixed = useRef<RapierRigidBody>(null);
	const j1 = useRef<RapierRigidBody>(null);
	const j2 = useRef<RapierRigidBody>(null);
	const j3 = useRef<RapierRigidBody>(null);
	const card = useRef<RapierRigidBody>(null);

	const vector = new THREE.Vector3();
	const angle = new THREE.Vector3();
	const rotation = new THREE.Vector3();
	const direction = new THREE.Vector3();

	const segmentProps: RigidBodyProps = {
		type: "dynamic",
		canSleep: true,
		colliders: false,
		angularDamping: 2,
		linearDamping: 2,
	};

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const { nodes, materials }: any = useGLTF(Tag);

	// 여러 점들을 부드럽게 연결하는 곡선 생성
	const [curve] = useState<THREE.CatmullRomCurve3>(
		() =>
			new THREE.CatmullRomCurve3([
				new THREE.Vector3(),
				new THREE.Vector3(),
				new THREE.Vector3(),
				new THREE.Vector3(),
			]),
	);

	const [dragged, drag] = useState<DragPosition | false>(false);
	const [hovered, hover] = useState(false);

	// 실제 줄이나 밧줄처럼 두 물체를 연결, 요요를 연결하는 줄이나, 강아지 목줄처럼 작동
	useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
	useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
	useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);

	// 한 물체가 다른 물체를 중심으로 모든 방향으로 회전, 어깨 관절이나 자동차 서스펜션 같은 움직임
	useSphericalJoint(j3, card, [
		[0, 0, 0],
		[0, 1.45, 0],
	]);

	useEffect(() => {
		if (hovered) {
			document.body.style.cursor = dragged ? "grabbing" : "grab";
			return () => {
				document.body.style.cursor = "auto";
			};
		}
	}, [hovered, dragged]);

	useFrame((state) => {
		// 드래그할 때 카드의 위치 계산
		if (dragged) {
			// 마우스 포인터의 2D 좌표를 3D 공간 좌표로 변환
			vector.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera); // unproject: 화면의 2D 좌표를 3D 공간 좌표로 변환
			// 카메라에서 마우스 포인터 위치까지의 방향 계산
			direction.copy(vector).sub(state.camera.position).normalize(); // normalize: 벡터의 길이를 1로 만들어 순수한 방향만 남김
			// 실제 3D 공간에서의 위치 계산
			vector.add(direction.multiplyScalar(state.camera.position.length())); // multiplyScalar: 벡터에 숫자를 곱함

			for (const ref of [card, j1, j2, j3, fixed]) {
				ref.current?.wakeUp(); // wakeUp: 잠자는 물리 객체를 깨우는 역할
			}

			// 카드의 새로운 위치 설정
			card.current?.setNextKinematicTranslation({
				x: vector.x - dragged.x,
				y: vector.y - dragged.y,
				z: vector.z - dragged.z,
			});
		}

		if (
			fixed.current &&
			j3.current &&
			j2.current &&
			j1.current &&
			card.current &&
			band.current
		) {
			// j3, j2, j1, fixed의 현재 위치(translation)를 곡선의 점으로 사용
			curve.points[0]?.copy(j3.current.translation());
			curve.points[1]?.copy(j2.current.translation());
			curve.points[2]?.copy(j1.current.translation());
			curve.points[3]?.copy(fixed.current.translation());
			// 곡선 위의 32개 점 얻기
			(band.current.geometry as MeshLineGeometry).setPoints(
				curve.getPoints(32),
			);

			// 카드가 계속 회전하지 않고 안정화하는 역할
			angle.copy(card.current.angvel()); // angvel: 현재 회전 속도
			rotation.copy(card.current.rotation()); // rotation: 현재 회전 각도
			card.current.setAngvel(
				{ x: angle.x, y: angle.y - rotation.y * 0.25, z: angle.z },
				true,
			);
		}
	});

	curve.curveType = "catmullrom";
	curve.tension = 0.5; // tension 값을 추가하여 곡선의 부드러움을 조절할 수 있습니다

	const bandTexture = useTexture(FabicBand) as THREE.Texture; // 직물 질감 텍스처

	return (
		<>
			<group position={[0, 4, 0]}>
				<RigidBody ref={fixed} {...segmentProps} type="fixed" />
				<RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
					<BallCollider args={[0.1]} />
				</RigidBody>
				<RigidBody
					position={[1, 0, 0]}
					ref={j2}
					angularDamping={2}
					linearDamping={2}
				>
					<BallCollider args={[0.1]} />
				</RigidBody>
				<RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
					<BallCollider args={[0.1]} />
				</RigidBody>

				<RigidBody
					position={[2, 0, 0]}
					ref={card}
					{...segmentProps}
					type={dragged ? "kinematicPosition" : "dynamic"}
				>
					<CuboidCollider args={[0.8, 1.125, 0.01]} />
					<group
						scale={2.25}
						position={[0, -1.2, -0.05]}
						onPointerOver={() => hover(true)}
						onPointerOut={() => hover(false)}
						onPointerUp={(e: ThreeEvent<PointerEvent>) => {
							// @ts-ignore
							e.target.releasePointerCapture(e.pointerId);
							drag(false);
						}}
						onPointerDown={(e) => {
							if (!card.current) {
								return;
							}

							// @ts-ignore
							e.target.setPointerCapture(e.pointerId);

							drag(
								new THREE.Vector3()
									.copy(e.point)
									.sub(vector.copy(card.current.translation())),
							);
						}}
					>
						<mesh
							geometry={nodes.clip.geometry}
							material={materials.metal}
							material-roughness={0.3}
						/>
						<mesh geometry={nodes.clamp.geometry} material={materials.metal} />

						<mesh geometry={nodes.card.geometry}>
							<meshPhysicalMaterial
								color="#000000"
								clearcoat={1}
								clearcoatRoughness={0.15}
								roughness={0.3}
								metalness={0.5}
							/>
						</mesh>

						<mesh position={[0, 0.65, 0.01]}>
							<circleGeometry args={[0.2]} />
							<meshBasicMaterial
								map={src ? useTexture(src) : undefined}
								transparent
							/>
						</mesh>

						<Text
							position={[0, 0.325, 0.01]}
							fontSize={0.1}
							color="white"
							anchorX="center"
							anchorY="middle"
						>
							{mainText}
						</Text>
						<Text
							position={[0, 0.175, 0.01]}
							fontSize={0.05}
							color="#ffffff"
							anchorY="middle"
							anchorX="center"
						>
							{subText}
						</Text>
					</group>
				</RigidBody>
			</group>

			<mesh ref={band}>
				<meshLineGeometry />
				<meshLineMaterial
					lineWidth={1}
					color="black"
					depthTest={false}
					map={bandTexture}
					useMap={1}
					opacity={1}
				/>
			</mesh>
		</>
	);
}
