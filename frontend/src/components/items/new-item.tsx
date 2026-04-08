"use client";
import ItemForm from "./item-form";
import { useNewItem } from "@/hooks/useNewItem";
import ActionButton from "../ui/button/action-button";

export default function NewItem() {
	const { addItemToStore } = useNewItem();

	const handleAction = (formData: FormData) => {
		addItemToStore(formData);
	};

	return (
		<>
			<h3 className="text-primary text-md font-bold pl-4">Nuevo ítem</h3>

			<form className="newItemsList" action={handleAction}>
				<ItemForm />
				<div className="newItem">
					<ActionButton icon="plus" type="submit" />
				</div>
			</form>
		</>
	);
}
