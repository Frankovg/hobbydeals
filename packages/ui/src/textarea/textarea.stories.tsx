import { expect, fn, userEvent } from "storybook/test";

import { Textarea } from "./textarea";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  argTypes: {
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
    rows: { control: "number" },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Describe el chollo...", onChange: fn(), className: "w-80" },
  play: async ({ args, canvas }) => {
    const textarea = canvas.getByPlaceholderText("Describe el chollo...");
    await expect(textarea).toBeInTheDocument();
    await userEvent.type(textarea, "LEGO Star Wars en oferta");
    await expect(args.onChange).toHaveBeenCalled();
    await expect(textarea).toHaveValue("LEGO Star Wars en oferta");
  },
};

export const WithValue: Story = {
  args: {
    defaultValue:
      "Nintendo Switch OLED con 2 juegos incluidos. Incluye Mario Kart 8 Deluxe y Zelda: Tears of the Kingdom.",
    placeholder: "Descripción",
    className: "w-80",
  },
};

export const Disabled: Story = {
  args: { placeholder: "No disponible", disabled: true, className: "w-80" },
  play: async ({ canvas }) => {
    const textarea = canvas.getByPlaceholderText("No disponible");
    await expect(textarea).toBeDisabled();
  },
};

export const Invalid: Story = {
  args: {
    placeholder: "Invalid textarea",
    defaultValue: "Texto demasiado corto",
    "aria-invalid": true,
    className: "w-80",
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-1.5">
      <label
        htmlFor="description"
        className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
      >
        Description
      </label>
      <Textarea
        id="description"
        placeholder="Ej. LEGO Star Wars Halcón Milenario con descuento exclusivo..."
        rows={4}
      />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-1.5">
      <label
        htmlFor="error-description"
        className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
      >
        Error state
      </label>
      <Textarea
        id="error-description"
        defaultValue="Texto demasiado corto"
        aria-invalid
        aria-describedby="error-description-msg"
        rows={4}
      />
      <p id="error-description-msg" className="text-xs text-error">
        La descripción debe tener al menos 20 caracteres
      </p>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="grid w-104 gap-5">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="all-label"
          className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
        >
          Label
        </label>
        <Textarea
          id="all-label"
          placeholder="Placeholder text..."
          rows={4}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="all-value"
          className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
        >
          With value
        </label>
        <Textarea
          id="all-value"
          defaultValue="Nintendo Switch OLED con 2 juegos incluidos."
          rows={4}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="all-error"
          className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
        >
          Error state
        </label>
        <Textarea
          id="all-error"
          defaultValue="Texto demasiado corto"
          aria-invalid
          aria-describedby="all-error-msg"
          rows={4}
        />
        <p id="all-error-msg" className="text-xs text-error">
          La descripción debe tener al menos 20 caracteres
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="all-disabled"
          className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
        >
          Disabled
        </label>
        <Textarea
          id="all-disabled"
          placeholder="No disponible"
          disabled
          rows={4}
        />
      </div>
    </div>
  ),
};
