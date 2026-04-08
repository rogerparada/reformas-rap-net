import { useRouter } from "next/navigation";
import { useAppStore } from "../store/useAppStore";
import { EditableDocument } from "../types";

export function useSetDocument() {
	const state = useAppStore.getState();

	const router = useRouter();

	const clearAllData = () => {
		state.clearDocument();
		state.clearItems();
		router.replace(window.location.pathname);
	};

	const setData = (doc: EditableDocument) => {
		state.setDocument(doc.document);
		state.setClient(doc.client);
		state.setItems(doc.data?.items);
	};

	return { setData, clearAllData };
}
