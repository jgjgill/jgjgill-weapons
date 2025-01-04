import type { Meta, StoryObj } from "@storybook/react";
import { Nameplate } from "./Nameplate";

const meta: Meta<typeof Nameplate> = {
	title: "Components/Nameplate",
	component: Nameplate,
};

export default meta;
type Story = StoryObj<typeof Nameplate>;

export const Default: Story = {
	args: { mainText: "jgjgill", subText: "Frontend Developer" },
	decorators: [(Story) => <Story />],
};
