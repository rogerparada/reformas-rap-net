import { DocumentInfo, ItemTable } from "../../types";
import { useAppStore } from "../../store/useAppStore";

export function getDataStorage() {
	const state = useAppStore.getState();

	return {
		items: state.items,
		subtotal: state.subtotal,
		iva: state.iva,
		total: state.total,
		taxes: state.document.iva,
		showIva: state.document.iva > 0,
	};
}

export const getItemsDetails = (items: ItemTable[], iva = 0) => {
	const subtotal = items.reduce((acc, item) => {
		return (acc += item.total);
	}, 0);

	const ivaValue = subtotal * iva;

	const total = subtotal + iva;

	return {
		subtotal,
		iva: ivaValue,
		total,
	};
};

export function getDocumentInfo(): DocumentInfo {
	const state = useAppStore.getState();

	return {
		idDocumento: state.document.idDocumento,
		tipoDocumento: state.document.tipoDocumento,
		numeroDocumento: state.document.numeroDocumento,
		fecha: state.document.fecha,
		iva: state.document.iva,
		estado: state.document.estado,
	};
}
