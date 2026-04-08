import Link from "next/link";

type Props = {
	tipo: string;
	url: string;
	text?: string;
};

export default function NoData({ tipo, url }: Props) {
	return (
		<div className="w-full min-h-96 border-3 border-dashed border-primary rounded-xl flex flex-col justify-center items-center text-primary gap-4">
			<span className="icon-[fluent--prohibited-12-regular] text-9xl" />

			<span className="text-primary-light mt-10">
				No se ha encontrado el <span className="font-bold underline">{tipo}</span>.
			</span>
			<Link
				href={url}
				className="cursor-pointer border-2 border-primary p-4 rounded-lg font-bold  hover:bg-primary hover:text-white transition-all duration-150"
			>
				<span>Volver a {tipo}s </span>
			</Link>
		</div>
	);
}
