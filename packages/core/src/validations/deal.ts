import { z } from "zod";

export const createDealSchema = z.object({
  title: z
    .string()
    .min(5, "El título debe tener al menos 5 caracteres")
    .max(200, "El título no puede superar 200 caracteres"),
  description: z
    .string()
    .max(5000, "La descripción no puede superar 5000 caracteres")
    .optional(),
  url: z.string().url("La URL no es válida"),
  image_url: z.string().url("La URL de imagen no es válida").optional(),
  price: z
    .number()
    .positive("El precio debe ser mayor a 0")
    .max(99999999, "El precio es demasiado alto")
    .optional(),
  original_price: z
    .number()
    .positive("El precio original debe ser mayor a 0")
    .max(99999999, "El precio es demasiado alto")
    .optional(),
  currency: z.string().length(3).default("EUR"),
  category_id: z.string().uuid("Categoría inválida"),
  store_id: z.string().uuid("Tienda inválida").optional(),
  expires_at: z.string().datetime().optional(),
});

export type CreateDealInput = z.infer<typeof createDealSchema>;
