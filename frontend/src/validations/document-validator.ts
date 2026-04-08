import z from "zod";

export const documentSchema = z.object({
	numeroDocumento: z
		.string()
		.min(1, { message: "El numero de documento es obligatorio" })
		.max(10, { message: "El numero de documento es muy largo" }),
	fecha: z
		.string()
		.regex(/^\d{4}-\d{2}-\d{2}$/, { message: "El formato de la fecha debe ser YYYY-MM-DD" })
		.refine((val) => !isNaN(new Date(val).getTime()), { message: "La fecha no es válida" }),

	tipoDocumento: z.enum(["Factura", "Presupuesto"]),
	iva: z.boolean(),
	cliente: z.string().length(24, { message: "La id del cliente no es valida" }),
	items: z
		.array(
			z.object({
				description: z.string().min(1, { message: "La descripción no puede estar vacía" }),
				price: z.number().gte(0, { message: "El precio no puede ser negativo" }),
				quantity: z.number().gte(0, { message: "La cantidad no puede ser negativa" }),
				total: z.number().gt(0, { message: "El importe tiene que ser mayor a 0" }),
			})
		)
		.min(1, { message: "El documento debe tener al menos un elemento" }),
});

export type DocumentInput = z.infer<typeof documentSchema>;
