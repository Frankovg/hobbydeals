import { Search } from "lucide-react";
import { expect, fn, userEvent } from "storybook/test";

import { Input } from "./input";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "search", "number", "tel", "url"],
    },
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Buscar chollos...", onChange: fn() },
  play: async ({ args, canvas }) => {
    const input = canvas.getByPlaceholderText("Buscar chollos...");
    await expect(input).toBeInTheDocument();
    await userEvent.type(input, "LEGO");
    await expect(args.onChange).toHaveBeenCalled();
    await expect(input).toHaveValue("LEGO");
  },
};

export const WithValue: Story = {
  args: { defaultValue: "Nintendo Switch OLED", placeholder: "Título" },
};

export const Email: Story = {
  args: { type: "email", placeholder: "nombre@hobbydeals.es" },
};

export const Password: Story = {
  args: { type: "password", defaultValue: "supersecret" },
};

export const Number: Story = {
  args: { type: "number", placeholder: "0.00", min: 0, step: 0.01 },
};

export const Disabled: Story = {
  args: { placeholder: "No disponible", disabled: true },
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText("No disponible");
    await expect(input).toBeDisabled();
  },
};

export const Invalid: Story = {
  args: {
    placeholder: "Invalid input",
    defaultValue: "no-es-un-email",
    "aria-invalid": true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-1.5">
      <label
        htmlFor="title"
        className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
      >
        Title
      </label>
      <Input
        id="title"
        placeholder="Ej. LEGO Star Wars Halcón Milenario"
      />
    </div>
  ),
};

export const SearchField: Story = {
  render: () => (
    <div className="relative w-80">
      <Search
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-text-tertiary"
      />
      <Input
        type="search"
        placeholder="Buscar chollos..."
        className="pl-10"
      />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-1.5">
      <label
        htmlFor="error-email"
        className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
      >
        Error state
      </label>
      <Input
        id="error-email"
        defaultValue="Invalid input"
        aria-invalid
        aria-describedby="error-email-msg"
      />
      <p id="error-email-msg" className="text-xs text-error">
        This field is required
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
        <Input id="all-label" placeholder="Placeholder text..." />
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-semibold tracking-wider text-text-secondary uppercase">
          Search
        </span>
        <div className="relative">
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-text-tertiary"
          />
          <Input
            type="search"
            placeholder="Buscar chollos..."
            className="pl-10"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="all-error"
          className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
        >
          Error state
        </label>
        <Input
          id="all-error"
          defaultValue="Invalid input"
          aria-invalid
          aria-describedby="all-error-msg"
        />
        <p id="all-error-msg" className="text-xs text-error">
          This field is required
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="all-disabled"
          className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
        >
          Disabled
        </label>
        <Input id="all-disabled" placeholder="No disponible" disabled />
      </div>
    </div>
  ),
};
