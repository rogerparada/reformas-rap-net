"use client";

import Modal from "./modal";
import ActionButton from "../ui/button/action-button";
import { useState } from "react";
import AddItemForm from "../forms/addItem-form";

export default function NewItemModal() {
	const [open, setOpen] = useState(false);

	const handleSave = async () => {
		setOpen(true);
		return;
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<ActionButton icon={"plus"} text={"Nuevo Item"} action={handleSave} />
			<Modal open={open} close={handleClose}>
				<AddItemForm />
			</Modal>
		</>
	);
}
