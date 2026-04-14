import type { Meta, StoryObj } from "@storybook/react-vite";
import { Flame } from "lucide-react";

import { Button } from "./button";

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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Publicar oferta" },
};

export const Destructive: Story = {
  args: { children: "Eliminar", variant: "destructive" },
};

export const Outline: Story = {
  args: { children: "Cancelar", variant: "outline" },
};

export const Secondary: Story = {
  args: { children: "Guardar borrador", variant: "secondary" },
};

export const Ghost: Story = {
  args: { children: "Ver más", variant: "ghost" },
};

export const Link: Story = {
  args: { children: "Ir a la tienda", variant: "link" },
};

export const Small: Story = {
  args: { children: "Votar", size: "sm" },
};

export const Large: Story = {
  args: { children: "Crear cuenta", size: "lg" },
};

export const Icon: Story = {
  args: {
    size: "icon",
    children: <Flame className="size-4" />,
    "aria-label": "Hot",
  },
};

export const Disabled: Story = {
  args: { children: "No disponible", disabled: true },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};
