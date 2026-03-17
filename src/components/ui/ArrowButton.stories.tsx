import type { Meta, StoryObj } from "@storybook/react-vite";
import { ArrowButton } from "./ArrowButton";

const meta: Meta<typeof ArrowButton> = {
  title: "UI/ArrowButton",
  component: ArrowButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    direction: {
      control: "radio",
      options: ["left", "right"],
      description: "Direction the arrow points",
    },
    state: {
      control: "select",
      options: ["default", "hover", "disabled"],
      description: "Visual state of the button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArrowButton>;

// --- Direction ---

export const Default: Story = {
  name: "Right Arrow (default)",
  args: {
    direction: "right",
    state: "default",
  },
};

export const LeftArrow: Story = {
  name: "Left Arrow",
  args: {
    direction: "left",
    state: "default",
  },
};

// --- States ---

export const HoverState: Story = {
  name: "Hover State",
  args: {
    direction: "right",
    state: "hover",
  },
};

export const DisabledState: Story = {
  name: "Disabled State",
  args: {
    direction: "right",
    state: "disabled",
  },
};

export const DisabledLeft: Story = {
  name: "Disabled — Left",
  args: {
    direction: "left",
    state: "disabled",
  },
};

// --- Navigation pair overview ---

export const NavigationPair: Story = {
  name: "Navigation Pair",
  render: () => (
    <div className="flex items-center gap-4">
      <ArrowButton direction="left" state="default" aria-label="Previous" />
      <ArrowButton direction="right" state="default" aria-label="Next" />
    </div>
  ),
};

export const AllStates: Story = {
  name: "All States",
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm font-medium text-[var(--color-charcoal)]">
          Default
        </span>
        <ArrowButton direction="right" state="default" />
        <ArrowButton direction="left" state="default" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm font-medium text-[var(--color-charcoal)]">
          Hover
        </span>
        <ArrowButton direction="right" state="hover" />
        <ArrowButton direction="left" state="hover" />
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-sm font-medium text-[var(--color-charcoal)]">
          Disabled
        </span>
        <ArrowButton direction="right" state="disabled" />
        <ArrowButton direction="left" state="disabled" />
      </div>
    </div>
  ),
};
