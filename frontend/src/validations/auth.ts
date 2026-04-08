import z from "zod";

export const LoginFromSchema = z.object({
	username: z.string().min(4, "Usuario no valido"),
	password: z.string().min(8, "Contraseña no valida"),
});

export type LoginFormValues = z.infer<typeof LoginFromSchema>;
