"use client";

import { ItemTable, NewItemTable } from "@/types/items";
import { useState } from "react";

type ItemFormProps = {
	item?: NewItemTable | ItemTable;
};

export default function ItemForm({ item }: ItemFormProps) {
	const [pxu, setPxu] = useState(!!item && !!item.price && !!item.quantity);

	const handleCheckedChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		setPxu(checked);
	};

	return (
		<>
			<div className="newItem">
				<textarea id="description" name="description" className="mt-2" defaultValue={item?.description || ""} placeholder="Descripción del trabajo" />
			</div>
			<div className="newItem form-control">
				<label htmlFor="ud">PxUd:</label>
				<input type="checkbox" name="ud" id="ud" className="" checked={pxu} onChange={handleCheckedChanged} />
			</div>

			<div className={`newItem ${!pxu ? "hidden collapse md:block md:invisible" : ""}`}>
				<input id="price" name="price" type="number" min={0} step={0.01} defaultValue={item?.price} placeholder="Precio" />
			</div>
			<div className={`newItem ${!pxu ? "hidden collapse md:block md:invisible" : ""}`}>
				<input id="quantity" name="quantity" type="number" min={0} step={0.01} defaultValue={item?.quantity} placeholder="Cantidad" />
			</div>

			<div className={`newItem ${pxu ? "hidden collapse md:block md:invisible" : "col-span-2 md:col-span-1"}`}>
				<input id="total" name="total" type="number" min={0} step={0.01} defaultValue={item?.total} placeholder="Importe" />
			</div>
		</>
	);
}
