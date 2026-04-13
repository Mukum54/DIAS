"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
    CheckCircle2,
    XCircle,
    AlertCircle,
    Info,
    ChevronRight,
    ShieldCheck,
    Calendar as CalendarIcon,
    Fuel,
    Settings,
    Users,
    ChevronDown,
    ArrowRight,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleGallery } from "@/components/shared/VehicleGallery";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function VehicleDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();

    const [vehicle, setVehicle] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [startDate, setStartDate] = useState(searchParams.get("start") || "");
    const [endDate, setEndDate] = useState(searchParams.get("end") || "");
    const [availability, setAvailability] = useState<{ available: boolean, bookedRanges: any[] }>({ available: true, bookedRanges: [] });

    useEffect(() => {
        if (id) {
            fetchVehicle();
        }
    }, [id]);

    const fetchVehicle = async () => {
        try {
            const res = await fetch(`/api/vehicles/${id}`);
            const data = await res.json();
            setVehicle(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const duration = useMemo(() => {
        if (!startDate || !endDate) return 0;
        const d1 = new Date(startDate);
        const d2 = new Date(endDate);
        const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    }, [startDate, endDate]);

    const totalPrice = useMemo(() => {
        if (!vehicle || duration <= 0) return 0;
        return duration * (vehicle.pricePerDay || 0);
    }, [vehicle, duration]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-night">
                <Loader2 className="w-12 h-12 text-brand-lime animate-spin opacity-20" />
            </div>
        );
    }

    if (!vehicle) {
        return (
            <div className="container py-40 text-center">
                <h2 className="text-2xl font-bold uppercase tracking-widest">Véhicule introuvable</h2>
                <Button asChild className="mt-8 border-brand-bright/20">
                    <Link href="/diass-auto">Retour au catalogue</Link>
                </Button>
            </div>
        );
    }

    const specs = vehicle.specs as any || {};
    const photos = vehicle.photos as string[] || [];

    return (
        <div className="container px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-24 space-y-20">
            {/* Breadcrumb Area */}
            <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-text-faint mb-4">
                <Link href="/diass-auto" className="hover:text-brand-lime transition-colors">DIASS AUTO</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-text-muted">{vehicle.type === 'RENTAL' ? "Location" : "Vente"}</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-brand-lime">{vehicle.make} {vehicle.model}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                {/* Left Column: Gallery */}
                <div className="lg:col-span-7 space-y-12">
                    <VehicleGallery photos={photos} vehicleName={`${vehicle.make} ${vehicle.model}`} />

                    {/* Specs Tabs */}
                    <div className="pt-10 border-t border-muted-bg/50">
                        <Tabs defaultValue="specs" className="w-full">
                            <TabsList className="bg-surface border border-muted-bg/50 p-1.5 rounded-2xl w-full md:w-auto h-auto">
                                <TabsTrigger value="specs" className="px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] data-[state=active]:bg-brand-deep data-[state=active]:text-brand-lime">
                                    Caractéristiques
                                </TabsTrigger>
                                <TabsTrigger value="equip" className="px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] data-[state=active]:bg-brand-deep data-[state=active]:text-brand-lime">
                                    Équipements
                                </TabsTrigger>
                                <TabsTrigger value="parts" className="px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] data-[state=active]:bg-brand-deep data-[state=active]:text-brand-lime">
                                    Composants Tech
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="specs" className="mt-10 space-y-2">
                                {[
                                    { label: "Marque", value: vehicle.make },
                                    { label: "Modèle", value: vehicle.model },
                                    { label: "Année", value: vehicle.year },
                                    { label: "Kilométrage", value: `${new Intl.NumberFormat().format(vehicle.mileage)} km` },
                                    { label: "Carburant", value: specs.fuel || "N/A" },
                                    { label: "Transmission", value: specs.transmission || "Automatique" },
                                    { label: "Places", value: `${specs.seats || "5"} places` },
                                    { label: "Puissance", value: `${specs.power || "N/A"} CV` },
                                ].map((row, idx) => (
                                    <div key={idx} className="flex justify-between items-center py-4 border-b border-muted-bg/10 group">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-text-faint group-hover:text-text-muted transition-colors">{row.label}</span>
                                        <span className="text-sm font-bold text-text-primary italic">{row.value}</span>
                                    </div>
                                ))}
                            </TabsContent>
                            <TabsContent value="equip" className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-6">
                                {(specs.equipment || [
                                    "Climatisation", "GPS", "Bluetooth", "Caméra de recul",
                                    "Toit ouvrant", "Sièges cuir", "Régulateur de vitesse"
                                ]).map((item: string, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3 bg-surface p-4 rounded-xl border border-muted-bg/50">
                                        <CheckCircle2 className="w-4 h-4 text-brand-lime shrink-0" />
                                        <span className="text-xs font-bold text-text-muted uppercase tracking-tight">{item}</span>
                                    </div>
                                ))}
                            </TabsContent>
                            <TabsContent value="parts" className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {(specs.parts || [
                                    { name: "Moteur & Filtration", status: "Audit Réalisé" },
                                    { name: "Système de Freinage", status: "Certifié" },
                                    { name: "Pneumatiques", status: "Neufs" },
                                    { name: "Batterie & Élec", status: "Testée" },
                                    { name: "Climatisation", status: "Rechargée" },
                                    { name: "Châssis", status: "Intègre" }
                                ]).map((part: any, idx: number) => (
                                    <div key={idx} className="flex justify-between items-center p-5 bg-brand-deep/50 border border-brand-bright/10 rounded-2xl group hover:border-brand-lime/30 transition-all">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-lime mb-1">{part.name}</span>
                                            <span className="text-xs font-bold text-text-faint italic">{part.status}</span>
                                        </div>
                                        <ShieldCheck className="w-5 h-5 text-brand-lime opacity-40 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>

                {/* Right Column: Info & Booking */}
                <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-24">
                    <div className="space-y-6">
                        <Badge className="bg-brand-lime text-brand-deep font-black text-[9px] uppercase tracking-[0.3em] px-3 py-1 border-none rounded-md italic">DIASS AUTO EXCLUSIVE</Badge>
                        <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-text-primary italic">
                            {vehicle.make} <span className="text-brand-lime">{vehicle.model}</span>
                        </h1>
                        <div className="flex flex-wrap gap-2 pt-2">
                            {[vehicle.year, vehicle.color, vehicle.category].map((pill, idx) => (
                                pill && (
                                    <div key={idx} className="bg-surface border border-muted-bg/30 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest text-text-muted">
                                        {pill}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>

                    <div className="p-8 bg-surface border border-muted-bg/50 rounded-[2.5rem] shadow-2xl space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-action opacity-30" />

                        <div className="space-y-2">
                            <p className="text-[10px] font-bold text-text-faint uppercase tracking-widest">
                                {vehicle.type === 'RENTAL' ? "À partir de" : "Prix de vente"}
                            </p>
                            <div className="flex items-baseline gap-3">
                                <span className="text-3xl font-display font-bold text-brand-lime italic">
                                    {new Intl.NumberFormat('fr-FR').format(vehicle.type === 'RENTAL' ? vehicle.pricePerDay || 0 : vehicle.salePrice || 0)} FCFA
                                </span>
                                {vehicle.type === 'RENTAL' && <span className="text-sm text-text-faint font-bold uppercase">/ jour</span>}
                            </div>
                            {vehicle.type === 'RENTAL' ? (
                                <p className="text-[10px] text-brand-bright/60 font-bold uppercase flex items-center gap-2 italic">
                                    <Info className="w-3 h-3" /> Prix dégressif pour longue durée
                                </p>
                            ) : (
                                <p className="text-[10px] text-brand-bright/60 font-bold uppercase flex items-center gap-2 italic">
                                    <ShieldCheck className="w-3 h-3" /> Financement disponible sur demande
                                </p>
                            )}
                        </div>

                        {vehicle.type === 'RENTAL' ? (
                            <div className="space-y-8 pt-8 border-t border-muted-bg/10">
                                {/* Booking Form Interface */}
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-bold uppercase tracking-widest text-text-faint ml-2">Début</label>
                                            <input
                                                type="date"
                                                value={startDate}
                                                onChange={(e) => setStartDate(e.target.value)}
                                                className="w-full bg-night border-muted-bg/50 h-14 rounded-2xl px-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-brand-lime/50 transition-all text-brand-lime"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-bold uppercase tracking-widest text-text-faint ml-2">Fin</label>
                                            <input
                                                type="date"
                                                value={endDate}
                                                onChange={(e) => setEndDate(e.target.value)}
                                                className="w-full bg-night border-muted-bg/50 h-14 rounded-2xl px-4 text-xs font-bold uppercase tracking-widest outline-none focus:border-brand-lime/50 transition-all text-brand-lime"
                                            />
                                        </div>
                                    </div>

                                    {duration > 0 && (
                                        <div className="p-5 bg-brand-deep border border-brand-bright/10 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-2">
                                            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-text-faint font-mono">
                                                <span>{duration} Jours × {new Intl.NumberFormat().format(vehicle.pricePerDay || 0)} FCFA</span>
                                                <span className="text-text-primary text-sm">{new Intl.NumberFormat().format(totalPrice)} FCFA</span>
                                            </div>
                                            <div className="h-[1px] w-full bg-brand-bright/10" />
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-black uppercase tracking-widest text-brand-lime italic">Total Estimé</span>
                                                <span className="text-xl font-display font-bold text-white italic">{new Intl.NumberFormat().format(totalPrice)} FCFA</span>
                                            </div>
                                        </div>
                                    )}

                                    <Button
                                        asChild
                                        disabled={duration <= 0}
                                        className="w-full h-16 bg-brand-action hover:bg-brand-bright text-white font-black text-xs uppercase tracking-[.2em] rounded-2xl shadow-2xl shadow-brand-action/20 transition-all active:scale-[0.98]"
                                    >
                                        <Link href={`/reservation/location-vehicules?vehicleId=${vehicle.id}&start=${startDate}&end=${endDate}`}>
                                            Réserver ce véhicule <ArrowRight className="w-4 h-4 ml-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8 pt-8 border-t border-muted-bg/10">
                                <div className="space-y-4">
                                    <Input placeholder="Votre Nom" className="h-14 bg-night border-muted-bg/50 rounded-2xl text-xs font-bold uppercase tracking-widest" />
                                    <Input placeholder="N° Téléphone" className="h-14 bg-night border-muted-bg/50 rounded-2xl text-xs font-bold uppercase tracking-widest" />
                                    <Button className="w-full h-16 bg-brand-lime hover:bg-brand-bright text-brand-deep font-black text-xs uppercase tracking-[.2em] rounded-2xl shadow-2xl shadow-brand-lime/20 transition-all">
                                        Demander plus d&apos;informations <ArrowRight className="w-4 h-4 ml-4" />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Rental Rules */}
                    {vehicle.type === 'RENTAL' && (
                        <div className="space-y-3">
                            <h4 className="text-[10px] font-bold text-text-faint uppercase tracking-[0.3em] ml-2 italic">Conditions de location</h4>
                            <div className="space-y-2">
                                {[
                                    { text: `Caution requise: ${new Intl.NumberFormat().format(specs.caution || 250000)} FCFA`, icon: AlertCircle },
                                    { text: "Permis de conduire valide requis", icon: ShieldCheck },
                                    { text: "Âge minimum: 23 ans", icon: CheckCircle2 },
                                    { text: `Kilométrage: ${specs.mileageLimit || "illimité"}`, icon: Fuel },
                                ].map((rule, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-4 bg-muted-bg/10 border border-muted-bg/20 rounded-xl group hover:border-brand-bright/20 transition-colors">
                                        <rule.icon className="w-4 h-4 text-brand-lime shrink-0 mt-0.5 opacity-60" />
                                        <span className="text-[10px] font-bold text-text-muted uppercase tracking-tight leading-tight">{rule.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
