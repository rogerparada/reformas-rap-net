import z from "zod";

export const emailSchema = z.object({
	to: z.email(),
	subject: z.string(),
	message: z.string(),
	attachment: z.uuid(),
	idCliente: z.uuid(),
	cc: z.string().optional(),
	cco: z.string().optional(),
});

export type EmailInput = z.infer<typeof emailSchema>;
