import { expect } from "storybook/test";

import avatar1 from "./assets/avatar-1.jpg";
import avatar2 from "./assets/avatar-2.jpg";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "./avatar";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: "default" },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>FA</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("FA")).toBeInTheDocument();
  },
};

export const Small: Story = {
  args: { size: "sm" },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>SM</AvatarFallback>
    </Avatar>
  ),
};

export const Large: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>LG</AvatarFallback>
    </Avatar>
  ),
};

export const WithImage: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage alt="Franco Amoroso" src={avatar1} />
      <AvatarFallback>FA</AvatarFallback>
    </Avatar>
  ),
};

export const ImageFallback: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage alt="" src="https://invalid.example/avatar.png" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvas }) => {
    await expect(await canvas.findByText("JD")).toBeInTheDocument();
  },
};

export const AccentColor: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback className="bg-brand-primary ">FA</AvatarFallback>
    </Avatar>
  ),
};

export const CategoryColor: Story = {
  args: { size: "default" },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback className="bg-cat-boardgames">MC</AvatarFallback>
    </Avatar>
  ),
};

export const WithBadge: Story = {
  args: { size: "lg" },
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage alt="John Doe" src={avatar2} />
      <AvatarFallback>JD</AvatarFallback>
      <AvatarBadge className="bg-success" />
    </Avatar>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("SM")).toBeInTheDocument();
    await expect(canvas.getByText("MD")).toBeInTheDocument();
    await expect(canvas.getByText("LG")).toBeInTheDocument();
  },
};

export const AccentColors: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="sm">
        <AvatarFallback className="bg-info">M</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-brand-secondary">JD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback className="bg-brand-primary">FA</AvatarFallback>
      </Avatar>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback className="bg-brand-primary">FA</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-brand-secondary">JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-info">M</AvatarFallback>
      </Avatar>
    </AvatarGroup>
  ),
};

export const GroupWithCount: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback className="bg-brand-primary text-white">FA</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-brand-secondary text-white">JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback className="bg-info text-white">M</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("+3")).toBeInTheDocument();
  },
};

export const GroupSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <AvatarGroup>
        <Avatar size="sm">
          <AvatarFallback className="bg-brand-primary">A</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback className="bg-brand-secondary">B</AvatarFallback>
        </Avatar>
        <Avatar size="sm">
          <AvatarFallback className="bg-info">C</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+5</AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup>
        <Avatar>
          <AvatarFallback className="bg-brand-primary">A</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-brand-secondary">B</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback className="bg-info">C</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+5</AvatarGroupCount>
      </AvatarGroup>
      <AvatarGroup>
        <Avatar size="lg">
          <AvatarFallback className="bg-brand-primary">A</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback className="bg-brand-secondary">B</AvatarFallback>
        </Avatar>
        <Avatar size="lg">
          <AvatarFallback className="bg-info">C</AvatarFallback>
        </Avatar>
        <AvatarGroupCount>+5</AvatarGroupCount>
      </AvatarGroup>
    </div>
  ),
};
