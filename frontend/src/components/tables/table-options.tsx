"use client";
import { useClearTable } from "@/hooks/useClearTable";
import { useAppStore } from "@/store/useAppStore";

export default function TableOptions() {
	const items = useAppStore((state) => state.items);
	const { clearTable } = useClearTable();
	return (
		<div className="flex gap-2">
			<button
				onClick={() => clearTable()}
				className="w-32 h-8 mt-10 font-bold bg-red-800 border-2 border-red-800 text-white rounded-md cursor-pointer
				transition-colors duration-300 ease-in-out
				hover:bg-transparent hover:text-red-800 
				disabled:opacity-20 disabled:hover:bg-red-800 disabled:hover:text-white disabled:cursor-not-allowed"
				disabled={items.length === 0}
			>
				Limpiar
			</button>
		</div>
	);
}
