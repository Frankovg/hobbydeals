import { expect } from "storybook/test";

import avatar1 from "./assets/avatar-1.jpg";
import avatar2 from "./assets/avatar-2.jpg";

import { Avatar, AvatarGroup } from ".";

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
    fallback: { control: "text" },
    src: { control: "text" },
    alt: { control: "text" },
    badge: { control: "boolean" },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { fallback: "FA" },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("FA")).toBeInTheDocument();
    const root = canvasElement.querySelector('[data-slot="avatar"]');
    await expect(root).not.toBeNull();
    await expect(root).toHaveAttribute("data-size", "default");
  },
};

export const Small: Story = {
  args: { size: "sm", fallback: "SM" },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("SM")).toBeInTheDocument();
    const root = canvasElement.querySelector('[data-slot="avatar"]');
    await expect(root).toHaveAttribute("data-size", "sm");
  },
};

export const Large: Story = {
  args: { size: "lg", fallback: "LG" },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("LG")).toBeInTheDocument();
    const root = canvasElement.querySelector('[data-slot="avatar"]');
    await expect(root).toHaveAttribute("data-size", "lg");
  },
};

export const WithImage: Story = {
  args: {
    size: "lg",
    fallback: "FA",
    alt: "Franco Amoroso",
    src: avatar1,
  },
  play: async ({ canvas }) => {
    const img = await canvas.findByAltText("Franco Amoroso");
    await expect(img).toBeInTheDocument();
    await expect(img).toHaveAttribute("data-slot", "avatar-image");
  },
};

export const ImageFallback: Story = {
  args: {
    size: "lg",
    fallback: "JD",
    src: "https://invalid.example/avatar.png",
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(await canvas.findByText("JD")).toBeInTheDocument();
    const img = canvasElement.querySelector('[data-slot="avatar-image"]');
    await expect(img).toBeNull();
  },
};

export const WithBadge: Story = {
  args: {
    size: "lg",
    fallback: "JD",
    alt: "John Doe",
    src: avatar2,
    badge: true,
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(await canvas.findByAltText("John Doe")).toBeInTheDocument();
    const badge = canvasElement.querySelector('[data-slot="avatar-badge"]');
    await expect(badge).not.toBeNull();
  },
};

export const Sizes: Story = {
  args: { fallback: "" },
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="sm" fallback="SM" />
      <Avatar fallback="MD" />
      <Avatar size="lg" fallback="LG" />
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("SM")).toBeInTheDocument();
    await expect(canvas.getByText("MD")).toBeInTheDocument();
    await expect(canvas.getByText("LG")).toBeInTheDocument();
    const roots = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(roots).toHaveLength(3);
    await expect(roots[0]).toHaveAttribute("data-size", "sm");
    await expect(roots[1]).toHaveAttribute("data-size", "default");
    await expect(roots[2]).toHaveAttribute("data-size", "lg");
  },
};

export const Group: Story = {
  args: { fallback: "" },
  render: () => (
    <AvatarGroup
      avatars={[
        { fallback: "FA" },
        { fallback: "JD" },
        { fallback: "MC" },
      ]}
    />
  ),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("FA")).toBeInTheDocument();
    await expect(canvas.getByText("JD")).toBeInTheDocument();
    await expect(canvas.getByText("MC")).toBeInTheDocument();
    const roots = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(roots).toHaveLength(3);
    const count = canvasElement.querySelector(
      '[data-slot="avatar-group-count"]'
    );
    await expect(count).toBeNull();
  },
};

export const GroupWithOverflow: Story = {
  args: { fallback: "" },
  render: () => (
    <AvatarGroup
      max={3}
      avatars={[
        { fallback: "FA" },
        { fallback: "JD" },
        { fallback: "MC", src: avatar1, alt: "MC" },
        { fallback: "AB" },
        { fallback: "CD" },
        { fallback: "EF" },
      ]}
    />
  ),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("+3")).toBeInTheDocument();
    await expect(canvas.queryByText("AB")).not.toBeInTheDocument();
    await expect(canvas.queryByText("CD")).not.toBeInTheDocument();
    await expect(canvas.queryByText("EF")).not.toBeInTheDocument();
    const roots = canvasElement.querySelectorAll('[data-slot="avatar"]');
    await expect(roots).toHaveLength(3);
  },
};

export const GroupSizes: Story = {
  args: { fallback: "" },
  render: () => {
    const avatars = [
      { fallback: "AB" },
      { fallback: "CD" },
      { fallback: "EF" },
      { fallback: "GH" },
      { fallback: "IJ" },
    ];
    return (
      <div className="flex flex-col gap-4">
        <AvatarGroup size="sm" max={3} avatars={avatars} />
        <AvatarGroup max={3} avatars={avatars} />
        <AvatarGroup size="lg" max={3} avatars={avatars} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const groups = canvasElement.querySelectorAll(
      '[data-slot="avatar-group"]'
    );
    await expect(groups).toHaveLength(3);
    const firstAvatars = groups[0]?.querySelectorAll('[data-slot="avatar"]');
    const secondAvatars = groups[1]?.querySelectorAll('[data-slot="avatar"]');
    const thirdAvatars = groups[2]?.querySelectorAll('[data-slot="avatar"]');
    await expect(firstAvatars?.[0]).toHaveAttribute("data-size", "sm");
    await expect(secondAvatars?.[0]).toHaveAttribute("data-size", "default");
    await expect(thirdAvatars?.[0]).toHaveAttribute("data-size", "lg");
  },
};
