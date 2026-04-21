"use client";

import { useState } from "react";
import ViewButton from "../ui/view-button";
import SavePdfButton from "../ui/button/save-pdf-button";
import SenMailModal from "../modal/send-mail-modal";
import { useAppStore } from "@/store/useAppStore";
import ActionButton from "../ui/button/action-button";
import DeleteDocumentButton from "../ui/button/delete-document-button";
import { DocumentInfo } from "@/types";

type DocumentOptionsProps = {
	edit?: boolean;
	id?: DocumentInfo["idDocumento"];
	name?: string;
	link: string;
};

export default function DocumentOptions({ id, edit, link, name }: DocumentOptionsProps) {
	const [modal, setModal] = useState(false);
	const email = useAppStore((state) => state.client?.email);

	if (!id || !name)
		return (
			<div className="container mx-auto p-3 flex justify-between gap-5 max-w-5xl">
				<ViewButton edit link={link} />
			</div>
		);

	return (
		<>
			<SenMailModal showModal={modal} closeModal={setModal} attachment={id} />
			<div className="container mx-auto p-3 flex justify-between gap-5 max-w-5xl">
				<ViewButton edit link={link} />
				{email && <ActionButton icon="mail" action={() => setModal(true)} text="Enviar por mail" />}
				<SavePdfButton id={id} name={name} />
				{edit && <DeleteDocumentButton id={id} />}
			</div>
		</>
	);
}
