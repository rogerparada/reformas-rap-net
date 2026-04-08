import { bgColor, Icon, textColor } from "@/global";
import { Colors, IconKey } from "@/types";

type ModalMessageProps = {
	icon: IconKey;
	button?: boolean;
	close?: () => void;
	color?: Colors;
	title?: string;
	text?: string;
	items?: string[];
};

export default function ModalMessage({ icon, button = false, close, color, items, title, text }: ModalMessageProps) {
	const text_color = textColor[color ?? "default"];
	const bg_color = bgColor[color ?? "default"];

	return (
		<div className={`modal_message ${text_color}`}>
			<h1 className="text-4xl font-bold">{title}</h1>
			<span className={`${Icon[icon]} ${text_color}`} />
			<span className="text-xl">{text}</span>
			{items && (
				<div className="text-sm text-center">
					{items.map((item, index) => (
						<p key={`error-${index}`}>{item}</p>
					))}
				</div>
			)}
			{button && (
				<button className={`${bg_color} ${text_color}`} onClick={close}>
					<span>Cerrar</span>
				</button>
			)}
		</div>
	);
}
