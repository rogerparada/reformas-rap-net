"use client";

type TableHeaderProps = {
	action?: () => void;
	desc?: boolean;
	title: string;
	style?: "default" | "alphabetic" | "number";
	active?: boolean;
};

export default function TableHeader({ title, action, desc = false, style = "default", active = false }: TableHeaderProps) {
	const styles = {
		default: {
			up: "icon-[fa7-solid--sort-up]",
			down: "icon-[fa7-solid--sort-down]",
			sort: "icon-[fa7-solid--sort]",
		},
		alphabetic: {
			up: "icon-[fa-solid--sort-alpha-up]",
			down: "icon-[fa-solid--sort-alpha-down]",
			sort: "icon-[fa7-solid--sort]",
		},
		number: {
			up: "icon-[la--sort-numeric-up]",
			down: "icon-[la--sort-numeric-down]",
			sort: "icon-[la--sort-numeric]",
		},
	};

	const activeStyles = active && !desc ? styles[style].down : active && desc ? styles[style].up : styles[style].sort;

	return (
		<th className="h-10">
			<div className="flex justify-center items-center gap-2 h-10">
				<span className="">{title}</span>
				<button className="cursor-pointer h-5" onClick={action}>
					<span className={activeStyles} />
				</button>
			</div>
		</th>
	);
}
