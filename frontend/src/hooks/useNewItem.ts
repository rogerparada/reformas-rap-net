import { useAppStore } from "../store/useAppStore";
import { NewItemTable } from "../types/items";
import Swal from "sweetalert2";

const createMessage = (title: string) => {
	Swal.fire({
		title,
		icon: "error",
		confirmButtonColor: "#3085d6",
	});
};

export function useNewItem() {
	const addItem = useAppStore((state) => state.addItem);
	const addItemToStore = (formData: FormData) => {
		const description = formData.get("description") as string;
		const price = Number(formData.get("price"));
		const quantity = Number(formData.get("quantity"));
		const total = !!price && !!quantity ? price * quantity : Number(formData.get("total"));

		if (!description) {
			createMessage("Por favor rellene la descripción");
			return;
		}

		if (!price && !quantity && !total) {
			createMessage("Por favor rellene el precio, la cantidad o el total");
			return;
		}

		if (price && !quantity) {
			createMessage("Escriba una cantidad");
			return;
		}

		if (!price && quantity) {
			createMessage("Escriba el precio por unidad");
			return;
		}

		addItem({ description, price, quantity, total } as NewItemTable);
	};

	return { addItemToStore };
}
