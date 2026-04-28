"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ClientFilters, ClientSortBy } from "@/types";
import { getQueryString } from "@/shared/utils/query";
import NewClientModal from "../modal/new-client-modal";

export default function ItemsSelector({ open }: { open: boolean }) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const filters: ClientFilters = {
		sortBy: searchParams.get("sortBy") as ClientSortBy,
		desc: searchParams.get("desc") === "true",
		page: Number(searchParams.get("page") || 0),
		items: Number(searchParams.get("items") || 10),
	};

	const handleLimitChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { value } = event.target;
		const params = getQueryString({ ...filters, items: Number(value) });
		router.push(`/gestion/clientes?${params}`);
	};

	return (
		<div className="flex justify-between items-center">
			<div className="flex items-center gap-5">
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

			<NewClientModal text="Nuevo Cliente" open={open} />
		</div>
	);
}
