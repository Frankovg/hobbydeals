import { expect, fn, userEvent, within } from "storybook/test";

import cardImage from "./assets/generated-1774547917617.png";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardRoot,
  CardTitle,
} from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Card",
  component: Card,
  decorators: [
    (Story) => (
      <div className="w-70">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    actionLabel: { control: "text" },
    image: { control: "text" },
    size: {
      control: "select",
      options: ["default", "sm"],
    },
    showImagePlaceholder: { control: "boolean" },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Oferta destacada",
    description: "PS5 DualSense Edge con descuento para la comunidad.",
    image: cardImage,
    imageAlt: "PS5 DualSense Edge",
    actionLabel: "Ver oferta",
  },
  play: async ({ canvas, canvasElement }) => {
    const root = canvasElement.querySelector('[data-slot="card"]');
    await expect(root).not.toBeNull();
    await expect(root).toHaveAttribute("data-size", "default");

    await expect(canvas.getByText("Oferta destacada")).toBeInTheDocument();
    await expect(
      canvas.getByText("PS5 DualSense Edge con descuento para la comunidad.")
    ).toBeInTheDocument();

    const img = canvasElement.querySelector('[data-slot="card-image"]');
    await expect(img).not.toBeNull();
    await expect(img).toHaveAttribute("alt", "PS5 DualSense Edge");

    await expect(
      canvas.getByRole("button", { name: "Ver oferta" })
    ).toBeInTheDocument();
  },
};

export const WithoutImage: Story = {
  args: {
    title: "Sin imagen",
    description: "Cuando no hay imagen y no se pide placeholder, no se renderiza nada arriba.",
    actionLabel: "Ver oferta",
  },
  play: async ({ canvasElement }) => {
    await expect(
      canvasElement.querySelector('[data-slot="card-image"]')
    ).toBeNull();
    await expect(
      canvasElement.querySelector('[data-slot="card-image-placeholder"]')
    ).toBeNull();
  },
};

export const ImagePlaceholder: Story = {
  args: {
    title: "Oferta destacada",
    description: "PS5 DualSense Edge con descuento para la comunidad.",
    showImagePlaceholder: true,
    actionLabel: "Ver oferta",
  },
  play: async ({ canvasElement }) => {
    await expect(
      canvasElement.querySelector('[data-slot="card-image"]')
    ).toBeNull();
    await expect(
      canvasElement.querySelector('[data-slot="card-image-placeholder"]')
    ).not.toBeNull();
  },
};

export const TitleOnly: Story = {
  args: {
    title: "Título solo",
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("Título solo")).toBeInTheDocument();
    await expect(
      canvasElement.querySelector('[data-slot="card-description"]')
    ).toBeNull();
    await expect(
      canvasElement.querySelector('[data-slot="card-footer"]')
    ).toBeNull();
  },
};

export const SizeSmall: Story = {
  args: {
    size: "sm",
    title: "Card chica",
    description: "Variante compacta con menos padding y gap.",
    image: cardImage,
    actionLabel: "Ir",
  },
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('[data-slot="card"]');
    await expect(root).toHaveAttribute("data-size", "sm");
  },
};

export const ClickAction: Story = {
  args: {
    title: "Oferta destacada",
    description: "Click en el botón dispara onAction.",
    image: cardImage,
    actionLabel: "Ver oferta",
    onAction: fn(),
  },
  play: async ({ canvas, args }) => {
    const button = canvas.getByRole("button", { name: "Ver oferta" });
    await userEvent.click(button);
    await expect(args.onAction).toHaveBeenCalledTimes(1);
  },
};

export const WithExtraContent: Story = {
  args: {
    title: "Oferta destacada",
    description: "PS5 DualSense Edge con descuento para la comunidad.",
    image: cardImage,
    content: "Stock limitado, expira en 24h.",
    actionLabel: "Ver oferta",
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(
      canvas.getByText("Stock limitado, expira en 24h.")
    ).toBeInTheDocument();
    await expect(
      canvasElement.querySelector('[data-slot="card-content"]')
    ).not.toBeNull();
  },
};

export const CustomFooter: Story = {
  args: {
    title: "Oferta destacada",
    description: "Footer personalizado en lugar de actionLabel.",
    image: cardImage,
    footer: (
      <div className="flex w-full items-center justify-between">
        <span className="text-xs text-text-secondary">Hace 2h</span>
        <button
          type="button"
          className="text-xs font-semibold text-brand-primary underline-offset-2 hover:underline"
        >
          Compartir
        </button>
      </div>
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Hace 2h")).toBeInTheDocument();
    await expect(
      canvas.getByRole("button", { name: "Compartir" })
    ).toBeInTheDocument();
  },
};

export const ForwardsRestProps: Story = {
  args: {
    title: "Card con props extra",
    className: "ring-1 ring-border-subtle",
    "data-testid": "card-root",
  } as Story["args"],
  play: async ({ canvasElement }) => {
    const root = canvasElement.querySelector('[data-testid="card-root"]');
    await expect(root).not.toBeNull();
    await expect(root).toHaveAttribute("data-slot", "card");
    await expect(root).toHaveClass("ring-1");
  },
};

export const ComposedPrimitives: Story = {
  args: { title: "ignored" },
  render: () => (
    <CardRoot>
      <CardImage src={cardImage} alt="Composición manual" />
      <CardHeader>
        <CardTitle>Composición manual</CardTitle>
        <CardDescription>
          Si necesitás algo distinto al layout estándar, usá las primitivas.
        </CardDescription>
      </CardHeader>
      <CardContent>
        Cualquier nodo va acá: listas, badges, mini-formularios.
      </CardContent>
      <CardFooter>
        <span className="text-xs text-text-secondary">2 acciones</span>
      </CardFooter>
    </CardRoot>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Composición manual")).toBeInTheDocument();
    await expect(canvas.getByText("2 acciones")).toBeInTheDocument();
    await expect(
      canvasElement.querySelector('[data-slot="card-image"]')
    ).not.toBeNull();
  },
};
