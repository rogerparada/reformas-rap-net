export type ItemTable = {
	id: number;
	key: string;
	description: string;
	price: number;
	quantity: number;
	total: number;
};

export type TableDetails = {
	items: ItemTable[];
	subtotal: number;
	iva: number;
	total: number;
	showIva?: boolean;
};

export type NewItemTable = Omit<ItemTable, "id">;
