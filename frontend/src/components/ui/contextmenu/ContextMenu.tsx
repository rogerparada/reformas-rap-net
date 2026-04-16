"use client";

import { ContextMenuItemType } from "@/types";
import styles from "./ContextMenu.module.css";
import ContextMenuItem from "./ContextMenuItem";
import { Dispatch, SetStateAction, useEffect } from "react";

type Props = {
	position: { x: number; y: number };
	isToggled: boolean;
	setIsToggled: Dispatch<SetStateAction<boolean>>;
	refElement: React.RefObject<HTMLButtonElement | HTMLDivElement | null>;
	options: ContextMenuItemType[];
	width?: number;
};

export default function ContextMenu({ setIsToggled, isToggled, position, options = [], refElement, width = 150 }: Props) {
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (refElement.current && !refElement.current.contains(event.target as Node)) {
				setIsToggled(false);
			}
		};

		if (isToggled) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isToggled, refElement, setIsToggled]);

	if (!isToggled) return null;

	return (
		<div
			className={styles.menu}
			style={{
				position: "absolute",
				width,
				top: position.y + 2 + "px",
				left: position.x + 2 + "px",
			}}
		>
			{options.map((item, index) => (
				<ContextMenuItem key={index} {...item} />
			))}
		</div>
	);
}
