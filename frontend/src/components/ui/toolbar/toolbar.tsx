"use client";
import { ToolbarButtonType } from "@/types";
import ToolbarButton from "./toolbar-button";

type Props = {
	buttons?: ToolbarButtonType[];
};

export default function Toolbar({ buttons }: Props) {
	return (
		<div className="w-full flex items-end justify-end p-4 gap-2">
			{buttons?.map((button, index) => (
				<ToolbarButton key={`bt-${index}`} {...button} />
			))}
		</div>
	);
}
