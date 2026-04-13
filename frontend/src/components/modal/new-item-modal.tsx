"use client";

import Modal from "./modal";
import ActionButton from "../ui/button/action-button";
import { useState } from "react";
import AddItemForm from "../forms/addItem-form";

export default function NewItemModal() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<ActionButton icon={"plus"} text={"Nuevo Item"} action={() => setOpen(true)} />
			<Modal open={open} close={() => setOpen(false)}>
				<AddItemForm closeAction={setOpen} />
			</Modal>
		</>
	);
}
