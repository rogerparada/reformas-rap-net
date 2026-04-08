import { Dispatch, SetStateAction, useState } from "react";
import SendEmailModal from "../modal/send-mail-modal";

type PreviewPdfProps = {
	pdfUrl: string;
	resetUrl: Dispatch<SetStateAction<string | null>>;
	pdfBlob: Blob;
};

export default function PreviewPdf({ pdfUrl, resetUrl, pdfBlob }: PreviewPdfProps) {
	const [openModal, setOpenModal] = useState(false);

	return (
		<>
			{pdfBlob && <SendEmailModal pdfBlob={pdfBlob} showModal={openModal} closeModal={setOpenModal} />}
			<button className="font-bold bg-primary-light text-white px-4 py-3 flex items-center justify-center gap-2 w-48" onClick={() => resetUrl(null)}>
				<span className="icon-[bytesize--eye]" /> <span className="text-sm">Ver documento</span>
			</button>
			<button
				className="font-bold bg-primary-light text-white px-4 py-3 flex items-center justify-center gap-2 w-48"
				onClick={() => setOpenModal(false)}
			>
				<span className="icon-[bytesize--eye]" /> <span className="text-sm">Enviar por mail</span>
			</button>
			<div className="mt-4 border rounded-lg overflow-hidden">
				<iframe src={pdfUrl} width="100%" height="1000px" />
			</div>
		</>
	);
}
