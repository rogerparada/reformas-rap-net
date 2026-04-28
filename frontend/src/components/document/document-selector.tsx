"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { DocumentSortBy, TipoDocumento } from "@/types";
import LinkButton from "../ui/button/link-button";
import { DocumentFilters } from "@/types/filters";

export default function DocumentSelector() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const filters: DocumentFilters = {
		tipo: (searchParams.get("tipo") as TipoDocumento) || "",
		sortBy: searchParams.get("sortBy") as DocumentSortBy,
		desc: searchParams.get("desc") === "true",
	};

	const handleOnchange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		router.push(`/gestion/documentos?tipo=${value}`);
	};

	return (
		<div className="flex justify-between items-center">
			<div className="space-x-2">
				<label htmlFor="ver" className="font-bold text-xl text-primary">
					Ver
				</label>
				<select name="ver" id="ver" className="border h-8 px-4" value={filters.tipo} onChange={handleOnchange}>
					<option value="">Todos</option>
					<option value="Factura">Facturas</option>
					<option value="Presupuesto">Presupuestos</option>
				</select>
			</div>

			<LinkButton icon="doc_add" link="/gestion/documentos/new?clear=true" text="Nuevo documento" />
		</div>
	);
}
