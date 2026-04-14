import { View } from "react-native";

import { Text } from "../text/text";

import { Button } from "./button";

import type { Meta, StoryObj } from "@storybook/react-vite";

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
  render: (args) => (
    <Button {...args}>
      <Text>{args.label ?? "Button"}</Text>
    </Button>
  ),
} satisfies Meta<typeof Button> & { args?: { label?: string } };

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: "Publicar oferta" } as any,
};

export const Destructive: Story = {
  args: { variant: "destructive", label: "Eliminar" } as any,
};

export const Outline: Story = {
  args: { variant: "outline", label: "Cancelar" } as any,
};

export const Secondary: Story = {
  args: { variant: "secondary", label: "Guardar borrador" } as any,
};

export const Ghost: Story = {
  args: { variant: "ghost", label: "Ver m\u00e1s" } as any,
};

export const Link: Story = {
  args: { variant: "link", label: "Ir a la tienda" } as any,
};

export const Small: Story = {
  args: { size: "sm", label: "Votar" } as any,
};

export const Large: Story = {
  args: { size: "lg", label: "Crear cuenta" } as any,
};

export const Disabled: Story = {
  args: { disabled: true, label: "No disponible" } as any,
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
