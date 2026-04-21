"use client";
import { Icon, textColor } from "@/global";
import { ToolbarButtonType } from "@/types";
import Link from "next/link";

export default function ToolbarButton({ icon, showText = true, label, color = "default", action, submit = false, url }: ToolbarButtonType) {
	const colorClass = color ? textColor[color] : "";

	if (url) {
		return (
			<Link
				className={`h-10 flex items-center gap-2 hover:bg-slate-200 rounded-sm p-2 transition-colors duration-300 text-xl ${colorClass}`}
				href={url}
			>
				<span className={Icon[icon]} />
				{showText && <span className="text-sm">{label}</span>}
			</Link>
		);
	}

	return (
		<div className="relative flex flex-col items-center group">
			{!submit ? (
				<button
					className={`h-10 flex items-center gap-2 hover:bg-slate-200 rounded-sm p-2 transition-colors duration-300 text-xl ${colorClass}`}
					onClick={action}
					type="button"
				>
					<span className={Icon[icon]} />
					{showText && <span className="text-sm">{label}</span>}
				</button>
			) : (
				<button
					className={`h-10 flex items-center gap-2 hover:bg-slate-200 rounded-sm p-2 transition-colors duration-300 text-xl ${colorClass}`}
					onClick={action}
					type="submit"
					name="action"
					value={icon}
				>
					<span className={Icon[icon]} />
					{showText && <span className="text-sm">{label}</span>}
				</button>
			)}

			<div className="absolute bottom-full mb-1 flex flex-col items-center invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300">
				<div className="bg-gray-800 text-white text-xs py-1.5 px-3 rounded-md whitespace-nowrap shadow-xl">{label}</div>
				<div className="w-2 h-2 bg-gray-800 rotate-45 -mt-1"></div>
			</div>
		</div>
	);
}
