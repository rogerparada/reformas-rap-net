"use client";

import { actions } from "@/actions";
import { useActionState } from "react";
import { ClientFormState } from "@/types";
import ClientForm from "./client-form";
import ActionButton from "../ui/button/action-button";
import ModalMessage from "../modal/modal-message";
import { useAppStore } from "@/store/useAppStore";

const INITIAL_STATE: ClientFormState = {
	data: { name: "", email: "", phone: "", address: "", city: "", nif: "" },
	errors: null,
	serverErrors: null,
	response: null,
};

type Props = {
	retrieve?: boolean;
};

export default function NewClientForm({ retrieve = false }: Props) {
	const [formState, formAction] = useActionState(actions.client.createClientAction, INITIAL_STATE);
	const setClient = useAppStore((state) => state.setClient);

	const { response } = formState;
	if (retrieve && response) {
		setClient(response);
	}

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
