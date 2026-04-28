import { TipoDocumento } from "./description";

export type DocumentFilters = {
	tipo: "" | TipoDocumento;
	sortBy: DocumentSortBy;
	desc: boolean;
} & PageFilters;

export type PageFilters = {
	page?: number;
	items: number;
};

export type ClientFilters = {
	sortBy: ClientSortBy;
	desc: boolean;
} & PageFilters;

export type DocumentSortBy = "Documento" | "Cliente" | "Fecha";
export type ClientSortBy = "Nombre" | "Email" | "Phone";
