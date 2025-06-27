export default function ServiceCard({ service, isInCart, onToggleCart }) {
	return (
		<div
			className={`bg-base-100 card border-1 border-gray-300 flex flex-row items-center p-5 transition-all duration-300 ${
				isInCart ? "border-primary ring-neutral/90 scale-[0.98]" : ""
			}`}
		>
			<div className="flex-1 space-y-1">
				<h3 className="font-medium text-neutral">{service.name}</h3>
                <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                <div className="flex items-center gap-1">
                    {/* Clock icon */}
                    <svg
                    className="h-3 w-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    >
                    <circle cx="12" cy="12" r="10" />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 6v6l4 2"
                    />
                    </svg>
                    <span>{service.duration} menit</span>
                </div>
                <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                <span className="font-medium text-neutral">{service.price}</span>
                </div>
			</div>
			<button
				className={`btn btn-circle w-6 h-6 p-0 transition-all duration-300 ${
					isInCart
						? "bg-transparent border-primary text-neutral border-none"
						: "btn-primary"
				}`}
				onClick={onToggleCart}
				title={isInCart ? "Hapus dari keranjang" : "Tambah ke keranjang"}
			>
				{isInCart ? (
					// Icon centang
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 text-primary"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={3}
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
					</svg>
				) : (
					// Icon plus
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={3}
					>
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
					</svg>
				)}
			</button>
		</div>
	);
}