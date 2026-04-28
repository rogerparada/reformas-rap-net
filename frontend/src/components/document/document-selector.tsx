"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { DocumentSortBy, TipoDocumento } from "@/types";
import LinkButton from "../ui/button/link-button";
import { DocumentFilters } from "@/types/filters";
import { getQueryString } from "@/shared/utils/query";

export default function DocumentSelector() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const filters: DocumentFilters = {
		tipo: (searchParams.get("tipo") as TipoDocumento) || "",
		sortBy: searchParams.get("sortBy") as DocumentSortBy,
		desc: searchParams.get("desc") === "true",
		page: Number(searchParams.get("page") || 0),
		items: Number(searchParams.get("items") || 10),
	};

	const handleOnchange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		if (value) {
			router.push(`/gestion/documentos?tipo=${value}`);
			return;
		}
		router.push(`/gestion/documentos`);
	};

	const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		const params = getQueryString({ ...filters, items: Number(value) });
		router.push(`/gestion/documentos?${params}`);
	};

	return (
		<div className="flex justify-between items-center">
			<div className="flex items-center gap-5">
				<div className="space-x-2">
					<label htmlFor="ver" className="font-bold text-primary">
						Ver
					</label>
					<select name="ver" id="ver" className="border h-8 px-4" value={filters.tipo} onChange={handleOnchange}>
						<option value="">Todos</option>
						<option value="Factura">Facturas</option>
						<option value="Presupuesto">Presupuestos</option>
					</select>
				</div>
				<div className="space-x-2">
					<label htmlFor="items" className="font-bold text-primary">
						Items
					</label>
					<select name="items" id="items" className="border h-8 px-4" value={filters.items} onChange={handleLimitChange}>
						<option value={10}>10</option>
						<option value={25}>25</option>
						<option value={50}>50</option>
						<option value={100}>100</option>
					</select>
				</div>
			</div>

			<LinkButton icon="doc_add" link="/gestion/documentos/new?clear=true" text="Nuevo documento" />
		</div>
	);
}
