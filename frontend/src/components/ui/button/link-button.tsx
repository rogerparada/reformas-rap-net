import { Icon } from "@/global";
import { Colors, IconKey } from "@/types";
import Link from "next/link";

type LinkButtonProps = {
	icon: IconKey;
	link: string;
	text: string;
	color?: Colors;
};

export default function LinkButton({ color = "primary", icon, link, text }: LinkButtonProps) {
	return (
		<Link href={link} className={`animated-${color} options_button`}>
			<span className={Icon[icon]} />
			<span className="text-sm">{text}</span>
		</Link>
	);
}
