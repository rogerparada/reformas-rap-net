"use client";

import Modal from "./modal";
import ActionButton from "../ui/button/action-button";
import { useState } from "react";
import { ItemTable } from "@/types";
import EditItem from "../items/edit-item";

type Props = {
	item: ItemTable;
};

export default function EditItemModal({ item }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<ActionButton
				icon="edit"
				color="blue"
				action={() => {
					setOpen(true);
				}}
			/>
			<Modal open={open} close={() => setOpen(false)}>
				<EditItem item={item} cancelAction={() => setOpen(false)} />
			</Modal>
		</>
	);
}
