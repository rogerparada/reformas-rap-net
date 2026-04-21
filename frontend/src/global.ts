import { Colors } from "./types";

export const Icon = {
	avatar: "icon-[streamline--user-multiple-circle-solid]",
	back: "icon-[lets-icons--back]",
	confirm: "icon-[typcn--tick]",
	cancel: "icon-[hugeicons--cancel-01]",
	delete: "icon-[wpf--delete]",
	edit: "icon-[material-symbols--edit]",
	doc_add: "icon-[hugeicons--file-add]",
	doc_pdf: "icon-[teenyicons--pdf-outline]",
	doc_preview: "icon-[whh--preview]",
	doc_save: "icon-[si-glyph--document-checked]",
	erase: "icon-[icon-park-twotone--clear-format]",
	error: "icon-[codicon--error]",
	loading: "icon-[line-md--loading-alt-loop]",
	mail: "icon-[line-md--email]",
	plus: "icon-[fluent-emoji-high-contrast--plus]",
	reset: "icon-[system-uicons--reset]",
	save: "icon-[ps--save]",
	send: "icon-[tabler--send]",
	view: "icon-[topcoat--view]",
	forward: "icon-[codicon--forward]",
	forwardAll: "icon-[material-symbols-light--forward]",
};

export const textColor: Record<Colors, string> = {
	default: "text-primary",
	blue: "text-blue-500",
	primary: "text-primary",
	red: "text-red-500",
};

export const bgColor: Record<Colors, string> = {
	default: "bg-primary!",
	blue: "bg-blue-500!",
	primary: "bg-primary!",
	red: "bg-red-500!",
};
