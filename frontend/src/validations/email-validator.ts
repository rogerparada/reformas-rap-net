import z from "zod";

export const emailSchema = z.object({
	id: z.uuid().optional(),
	to: z.email(),
	subject: z.string().min(1, "El asunto es requerido"),
	message: z.string().min(1, "El mensaje es requerido"),
	attachment: z.uuid(),
	idCliente: z.uuid(),
	cc: z.string().optional(),
	cco: z.string().optional(),
});

export type EmailInput = z.infer<typeof emailSchema>;
