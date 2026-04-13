import {
    Wrench,
    Settings,
    Clock,
    AlertTriangle,
    CheckCircle2,
    ArrowRight,
    Droplets,
    Hammer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function GarageDashboard() {
    const activeStats = [
        { label: "En cours", value: 12, icon: Clock, color: "text-brand-lime" },
        { label: "Urgences", value: 3, icon: AlertTriangle, color: "text-danger" },
        { label: "Stock OK", value: "92%", icon: Settings, color: "text-blue-400" },
    ];

    return (
        <div className="space-y-12 pb-20 max-w-[1600px] mx-auto">
            {/* Garage Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-muted-bg/50 pb-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Wrench className="w-4 h-4 text-brand-lime" />
                        <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[0.4em]">Garage & Maintenance</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-text-primary italic">
                        Atelier <span className="text-brand-lime">Performance</span>
                    </h1>
                    <p className="text-text-muted text-lg font-medium italic">DIASS AUTO HQ • Maintenance Flotte & Clients</p>
                </div>
                <div className="flex gap-4">
                    <Button asChild className="h-14 bg-brand-action hover:bg-brand-bright text-white rounded-2xl px-8 shadow-xl shadow-brand-action/20 font-bold uppercase tracking-widest text-sm group">
                        <Link href="/garage/jobs">Board Kanban <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" /></Link>
                    </Button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {activeStats.map((stat, idx) => (
                    <div key={idx} className="bg-surface border border-muted-bg/50 rounded-3xl p-8 flex items-center justify-between shadow-2xl">
                        <div className="space-y-2">
                            <p className="text-[10px] font-bold text-text-faint uppercase tracking-widest">{stat.label}</p>
                            <p className="text-4xl font-display font-bold text-text-primary tabular-nums">{stat.value}</p>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl bg-brand-deep border border-brand-bright/10 flex items-center justify-center ${stat.color} shadow-lg shadow-brand-deep/50`}>
                            <stat.icon className="w-7 h-7" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Job Preview Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Active Jobs Highlights */}
                <div className="xl:col-span-8 space-y-8">
                    <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight italic flex items-center gap-3">
                        <Clock className="w-5 h-5 text-brand-lime" />
                        Jobs <span className="text-brand-lime">Prioritaires</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <Card key={i} className="bg-surface/50 border-muted-bg/50 border hover:border-brand-lime/30 transition-all rounded-3xl p-6 group">
                                <div className="space-y-6">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-text-faint font-bold uppercase tracking-wider">Job #240-{i}</p>
                                            <h4 className="text-lg font-bold text-text-primary uppercase tracking-tight italic group-hover:text-brand-lime transition-colors">Vidange Toyota Prado</h4>
                                        </div>
                                        <Badge className="bg-brand-lime/10 text-brand-lime border-brand-lime/20 text-[8px] uppercase tracking-widest px-2">En cours</Badge>
                                    </div>
                                    <div className="flex items-center gap-4 py-4 border-y border-muted-bg/10">
                                        <div className="flex-1 space-y-1">
                                            <p className="text-[10px] text-text-faint font-bold uppercase tracking-widest">Temps écoulé</p>
                                            <p className="text-sm font-bold text-text-primary font-mono">01:45:00</p>
                                        </div>
                                        <div className="flex-1 space-y-1 text-right">
                                            <p className="text-[10px] text-text-faint font-bold uppercase tracking-widest">Technicien</p>
                                            <p className="text-sm font-bold text-text-primary italic">M. Sow</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" className="w-full text-brand-lime text-[10px] font-bold uppercase tracking-widest h-10 hover:bg-brand-deep rounded-xl">Mettre à jour</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Inventory Status Sidebar */}
                <div className="xl:col-span-4 space-y-8">
                    <Card className="bg-brand-deep/30 border border-brand-bright/10 rounded-[2.5rem] p-8 backdrop-blur-2xl space-y-8 shadow-2xl">
                        <h3 className="text-lg font-bold text-text-primary uppercase tracking-tight italic flex items-center gap-3">
                            <Settings className="w-5 h-5 text-brand-lime" />
                            Stock <span className="text-brand-lime">Critique</span>
                        </h3>

                        <div className="space-y-6">
                            {[
                                { item: "Huile Helix 5W40", qty: "4L", status: "LOW", icon: Droplets },
                                { item: "Filtre à Huile XL", qty: "2u", status: "LOW", icon: Settings },
                                { item: "Plaquettes AV", qty: "0u", status: "EMPTY", icon: Hammer },
                            ].map((part, idx) => (
                                <div key={idx} className="flex items-center justify-between p-4 bg-surface rounded-2xl border border-muted-bg/30">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-brand-deep flex items-center justify-center text-text-muted">
                                            <part.icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-text-primary uppercase tracking-tight">{part.item}</p>
                                            <p className="text-[10px] text-text-faint font-bold">Réf: PRT-992-{idx}</p>
                                        </div>
                                    </div>
                                    <Badge className={`${part.status === 'EMPTY' ? 'bg-danger/10 text-danger border-danger/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'} border font-bold text-[8px]`}>
                                        {part.qty}
                                    </Badge>
                                </div>
                            ))}
                        </div>

                        <Button variant="outline" className="w-full border-brand-bright/10 bg-brand-deep text-brand-lime text-[10px] font-bold uppercase tracking-widest h-12 rounded-xl hover:bg-brand-deep/80" asChild>
                            <Link href="/garage/stock">Gérer l&apos;inventaire</Link>
                        </Button>
                    </Card>

                    <div className="p-8 bg-surface border border-muted-bg/50 rounded-3xl flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-brand-deep flex items-center justify-center text-brand-lime">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-text-primary uppercase tracking-tight italic">Qualité Certifiée</h4>
                            <p className="text-[10px] text-text-faint font-bold uppercase tracking-widest">Standards DIASS AUTO 2024</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
