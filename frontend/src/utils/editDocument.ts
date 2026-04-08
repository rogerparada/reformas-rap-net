import { useAppStore } from "../store/useAppStore";
import { EditableDocument } from "../types";

export function setDocumentState(doc?: EditableDocument) {
	const state = useAppStore.getState();

	if (!doc) {
		state.clearDocument();
		state.clearClient();
		state.clearItems();
		return;
	}

	const { document, client, data } = doc;
	state.setDocument(document);
	state.setClient(client);
	state.setItems(data.items);
}
