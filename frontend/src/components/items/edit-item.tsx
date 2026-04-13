import { ItemTable } from "@/types/items";
import { Dispatch, SetStateAction } from "react";
import ActionButton from "../ui/button/action-button";
import ItemForm from "./item-form";
import { useItem } from "@/hooks/useItem";

type EditItemProps = {
	item: ItemTable;
	cancelAction: Dispatch<SetStateAction<boolean>>;
};

export default function EditItem({ item, cancelAction }: EditItemProps) {
	const { editItemFromStore } = useItem();

	const handleAction = (formData: FormData) => {
		editItemFromStore(formData, item);
		cancelAction(false);
	};

	return (
		<>
			<h3 className="text-primary text-md font-bold">Editar ítem</h3>
			<form className="newItemsModal" action={handleAction}>
				<ItemForm item={item} />
				<div className="flex items-top justify-center py-2 gap-1">
					<ActionButton icon="save" type="submit" text="Guardar" />
					<ActionButton icon="cancel" color="red" action={() => cancelAction(false)} text="Cancelar" />
				</div>
			</form>
		</>
	);
}
