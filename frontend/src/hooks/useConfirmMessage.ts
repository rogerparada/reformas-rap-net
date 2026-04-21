import { MessageOptions } from "@/types/message";
import Swal from "sweetalert2";

export function useConfirmMessage() {
	const warningMessage = ({ title, text, confirmTitle, confirmText, action }: MessageOptions) => {
		Swal.fire({
			title,
			text,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Sí",
			cancelButtonText: "No",
		}).then((result) => {
			if (result.isConfirmed) {
				let timerInterval: NodeJS.Timeout | undefined;
				action?.();
				Swal.fire({
					title: confirmTitle,
					text: confirmText,
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

	const successMessage = ({ title, text }: MessageOptions) => {
		let timerInterval: NodeJS.Timeout | undefined;
		Swal.fire({
			title,
			text,
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
	};
	const errorMessage = ({ title, text }: MessageOptions) => {
		Swal.fire({
			title,
			text,
			icon: "error",
			timer: 2000,
		});
	};

	return { errorMessage, successMessage, warningMessage };
}
