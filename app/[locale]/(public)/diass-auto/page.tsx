"use client";

import { useState, useEffect } from "react";
import {
    Key,
    ShoppingCart,
    Search,
    SlidersHorizontal,
    Loader2,
    Calendar as CalendarIcon,
    ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { VehicleCard } from "@/components/shared/VehicleCard";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const CATEGORIES = ["Berline", "SUV", "Minibus", "Pick-up", "Luxe"];

export default function DiassAutoPage() {
    const [activeSection, setActiveSection] = useState<'RENTAL' | 'FOR_SALE'>('RENTAL');
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: "",
        maxPrice: 150000,
        query: ""
    });

    useEffect(() => {
        fetchVehicles();
    }, [activeSection, filters.category]);

    const fetchVehicles = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                type: activeSection,
                ...(filters.category && { category: filters.category }),
            });
            const res = await fetch(`/api/vehicles?${params}`);
            const data = await res.json();
            setVehicles(data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Master Header */}
            <div className="bg-night border-b border-muted-bg/50 pt-16 pb-12">
                <div className="container px-4 md:px-8 max-w-7xl mx-auto space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 rounded-full border border-brand-bright/20 bg-brand-deep/50 px-4 py-1.5 backdrop-blur-md">
                                <span className="text-[10px] font-bold text-brand-lime tracking-[0.3em] uppercase">Mobilité & Expertise</span>
                            </div>
                            <h1 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tight text-text-primary italic">
                                DIASS <span className="text-brand-lime">AUTO</span>
                            </h1>
                            <p className="text-text-muted text-lg md:text-xl max-w-2xl leading-relaxed">
                                Le service de mobilité premium d&apos;AIR DIASS.
                                Une flotte d&apos;exception pour vos déplacements et acquisitions au Sénégal.
                            </p>
                        </div>

                        {/* Switcher */}
                        <div className="flex bg-surface p-1.5 rounded-2xl border border-muted-bg/50 shadow-2xl">
                            <button
                                onClick={() => setActiveSection('RENTAL')}
                                className={cn(
                                    "flex items-center gap-3 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all",
                                    activeSection === 'RENTAL' ? "bg-brand-action text-white shadow-lg" : "text-text-faint hover:text-text-primary"
                                )}
                            >
                                <Key className="w-4 h-4" /> Location
                            </button>
                            <button
                                onClick={() => setActiveSection('FOR_SALE')}
                                className={cn(
                                    "flex items-center gap-3 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all",
                                    activeSection === 'FOR_SALE' ? "bg-brand-lime text-brand-deep shadow-lg" : "text-text-faint hover:text-text-primary"
                                )}
                            >
                                <ShoppingCart className="w-4 h-4" /> Vente
                            </button>
                        </div>
                    </div>

                    {/* Filter Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-surface/50 border border-muted-bg/30 rounded-3xl backdrop-blur-sm">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint group-focus-within:text-brand-lime transition-colors" />
                            <Input
                                placeholder="Modèle, marque..."
                                className="pl-12 bg-night/50 border-muted-bg/50 h-12 rounded-xl"
                            />
                        </div>

                        <div className="relative">
                            <select
                                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                                className="w-full bg-night/50 border-muted-bg/50 h-12 rounded-xl px-4 text-sm font-bold uppercase tracking-widest appearance-none focus:border-brand-lime/50 transition-all outline-none"
                            >
                                <option value="">Toutes catégories</option>
                                {CATEGORIES.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint pointer-events-none" />
                        </div>

                        <div className="md:col-span-2 flex items-center gap-6 px-4">
                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-text-faint">
                                    <span>Prix Max</span>
                                    <span className="text-brand-lime">{new Intl.NumberFormat().format(filters.maxPrice)} FCFA</span>
                                </div>
                                <input
                                    type="range"
                                    min="10000"
                                    max="500000"
                                    step="5000"
                                    value={filters.maxPrice}
                                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
                                    className="w-full h-1.5 bg-muted-bg rounded-lg appearance-none cursor-pointer accent-brand-lime"
                                />
                            </div>
                            <Button size="icon" variant="outline" className="h-12 w-12 shrink-0 rounded-xl border-muted-bg/50">
                                <SlidersHorizontal className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Catalogue Content */}
            <div className="container px-4 md:px-8 max-w-7xl mx-auto py-20">
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-40 space-y-6">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full border-4 border-brand-lime/10 border-t-brand-lime animate-spin" />
                            <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-brand-lime animate-pulse" />
                        </div>
                        <p className="text-xs font-bold uppercase tracking-[0.4em] text-text-faint">Optimisation de la flotte...</p>
                    </div>
                ) : (
                    <div className="space-y-16">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-brand-deep border border-brand-bright/10 flex items-center justify-center text-brand-lime">
                                {activeSection === 'RENTAL' ? <Key className="w-6 h-6" /> : <ShoppingCart className="w-6 h-6" />}
                            </div>
                            <div>
                                <h2 className="text-2xl font-display font-bold uppercase tracking-tight italic">
                                    {activeSection === 'RENTAL' ? "Catalogue Location" : "Véhicules en Vente"}
                                </h2>
                                <p className="text-[10px] font-bold text-text-faint uppercase tracking-widest">
                                    {vehicles.length} Véhicules disponibles • Mis à jour aujourd&apos;hui
                                </p>
                            </div>
                        </div>

                        {vehicles.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                {vehicles.map((vh) => (
                                    <VehicleCard
                                        key={vh.id}
                                        vehicle={vh}
                                        mode={activeSection === 'RENTAL' ? 'rental' : 'sale'}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-surface border border-muted-bg/30 rounded-[3rem] p-24 text-center space-y-8">
                                <div className="w-24 h-24 bg-night rounded-full flex items-center justify-center mx-auto text-text-faint/20">
                                    <Search className="w-12 h-12" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold uppercase tracking-tight">Aucun véhicule ne correspond</h3>
                                    <p className="text-text-muted text-sm max-w-md mx-auto italic">
                                        Nous renouvelons régulièrement notre flotte. Modifiez vos filtres ou contactez-nous pour une demande spécifique.
                                    </p>
                                </div>
                                <Button variant="outline" onClick={() => setFilters({ category: "", maxPrice: 150000, query: "" })} className="border-brand-bright/10 text-brand-lime uppercase tracking-widest text-[10px] font-bold h-12 px-8 rounded-xl">
                                    Réinitialiser les filtres
                                </Button>
                            </div>
                        )}

                        <div className="flex justify-center pt-10">
                            <Button variant="ghost" className="group text-text-muted hover:text-brand-lime font-bold uppercase tracking-widest text-xs">
                                Charger plus de véhicules <ChevronDown className="w-4 h-4 ml-2 group-hover:translate-y-1 transition-transform" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
