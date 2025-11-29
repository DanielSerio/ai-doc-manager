import type { Meta } from "@storybook/react";
import { AsyncButton } from "@/components/ui/async-button";
import { Save } from "lucide-react";

const meta = {
  component: AsyncButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    variant: "default",
    size: "default",
    children: 'Default Button',
    icon: <Save />
  },
} satisfies Meta<typeof AsyncButton>;

export default meta;

export const Default = {
  args: {},
};

export const Loading = {
  args: {
    isBusy: true,
  },
};

export const Outline = {
  args: {
    variant: "outline",
  },
};

export const Ghost = {
  args: {
    variant: "ghost",
  },
};