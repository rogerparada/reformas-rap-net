import { Icon } from "../global";

export type MenuItem = {
	icon?: string;
	text: string;
	link: string;
};

export type IconKey = keyof typeof Icon;
export type Colors = "default" | "blue" | "primary" | "red";
