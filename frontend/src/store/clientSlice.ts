import { StateCreator } from "zustand";
import { ClienteInfo } from "../types/description";

export type ClientSlice = {
	client: ClienteInfo;
	setClient: (client: ClienteInfo) => void;
	changeClientAttribute: (key: keyof ClienteInfo, value: string) => void;
	clearClient: () => void;
};

const initialClient: ClienteInfo = { id: "", name: "", nif: "", email: "", city: "", phone: "", address: "" };

export const createClientSlice: StateCreator<ClientSlice> = (set) => ({
	client: initialClient,
	setClient: (client: ClienteInfo) => {
		set({ client });
	},
	changeClientAttribute: (key, value) => {
		set((state) => ({ client: { ...state.client, [key]: value } }));
	},
	clearClient: () => {
		set({ client: initialClient });
	},
});
