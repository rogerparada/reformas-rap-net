"use client";

import { useState } from "react";
import NewClientForm from "../forms/new-client-form";
import Modal from "./modal";
import ActionButton from "../ui/button/action-button";

type NewClientModalProps = {
	open?: boolean;
	text?: string;
	retrieve?: boolean;
};

export default function NewClientModal({ open = false, text, retrieve = false }: NewClientModalProps) {
	const [openModal, setOpenModal] = useState(open);

	return (
		<>
			<ActionButton icon="plus" action={() => setOpenModal((prev) => !prev)} text={text} />
			<Modal open={openModal} close={() => setOpenModal(false)}>
				<NewClientForm retrieve={retrieve} />
			</Modal>
		</>
	);
}
