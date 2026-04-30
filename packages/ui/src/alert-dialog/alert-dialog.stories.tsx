import { Trash2 } from "lucide-react";
import * as React from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogHeaderText,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
} from ".";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/AlertDialog",
  component: AlertDialog,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    title: { control: "text" },
    description: { control: "text" },
    actionLabel: { control: "text" },
    cancelLabel: { control: "text" },
    tone: {
      control: "select",
      options: ["default", "destructive"],
    },
    size: {
      control: "select",
      options: ["sm", "default"],
    },
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const openDialog = async (canvas: ReturnType<typeof within>) => {
  const trigger = await canvas.findByRole("button", { name: /abrir/i });
  await userEvent.click(trigger);
  return within(document.body);
};

export const Default: Story = {
  args: {
    title: "¿Eliminar oferta?",
    description: "Esta acción no se puede deshacer.",
    actionLabel: "Eliminar",
    cancelLabel: "Cancelar",
    trigger: <Button>Abrir dialog</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const portal = await openDialog(canvas);

    const dialog = await waitFor(() => {
      const node = document.querySelector('[data-slot="alert-dialog-content"]');
      if (!node) throw new Error("dialog not open");
      return node;
    });
    await expect(dialog).toHaveAttribute("data-size", "sm");
    await expect(
      portal.getByText("¿Eliminar oferta?")
    ).toBeInTheDocument();
    await expect(
      portal.getByText("Esta acción no se puede deshacer.")
    ).toBeInTheDocument();

    const action = portal.getByRole("button", { name: "Eliminar" });
    await expect(action).toHaveAttribute("data-slot", "alert-dialog-action");
    await expect(action).toHaveAttribute("data-tone", "default");

    const cancel = portal.getByRole("button", { name: "Cancelar" });
    await expect(cancel).toHaveAttribute("data-slot", "alert-dialog-cancel");
  },
};

export const Destructive: Story = {
  args: {
    title: "Borrar cuenta",
    description:
      "Vas a perder todas tus ofertas, alertas y mensajes. No hay vuelta atrás.",
    actionLabel: "Borrar cuenta",
    cancelLabel: "Mejor no",
    tone: "destructive",
    trigger: <Button variant="destructive">Abrir dialog</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const portal = await openDialog(canvas);

    const action = await portal.findByRole("button", {
      name: "Borrar cuenta",
    });
    await expect(action).toHaveAttribute("data-tone", "destructive");
  },
};

export const WithMedia: Story = {
  args: {
    title: "¿Eliminar oferta?",
    description: "Esta acción no se puede deshacer.",
    actionLabel: "Eliminar",
    cancelLabel: "Cancelar",
    tone: "destructive",
    media: <Trash2 aria-hidden="true" />,
    trigger: <Button>Abrir dialog</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openDialog(canvas);

    const media = await waitFor(() => {
      const node = document.querySelector('[data-slot="alert-dialog-media"]');
      if (!node) throw new Error("media not rendered");
      return node;
    });
    await expect(media).not.toBeNull();
  },
};

export const SizeDefault: Story = {
  args: {
    title: "Configurá tus alertas",
    description:
      "Vas a recibir notificaciones cuando aparezca una oferta que coincida con tus filtros guardados.",
    actionLabel: "Activar",
    cancelLabel: "Cancelar",
    size: "default",
    trigger: <Button>Abrir dialog</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await openDialog(canvas);

    const dialog = await waitFor(() => {
      const node = document.querySelector('[data-slot="alert-dialog-content"]');
      if (!node) throw new Error("dialog not open");
      return node;
    });
    await expect(dialog).toHaveAttribute("data-size", "default");
  },
};

export const Controlled: Story = {
  args: {
    title: "Confirmar",
    description: "Controlado desde el padre.",
    actionLabel: "Sí",
    cancelLabel: "No",
  },
  render: (args) => {
    const ControlledDialog = () => {
      const [open, setOpen] = React.useState(false);
      return (
        <>
          <Button onClick={() => setOpen(true)}>Abrir dialog</Button>
          <AlertDialog
            {...args}
            open={open}
            onOpenChange={setOpen}
            onAction={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        </>
      );
    };
    return <ControlledDialog />;
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const portal = await openDialog(canvas);

    const action = await portal.findByRole("button", { name: "Sí" });
    await userEvent.click(action);

    await waitFor(() => {
      const node = document.querySelector('[data-slot="alert-dialog-content"]');
      if (node) throw new Error("dialog should be closed");
    });
  },
};

export const CustomChildren: Story = {
  args: {
    title: "ignored",
    trigger: <Button>Abrir dialog</Button>,
  },
  render: () => (
    <AlertDialogRoot>
      <AlertDialogTrigger asChild>
        <Button>Abrir dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="default">
        <AlertDialogHeader>
          <AlertDialogHeaderText>
            <AlertDialogTitle>Bloque personalizado</AlertDialogTitle>
            <AlertDialogDescription>
              Cuando necesitás algo más que título + descripción + botones, podés
              componer las primitivas a mano.
            </AlertDialogDescription>
          </AlertDialogHeaderText>
        </AlertDialogHeader>
        <div className="rounded-md bg-bg-elevated p-3 text-xs text-foreground">
          Acá podés meter cualquier contenido extra: una lista, un input, un
          mini-form…
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cerrar</AlertDialogCancel>
          <AlertDialogAction>Ok</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const portal = await openDialog(canvas);

    await expect(
      await portal.findByText("Bloque personalizado")
    ).toBeInTheDocument();
    await expect(
      portal.getByText(/Cuando necesitás algo más/i)
    ).toBeInTheDocument();
  },
};
