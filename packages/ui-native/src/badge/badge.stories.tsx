import { View } from "react-native";
import { expect } from "storybook/test";

import { Text } from "../text/text";

import { Badge } from "./badge";

import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";

type BadgeArgs = ComponentProps<typeof Badge> & { label?: string };

const meta = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "secondary",
        "destructive",
        "outline",
        "burning",
        "hot",
        "warm",
        "cold",
        "discount",
        "board-games",
        "gaming",
        "collectibles",
        "airsoft",
        "music",
        "modeling",
      ],
    },
  },
  render: ({ label, ...args }) => (
    <Badge {...args}>
      <Text>{label ?? "Badge"}</Text>
    </Badge>
  ),
} satisfies Meta<BadgeArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Activo" },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Activo")).toBeInTheDocument();
  },
};

export const Secondary: Story = {
  args: { label: "Pendiente", variant: "secondary" },
};

export const Destructive: Story = {
  args: { label: "Expirado", variant: "destructive" },
};

export const Outline: Story = {
  args: { label: "Etiqueta", variant: "outline" },
};

export const Discount: Story = {
  args: { label: "-45%", variant: "discount" },
};

// --- Temperature variants ---

export const Burning: Story = {
  args: { label: "342\u00b0", variant: "burning" },
};

export const Hot: Story = {
  args: { label: "180\u00b0", variant: "hot" },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("180°")).toBeInTheDocument();
    const icon = (
      canvasElement as unknown as { querySelector: (s: string) => unknown }
    ).querySelector("svg");
    await expect(icon).not.toBeNull();
  },
};

export const Warm: Story = {
  args: { label: "75\u00b0", variant: "warm" },
};

export const Cold: Story = {
  args: { label: "-12\u00b0", variant: "cold" },
};

// --- Category variants ---

export const BoardGames: Story = {
  args: { label: "Juegos de Mesa", variant: "board-games" },
};

export const Gaming: Story = {
  args: { label: "Gaming", variant: "gaming" },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("Gaming")).toBeInTheDocument();
    const icon = (
      canvasElement as unknown as { querySelector: (s: string) => unknown }
    ).querySelector("svg");
    await expect(icon).not.toBeNull();
  },
};

export const Collectibles: Story = {
  args: { label: "Coleccionismo", variant: "collectibles" },
};

export const Airsoft: Story = {
  args: { label: "Airsoft", variant: "airsoft" },
};

export const Music: Story = {
  args: { label: "M\u00fasica", variant: "music" },
};

export const Modeling: Story = {
  args: { label: "Modelismo", variant: "modeling" },
};

// --- Gallery stories ---

export const TemperatureVariants: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Badge variant="burning">
        <Text>342º</Text>
      </Badge>
      <Badge variant="hot">
        <Text>180º</Text>
      </Badge>
      <Badge variant="warm">
        <Text>75º</Text>
      </Badge>
      <Badge variant="cold">
        <Text>-12º</Text>
      </Badge>
    </View>
  ),
};

export const CategoryVariants: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Badge variant="board-games">
        <Text>Juegos de Mesa</Text>
      </Badge>
      <Badge variant="gaming">
        <Text>Gaming</Text>
      </Badge>
      <Badge variant="collectibles">
        <Text>Coleccionismo</Text>
      </Badge>
      <Badge variant="airsoft">
        <Text>Airsoft</Text>
      </Badge>
      <Badge variant="music">
        <Text>Música</Text>
      </Badge>
      <Badge variant="modeling">
        <Text>Modelismo</Text>
      </Badge>
    </View>
  ),
};

export const SemanticVariants: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Badge>
        <Text>Activo</Text>
      </Badge>
      <Badge variant="secondary">
        <Text>Pendiente</Text>
      </Badge>
      <Badge variant="destructive">
        <Text>Expirado</Text>
      </Badge>
      <Badge variant="outline">
        <Text>Etiqueta</Text>
      </Badge>
      <Badge variant="discount">
        <Text>-45%</Text>
      </Badge>
    </View>
  ),
};
