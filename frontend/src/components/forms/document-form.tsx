"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ClienteResponse, EditableDocument } from "@/types";
import { setDocumentState } from "@/shared/utils/editDocument";
import { useAppStore } from "@/store/useAppStore";
import InfoDocumento from "../cards/info-documento";
import DocumentResume from "../cards/document-resume";
import ItemList from "../items/item-list";
import NewItemModal from "../modal/new-item-modal";

type Props = {
	doc?: EditableDocument;
	clear?: boolean;
	clients?: ClienteResponse[];
	nextNumber?: string;
};

export default function DocumentForm({ doc, clear, clients, nextNumber }: Props) {
	const router = useRouter();
	const changeDocumentAttribute = useAppStore((state) => state.changeDocumentAttribute);

	useEffect(() => {
		if (doc) setDocumentState(doc);
	}, [doc]);

	useEffect(() => {
		if (clear) {
			router.replace(window.location.pathname);
			setDocumentState();
		}
	}, [clear, router]);

	useEffect(() => {
		if (!doc && !clear && nextNumber) {
			changeDocumentAttribute("numeroDocumento", nextNumber);
		}
	}, [nextNumber, doc, clear, changeDocumentAttribute]);

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
