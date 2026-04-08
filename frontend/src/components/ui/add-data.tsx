import Link from "next/link";

type Props = {
	tipo: string;
	url: string;
	text?: string;
};

export default function AddData({ tipo, text, url }: Props) {
	return (
		<div className="w-full min-h-96 border-3 border-dashed border-primary rounded-xl flex flex-col justify-center items-center">
			<Link href={url} className=" text-9xl text-primary cursor-pointer">
				<span className="icon-[line-md--plus-circle]" />
			</Link>
			{!text ? (
				<span className="text-primary-light">
					No hay <span className="font-bold underline">{tipo}</span> disponibles por favor cree uno nuevo.
				</span>
			) : (
				<span className="text-primary-light font-bold">{text}</span>
			)}
		</div>
	);
}
