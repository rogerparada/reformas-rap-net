export type DocumentFilters = {
	tipo: "" | TipoDocumento;
	sortBy: DocumentSortBy;
	desc: boolean;
} & PageFilters;

export type PageFilters = {
	page?: number;
	items: number;
};
