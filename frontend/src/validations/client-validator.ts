import { z } from "zod";

const phoneRegex = /^[0-9+\s()-]{7,20}$/;
const nifRegex = /^([0-9]{8}[A-Za-z]|[XYZxyz][0-9]{7}[A-Za-z])$/;

export const clientSchema = z.object({
	name: z.string().trim().min(1, { message: "El nombre es obligatorio" }).max(100, { message: "El nombre es demasiado largo" }),

	email: z.string().trim().min(1, { message: "El email es obligatorio" }).email({ message: "Email inválido" }),

	phone: z
		.string()
		.min(1, { message: "El teléfono es obligatorio" })
		.trim()
		.refine(
			(val) => {
				if (!val) return true; // opcional
				return phoneRegex.test(val);
			},
			{ message: "Teléfono inválido" }
		),

	address: z.string().min(1, { message: "La dirección es obligatoria" }).trim().max(200, { message: "La dirección es demasiado larga" }),

	city: z.string().min(1, { message: "La cuidad es obligatoria" }).trim().max(100, { message: "La ciudad es demasiado larga" }),

	nif: z
		.string()
		.trim()
		.optional()
		.refine(
			(val) => {
				if (!val) return true; // opcional
				return nifRegex.test(val);
			},
			{ message: "NIF/NIE inválido" }
		),
});

export const editClientSchema = clientSchema.extend({ id: z.string().trim().min(1, { message: "El id es obligatorio" }) });

export type ClientInput = z.infer<typeof clientSchema>;
export type EditClientInput = z.infer<typeof editClientSchema>;
