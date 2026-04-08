import { actions } from "@/actions";
import { useActionState } from "react";
import { ClientFormState } from "@/types";
import ClientForm from "./client-form";
import ActionButton from "../ui/button/action-button";
import ModalMessage from "../modal/modal-message";

const INITIAL_STATE: ClientFormState = {
	data: { name: "", email: "", phone: "", address: "", city: "", nif: "" },
	errors: null,
	serverErrors: null,
};

export default function NewClientForm() {
	const [formState, formAction] = useActionState(actions.client.createClientAction, INITIAL_STATE);

	if (formState.success) {
		return <ModalMessage icon="confirm" text="Se ha creado el cliente" />;
	}

	return (
		<form action={formAction}>
			<ClientForm {...formState} />
			<div className="flex justify-center items-center mt-10 gap-4">
				<ActionButton icon="save" text="Guardar" type="submit" />
				<ActionButton icon="reset" color="red" text="Limpiar" type="reset" />
			</div>
		</form>
	);
}
