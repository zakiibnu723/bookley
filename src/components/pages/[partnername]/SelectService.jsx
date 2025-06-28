import LoadingComponent from "@/components/ui/loading/LoadingComponent";
import ServiceCard from "./ServiceCard";
import { useRouter, useParams } from "next/navigation";

export default function SelectService({ services, cart, setCart, loading, setLoading }) {
    const router = useRouter();
    const params = useParams();
    const partnername = params.partnername;

    const handlePilihSlot = () => {
        setLoading(true)
        if (cart.length === 0) return;
        const serviceIds = cart.map((item) => item.id).join(",");
        router.push(`/${partnername}/slot?services=${serviceIds}`);
        // setLoading(false)
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-4 pb-24">
            <div>
                <h3 className="text-2xl font-bold mb-6 text-neutral">Pilih Layanan</h3>
                <div className="space-y-4">
                    {services.map((service) => {
                        const isInCart = cart.find((item) => item.id === service.id);
                        return (
                            <ServiceCard
                                key={service.id}
                                service={service}
                                isInCart={!!isInCart}
                                onToggleCart={() => {
                                    if (isInCart) {
                                        setCart(cart.filter((item) => item.id !== service.id));
                                    } else {
                                        setCart([...cart, service]);
                                    }
                                }}
                            />
                        );
                    })}
                </div>
            </div>
            <button
                className="btn btn-primary text-white w-full mt-8"
                onClick={handlePilihSlot}
                disabled={cart.length === 0}
            >
                Pilih Slot Waktu
            </button>
        </div>
    );
}