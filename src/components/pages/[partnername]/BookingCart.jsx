export default function BookingCart({ show, cart, removeFromCart }) {
	if (!show) return null;
	return (
		<div className="fixed left-6 bottom-28 z-20 w-72 bg-base-100 rounded-xl shadow-lg p-4">
			<h3 className="font-bold mb-2">Keranjang Layanan</h3>
			{cart.length === 0 ? (
				<div className="text-sm text-gray-400">Belum ada layanan.</div>
			) : (
				<ul className="space-y-2">
					{cart.map((item) => (
						<li key={item.id} className="flex justify-between items-center">
							<span>
								{item.name}{" "}
								<span className="text-xs text-gray-400">
									({item.duration})
								</span>
							</span>
							<button
								className="btn btn-xs btn-error"
								onClick={() => removeFromCart(item.id)}
							>
								Hapus
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}