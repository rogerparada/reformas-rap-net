import { MessageOptions } from "@/types/message";
import { useConfirmMessage } from "./useConfirmMessage";
import { actions } from "@/actions";

export const useMailOptions = () => {
	const { errorMessage, successMessage, warningMessage } = useConfirmMessage();

	const deleteMail = () => {
		const message: MessageOptions = {
			title: "Eliminar",
			text: "¿Estás seguro de que quieres eliminar el correo?",
			confirmTitle: "Eliminar",
			confirmText: "Se ha eliminado el correo",
			action: () => {
				console.log("TODO: Eliminar mail");
			},
		};
		warningMessage(message);
	};

	const forwardEmail = async (id: string) => {
		const result = await actions.email.forwardEmail(id);
		if (!result.success) {
			errorMessage({ title: "Error", text: result.message ?? "Error al enviar el correo" });
			return;
		}
		successMessage({ title: "Enviado", text: "Se ha enviado el correo" });
	};

	return { deleteMail, forwardEmail };
};
