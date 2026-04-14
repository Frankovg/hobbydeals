import { View } from "react-native";

import { Text } from "./text";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Text",
  component: Text,
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "h1",
        "h2",
        "h3",
        "h4",
        "p",
        "blockquote",
        "code",
        "lead",
        "large",
        "small",
        "muted",
      ],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Texto base del sistema de dise\u00f1o" },
};

export const Heading1: Story = {
  args: { variant: "h1", children: "HobbyDeals" },
};

export const Heading2: Story = {
  args: { variant: "h2", children: "Ofertas destacadas" },
};

export const Heading3: Story = {
  args: { variant: "h3", children: "Juegos de Mesa" },
};

export const Heading4: Story = {
  args: { variant: "h4", children: "Catan — Edici\u00f3n Limitada" },
};

export const Paragraph: Story = {
  args: {
    variant: "p",
    children:
      "Encontr\u00e1 las mejores ofertas en tus hobbies favoritos. Compart\u00ed deals, vot\u00e1 los mejores y recib\u00ed alertas personalizadas.",
  },
};

export const Blockquote: Story = {
  args: {
    variant: "blockquote",
    children: "La mejor oferta que vi en a\u00f1os para este juego.",
  },
};

export const Code: Story = {
  args: { variant: "code", children: "getDeals({ category: 'gaming' })" },
};

export const Lead: Story = {
  args: {
    variant: "lead",
    children: "La comunidad de ofertas para hobbies m\u00e1s grande.",
  },
};

export const Large: Story = {
  args: { variant: "large", children: "29,99\u20ac" },
};

export const Small: Story = {
  args: { variant: "small", children: "Publicado hace 3 horas" },
};

export const Muted: Story = {
  args: { variant: "muted", children: "Sin ofertas disponibles" },
};

export const AllVariants: Story = {
  render: () => (
    <View style={{ gap: 12, maxWidth: 600 }}>
      <Text variant="h1">Heading 1</Text>
      <Text variant="h2">Heading 2</Text>
      <Text variant="h3">Heading 3</Text>
      <Text variant="h4">Heading 4</Text>
      <Text variant="p">
        P\u00e1rrafo de texto con contenido de ejemplo para mostrar el estilo.
      </Text>
      <Text variant="blockquote">Blockquote con una cita.</Text>
      <Text variant="code">inline code</Text>
      <Text variant="lead">Lead text</Text>
      <Text variant="large">Large text</Text>
      <Text variant="small">Small text</Text>
      <Text variant="muted">Muted text</Text>
    </View>
  ),
};
