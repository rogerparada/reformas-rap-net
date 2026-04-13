"use client";
import { useAppStore } from "@/store/useAppStore";
import ListItem from "./list-item";
import ListOptions from "./list-options";

export default function ItemList() {
	const items = useAppStore((state) => state.items);

	if (items.length > 0) {
		return (
			<div className="card">
				<div className="itemsList">
					<div className="item_header description">Descripción</div>
					<div className="item_header">Precio</div>
					<div className="item_header">Ud.</div>
					<div className="item_header">Importe</div>
					<div className="item_header">Acciones</div>
				</div>
				{items.map((item) => (
					<ListItem item={item} key={item.key} />
				))}

				<ListOptions />
			</div>
		);
	}

	return (
		<div className="card">
			<span>No hay artículos.</span>
		</div>
	);
}
