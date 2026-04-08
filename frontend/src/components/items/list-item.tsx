"use client";
import { useState } from "react";
import { useDeleteItem } from "@/hooks/useDeleteItem";
import { ItemTable } from "@/types/items";
import ActionButton from "../ui/button/action-button";
import EditItem from "./edit-item";
import { formatCurrency } from "@/utils";

type ListItemProps = {
	item: ItemTable;
};

export default function ListItem({ item }: ListItemProps) {
	const [editMode, setEditMode] = useState(false);
	const { deleteItemById } = useDeleteItem();

	if (editMode) {
		return <EditItem item={item} cancelAction={() => setEditMode(false)} />;
	}

	return (
		<div className="itemsList">
			<div className="item">
				<p>{item.description}</p>
			</div>
			<div className="item">
				<p>{item.price > 0 ? formatCurrency(item.price) : ""}</p>
			</div>
			<div className="item">
				<p>{item.quantity > 0 ? item.quantity : ""}</p>
			</div>
			<div className="item">
				<p>{formatCurrency(item.total)}</p>
			</div>
			<div className="action_button_group item">
				<ActionButton
					icon="edit"
					color="blue"
					action={() => {
						setEditMode(true);
					}}
				/>
				<ActionButton
					icon="delete"
					color="red"
					action={() => {
						deleteItemById(item.id);
					}}
				/>
			</div>
		</div>
	);
}
