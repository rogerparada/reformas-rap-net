"use client";
import { ItemTable } from "@/types";
import { formatCurrency } from "@/shared/utils";

type Props = {
	item: ItemTable;
};

export default function TablaDescripcionItem({ item }: Props) {
	const { description, price, quantity, total: value } = item;
	const multilineDescription = description.includes("\n") ? (
		description.split("\n").map((line, index) => (
			<p key={`${line}-${index}`} className="pl-2">
				{line}
			</p>
		))
	) : (
		<p>{description}</p>
	);

	return (
		<div className="fila_items">
			<div>{multilineDescription}</div>
			<div>{price > 0 && quantity > 0 ? formatCurrency(price) : ""}</div>
			<div>{quantity > 0 ? quantity : ""}</div>
			<div>{formatCurrency(value)}</div>
		</div>
	);
}
