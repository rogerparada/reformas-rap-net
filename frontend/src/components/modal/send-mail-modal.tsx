"use client";

import { Dispatch, SetStateAction } from "react";
import { useSendEmail } from "@/hooks/useSendEmail";
import { useAppStore } from "@/store/useAppStore";
import { DocumentInfo } from "@/types";
import ModalMessage from "./modal-message";
import EmailInputs from "../forms/email-inputs";

type Props = {
	showModal: boolean;
	closeModal: Dispatch<SetStateAction<boolean>>;
	attachment: DocumentInfo["idDocumento"];
};

export default function SenMailModal({ showModal, closeModal, attachment }: Props) {
	const email = useAppStore((state) => state.client?.email);
	const idCliente = useAppStore((state) => state.client?.id);
	const fileName = useAppStore((state) => state.document?.numeroDocumento);

	const { sending, error, success, sendEmail, reset } = useSendEmail();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		await sendEmail(formData);
	};

	const handleCloseModal = () => {
		closeModal(false);
		reset();
	};

	if (!showModal) return null;

	return (
		<>
			<div className="bg-black w-full h-screen z-50 fixed inset-0 left-0 opacity-90"></div>
			<div className="send_modal">
				<div className="text-black">
					<button type="button" className="close_modal_button" onClick={handleCloseModal}>
						<span className="icon-[fa7-solid--close]" />
					</button>
					{!sending && !error && !success && (
						<form onSubmit={handleSubmit} className="email_form">
							<div className="mt-10">
								<EmailInputs to={email} />
							</div>
							<div className="attach_field">
								<div>
									<span className="icon-[ls--clip]" />
								</div>
								<div>
									<span className="text-base">{fileName}</span>
								</div>
								<input type="hidden" name="attachment" value={attachment} />
								<input type="hidden" name="idCliente" value={idCliente} />
							</div>

							<div className="input_field">
								<label htmlFor="subject">Asunto:</label>
								<input type="text" name="subject" id="subject" required />
								<div className="form_buttons">
									<button type="submit" className="bg-blue-500">
										<span className="icon-[mingcute--send-plane-fill]" />
										<span>Enviar</span>
									</button>
								</div>
							</div>

							<div className="input_field col">
								<label htmlFor="message">Mensaje:</label>
								<textarea id="message" name="message"></textarea>
							</div>
						</form>
					)}

					{sending && <ModalMessage icon="loading" color="blue" title="Enviando email" text="Por favor espere..." />}

					{!sending && (
						<>
							{error && <ModalMessage color="red" icon="error" text={error} button close={handleCloseModal} />}
							{success && <ModalMessage color="blue" icon="send" text={success} button close={handleCloseModal} />}
						</>
					)}
				</div>
			</div>
		</>
	);
}
