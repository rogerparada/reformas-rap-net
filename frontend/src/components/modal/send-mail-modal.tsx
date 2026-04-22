"use client";

import { useSendEmail } from "@/hooks/useSendEmail";
import { useAppStore } from "@/store/useAppStore";
import { Dispatch, RefObject, SetStateAction } from "react";
import ModalMessage from "./modal-message";

type Props = {
	pdfBlob?: Blob;
	pdf?: RefObject<null>;
	showModal: boolean;
	closeModal: Dispatch<SetStateAction<boolean>>;
};

export default function SenMailModal({ pdfBlob, pdf, showModal, closeModal }: Props) {
	const email = useAppStore((state) => state.client?.email);
	const numero = useAppStore((state) => state.document?.numeroDocumento);
	const fileName = numero;

	const { sending, error, success, sendEmail, reset } = useSendEmail({ email, pdfBlob, pdf });

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
							<span className="text-base">
								<b>Para:</b> {email}
							</span>

							<div className="attach_field">
								<div>
									<span className="icon-[ls--clip]" />
								</div>
								<div>
									<span className="text-base">{fileName}</span>
								</div>
								<input type="hidden" name="fileName" value={fileName} />
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
