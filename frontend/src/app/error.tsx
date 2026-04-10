"use client";

export default function Error({ error }: { error: Error }) {
	return (
		<div className="container mx-auto h-screen flex justify-center items-center">
			<p className="text-primary text-2xl">Algo salió mal</p>;
			<details>
				<summary>Ver detalles</summary>
				{error.message}
			</details>
		</div>
	);
}
