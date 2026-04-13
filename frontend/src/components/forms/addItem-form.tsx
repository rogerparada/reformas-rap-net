import { useItem } from "@/hooks/useItem";
import ItemForm from "../items/item-form";
import ActionButton from "../ui/button/action-button";

export default function AddItemForm() {
	const { addItemToStore } = useItem();

	const handleSubmit = (form: React.FormEvent<HTMLFormElement>) => {
		form.preventDefault();
		const formData = new FormData(form.currentTarget);
		addItemToStore(formData);
	};

	return (
		<>
			<h3 className="text-primary text-md font-bold">Nuevo ítem</h3>

			<form className="newItemsModal" onSubmit={handleSubmit}>
				<ItemForm />
				<div className="newItem flex items-center justify-center">
					<ActionButton icon="plus" type="submit" text="Añadir" />
				</div>
			</form>
		</>
	);
}
