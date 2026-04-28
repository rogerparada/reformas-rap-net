"use client";

import { DocumentInfoResponse, DocumentSortBy, TipoDocumento } from "@/types";
import DocumentItem from "./document-item";
import TableHeader from "../tables/table-header";

import { useRouter, useSearchParams } from "next/navigation";
import { getQueryString } from "@/shared/utils/query";
import { DocumentFilters } from "@/types/filters";
import Pagination from "../ui/pagination/pagination";

type Props = {
	data: DocumentInfoResponse[];
	title: string;
	maxItems: number;
};

export default function DocumentTable({ data, title, maxItems }: Props) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const filters: DocumentFilters = {
		tipo: searchParams.get("tipo") as TipoDocumento,
		sortBy: searchParams.get("sortBy") as DocumentSortBy,
		desc: searchParams.get("desc") === "true",
		page: Number(searchParams.get("page") || 0),
		items: Number(searchParams.get("limit") || 10),
	};
	const handleOnchange = (sortBy: DocumentSortBy) => {
		const params = getQueryString({ ...filters, sortBy, desc: !filters.desc });
		router.push(`/gestion/documentos?${params}`);
	};
	if (data.length > 0) {
		return (
			<div>
				<div className="flex justify-between items-center">
					<h1 className="title">{title}</h1>
					<Pagination maxItems={maxItems} url="/gestion/documentos" />
				</div>
				<hr className="separator" />
				<div className="w-full mt-5">
					<table className="table_cliente">
						<thead className="table_header">
							<tr className="h-10 w-full">
								<TableHeader title="Numero" action={() => handleOnchange("Documento")} active={filters.sortBy === "Documento"} desc={filters.desc} />
								<TableHeader title="Fecha" action={() => handleOnchange("Fecha")} active={filters.sortBy === "Fecha"} desc={filters.desc} />
								<TableHeader
									title="Cliente"
									action={() => handleOnchange("Cliente")}
									active={filters.sortBy === "Cliente"}
									desc={filters.desc}
									style="alphabetic"
								/>
								<th className="">Valor</th>
							</tr>
						</thead>
						<tbody className="">
							{data.map((item) => (
								<DocumentItem key={item.idDocumento} item={item} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}
