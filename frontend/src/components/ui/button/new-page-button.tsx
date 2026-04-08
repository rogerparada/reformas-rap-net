import Link from "next/link";

type NewPageButtonProps = {
	tipo: string;
	url: string;
};

export default function NewPageButton({ tipo, url }: NewPageButtonProps) {
	return (
		<div className="mb-10 flex flex-row justify-end items-end">
			<Link
				href={url}
				className="bg-primary-extra-light  text-white w-56 h-12 p-2 rounded-lg flex items-center justify-center gap-3 hover:bg-primary transition-colors duration-150"
			>
				<span className="icon-[line-md--plus-circle] text-3xl" />
				<span className="font-bold text-white">{`Nuevo ${tipo}`}</span>
			</Link>
		</div>
	);
}
