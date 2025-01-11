import type { Meta, StoryObj } from "@storybook/react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Loader } from "./Loader";

const meta: Meta<typeof Loader> = {
	title: "Components/Loader",
	component: Loader,
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
	args: {},
	decorators: [
		(Story) => (
			<Canvas>
				<Story />
				<OrbitControls />
				<ambientLight intensity={0.1} />
				<directionalLight position={[0, 1, -8]} intensity={0.4} />
				<directionalLight position={[1, 2, 8]} intensity={0.4} />
			</Canvas>
		),
	],
};
