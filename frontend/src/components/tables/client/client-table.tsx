"use client";

import ClientItem from "./client-item";
import { ClienteResponse, ClientFilters, ClientSortBy } from "@/types";
import { getQueryString } from "@/shared/utils/query";
import { useSearchParams, useRouter } from "next/navigation";
import TableHeader from "../table-header";
import Pagination from "@/components/ui/pagination/pagination";

export default function ClientTable({ data, maxItems }: { data: ClienteResponse[]; maxItems: number }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const filters: ClientFilters = {
		sortBy: searchParams.get("sortBy") as ClientSortBy,
		desc: searchParams.get("desc") === "true",
		page: Number(searchParams.get("page") || 0),
		items: Number(searchParams.get("limit") || 10),
	};
	const handleOnchange = (sortBy: ClientSortBy) => {
		const params = getQueryString({ ...filters, sortBy, desc: !filters.desc });
		router.push(`/gestion/clientes?${params}`);
	};

	return (
		<>
			<div className="flex justify-between items-center  mt-5">
				<h1 className="title">Clientes</h1>
				<Pagination maxItems={maxItems} url="/gestion/clientes" />
			</div>
			<hr className="separator mb-10" />
			<div className="w-full">
				<table className="table_cliente">
					<thead className="table_header">
						<tr className="h-10">
							<TableHeader title="Nombre" action={() => handleOnchange("Nombre")} active={filters.sortBy === "Nombre"} desc={filters.desc} />
							<TableHeader title="Email" action={() => handleOnchange("Email")} active={filters.sortBy === "Email"} desc={filters.desc} />
							<TableHeader title="Teléfono" action={() => handleOnchange("Phone")} active={filters.sortBy === "Phone"} desc={filters.desc} />
							<th className="">Documentos</th>
						</tr>
					</thead>
					<tbody className="">
						{data.map((item) => (
							<ClientItem key={item.id} item={item} />
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
