export default function SkeletonLoading() {
	return (
		<div className="w-full min-h-100 flex flex-col justify-center items-center text-primary">
			<span className="icon-[line-md--loading-alt-loop] text-9xl" />
			<span className="font-bold">Cargando datos...</span>
		</div>
	);
}
