import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("El email no es válido"),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número"),
  username: z
    .string()
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(30, "El usuario no puede superar 30 caracteres")
    .regex(/^[a-zA-Z0-9_-]+$/, "Solo letras, números, guiones y guiones bajos"),
  display_name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede superar 50 caracteres")
    .optional(),
});

export const loginSchema = z.object({
  email: z.string().email("El email no es válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
