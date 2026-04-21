import { View } from "react-native";

import { Text } from "../text/text";

import { Button } from "./button";

import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";

type ButtonArgs = ComponentProps<typeof Button> & { label?: string };

const meta = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: { control: "boolean" },
  },
  render: ({ label, ...args }) => (
    <Button {...args}>
      <Text>{label ?? "Button"}</Text>
    </Button>
  ),
} satisfies Meta<ButtonArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Publicar oferta" },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    label: "Eliminar",
    disabled: false
  },
};

export const Outline: Story = {
  args: { variant: "outline", label: "Cancelar" },
};

export const Secondary: Story = {
  args: { variant: "secondary", label: "Guardar borrador" },
};

export const Ghost: Story = {
  args: { variant: "ghost", label: "Ver m\u00e1s" },
};

export const Link: Story = {
  args: { variant: "link", label: "Ir a la tienda" },
};

export const Small: Story = {
  args: { size: "sm", label: "Votar" },
};

export const Large: Story = {
  args: { size: "lg", label: "Crear cuenta" },
};

export const Disabled: Story = {
  args: { disabled: true, label: "No disponible" },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
      <Button>
        <Text>Default</Text>
      </Button>
      <Button variant="destructive">
        <Text>Destructive</Text>
      </Button>
      <Button variant="outline">
        <Text>Outline</Text>
      </Button>
      <Button variant="secondary">
        <Text>Secondary</Text>
      </Button>
      <Button variant="ghost">
        <Text>Ghost</Text>
      </Button>
      <Button variant="link">
        <Text>Link</Text>
      </Button>
    </View>
  ),
};
