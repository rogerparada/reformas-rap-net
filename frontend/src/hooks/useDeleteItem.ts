import Swal from "sweetalert2";
import { useAppStore } from "../store/useAppStore";

export function useDeleteItem() {
	const deleteItem = useAppStore((state) => state.removeItem);

	const deleteItemById = (id: number) => {
		Swal.fire({
			title: "¿Estás seguro?",
			text: "¡No podrás revertir esto!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí",
			cancelButtonText: "No",
		}).then((result) => {
			if (result.isConfirmed) {
				deleteItem(id);
				let timerInterval: NodeJS.Timeout | undefined;

				Swal.fire({
					title: "Eliminado!",
					text: "El ítem ha sido eliminado.",
					icon: "success",
					timer: 2000,
					didOpen: (popup) => {
						Swal.showLoading();
						const timer = popup.querySelector("b");
						timerInterval = setInterval(() => {
							if (!timer) return;
							timer.textContent = `${Swal.getTimerLeft()}`;
						}, 100);
					},
					willClose: () => {
						clearInterval(timerInterval);
					},
				});
			}
		});
	};

	return { deleteItemById };
}
