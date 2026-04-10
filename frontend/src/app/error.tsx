"use client";

export default function Error({ error }: { error: Error }) {
	return (
		<div className="container mx-auto h-screen flex flex-col gap-4 justify-center items-center">
			<p className="text-primary text-2xl font-bold">Error al cargar la página</p>
			<details className="p-10 border-primary border-dashed rounded-lg border-2 w-3xl">
				<summary className="text-primary-dark font-bold">Ver detalles</summary>
				<div className="italic mt-4">{error.message}</div>
			</details>
		</div>
	);
}
