"use client";
import { actions } from "@/actions";
import { ClienteInfo } from "@/types/description";
import { useActionState } from "react";
import { EditClientFormState } from "@/types";
import ClientForm from "./client-form";
import ActionButton from "../ui/button/action-button";
import Swal from "sweetalert2";
import { FormError } from "../ui/form-error";

type ClientFormProps = {
	client: ClienteInfo;
	reset: () => void;
};

const INITIAL_STATE: EditClientFormState = {
	errors: null,
	serverErrors: null,
};

export default function EditClientForm({ client, reset }: ClientFormProps) {
	const [formState, formAction] = useActionState(actions.client.editClientAction, { ...INITIAL_STATE, data: client });

	const confirm = async () => {
		let timerInterval: NodeJS.Timeout | undefined;

		await Swal.fire({
			title: "Guardado",
			text: "se han actualizado los datos del cliente",
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

		reset();
	};

	if (formState.success) confirm();

	return (
		<form action={formAction}>
			<div className="flex justify-between items-center">
				<h1 className="title ml-5">Detalles de {client.name}</h1>

				<div className="flex justify-center items-center  gap-4">
					<ActionButton icon="save" text="Guardar" type="submit" />
					<ActionButton icon="reset" color="red" action={reset} text="Cancelar" />
				</div>
			</div>
			<hr className="separator" />
			<ClientForm {...formState} />
			<FormError error={formState.serverErrors ?? ""} />
			<input type="hidden" name="id" defaultValue={client?.id} />
		</form>
	);
}
