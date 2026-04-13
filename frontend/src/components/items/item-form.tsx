"use client";

import { ItemTable, NewItemTable } from "@/types/items";
import { useState } from "react";
import PriceInput from "./price/price-input";

type ItemFormProps = {
	item?: NewItemTable | ItemTable;
};

export default function ItemForm({ item }: ItemFormProps) {
	const [pxu, setPxu] = useState(!!item && !!item.quantity);

	return (
		<>
			<div className="flex gap-2 w-full mt-5">
				<PriceInput name="price" value={item?.price} placeholder="Precio" />
				<div className="form-control ml-5">
					<label htmlFor="ud">Ud:</label>
					<input type="checkbox" name="ud" id="ud" className="" checked={pxu} onChange={(e) => setPxu(e.target.checked)} />
				</div>
				{pxu && (
					<input
						className="h-10 rounded-md border border-slate-400 p-2 text-right max-w-56"
						id="quantity"
						name="quantity"
						type="number"
						min={0}
						defaultValue={item?.quantity ?? 1}
						placeholder="Cantidad"
					/>
				)}
			</div>
			<div className="newItem">
				<textarea id="description" name="description" className="mt-2" defaultValue={item?.description || ""} placeholder="Descripción del trabajo" />
			</div>
		</>
	);
}
