export default function CartButton({ cartCount, onClick }) {
	return (
		<button
			className="fixed bottom-16 z-10 left-4 btn btn-circle bg-transparent border-none shadow-none"
			onClick={onClick}
		>
			<span className="indicator">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="black"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.85-1.53L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7"
					/>
				</svg>
				{cartCount > 0 && (
					<span className="badge badge-sm badge-error indicator-item">
						{cartCount}
					</span>
				)}
			</span>
		</button>
	);
}