import { Dispatch, SetStateAction } from "react";

type Props = {
	text?: string;
	show: Dispatch<SetStateAction<boolean>>;
	close?: boolean;
};

export default function ShowButton({ text, show, close = false }: Props) {
	return (
		<div
			className="p-2 border border-slate-400 rounded-md w-12 text-xs font-bold h-10 flex items-center justify-center hover:bg-slate-400 hover:text-white transition-all duration-300 cursor-pointer"
			onClick={() => show(close)}
		>
			{!text ? <span className="icon-[fa7-solid--close] text-xl" /> : <span>{text}</span>}
		</div>
	);
}
