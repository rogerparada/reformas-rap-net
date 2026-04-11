export function formatCurrency(value: number): string {
	const formatter = new Intl.NumberFormat("es-ES", {
		style: "currency",
		currency: "EUR",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});

	return formatter.format(value);
}

/**
 * Cambia una cadena de fecha en formato 'YYYY-MM-DD' a una cadena en formato español 'DD/MM/YYYY'.
 * * @param dateString La fecha en formato ISO '2025-11-28'.
 * @returns La fecha formateada como '28/11/2025'.
 */
export function formatDate(dateString: string): string {
	const [year, month, day] = dateString.split("-").map(Number);

	const date = new Date(year, month - 1, day);

	const formatter = Intl.DateTimeFormat("es-ES", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	});

	return formatter.format(date);
}

export const toLocalTime = (isoString: string): string => {
	const date = new Date(isoString);

	if (isNaN(date.getTime())) {
		return "Fecha inválida";
	}

	return new Intl.DateTimeFormat("es-ES", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	}).format(date);
};

export const toLocalDate = (isoString: string): string => {
	const date = new Date(isoString);

	if (isNaN(date.getTime())) {
		return "Fecha inválida";
	}

	return new Intl.DateTimeFormat("es-ES", {
		day: "2-digit",
		month: "2-digit",
		year: "numeric",
	}).format(date);
};

export const toISOString = (dateString: string): string => {
	const date = new Date(dateString);

	if (isNaN(date.getTime())) {
		throw new Error(`Fecha inválida: ${dateString}`);
	}

	return date.toISOString();
};
