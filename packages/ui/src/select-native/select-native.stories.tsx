import { expect, fn, userEvent } from "storybook/test";

import { SelectNative, type SelectNativeItem } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/SelectNative",
  component: SelectNative,
  argTypes: {
    disabled: { control: "boolean" },
    "aria-invalid": { control: "boolean" },
  },
} satisfies Meta<typeof SelectNative>;

export default meta;
type Story = StoryObj<typeof meta>;

const categoryOptions: SelectNativeItem[] = [
  { value: "board-games", label: "Juegos de Mesa" },
  { value: "gaming", label: "Gaming" },
  { value: "collectibles", label: "Coleccionismo" },
  { value: "airsoft", label: "Airsoft" },
  { value: "music", label: "Música" },
  { value: "modeling", label: "Modelismo" },
];

const hobbyGroups: SelectNativeItem[] = [
  {
    label: "Juegos",
    options: [
      { value: "board-games", label: "Juegos de Mesa" },
      { value: "gaming", label: "Gaming" },
    ],
  },
  {
    label: "Creativos",
    options: [
      { value: "music", label: "Música" },
      { value: "modeling", label: "Modelismo" },
    ],
  },
  {
    label: "Otros",
    options: [
      { value: "collectibles", label: "Coleccionismo" },
      { value: "airsoft", label: "Airsoft" },
    ],
  },
];

export const Default: Story = {
  args: {
    defaultValue: "",
    placeholder: "Selecciona una categoría",
    options: categoryOptions,
    onChange: fn(),
    className: "w-80",
  },
  play: async ({ args, canvas }) => {
    const select = canvas.getByRole("combobox");
    await expect(select).toBeInTheDocument();
    await userEvent.selectOptions(select, "gaming");
    await expect(args.onChange).toHaveBeenCalled();
    await expect(select).toHaveValue("gaming");
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "board-games",
    placeholder: "Selecciona una categoría",
    options: categoryOptions,
    className: "w-80",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "",
    disabled: true,
    placeholder: "Selecciona una categoría",
    options: categoryOptions,
    className: "w-80",
  },
  play: async ({ canvas }) => {
    const select = canvas.getByRole("combobox");
    await expect(select).toBeDisabled();
  },
};

export const Invalid: Story = {
  args: {
    defaultValue: "",
    "aria-invalid": true,
    placeholder: "Selecciona una categoría",
    options: categoryOptions,
    className: "w-80",
  },
};

export const WithLabel: Story = {
  args: {
    id: "category",
    label: "Category",
    defaultValue: "",
    placeholder: "Selecciona una categoría",
    options: categoryOptions,
    className: "w-80",
  },
};

export const WithOptGroup: Story = {
  args: {
    id: "hobby",
    label: "Hobby",
    defaultValue: "",
    placeholder: "Selecciona un hobby",
    options: hobbyGroups,
    className: "w-80",
  },
};

export const ErrorState: Story = {
  args: {
    id: "error-category",
    label: "Error state",
    defaultValue: "",
    placeholder: "Selecciona una categoría",
    options: categoryOptions,
    error: "Tenés que elegir una categoría",
    className: "w-80",
  },
};

export const AllStates: Story = {
  args: { options: [] },
  render: () => (
    <div className="grid w-104 gap-5">
      <SelectNative
        id="all-label"
        label="Label"
        defaultValue=""
        placeholder="Selecciona una categoría"
        options={categoryOptions}
      />
      <SelectNative
        id="all-value"
        label="With value"
        defaultValue="gaming"
        placeholder="Selecciona una categoría"
        options={categoryOptions}
      />
      <SelectNative
        id="all-error"
        label="Error state"
        defaultValue=""
        placeholder="Selecciona una categoría"
        options={categoryOptions}
        error="Tenés que elegir una categoría"
      />
      <SelectNative
        id="all-disabled"
        label="Disabled"
        defaultValue=""
        disabled
        placeholder="Selecciona una categoría"
        options={categoryOptions}
      />
    </div>
  ),
};
