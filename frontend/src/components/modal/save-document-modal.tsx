"use client";

import { useState } from "react";
import Modal from "./modal";
import ActionButton from "../ui/button/action-button";
import ModalMessage from "./modal-message";
import { IconKey, SaveDocumentInput } from "@/types";
import { actions } from "@/actions";
import { useRouter } from "next/navigation";

type Props = {
	document: SaveDocumentInput;
	edit?: boolean;
	icon?: IconKey;
	draw?: boolean;
	text: string;
	route: string;
};

export default function SaveDocumentModal({ document, draw = false, icon = "save", edit = false, route, text }: Props) {
	const [open, setOpen] = useState(false);
	const [validating, setValidating] = useState(false);
	const [errors, setErrors] = useState<string[]>([]);
	const [validated, setValidated] = useState(false);
	const router = useRouter();
	const [id, setId] = useState("");

	const handleSave = async () => {
		setOpen(true);
		setValidating(true);
		const val = !edit ? await actions.document.createDocumentAction(document) : await actions.document.editDocumentAction(document);
		setValidating(false);
		setValidated(val.success ?? false);
		setErrors(val.errors ?? []);
		if (val.data) {
			setId(val.data);
		}
		return;
	};

	const handleClose = () => {
		const err = errors;
		setValidated(false);
		setOpen(false);
		setErrors([]);
		const url = !draw ? `${route}/${id}` : route;

		if (err.length === 0) router.push(url);
	};

	return (
		<>
			<ActionButton icon={icon} text={text} action={handleSave} />
			<Modal open={open} close={handleClose}>
				{validating && <ModalMessage icon="loading" title="Validando datos" text="Por favor espere..." color="blue" />}
				{!validating && (
					<>
						{errors.length > 0 && <ModalMessage icon="error" color="red" items={errors} button close={handleClose} />}
						{validated && <ModalMessage icon="doc_save" text="Se ha guardado correctamente." color="blue" button close={handleClose} />}
					</>
				)}
			</Modal>
		</>
	);
}
