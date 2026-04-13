"use client";
import { useItem } from "@/hooks/useItem";
import ItemForm from "../items/item-form";
import ActionButton from "../ui/button/action-button";
import { Dispatch, SetStateAction, useState } from "react";

type AddItemProps = {
	closeAction: Dispatch<SetStateAction<boolean>>;
};

export default function AddItemForm({ closeAction }: AddItemProps) {
	const [close, setClose] = useState(true);
	const { addItemToStore } = useItem();

	const handleSubmit = (form: React.FormEvent<HTMLFormElement>) => {
		form.preventDefault();
		const formData = new FormData(form.currentTarget);
		const result = addItemToStore(formData);
		if (result) {
			form.currentTarget.reset();
			closeAction(close);
		}
	};

	return (
		<>
			<div className="flex max-h-6 justify-between">
				<h3 className="text-primary text-md font-bold">Nuevo ítem</h3>
				<div className="flex items-center gap-2">
					<label htmlFor="autoClose" className="font-bold text-sm">
						Añadir varios
					</label>
					<input type="checkbox" name="autoClose" id="autoClose" checked={close} onChange={(e) => setClose(e.target.checked)} />
				</div>
			</div>
			<form className="newItemsModal" onSubmit={handleSubmit}>
				<ItemForm />
				<div className="newItem flex items-center justify-center">
					<ActionButton icon="plus" type="submit" text="Añadir" />
				</div>
			</form>
		</>
	);
}
