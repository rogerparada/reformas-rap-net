"use client";

import { TableDetails } from "@/types";
import TablaDescripcionItem from "./tabla-description-item";
import TablaTotales from "./tabla-totales";
import { getDataStorage } from "@/utils";

export default function TablaDescripcion({ data }: { data?: TableDetails; local?: string }) {
	const { items, ...totales } = data ?? getDataStorage();

	return (
		<div className="table_items">
			<div className="header">
				<div>Descripción</div>
				<div>Precio</div>
				<div>Ud.</div>
				<div>Importe</div>
			</div>

			<div className="items">
				{items.map((item) => (
					<TablaDescripcionItem key={item.id} item={item} />
				))}

				<TablaTotales {...totales} />
			</div>
		</div>
	);
}
