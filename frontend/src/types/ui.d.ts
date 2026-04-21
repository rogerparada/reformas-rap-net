import { Icon } from "../global";

export type MenuItem = {
	icon?: string;
	text: string;
	link: string;
};

export type IconKey = keyof typeof Icon;
export type Colors = "default" | "blue" | "primary" | "red";

export type ContextMenuItemType = {
	label: string;
	icon?: IconKey;
	url?: string;
	action?: () => void;
};

export type ToolbarButtonType = {
	action?: () => void;
	color?: Colors;
	icon: IconKey;
	label?: string;
	showText?: boolean;
	submit?: boolean;
	url?: string;
};
