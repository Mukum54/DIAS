"use client";

import { useState, useEffect } from "react";
import {
    Plus,
    Pencil,
    Trash2,
    Save,
    X,
    Package,
    Hotel,
    Car,
    Wrench,
    ParkingSquare,
    Luggage,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const SERVICE_TYPES = [
    { value: "HOTEL", label: "Hébergement", icon: Hotel },
    { value: "TRANSPORT", label: "Transport", icon: Car },
    { value: "GARAGE", label: "Garage & Maintenance", icon: Wrench },
    { value: "PARKING", label: "Parking", icon: ParkingSquare },
    { value: "BAGGAGE", label: "Bagages", icon: Luggage },
    { value: "RENTAL", label: "Location", icon: Car },
    { value: "WASH", label: "Lavage", icon: Car },
];

const PRICE_UNITS = [
    { value: "XOF", label: "XOF (fixe)" },
    { value: "per_night", label: "XOF / nuit" },
    { value: "per_day", label: "XOF / jour" },
    { value: "per_trip", label: "XOF / trajet" },
    { value: "per_hour", label: "XOF / heure" },
];

interface Offering {
    id: string;
    serviceType: string;
    name: string;
    description: string;
    price: number;
    priceUnit: string;
    imageUrl: string | null;
    capacity: number | null;
    duration: string | null;
    features: string[] | null;
    isAvailable: boolean;
    sortOrder: number;
}

export default function AdminContenuPage() {
    const [offerings, setOfferings] = useState<Offering[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [filterType, setFilterType] = useState("");

    // Form state
    const [form, setForm] = useState({
        serviceType: "HOTEL",
        name: "",
        description: "",
        price: "",
        priceUnit: "XOF",
        imageUrl: "",
        capacity: "",
        duration: "",
        features: "",
        sortOrder: "0",
    });

    const fetchOfferings = async () => {
        try {
            const res = await fetch("/api/offerings");
            if (res.ok) {
                const data = await res.json();
                setOfferings(data);
            }
        } catch {
            toast.error("Erreur de chargement des offres");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOfferings();
    }, []);

    const resetForm = () => {
        setForm({
            serviceType: "HOTEL",
            name: "",
            description: "",
            price: "",
            priceUnit: "XOF",
            imageUrl: "",
            capacity: "",
            duration: "",
            features: "",
            sortOrder: "0",
        });
        setEditId(null);
        setShowForm(false);
    };

    const startEdit = (offering: Offering) => {
        setForm({
            serviceType: offering.serviceType,
            name: offering.name,
            description: offering.description,
            price: offering.price.toString(),
            priceUnit: offering.priceUnit,
            imageUrl: offering.imageUrl || "",
            capacity: offering.capacity?.toString() || "",
            duration: offering.duration || "",
            features: Array.isArray(offering.features) ? offering.features.join(", ") : "",
            sortOrder: offering.sortOrder.toString(),
        });
        setEditId(offering.id);
        setShowForm(true);
    };

    const handleSave = async () => {
        if (!form.name || !form.description || !form.price) {
            toast.error("Veuillez remplir tous les champs requis");
            return;
        }

        setSaving(true);
        try {
            const payload = {
                ...form,
                features: form.features
                    ? form.features.split(",").map(f => f.trim()).filter(Boolean)
                    : null,
            };

            let res;
            if (editId) {
                res = await fetch(`/api/offerings/${editId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            } else {
                res = await fetch("/api/offerings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            }

            if (res.ok) {
                toast.success(editId ? "Offre mise à jour" : "Offre créée");
                resetForm();
                fetchOfferings();
            } else {
                const err = await res.json();
                toast.error(err.error || "Erreur");
            }
        } catch {
            toast.error("Erreur réseau");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Supprimer cette offre ?")) return;

        try {
            const res = await fetch(`/api/offerings/${id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Offre supprimée");
                fetchOfferings();
            }
        } catch {
            toast.error("Erreur de suppression");
        }
    };

    const toggleAvailability = async (offering: Offering) => {
        try {
            await fetch(`/api/offerings/${offering.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ isAvailable: !offering.isAvailable }),
            });
            fetchOfferings();
        } catch {
            toast.error("Erreur");
        }
    };

    const filteredOfferings = filterType
        ? offerings.filter(o => o.serviceType === filterType)
        : offerings;

    const getServiceLabel = (type: string) =>
        SERVICE_TYPES.find(s => s.value === type)?.label || type;

    const getPriceLabel = (unit: string) =>
        PRICE_UNITS.find(u => u.value === unit)?.label || unit;

    return (
        <div className="space-y-12 max-w-[1600px] mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-muted-bg/50 pb-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                        <Package className="w-4 h-4 text-brand-lime" />
                        <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[0.4em]">Gestion du Catalogue</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-text-primary italic">
                        Offres <span className="text-brand-lime">Services</span>
                    </h1>
                    <p className="text-text-muted text-lg font-medium">
                        Gérez les chambres, services garage, transports, parkings et plus encore.
                    </p>
                </div>
                <Button
                    onClick={() => { resetForm(); setShowForm(true); }}
                    className="h-14 bg-brand-action hover:bg-brand-bright text-white rounded-2xl px-8 shadow-xl shadow-brand-action/20 font-bold uppercase tracking-widest text-sm"
                >
                    <Plus className="w-4 h-4 mr-3" /> Nouvelle Offre
                </Button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-wrap gap-3">
                <Button
                    variant={filterType === "" ? "default" : "outline"}
                    onClick={() => setFilterType("")}
                    className={`rounded-xl text-xs font-bold uppercase tracking-wider h-10 ${filterType === "" ? "bg-brand-action text-white" : "border-muted-bg/50 text-text-muted hover:text-text-primary"}`}
                >
                    Tout ({offerings.length})
                </Button>
                {SERVICE_TYPES.map(st => {
                    const count = offerings.filter(o => o.serviceType === st.value).length;
                    return (
                        <Button
                            key={st.value}
                            variant={filterType === st.value ? "default" : "outline"}
                            onClick={() => setFilterType(st.value)}
                            className={`rounded-xl text-xs font-bold uppercase tracking-wider h-10 ${filterType === st.value ? "bg-brand-action text-white" : "border-muted-bg/50 text-text-muted hover:text-text-primary"}`}
                        >
                            <st.icon className="w-3.5 h-3.5 mr-2" />
                            {st.label} ({count})
                        </Button>
                    );
                })}
            </div>

            {/* Create/Edit Form */}
            {showForm && (
                <Card className="bg-surface border border-brand-bright/20 rounded-3xl p-8 shadow-2xl">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight italic">
                            {editId ? "Modifier l'offre" : "Créer une offre"}
                        </h3>
                        <Button variant="ghost" onClick={resetForm} className="text-text-muted hover:text-text-primary">
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-faint">Type de Service *</label>
                            <select
                                value={form.serviceType}
                                onChange={e => setForm(p => ({ ...p, serviceType: e.target.value }))}
                                className="w-full h-12 rounded-xl bg-brand-deep border border-muted-bg/50 px-4 text-sm text-text-primary focus:border-brand-lime/30 transition-all"
                            >
                                {SERVICE_TYPES.map(st => (
                                    <option key={st.value} value={st.value}>{st.label}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-faint">Nom de l&apos;offre *</label>
                            <Input
                                value={form.name}
                                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                                placeholder="Ex: Chambre Suite VIP"
                                className="h-12 bg-brand-deep border-muted-bg/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-faint">Prix *</label>
                            <div className="flex gap-3">
                                <Input
                                    type="number"
                                    value={form.price}
                                    onChange={e => setForm(p => ({ ...p, price: e.target.value }))}
                                    placeholder="75000"
                                    className="h-12 bg-brand-deep border-muted-bg/50 flex-1"
                                />
                                <select
                                    value={form.priceUnit}
                                    onChange={e => setForm(p => ({ ...p, priceUnit: e.target.value }))}
                                    className="h-12 rounded-xl bg-brand-deep border border-muted-bg/50 px-3 text-sm text-text-primary w-40"
                                >
                                    {PRICE_UNITS.map(u => (
                                        <option key={u.value} value={u.value}>{u.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-faint">Description *</label>
                            <textarea
                                value={form.description}
                                onChange={e => setForm(p => ({ ...p, description: e.target.value }))}
                                placeholder="Description détaillée de l'offre"
                                rows={3}
                                className="w-full rounded-xl bg-brand-deep border border-muted-bg/50 px-4 py-3 text-sm text-text-primary resize-none focus:border-brand-lime/30 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-faint">URL Image</label>
                            <Input
                                value={form.imageUrl}
                                onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))}
                                placeholder="https://..."
                                className="h-12 bg-brand-deep border-muted-bg/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-faint">Capacité</label>
                            <Input
                                type="number"
                                value={form.capacity}
                                onChange={e => setForm(p => ({ ...p, capacity: e.target.value }))}
                                placeholder="Ex: 2 personnes"
                                className="h-12 bg-brand-deep border-muted-bg/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-faint">Durée</label>
                            <Input
                                value={form.duration}
                                onChange={e => setForm(p => ({ ...p, duration: e.target.value }))}
                                placeholder="Ex: 1 nuit, 2h"
                                className="h-12 bg-brand-deep border-muted-bg/50"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-faint">Caractéristiques (séparées par des virgules)</label>
                            <Input
                                value={form.features}
                                onChange={e => setForm(p => ({ ...p, features: e.target.value }))}
                                placeholder="Wi-Fi, Climatisation, Mini-bar, Vue mer"
                                className="h-12 bg-brand-deep border-muted-bg/50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-text-faint">Ordre d&apos;affichage</label>
                            <Input
                                type="number"
                                value={form.sortOrder}
                                onChange={e => setForm(p => ({ ...p, sortOrder: e.target.value }))}
                                placeholder="0"
                                className="h-12 bg-brand-deep border-muted-bg/50"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-muted-bg/30">
                        <Button variant="outline" onClick={resetForm} className="h-12 px-6 border-muted-bg/50 text-text-muted rounded-xl">
                            Annuler
                        </Button>
                        <Button
                            onClick={handleSave}
                            disabled={saving}
                            className="h-12 px-8 bg-brand-action hover:bg-brand-bright text-white rounded-xl font-bold uppercase tracking-widest text-sm shadow-lg"
                        >
                            {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                            {editId ? "Mettre à jour" : "Créer l'offre"}
                        </Button>
                    </div>
                </Card>
            )}

            {/* Offerings Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-brand-lime" />
                </div>
            ) : filteredOfferings.length === 0 ? (
                <div className="text-center py-20">
                    <Package className="w-16 h-16 mx-auto text-text-faint mb-6" />
                    <h3 className="text-xl font-bold text-text-primary mb-2">Aucune offre</h3>
                    <p className="text-text-muted">Créez votre première offre pour commencer</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredOfferings.map(offering => (
                        <Card key={offering.id} className="bg-surface border border-muted-bg/50 rounded-3xl overflow-hidden hover:border-brand-lime/30 transition-all group">
                            {/* Image Area */}
                            {offering.imageUrl ? (
                                <div className="h-48 bg-brand-deep overflow-hidden">
                                    <img
                                        src={offering.imageUrl}
                                        alt={offering.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            ) : (
                                <div className="h-32 bg-brand-deep/50 flex items-center justify-center">
                                    <Package className="w-10 h-10 text-text-faint" />
                                </div>
                            )}

                            <div className="p-6 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <Badge className="bg-brand-lime/10 text-brand-lime border-brand-lime/20 text-[8px] uppercase tracking-widest">
                                            {getServiceLabel(offering.serviceType)}
                                        </Badge>
                                        <h4 className="text-lg font-bold text-text-primary uppercase tracking-tight italic group-hover:text-brand-lime transition-colors">
                                            {offering.name}
                                        </h4>
                                    </div>
                                    <Badge className={`text-[8px] uppercase tracking-widest ${offering.isAvailable ? "bg-brand-lime/10 text-brand-lime border-brand-lime/20" : "bg-danger/10 text-danger border-danger/20"}`}>
                                        {offering.isAvailable ? "Active" : "Inactive"}
                                    </Badge>
                                </div>

                                <p className="text-text-muted text-sm line-clamp-2">{offering.description}</p>

                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-display font-bold text-brand-lime">
                                        {offering.price.toLocaleString()}
                                    </span>
                                    <span className="text-xs text-text-faint font-bold uppercase">
                                        {getPriceLabel(offering.priceUnit)}
                                    </span>
                                </div>

                                {Array.isArray(offering.features) && offering.features.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {offering.features.slice(0, 3).map((f, i) => (
                                            <span key={i} className="text-[10px] px-2 py-1 rounded-lg bg-brand-deep border border-muted-bg/30 text-text-muted font-bold uppercase tracking-wider">
                                                {f}
                                            </span>
                                        ))}
                                        {offering.features.length > 3 && (
                                            <span className="text-[10px] px-2 py-1 text-text-faint font-bold">
                                                +{offering.features.length - 3}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className="flex gap-2 pt-2 border-t border-muted-bg/20">
                                    <Button
                                        variant="ghost"
                                        onClick={() => startEdit(offering)}
                                        className="flex-1 h-10 text-brand-lime text-[10px] font-bold uppercase tracking-widest hover:bg-brand-deep rounded-xl"
                                    >
                                        <Pencil className="w-3.5 h-3.5 mr-2" /> Modifier
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => toggleAvailability(offering)}
                                        className="h-10 text-text-muted text-[10px] font-bold uppercase tracking-widest hover:bg-brand-deep rounded-xl px-4"
                                    >
                                        {offering.isAvailable ? "Désactiver" : "Activer"}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={() => handleDelete(offering.id)}
                                        className="h-10 text-danger text-[10px] font-bold uppercase tracking-widest hover:bg-danger/10 rounded-xl px-4"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
