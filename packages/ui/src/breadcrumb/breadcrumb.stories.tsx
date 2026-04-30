import { expect } from "storybook/test";

import { Breadcrumb } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: "Inicio", href: "/" },
      { label: "Juegos de Mesa", href: "/board-games" },
      { label: "Catan" },
    ],
  },
  play: async ({ canvas, canvasElement }) => {
    const nav = canvasElement.querySelector('[data-slot="breadcrumb"]');
    await expect(nav).toHaveAttribute("aria-label", "breadcrumb");

    await expect(canvas.getByRole("link", { name: "Inicio" })).toHaveAttribute(
      "href",
      "/"
    );
    await expect(
      canvas.getByRole("link", { name: "Juegos de Mesa" })
    ).toHaveAttribute("href", "/board-games");

    const page = canvas.getByText("Catan");
    await expect(page).toHaveAttribute("aria-current", "page");
    await expect(page).toHaveAttribute("aria-disabled", "true");

    const separators = canvasElement.querySelectorAll(
      '[data-slot="breadcrumb-separator"]'
    );
    await expect(separators).toHaveLength(2);
    await expect(separators[0]?.textContent).toBe("/");
  },
};

export const TwoLevels: Story = {
  args: {
    items: [
      { label: "Inicio", href: "/" },
      { label: "Gaming" },
    ],
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getAllByRole("link")).toHaveLength(1);
    await expect(canvas.getByText("Gaming")).toHaveAttribute(
      "aria-current",
      "page"
    );
    const separators = canvasElement.querySelectorAll(
      '[data-slot="breadcrumb-separator"]'
    );
    await expect(separators).toHaveLength(1);
  },
};

export const DealDetail: Story = {
  args: {
    items: [
      { label: "Inicio", href: "/" },
      { label: "Airsoft", href: "/airsoft" },
      { label: "Réplicas", href: "/airsoft/replicas" },
      { label: "G&G CM16 Raider 2.0E" },
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("link")).toHaveLength(3);
    await expect(canvas.getByText("G&G CM16 Raider 2.0E")).toHaveAttribute(
      "aria-current",
      "page"
    );
  },
};
