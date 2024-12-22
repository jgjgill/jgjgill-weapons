import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import type { Meta, StoryObj } from "@storybook/react";
import { Dice } from "./Dice";

const meta: Meta<typeof Dice> = {
	title: "Components/Dice",
	component: Dice,
};

export default meta;
type Story = StoryObj<typeof Dice>;

export const Default: Story = {
	args: {
		onFinish: (value) => console.log(value),
	},
	decorators: [
		(Story) => (
			<Canvas shadows camera={{ position: [2, 2, 2] }}>
				<OrbitControls />
				<axesHelper scale={10} />
				<ambientLight intensity={0.5} />
				<pointLight position={[1, 1, 1]} />
				<Story />
			</Canvas>
		),
	],
};
