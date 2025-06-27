import { useState, useEffect } from "react";
import * as serviceService from "@/services/serviceService";

export function useService(profile) {
  const [services, setServices] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile?.id) return;
    setLoading(true);
    serviceService.fetchServicesByPartner(profile?.id).then((res) => {
      setServices(res.data || []);
      setLoading(false);
    });
  }, [profile?.id]);

  const handleAddService = () => {
    setServices((prev) => [
      { name: "", duration: 0, price: 0, desc: "", partner_id: profile?.id },
      ...prev,
    ]);
    setEditing(0);
  };

  const handleServiceChange = (idx, field, value) => {
    setServices((prev) =>
      prev.map((s, i) => (i === idx ? { ...s, [field]: value } : s))
    );
  };

  const handleDeleteService = async (idx) => {
    const service = services[idx];
    if (!service?.id) {
      setServices((prev) => prev.filter((_, i) => i !== idx));
      setEditing(null);
      return;
    }
    if (!window.confirm("Yakin hapus layanan ini?")) return;
    setLoading(true);
    const { error } = await serviceService.deleteService(service.id);
    setLoading(false);
    if (error) {
      alert(error.message || "Gagal hapus layanan");
      return;
    }
    setServices((prev) => prev.filter((_, i) => i !== idx));
    setEditing(null);
  };

  const handleSaveService = async (idx) => {
    const service = services[idx];
    if (!service) return;
    setLoading(true);
    if (!service.id) {
      const { data, error } = await serviceService.addService(service);
      setLoading(false);
      if (error) {
        alert(error.message || "Gagal tambah layanan");
        return;
      }
      setServices((prev) =>
        prev.map((s, i) => (i === idx ? data : s))
      );
    } else {
      const { data, error } = await serviceService.updateService(service.id, service);
      setLoading(false);
      if (error) {
        alert(error.message || "Gagal update layanan");
        return;
      }
      setServices((prev) =>
        prev.map((s, i) => (i === idx ? data : s))
      );
    }
    setEditing(null);
  };

  return {
    services,
    editing,
    loading,
    setEditing,
    handleAddService,
    handleServiceChange,
    handleDeleteService,
    handleSaveService,
  };
}