"use client";
import { ItemTable } from "@/types";
import { formatCurrency } from "@/utils";

type Props = {
	item: ItemTable;
};

export default function TablaDescripcionItem({ item }: Props) {
	console.log(item);
	const { description, price, quantity, total: value } = item;

	const multilineDescription = description.includes("\n") ? (
		description.split("\n").map((line, index) => (
			<p key={index} className="pl-2">
				{line}
			</p>
		))
	) : (
		<p>{description}</p>
	);

	return (
		<div className="fila_items">
			<div>{multilineDescription}</div>
			<div>{price > 0 && formatCurrency(price)}</div>
			<div>{price > 0 && quantity}</div>
			<div>{formatCurrency(value)}</div>
		</div>
	);
}
