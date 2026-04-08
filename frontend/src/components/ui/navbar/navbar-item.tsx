import { MenuItem } from "@/types";
import Link from "next/link";

export default function NavbarItem({ item, click }: { item: MenuItem; click?: () => void }) {
	return (
		<Link href={item.link} className="flex justify-center items-center gap-1 h-full text-white" onClick={click}>
			<span className={item.icon} />
			<span className="font-black">{item.text}</span>
		</Link>
	);
}
