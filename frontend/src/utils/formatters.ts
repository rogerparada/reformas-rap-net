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
