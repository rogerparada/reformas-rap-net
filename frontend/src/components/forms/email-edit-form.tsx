"use client";
import { useActionState, useEffect } from "react";
import { useConfirmMessage } from "@/hooks/useConfirmMessage";
import { EmailFormState, EmailResponse } from "@/types";
import { actions } from "@/actions";
import EmailInputs from "./email-inputs";
import EmailOptions from "../email/email-options";

const initialState: EmailFormState = {
	success: false,
	message: undefined,
	serverErrors: undefined,
	errors: undefined,
	data: {
		to: "",
		cc: "",
		cco: "",
		subject: "",
		message: "",
		attachment: "",
		attachmentName: "",
		idCliente: "",
	},
};

type Props = {
	email: EmailResponse;
};

export default function EmailEditForm({ email }: Props) {
	const [formState, formAction] = useActionState(actions.email.editEmail, {
		...initialState,
		data: {
			...email,
			attachment: email.attachment?.idDocumento,
			attachmentName: email.attachment?.name,
			idCliente: email.cliente?.idCliente,
		},
	});

	const { successMessage } = useConfirmMessage();

	useEffect(() => {
		if (formState.success) {
			successMessage({
				title: "Éxito",
				text: formState.message!,
			});
		}
	}, [formState.success, successMessage, formState.message]);

	return (
		<form className="email_form" action={formAction}>
			<EmailOptions action="edit" id={email.id} />
			<EmailInputs to={email.to} cc={email.cc} cco={email.cco} />
			<div className="input_field">
				<label htmlFor="subject">Asunto:</label>
				<input type="text" name="subject" id="subject" required defaultValue={formState.data?.subject} />
			</div>
			<div className="attach_field">
				<div>
					<span className="icon-[ls--clip]" />
				</div>
				<div>
					<span className="text-base">{email.attachment?.name}</span>
				</div>
				<input type="hidden" name="id" value={email.id} />
				<input type="hidden" name="attachment" value={formState.data?.attachment} />
				<input type="hidden" name="idCliente" value={formState.data?.idCliente} />
			</div>

			<div className="input_field col">
				<label htmlFor="message">Mensaje:</label>
				<textarea id="message" name="message" defaultValue={formState.data?.message}></textarea>
			</div>
		</form>
	);
}
