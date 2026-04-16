import { ContextMenuItemType } from "@/types";
import { Icon } from "@/global";
import Link from "next/link";

export default function ContextMenuItem({ icon = "save", label, url, action }: ContextMenuItemType) {
	const style = {
		active: "h-10 first:rounded-t-md last:rounded-b-md  border-slate-300 flex items-center px-3",
		disabled: "h-10 first:rounded-t-sm last:rounded-b-sm border-slate-300 bg-slate-400 text-slate-50 flex items-center px-3 cursor-not-allowed",
	};

	return url ? (
		<Link href={url} className={style.active}>
			<span className={Icon[icon]} />
			<span className="flex-1">{label}</span>
		</Link>
	) : (
		<div className={!action ? style.disabled : `${style.active} cursor-pointer`}>
			<span className={Icon[icon]} />
			<span className="flex-1 font-light">{label}</span>
		</div>
	);
}
