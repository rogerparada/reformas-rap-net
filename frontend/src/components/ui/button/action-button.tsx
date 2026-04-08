import { Icon } from "@/global";
import { Colors, IconKey } from "@/types";

type ActionButtonProps = {
	action?: () => void;
	color?: Colors;
	icon: IconKey;
	text?: string;
	type?: "button" | "submit" | "reset";
};

export default function ActionButton({ icon, action, color = "primary", text, type = "button" }: ActionButtonProps) {
	return (
		<button type={type} className={`animated-${color} ${!text ? "action_button" : "options_button"}`} onClick={action}>
			<span className={Icon[icon]} />
			<span className="text-sm">{text}</span>
		</button>
	);
}
