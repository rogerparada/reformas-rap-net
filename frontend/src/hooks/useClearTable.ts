import Swal from "sweetalert2";
import { useAppStore } from "../store/useAppStore";

export function useClearTable() {
	const clearItems = useAppStore((state) => state.clearItems);
	const clearTable = () => {
		Swal.fire({
			title: "¿Estas seguro?",
			text: "¡No podrás revertir esto!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí",
			cancelButtonText: "No",
		}).then((result) => {
			if (result.isConfirmed) {
				clearItems();

				let timerInterval: NodeJS.Timeout | undefined;

				Swal.fire({
					title: "¡Eliminados!",
					text: "Los items han sido eliminados.",
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

	return { clearTable };
}
