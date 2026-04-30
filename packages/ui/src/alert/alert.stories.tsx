import { Bell } from "lucide-react";
import { expect } from "storybook/test";

import { Alert } from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Alert",
  component: Alert,
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "destructive", "warning", "info"],
    },
    title: { control: "text" },
    description: { control: "text" },
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Aviso",
    description: "Tenés un mensaje pendiente de revisión.",
  },
  play: async ({ canvas, canvasElement }) => {
    const alert = canvas.getByRole("alert");
    await expect(alert).toBeInTheDocument();
    await expect(alert).toHaveAttribute("data-slot", "alert");
    await expect(canvas.getByText("Aviso")).toBeInTheDocument();
    await expect(
      canvas.getByText("Tenés un mensaje pendiente de revisión.")
    ).toBeInTheDocument();
    // default variant has no icon
    await expect(canvasElement.querySelectorAll("svg")).toHaveLength(0);
    await expect(
      canvasElement.querySelector('[data-slot="alert-action"]')
    ).toBeNull();
  },
};

export const Success: Story = {
  args: {
    variant: "success",
    title: "Éxito",
    description: "Operación completada correctamente.",
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("Éxito")).toBeInTheDocument();
    await expect(
      canvasElement.querySelector("svg.lucide-circle-check")
    ).not.toBeNull();
    await expect(canvasElement.querySelectorAll("svg")).toHaveLength(1);
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    title: "Error al publicar",
    description: "No pudimos guardar tu oferta. Probá de nuevo en unos minutos.",
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("Error al publicar")).toBeInTheDocument();
    await expect(
      canvasElement.querySelector("svg.lucide-circle-x")
    ).not.toBeNull();
  },
};

export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Oferta por expirar",
    description: "Esta oferta vence en menos de 24 horas.",
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("Oferta por expirar")).toBeInTheDocument();
    await expect(
      canvasElement.querySelector("svg.lucide-triangle-alert")
    ).not.toBeNull();
  },
};

export const Info: Story = {
  args: {
    variant: "info",
    title: "Nueva categoría disponible",
    description: "Ya podés seguir ofertas de Modelismo desde tu feed.",
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(
      canvas.getByText("Nueva categoría disponible")
    ).toBeInTheDocument();
    await expect(
      canvasElement.querySelector("svg.lucide-info")
    ).not.toBeNull();
  },
};

export const TitleOnly: Story = {
  args: {
    variant: "success",
    title: "Cambios guardados",
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("Cambios guardados")).toBeInTheDocument();
    // description prop omitted -> no description slot rendered
    await expect(
      canvasElement.querySelector('[data-slot="alert-description"]')
    ).toBeNull();
    // action prop omitted -> no action slot rendered
    await expect(
      canvasElement.querySelector('[data-slot="alert-action"]')
    ).toBeNull();
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: "info",
    title: "Sin ícono",
    description: "Pasá icon={false} para ocultar el ícono por defecto.",
    icon: false,
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("Sin ícono")).toBeInTheDocument();
    // icon={false} suppresses the variant default icon
    await expect(canvasElement.querySelectorAll("svg")).toHaveLength(0);
  },
};

export const CustomIcon: Story = {
  args: {
    variant: "warning",
    title: "Ícono personalizado",
    description: "Pasá un ReactNode al prop `icon` para sobrescribir el default.",
    icon: <Bell />,
  },
  play: async ({ canvasElement }) => {
    // custom icon replaces the variant default
    await expect(
      canvasElement.querySelector("svg.lucide-bell")
    ).not.toBeNull();
    await expect(
      canvasElement.querySelector("svg.lucide-triangle-alert")
    ).toBeNull();
    await expect(canvasElement.querySelectorAll("svg")).toHaveLength(1);
  },
};

export const WithAction: Story = {
  args: {
    variant: "warning",
    title: "Sesión por expirar",
    description: "Vamos a cerrar tu sesión por inactividad en breve.",
    action: (
      <button
        type="button"
        className="text-[11px] font-semibold text-(--alert-accent) underline underline-offset-2"
      >
        Mantener sesión
      </button>
    ),
  },
  play: async ({ canvas, canvasElement }) => {
    const actionSlot = canvasElement.querySelector(
      '[data-slot="alert-action"]'
    );
    await expect(actionSlot).not.toBeNull();
    await expect(
      canvas.getByRole("button", { name: "Mantener sesión" })
    ).toBeInTheDocument();
  },
};

export const LongDescription: Story = {
  args: {
    variant: "destructive",
    title: "No se pudo cargar la imagen",
    description:
      "El servicio de scraping de Open Graph no devolvió una imagen válida para esta URL. Probá subiendo una manualmente desde el panel de publicación o verificá que el link apunte a la página de producto correcta.",
  },
};

export const ForwardsRestProps: Story = {
  args: {
    title: "Props extra",
    description: "El componente reenvía className y atributos HTML al root.",
    className: "custom-alert-class",
    "aria-label": "alerta-custom",
    "data-testid": "alert-root",
  } as Story["args"],
  play: async ({ canvas, canvasElement }) => {
    const alert = canvas.getByRole("alert");
    await expect(alert).toHaveClass("custom-alert-class");
    await expect(alert).toHaveAttribute("aria-label", "alerta-custom");
    await expect(
      canvasElement.querySelector('[data-testid="alert-root"]')
    ).toBe(alert);
  },
};

export const AllVariants: Story = {
  args: { title: "" },
  render: () => (
    <div className="flex flex-col gap-3">
      <Alert title="Default" description="Mensaje neutro sin connotación." />
      <Alert
        variant="success"
        title="Éxito"
        description="Operación completada correctamente."
      />
      <Alert
        variant="destructive"
        title="Error"
        description="Algo salió mal, probá de nuevo."
      />
      <Alert
        variant="warning"
        title="Atención"
        description="Revisá esto antes de continuar."
      />
      <Alert
        variant="info"
        title="Información"
        description="Tip útil para que aproveches mejor."
      />
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getAllByRole("alert")).toHaveLength(5);
    // 4 non-default variants render an icon, default does not
    await expect(canvasElement.querySelectorAll("svg")).toHaveLength(4);
  },
};
