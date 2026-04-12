import { useNewItem } from "@/hooks/useNewItem";
import ItemForm from "../items/item-form";
import ActionButton from "../ui/button/action-button";

export default function AddItemForm() {
	const { addItemToStore } = useNewItem();

	const handleAction = (formData: FormData) => {
		addItemToStore(formData);
	};

	return (
		<>
			<h3 className="text-primary text-md font-bold">Nuevo ítem</h3>

			<form className="newItemsModal" action={handleAction}>
				<ItemForm />
				<div className="newItem flex items-center justify-center">
					<ActionButton icon="plus" type="submit" text="Añadir" />
				</div>
			</form>
		</>
	);
}
