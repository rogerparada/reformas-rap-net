"use client";

import Toolbar from "../ui/toolbar/toolbar";
import { ToolbarButtonType } from "@/types";
import { useMailOptions } from "@/hooks/useMailOptions";

type Props = {
	id?: string;
	action: "edit" | "forward" | "draft";
};

export default function EmailOptions({ action, id }: Props) {
	const { deleteMail, forwardEmail } = useMailOptions();

	const edit: ToolbarButtonType[] = [
		{
			icon: "save",
			label: "Guardar",
			color: "blue",
			submit: true,
		},
		{
			icon: "send",
			label: "Enviar",
			submit: true,
		},
	];

	const forward: ToolbarButtonType[] = [
		{
			icon: "forward",
			label: "Reenviar",
			color: "blue",
		},
		{
			icon: "forwardAll",
			label: "Responder a todos",
			color: "blue",
		},
	];

	const draft: ToolbarButtonType[] = [
		{
			icon: "edit",
			label: "Editar",
			color: "blue",
			url: `/gestion/emails/${id}/edit`,
		},
		{
			icon: "send",
			label: "Enviar",
			action: async () => await forwardEmail(id!),
		},
		{
			icon: "delete",
			label: "Eliminar",
			color: "red",
			action: deleteMail,
		},
	];

	let buttons: ToolbarButtonType[] = [];

	switch (action) {
		case "edit":
			buttons = edit;
			break;
		case "forward":
			buttons = forward;
			break;
		case "draft":
			buttons = draft;
			break;
	}

	return <Toolbar buttons={buttons} />;
}
