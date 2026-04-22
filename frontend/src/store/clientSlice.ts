import { StateCreator } from "zustand";
import { ClienteInfo, ClienteResponse } from "../types/description";

export type ClientSlice = {
	client: ClienteResponse;
	setClient: (client: ClienteResponse) => void;
	changeClientAttribute: (key: keyof ClienteResponse, value: string) => void;
	clearClient: () => void;
};

const initialClient: ClienteResponse = { id: "", name: "", nif: "", email: "", city: "", phone: "", address: "", documentos: 0 };

export const createClientSlice: StateCreator<ClientSlice> = (set) => ({
	client: initialClient,
	setClient: (client: ClienteResponse) => {
		set({ client });
	},
	changeClientAttribute: (key, value) => {
		set((state) => ({ client: { ...state.client, [key]: value } }));
	},
	clearClient: () => {
		set({ client: initialClient });
	},
});
