"use client";

import { useRef, useState } from "react";
import ContextMenu from "../contextmenu/ContextMenu";
import { ContextMenuItemType } from "@/types";

type Props = {
	options: ContextMenuItemType[];
	width?: number;
};

export default function MenuButton({ options, width = 150 }: Props) {
	const ref = useRef<HTMLButtonElement | null>(null);
	const [isToggled, setIsToggled] = useState(false);
	const [position, setPosition] = useState({ x: 0, y: 0 });

	const handleClick = (e: React.MouseEvent) => {
		const windowWidth = window.innerWidth;
		const x = e.clientX + width > windowWidth ? e.clientX - width : e.clientX;
		setPosition({ x, y: e.clientY });
		setIsToggled(!isToggled);
	};

	return (
		<>
			<button
				ref={ref}
				onClick={handleClick}
				className="h-9 w-9 flex items-center justify-center hover:bg-slate-100 text-lg hover:text-xl transition-all duration-300 ease-in-out"
			>
				<span className="icon-[charm--menu-kebab]" />
			</button>
			<ContextMenu position={position} setIsToggled={setIsToggled} isToggled={isToggled} refElement={ref} options={options} />
		</>
	);
}
