import { useAppStore } from "../store/useAppStore";
import { ItemTable, NewItemTable } from "../types/items";
import Swal from "sweetalert2";

const createMessage = (title: string) => {
	Swal.fire({
		title,
		icon: "error",
		confirmButtonColor: "#3085d6",
	});
};

export function useItem() {
	const addItem = useAppStore((state) => state.addItem);
	const editItem = useAppStore((state) => state.editItem);

	const addItemToStore = (formData: FormData) => {
		const description = formData.get("description") as string;
		const price = Number(formData.get("price"));
		const quantity = Number(formData.get("quantity")) ?? 0;

		if (!description) {
			createMessage("Por favor rellene la descripción");
			return;
		}

		if (!price) {
			createMessage("Escriba un precio");
			return;
		}

		addItem({ description, price, quantity } as NewItemTable);
	};

	const editItemFromStore = (formData: FormData, item: ItemTable) => {
		const description = formData.get("description") as string;
		const price = Number(formData.get("price"));
		const quantity = Number(formData.get("quantity"));
		const total = !!price && !!quantity ? price * quantity : Number(formData.get("total"));

		editItem({ ...item, description, price, quantity, total } as ItemTable);
		// cancelAction(false);
	};

	return { addItemToStore, editItemFromStore };
}
