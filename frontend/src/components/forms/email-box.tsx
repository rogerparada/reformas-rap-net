"use client";

type Props = {
	label: string;
	name: string;
	value?: string;
	required?: boolean;
	readOnly?: boolean;
};

export default function EmailBox({ label, name, value, required, readOnly }: Props) {
	return (
		<div className="email_box">
			<div>
				<label htmlFor={name} className="font-bold text-white">
					{label}
				</label>
			</div>

			<input type="text" name={name} id={name} required={required} defaultValue={value} readOnly={readOnly} />
		</div>
	);
}
