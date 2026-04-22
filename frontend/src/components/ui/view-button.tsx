"use client";

import { useAppStore } from "@/store/useAppStore";
import LinkButton from "./button/link-button";

type ViewButtonProps = {
	edit: boolean;
	link: string;
};

export default function ViewButton({ edit, link }: ViewButtonProps) {
	const tipo = useAppStore((state) => state.document?.tipoDocumento);
	const client = useAppStore((state) => state.client?.id);
	if (!client && !edit) {
		return (
			<button className="options_button disabled">
				<span className="icon-[formkit--eyeclosed]" />
				<span className="text-sm">{`Ver ${tipo}`}</span>
			</button>
		);
	}

	return <LinkButton icon={edit ? "edit" : "doc_preview"} link={link} text={`${edit ? "Editar" : "Ver"} ${tipo}`} />;
}
