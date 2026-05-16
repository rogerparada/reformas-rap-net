import { StateCreator } from "zustand";
import { ItemTable, NewItemTable } from "../types/items";

export type ItemsSlice = {
	items: ItemTable[];
	subtotal: number;
	iva: number;
	taxes: number;
	total: number;
	setItems: (items: ItemTable[]) => void;
	addItem: (item: NewItemTable) => void;
	editItem: (item: ItemTable) => void;
	removeItem: (id: string) => void;
	setTaxes: (value: number) => void;
	clearItems: () => void;
};

const calculateTotals = (items: ItemTable[], taxes: number = 0) => {
	const subtotal = items.reduce((sum, item) => (sum += item.total), 0);
	const iva = subtotal * taxes;
	const total = subtotal + iva;
	return { subtotal, iva, total };
};

export const createItemsSlice: StateCreator<ItemsSlice> = (set, get) => ({
	items: [],
	subtotal: 0,
	iva: 0,
	taxes: 0,
	total: 0,

	setItems: (items) => {
		const taxes = get().taxes;
		const totals = calculateTotals(items, taxes);
		set({ items, ...totals });
	},

	addItem: (item: NewItemTable) => {
		const id = `new-${get().items.length + 1}`;
		const total = item.quantity >= 1 ? item.quantity * item.price : item.price;
		const items: ItemTable[] = [...get().items, { ...item, id, total }];
		const taxes = get().taxes;
		const totals = calculateTotals(items, taxes);

		set(() => ({ items, ...totals }));
	},

	editItem: (item: ItemTable) => {
		const oldItem = get().items.find((i) => i.id === item.id);
		if (oldItem) {
			const total = item.quantity >= 1 ? item.quantity * item.price : item.price;
			const items = get().items.map((i) => (i.id === item.id ? { ...item, total } : i));
			const taxes = get().taxes;
			const totals = calculateTotals(items, taxes);
			set(() => ({ items, ...totals }));
		}
	},

	removeItem: (id: string) => {
		const item = get().items.find((i) => i.id === id);
		if (item) {
			const items = get().items.filter((i) => i.id !== id);
			const taxes = get().taxes;
			const totals = calculateTotals(items, taxes);
			set(() => ({ items, ...totals }));
		}
	},

	setTaxes: (value) => {
		const taxes = value / 100;
		const items = get().items;
		if (items.length > 0) {
			const totals = calculateTotals(items, taxes);
			set(() => ({ taxes, ...totals }));
			return;
		}

		set(() => ({ taxes }));
	},

	clearItems: () => {
		set({ items: [], subtotal: 0, iva: 0, total: 0 });
	},
});
