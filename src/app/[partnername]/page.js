"use client";
import React, { useState, useEffect, use } from "react";
import PartnerProfile from "@/components/pages/[partnername]/PartnerProfile";
import SelectService from "@/components/pages/[partnername]/SelectService";
import BookingCart from "@/components/pages/[partnername]/BookingCart";
import CartButton from "@/components/pages/[partnername]/CartButton";
import { fetchPartnerByUsername } from "@/services/partnerService";
import { fetchServicesByPartner } from "@/services/serviceService";
import Error from "@/components/ui/Error";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/ui/loading/LoadingComponent";
import PartnerProfileDetail from "@/components/pages/[partnername]/PartnerProfileDetail";


export default function BookingPage({ params }) {
    const { partnername } = use(params);
    const router = useRouter();
    const [partner, setPartner] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([]);
    const [coverIdx, setCoverIdx] = useState(0);
    const [showCart, setShowCart] = useState(false);
    const [showProfileDetail, setShowProfileDetail] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const { data: partnerData } = await fetchPartnerByUsername(partnername);
            setPartner(partnerData);
            if (partnerData) {
                const { data: servicesData } = await fetchServicesByPartner(partnerData.id);
                setServices(servicesData || []);
            }
            setLoading(false);
        };
        loadData();
    }, [partnername]);

    // Auto slide cover
    useEffect(() => {
        if (!partner) return;
        const interval = setInterval(() => {
            setCoverIdx((idx) => (idx + 1) % partner.cover_images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [partner]);

    if (loading) return <LoadingComponent />
    if (!partner) {
        return (
            <Error
                title="Barbershop/salon tidak ditemukan"
                message="Silakan kembali dan pilih yang tersedia."
                action={
                    <button className="btn btn-primary mt-4" onClick={() => router.push("/")}>
                        Kembali ke Beranda
                    </button>
                }
            />
        );
    }

    return (
        <div className="min-h-screen bg-base-200">
            {/* Header */}
            <PartnerProfile
                partner={partner}
                onShowDetail={() => setShowProfileDetail(true)}
            />
            {/* <CartButton cartCount={cart.length} onClick={() => setShowCart((v) => !v)} /> */}
            {/* <BookingCart show={showCart} cart={cart} removeFromCart={(id) => setCart(cart.filter((item) => item.id !== id))} /> */}
            <SelectService services={services} cart={cart} setCart={setCart} loading={loading} setLoading={setLoading} />
            <PartnerProfileDetail
                partner={partner}
                show={showProfileDetail}
                onClose={() => setShowProfileDetail(false)}
            />
        </div>
    );
}