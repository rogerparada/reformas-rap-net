import { StrapiError } from "../types";

export const processDetails = (error: Record<string, StrapiError[]>): string[] => {
	const records = Object.values(error);

	if (!Array.isArray(records)) {
		return [processDetail(records)];
	}

	const mapper = records.map((arr) => {
		if (!Array.isArray(arr)) {
			return [processDetail(arr)];
		}

		return arr.map((i) => processDetail(i));
	});

	const reduce = mapper.reduce((acc, arr) => [...acc, ...arr], []);

	return reduce;
};

const processDetail = (err: { path?: string[]; message: string; name: string; value: string }) => {
	const t = { name: "nombre", phone: "teléfono", numeroDocumento: "numero de documento" };
	const path = err.path?.length === 1 ? (t as Record<string, string>)[err.path[0]] : err.path?.join(", ");
	return err.message === "This attribute must be unique" ? `El ${path} ya esa registrado.` : err.message;
};
