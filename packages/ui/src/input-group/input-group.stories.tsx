import {
  AtSign,
  Check,
  Copy,
  CreditCard,
  Info,
  Mail,
  Search,
  Send,
  Star,
} from "lucide-react";
import { expect, fn, userEvent } from "storybook/test";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/InputGroup",
  component: InputGroup,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput
        placeholder="Buscar chollos..."
        onChange={fn()}
      />
    </InputGroup>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText("Buscar chollos...");
    await expect(input).toBeInTheDocument();
    await userEvent.type(input, "LEGO");
    await expect(input).toHaveValue("LEGO");
  },
};

export const IconStart: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon>
        <Mail />
      </InputGroupAddon>
      <InputGroupInput
        type="email"
        placeholder="nombre@hobbydeals.es"
      />
    </InputGroup>
  ),
};

export const IconEnd: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput placeholder="Buscar chollos..." />
      <InputGroupAddon align="inline-end">
        <Search />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const TextPrefix: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon>
        <InputGroupText>€</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput type="number" placeholder="0,00" min={0} step={0.01} />
    </InputGroup>
  ),
};

export const TextSuffix: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput type="number" placeholder="0,00" min={0} step={0.01} />
      <InputGroupAddon align="inline-end">
        <InputGroupText>EUR</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const PrefixAndSuffix: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon>
        <AtSign />
      </InputGroupAddon>
      <InputGroupInput placeholder="usuario" defaultValue="franco" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>@hobbydeals.es</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithKbd: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput placeholder="Buscar chollos..." />
      <InputGroupAddon align="inline-end">
        <kbd className="inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span>⌘</span>K
        </kbd>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithButton: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon>
        <CreditCard />
      </InputGroupAddon>
      <InputGroupInput placeholder="https://tienda.es/producto..." />
      <InputGroupAddon align="inline-end">
        <InputGroupButton onClick={fn()}>Pegar</InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const ButtonIcon: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupInput
        readOnly
        defaultValue="https://hobbydeals.es/deal/lego-halcon-milenario"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          aria-label="Copiar enlace"
          onClick={fn()}
        >
          <Copy />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Textarea: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupTextarea
        placeholder="Describe el chollo..."
        rows={4}
      />
      <InputGroupAddon align="inline-end">
        <InputGroupButton
          size="icon-xs"
          aria-label="Enviar"
          variant="default"
          onClick={fn()}
        >
          <Send />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const BlockStart: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon align="block-start">
        <InputGroupText className="font-medium text-foreground">
          <Star className="text-warning" />
          Destaca tu chollo
        </InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea
        placeholder="Cuenta por qué merece la pena..."
        rows={4}
      />
    </InputGroup>
  ),
};

export const BlockEnd: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupTextarea
        placeholder="Describe el chollo..."
        rows={4}
      />
      <InputGroupAddon align="block-end" className="border-t">
        <InputGroupText>
          <Info />
          Soporta Markdown básico
        </InputGroupText>
        <InputGroupButton
          // className="ml-auto"
          variant="default"
          onClick={fn()}
        >
          Publicar
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
      <InputGroupInput placeholder="No disponible" disabled />
    </InputGroup>
  ),
  play: async ({ canvas }) => {
    const input = canvas.getByPlaceholderText("No disponible");
    await expect(input).toBeDisabled();
  },
};

export const Invalid: Story = {
  render: () => (
    <InputGroup className="w-80">
      <InputGroupAddon>
        <Mail />
      </InputGroupAddon>
      <InputGroupInput
        type="email"
        defaultValue="no-es-un-email"
        aria-invalid
      />
    </InputGroup>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-1.5">
      <label
        htmlFor="deal-price"
        className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
      >
        Precio
      </label>
      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>€</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          id="deal-price"
          type="number"
          placeholder="0,00"
          min={0}
          step={0.01}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupText>EUR</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-1.5">
      <label
        htmlFor="error-url"
        className="text-xs font-semibold tracking-wider text-text-secondary uppercase"
      >
        URL del chollo
      </label>
      <InputGroup>
        <InputGroupAddon>
          <CreditCard />
        </InputGroupAddon>
        <InputGroupInput
          id="error-url"
          defaultValue="no-es-una-url"
          aria-invalid
          aria-describedby="error-url-msg"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            size="icon-xs"
            aria-label="Validar URL"
            onClick={fn()}
          >
            <Check />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <p id="error-url-msg" className="text-xs text-error">
        La URL debe apuntar a una tienda válida
      </p>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid w-80 gap-5">
      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Icono al inicio" />
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Icono al final" />
        <InputGroupAddon align="inline-end">
          <Search />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <InputGroupText>€</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput type="number" placeholder="Precio" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>EUR</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Con atajo de teclado" />
        <InputGroupAddon align="inline-end">
          <kbd className="inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span>⌘</span>K
          </kbd>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Con botón al final" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton onClick={fn()}>Pegar</InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Mail />
        </InputGroupAddon>
        <InputGroupInput
          type="email"
          defaultValue="invalid-email"
          aria-invalid
        />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupInput placeholder="Disabled" disabled />
      </InputGroup>
    </div>
  ),
};
