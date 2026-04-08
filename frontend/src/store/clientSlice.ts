import { StateCreator } from "zustand";
import { ClientInfo } from "../types/description";

export type ClientSlice = {
	client: ClientInfo;
	setClient: (client: ClientInfo) => void;
	changeClientAttribute: (key: keyof ClientInfo, value: string) => void;
	clearClient: () => void;
};

const initialClient: ClientInfo = { id: "", name: "", documentId: "", nif: "" };

export const createClientSlice: StateCreator<ClientSlice> = (set) => ({
	client: initialClient,
	setClient: (client: ClientInfo) => {
		set({ client });
	},
	changeClientAttribute: (key, value) => {
		set((state) => ({ client: { ...state.client, [key]: value } }));
	},
	clearClient: () => {
		set({ client: initialClient });
	},
});
