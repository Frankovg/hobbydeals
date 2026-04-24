import { expect, fn, userEvent } from "storybook/test";

import {
  SelectNative,
  SelectNativeOptGroup,
  SelectNativeOption,
} from "./select-native";

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

const categoryOptions = (
  <>
    <SelectNativeOption value="" disabled>
      Selecciona una categoría
    </SelectNativeOption>
    <SelectNativeOption value="board-games">Juegos de Mesa</SelectNativeOption>
    <SelectNativeOption value="gaming">Gaming</SelectNativeOption>
    <SelectNativeOption value="collectibles">Coleccionismo</SelectNativeOption>
    <SelectNativeOption value="airsoft">Airsoft</SelectNativeOption>
    <SelectNativeOption value="music">Música</SelectNativeOption>
    <SelectNativeOption value="modeling">Modelismo</SelectNativeOption>
  </>
);

export const Default: Story = {
  args: {
    defaultValue: "",
    onChange: fn(),
    className: "w-80",
    children: categoryOptions,
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
    className: "w-80",
    children: categoryOptions,
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "",
    disabled: true,
    className: "w-80",
    children: categoryOptions,
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
    className: "w-80",
    children: categoryOptions,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-1.5">
      <label
        htmlFor="category"
        className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
      >
        Category
      </label>
      <SelectNative id="category" defaultValue="">
        {categoryOptions}
      </SelectNative>
    </div>
  ),
};

export const WithOptGroup: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-1.5">
      <label
        htmlFor="hobby"
        className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
      >
        Hobby
      </label>
      <SelectNative id="hobby" defaultValue="">
        <SelectNativeOption value="" disabled>
          Selecciona un hobby
        </SelectNativeOption>
        <SelectNativeOptGroup label="Juegos">
          <SelectNativeOption value="board-games">
            Juegos de Mesa
          </SelectNativeOption>
          <SelectNativeOption value="gaming">Gaming</SelectNativeOption>
        </SelectNativeOptGroup>
        <SelectNativeOptGroup label="Creativos">
          <SelectNativeOption value="music">Música</SelectNativeOption>
          <SelectNativeOption value="modeling">Modelismo</SelectNativeOption>
        </SelectNativeOptGroup>
        <SelectNativeOptGroup label="Otros">
          <SelectNativeOption value="collectibles">
            Coleccionismo
          </SelectNativeOption>
          <SelectNativeOption value="airsoft">Airsoft</SelectNativeOption>
        </SelectNativeOptGroup>
      </SelectNative>
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-1.5">
      <label
        htmlFor="error-category"
        className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
      >
        Error state
      </label>
      <SelectNative
        id="error-category"
        defaultValue=""
        aria-invalid
        aria-describedby="error-category-msg"
      >
        {categoryOptions}
      </SelectNative>
      <p id="error-category-msg" className="text-xs text-error">
        Tenés que elegir una categoría
      </p>
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="grid w-[26rem] gap-5">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="all-label"
          className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
        >
          Label
        </label>
        <SelectNative id="all-label" defaultValue="">
          {categoryOptions}
        </SelectNative>
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="all-value"
          className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
        >
          With value
        </label>
        <SelectNative id="all-value" defaultValue="gaming">
          {categoryOptions}
        </SelectNative>
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="all-error"
          className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
        >
          Error state
        </label>
        <SelectNative
          id="all-error"
          defaultValue=""
          aria-invalid
          aria-describedby="all-error-msg"
        >
          {categoryOptions}
        </SelectNative>
        <p id="all-error-msg" className="text-xs text-error">
          Tenés que elegir una categoría
        </p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="all-disabled"
          className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
        >
          Disabled
        </label>
        <SelectNative id="all-disabled" defaultValue="" disabled>
          {categoryOptions}
        </SelectNative>
      </div>
    </div>
  ),
};
