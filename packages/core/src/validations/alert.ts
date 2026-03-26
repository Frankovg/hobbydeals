import { z } from "zod";

export const createAlertSchema = z.object({
  keyword: z
    .string()
    .min(2, "La palabra clave debe tener al menos 2 caracteres")
    .max(100, "La palabra clave no puede superar 100 caracteres"),
  category_id: z.string().uuid("Categoría inválida").optional(),
  max_price: z
    .number()
    .positive("El precio máximo debe ser mayor a 0")
    .max(99999999, "El precio es demasiado alto")
    .optional(),
});

export type CreateAlertInput = z.infer<typeof createAlertSchema>;
