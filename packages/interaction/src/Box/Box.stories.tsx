import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { Meta, StoryObj } from "@storybook/react";
import * as THREE from "three";
import { Box } from "./Box";

const meta: Meta<typeof Box> = {
	title: "Components/Box",
	component: Box,
};

export default meta;
type Story = StoryObj<typeof Box>;

export const Default: Story = {
	args: {
		position: [0, 0, 0],
	},
	decorators: [
		(Story) => (
			<Canvas
				shadows
				camera={{ position: new THREE.Vector3(2, 2, 2) }}
				style={{ background: "black" }}
			>
				<OrbitControls autoRotate />
				<axesHelper scale={10} />
				<ambientLight intensity={0.5} />
				<pointLight position={[1, 1, 1]} />
				<Story />
			</Canvas>
		),
	],
};
