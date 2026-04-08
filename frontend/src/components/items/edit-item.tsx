import { useAppStore } from "@/store/useAppStore";
import { ItemTable } from "@/types/items";
import { Dispatch, SetStateAction } from "react";
import ActionButton from "../ui/button/action-button";
import ItemForm from "./item-form";

type EditItemProps = {
	item: ItemTable;
	cancelAction: Dispatch<SetStateAction<boolean>>;
};

export default function EditItem({ item, cancelAction }: EditItemProps) {
	const editItem = useAppStore((state) => state.editItem);

	const handleSubmit = (formData: FormData) => {
		const description = formData.get("description") as string;
		const price = Number(formData.get("price"));
		const quantity = Number(formData.get("quantity"));
		const total = !!price && !!quantity ? price * quantity : Number(formData.get("total"));

		editItem({ ...item, description, price, quantity, total } as ItemTable);
		cancelAction(false);
	};

	return (
		<>
			<form className="newItemsList" action={handleSubmit}>
				<ItemForm item={item} />
				<div className="flex items-top justify-center py-2 gap-1">
					<ActionButton icon="confirm" type="submit" />
					<ActionButton icon="cancel" color="red" action={() => cancelAction(false)} />
				</div>
			</form>
			<hr className="border-primary-light" />
		</>
	);
}
