"use client";
import { useMemo } from "react";
import { useDeleteItem } from "@/hooks/useDeleteItem";
import { ItemTable } from "@/types/items";
import ActionButton from "../ui/button/action-button";
import { formatCurrency } from "@/shared/utils";
import EditItemModal from "../modal/edit-item-modal";

type ListItemProps = {
	item: ItemTable;
};

export default function ListItem({ item }: ListItemProps) {
	const { deleteItemById } = useDeleteItem();

	const { description, price, quantity } = item;

	const total = useMemo(() => (quantity > 0 ? quantity * price : price), [price, quantity]);
	const formattedDescription = useMemo(
		() => (description.includes("\n") ? description.split("\n").map((line, index) => <p key={`${line}-${index}`}>{line}</p>) : description),
		[description],
	);

	return (
		<div className="itemsList">
			<div className="item">{formattedDescription}</div>
			<div className="item">
				<p>{price > 0 && quantity > 0 ? formatCurrency(price) : ""}</p>
			</div>
			<div className="item">
				<p>{quantity > 0 ? quantity : ""}</p>
			</div>
			<div className="item">
				<p>{formatCurrency(total)}</p>
			</div>
			<div className="action_button_group item">
				<EditItemModal item={item} />
				{item.id && (
					<ActionButton
						icon="delete"
						color="red"
						action={() => {
							deleteItemById(item.id!);
						}}
					/>
				)}
			</div>
		</div>
	);
}
