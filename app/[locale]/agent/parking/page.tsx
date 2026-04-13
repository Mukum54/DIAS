import {
    Search,
    Plus,
    ShieldCheck,
    AlertTriangle,
    History,
    Info,
    Car
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AgentParkingPage() {
    // const zones = ["Zone A (VIP)", "Zone B (Corporate)", "Zone C (Long Séjour)"];

    // Stub slots
    const slots = Array.from({ length: 48 }).map((_, i) => ({
        id: `S-${i + 1}`,
        number: `${i + 1}`,
        status: i % 7 === 0 ? "ALERT" : i % 3 === 0 ? "OCCUPIED" : i % 5 === 0 ? "RESERVED" : "EMPTY",
        vehicle: i % 3 === 0 ? "AA-123-BC" : null
    }));

    return (
        <div className="space-y-12 pb-20 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-muted-bg/50 pb-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-2 w-2 rounded-full bg-brand-lime" />
                        <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[0.4em]">Operations Parking</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-text-primary italic">
                        Gestion des <span className="text-brand-lime">Emplacements</span>
                    </h1>
                    <p className="text-text-muted text-lg font-medium">Hub AIBD • {slots.filter(s => s.status === "EMPTY").length} places libres</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="h-14 border-muted-bg/50 bg-brand-deep/30 text-text-muted rounded-2xl px-6 hover:bg-brand-deep font-bold uppercase tracking-widest text-[10px]">
                        <Plus className="w-4 h-4 mr-2" /> Enregistrer Entrée
                    </Button>
                    <Button className="h-14 bg-brand-action hover:bg-brand-bright text-white rounded-2xl px-6 shadow-xl shadow-brand-action/20 font-bold uppercase tracking-widest text-[10px]">
                        <Search className="w-4 h-4 mr-2" /> Rechercher Véhicule
                    </Button>
                </div>
            </div>

            {/* Legend & Filters */}
            <div className="flex flex-wrap items-center justify-between gap-8 p-8 bg-surface border border-muted-bg/50 rounded-[2rem]">
                <div className="flex flex-wrap gap-8">
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded bg-brand-deep border border-muted-bg/50" />
                        <span className="text-[10px] font-bold text-text-faint uppercase tracking-widest">Libre</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded bg-brand-lime border border-brand-lime/30 shadow-[0_0_10px_rgba(var(--primary),0.2)]" />
                        <span className="text-[10px] font-bold text-text-faint uppercase tracking-widest">Occupé</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded bg-olive-mid border border-olive-light/20" />
                        <span className="text-[10px] font-bold text-text-faint uppercase tracking-widest">Réservé</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded bg-danger animate-pulse border border-danger/30" />
                        <span className="text-[10px] font-bold text-text-faint uppercase tracking-widest">Alerte</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <Badge variant="outline" className="h-8 border-brand-bright/20 bg-brand-deep text-brand-lime font-bold px-3 uppercase tracking-widest text-[8px] cursor-pointer">Zone A</Badge>
                    <Badge variant="outline" className="h-8 border-muted-bg/50 text-text-faint font-bold px-3 uppercase tracking-widest text-[8px] cursor-pointer">Zone B</Badge>
                    <Badge variant="outline" className="h-8 border-muted-bg/50 text-text-faint font-bold px-3 uppercase tracking-widest text-[8px] cursor-pointer">Zone C</Badge>
                </div>
            </div>

            {/* Parking Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
                {slots.map((slot) => (
                    <div
                        key={slot.id}
                        className={`
                            relative h-24 rounded-xl border transition-all duration-300 cursor-pointer group flex flex-col items-center justify-center gap-1
                            ${slot.status === 'EMPTY' ? 'bg-brand-deep/20 border-muted-bg/30 hover:border-brand-lime/50' : ''}
                            ${slot.status === 'OCCUPIED' ? 'bg-brand-deep border-brand-lime shadow-[inset_0_0_20px_rgba(168,216,120,0.1)]' : ''}
                            ${slot.status === 'RESERVED' ? 'bg-olive-dark/40 border-olive-mid/50' : ''}
                            ${slot.status === 'ALERT' ? 'bg-danger/20 border-danger animate-pulse shadow-[0_0_15px_rgba(122,24,24,0.3)]' : ''}
                        `}
                    >
                        <span className={`text-[10px] font-bold tracking-widest ${slot.status === 'EMPTY' ? 'text-text-faint' : 'text-text-primary'}`}>
                            {slot.number}
                        </span>
                        {slot.status === 'OCCUPIED' && <Car className="w-4 h-4 text-brand-lime" />}
                        {slot.status === 'ALERT' && <AlertTriangle className="w-4 h-4 text-danger font-bold" />}

                        {/* Hover Details mini-popover */}
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-surface border border-muted-bg rounded-lg py-2 px-3 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all z-50 pointer-events-none whitespace-nowrap shadow-2xl">
                            <p className="text-[9px] font-bold text-text-primary uppercase tracking-widest">
                                {slot.status === 'EMPTY' ? 'LIBRE' : slot.vehicle ? `VÉHICULE: ${slot.vehicle}` : 'RÉSERVÉ'}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Actions Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-10 border-t border-muted-bg/20">
                <div className="bg-surface border border-muted-bg/50 rounded-3xl p-8 space-y-6">
                    <h4 className="text-xs font-bold text-text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                        <History className="w-4 h-4 text-brand-lime" /> Flux Récents
                    </h4>
                    <div className="space-y-4">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex justify-between items-center text-[10px] border-b border-muted-bg/10 pb-3 last:border-0">
                                <span className="text-text-muted font-bold font-mono">AD-PARK-00{i}</span>
                                <Badge className="bg-brand-lime/10 text-brand-lime border-brand-lime/20 text-[8px]">Entrée</Badge>
                                <span className="text-text-faint">10:45</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-surface border border-muted-bg/50 rounded-3xl p-8 space-y-6">
                    <h4 className="text-xs font-bold text-text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-brand-lime" /> Point de Sécurité
                    </h4>
                    <p className="text-[10px] text-text-muted leading-relaxed font-bold uppercase tracking-widest italic">
                        Dernière ronde complète effectuée il y a <span className="text-brand-lime animate-pulse">12 min</span> par l&apos;unité SÉC-A.
                    </p>
                </div>

                <div className="bg-surface border border-muted-bg/50 rounded-3xl p-8 space-y-4">
                    <div className="flex items-center gap-3">
                        <Info className="w-4 h-4 text-brand-lime" />
                        <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest">Capacité Globale</span>
                    </div>
                    <div className="h-2 w-full bg-brand-deep rounded-full overflow-hidden">
                        <div className="h-full bg-brand-lime w-[68%] shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                    </div>
                    <p className="text-[10px] text-right font-bold text-text-faint uppercase font-mono">68% OCCUPÉ</p>
                </div>
            </div>
        </div>
    );
}
