import { StateCreator } from "zustand";
import { ItemTable, NewItemTable } from "../types/items";

export type ItemsSlice = {
	items: ItemTable[];
	subtotal: number;
	iva: number;
	total: number;
	setItems: (items: ItemTable[]) => void;
	addItem: (item: NewItemTable) => void;
	editItem: (item: ItemTable) => void;
	removeItem: (id: string) => void;
	clearItems: () => void;
};

const calculateTotals = (items: ItemTable[]) => {
	const subtotal = items.reduce((sum, item) => (sum += item.total), 0);
	const iva = subtotal * 0.21;
	const total = subtotal + iva;

	return { subtotal, iva, total };
};

export const createItemsSlice: StateCreator<ItemsSlice> = (set, get) => ({
	items: [],
	subtotal: 0,
	iva: 0,
	total: 0,

	setItems: (items) => {
		const totals = calculateTotals(items);
		set({ items, ...totals });
	},

	addItem: (item: NewItemTable) => {
		const id = `new-${get().items.length + 1}`;
		const items: ItemTable[] = [...get().items, { ...item, id }];
		const totals = calculateTotals(items);

		set(() => ({ items, ...totals }));
	},

	editItem: (item: ItemTable) => {
		const oldItem = get().items.find((i) => i.id === item.id);
		if (oldItem) {
			const items = get().items.map((i) => (i.id === item.id ? item : i));
			const totals = calculateTotals(items);
			set(() => ({ items, ...totals }));
		}
	},

	removeItem: (id: string) => {
		const item = get().items.find((i) => i.id === id);
		if (item) {
			const items = get().items.filter((i) => i.id !== id);
			const totals = calculateTotals(items);
			set(() => ({ items, ...totals }));
		}
	},

	clearItems: () => {
		set({ items: [], subtotal: 0, iva: 0, total: 0 });
	},
});
