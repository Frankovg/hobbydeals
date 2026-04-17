import { Badge } from "./badge";

import type { Meta, StoryObj } from "@storybook/react-vite";


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
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Activo" },
};

export const Secondary: Story = {
  args: { children: "Pendiente", variant: "secondary" },
};

export const Destructive: Story = {
  args: { children: "Expirado", variant: "destructive" },
};

export const Outline: Story = {
  args: { children: "Etiqueta", variant: "outline" },
};

export const Discount: Story = {
  args: { children: "-45%", variant: "discount" },
};

// --- Temperature variants ---

export const Burning: Story = {
  args: { children: "342\u00b0", variant: "burning" },
};

export const Hot: Story = {
  args: { children: "180\u00b0", variant: "hot" },
};

export const Warm: Story = {
  args: { children: "75\u00b0", variant: "warm" },
};

export const Cold: Story = {
  args: { children: "-12\u00b0", variant: "cold" },
};

// --- Category variants ---

export const BoardGames: Story = {
  args: { children: "Juegos de Mesa", variant: "board-games" },
};

export const Gaming: Story = {
  args: { children: "Gaming", variant: "gaming" },
};

export const Collectibles: Story = {
  args: { children: "Coleccionismo", variant: "collectibles" },
};

export const Airsoft: Story = {
  args: { children: "Airsoft", variant: "airsoft" },
};

export const Music: Story = {
  args: { children: "M\u00fasica", variant: "music" },
};

export const Modeling: Story = {
  args: { children: "Modelismo", variant: "modeling" },
};

// --- Gallery stories ---

export const TemperatureVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="burning">342º</Badge>
      <Badge variant="hot">180º</Badge>
      <Badge variant="warm">75º</Badge>
      <Badge variant="cold">-12º</Badge>
    </div>
  ),
};

export const CategoryVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="board-games">Juegos de Mesa</Badge>
      <Badge variant="gaming">Gaming</Badge>
      <Badge variant="collectibles">Coleccionismo</Badge>
      <Badge variant="airsoft">Airsoft</Badge>
      <Badge variant="music">M\u00fasica</Badge>
      <Badge variant="modeling">Modelismo</Badge>
    </div>
  ),
};

export const SemanticVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>Activo</Badge>
      <Badge variant="secondary">Pendiente</Badge>
      <Badge variant="destructive">Expirado</Badge>
      <Badge variant="outline">Etiqueta</Badge>
      <Badge variant="discount">-45%</Badge>
    </div>
  ),
};
