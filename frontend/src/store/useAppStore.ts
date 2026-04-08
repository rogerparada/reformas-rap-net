import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DocumentSlice, createDocumentSlice } from "./documentSlice";
import { ItemsSlice, createItemsSlice } from "./itemsSlice";
import { ClientSlice, createClientSlice } from "./clientSlice";

export const useAppStore = create<ItemsSlice & DocumentSlice & ClientSlice>()(
	devtools(
		persist(
			(...a) => ({
				...createItemsSlice(...a),
				...createDocumentSlice(...a),
				...createClientSlice(...a),
			}),
			{ name: "company-store" }
		)
	)
);
