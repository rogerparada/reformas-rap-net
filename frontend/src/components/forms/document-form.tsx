"use client";
import { useEffect } from "react";
import { ClienteResponse, EditableDocument } from "@/types";
import { setDocumentState } from "@/utils/editDocument";
import InfoDocumento from "../cards/info-documento";
import DocumentResume from "../cards/document-resume";
import ItemList from "../items/item-list";
import NewItem from "../items/new-item";
import { useRouter } from "next/navigation";
import NewItemModal from "../modal/new-item-modal";

type Props = {
	doc?: EditableDocument;
	clear?: boolean;
	clients?: ClienteResponse[];
};

export default function DocumentForm({ doc, clear, clients }: Props) {
	const router = useRouter();

	useEffect(() => {
		if (doc) setDocumentState(doc);
	}, [doc]);

	useEffect(() => {
		if (clear) {
			router.replace(window.location.pathname);
			setDocumentState();
		}
	}, [clear, router]);

	return (
		<>
			<div className="info_panel">
				<InfoDocumento options={clients} />
				<DocumentResume />
			</div>
			<div className="flex justify-end">
				<NewItemModal />
			</div>
			<ItemList />
		</>
	);
}
