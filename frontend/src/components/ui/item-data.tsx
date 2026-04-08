import Link from "next/link";

type Props = {
	icon: string;
	text: string;
	url: string;
};

export default function ItemData({ icon, text, url }: Props) {
	return (
		<Link href={url} className="item_data">
			<span className={icon} />
			<span>{text}</span>
		</Link>
	);
}
