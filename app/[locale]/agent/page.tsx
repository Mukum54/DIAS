import {
    Luggage,
    Navigation,
    UserPlus,
    ArrowRight,
    Bell,
    Scan,
    TrendingUp,
    MapPin,
    Clock,
    ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function AgentDashboard() {
    const quickLinks = [
        { label: "Enregistrement", icon: UserPlus, href: "/agent/enregistrement", color: "text-brand-lime" },
        { label: "Gestion Parking", icon: Navigation, href: "/agent/parking", color: "text-blue-400" },
        { label: "Suivi Bagages", icon: Luggage, href: "/agent/bagages", color: "text-amber-400" },
        { label: "Dispatch Transport", icon: MapPin, href: "/agent/transport", color: "text-brand-bright" },
    ];

    return (
        <div className="space-y-12 pb-20 max-w-[1600px] mx-auto">
            {/* Mission Control Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-muted-bg/50 pb-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-2 w-2 rounded-full bg-brand-lime animate-pulse" />
                        <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[0.4em]">Opérations Hub</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-text-primary italic">
                        Mission <span className="text-brand-lime">Control</span>
                    </h1>
                    <p className="text-text-muted text-lg font-medium italic">Hub AIBD Dakar • Terminal 1 Reception</p>
                </div>
                <div className="flex gap-4">
                    <div className="p-4 bg-surface border border-muted-bg/50 rounded-2xl flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-deep flex items-center justify-center text-brand-lime border border-brand-bright/10">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div className="space-y-0.5">
                            <p className="text-[10px] font-bold text-text-faint uppercase tracking-widest">Heure Locale</p>
                            <p className="text-sm font-bold text-text-primary font-mono tabular-nums">10:45:22</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickLinks.map((link, idx) => (
                    <Link key={idx} href={link.href} className="group">
                        <Card className="bg-surface border-muted-bg/50 border hover:border-brand-lime/30 transition-all duration-300 rounded-[1.5rem] shadow-xl hover:-translate-y-1 overflow-hidden">
                            <CardContent className="p-8 flex items-center gap-6">
                                <div className={`w-14 h-14 rounded-2xl bg-brand-deep border border-brand-bright/10 flex items-center justify-center ${link.color} shadow-lg group-hover:scale-110 transition-transform`}>
                                    <link.icon className="w-7 h-7" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-text-faint uppercase tracking-widest leading-none mb-1">Action</p>
                                    <h4 className="text-lg font-bold text-text-primary uppercase tracking-tight italic group-hover:text-brand-lime transition-colors">
                                        {link.label}
                                    </h4>
                                </div>
                                <ArrowRight className="w-5 h-5 ml-auto text-text-faint group-hover:text-brand-lime group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Main Stats Hub */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Live Feed */}
                <Card className="lg:col-span-2 bg-surface/40 border-muted-bg/50 border rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <TrendingUp className="w-48 h-48 text-brand-lime" />
                    </div>
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight italic flex items-center gap-3">
                            <TrendingUp className="w-5 h-5 text-brand-lime" />
                            Flux <span className="text-brand-lime">Temps Réel</span>
                        </h3>
                        <Badge className="bg-brand-deep border-brand-lime/20 text-brand-lime text-[8px] uppercase font-bold tracking-[0.2em] px-3">Sync Active</Badge>
                    </div>

                    <div className="space-y-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-brand-deep/30 border border-transparent hover:border-brand-bright/10 transition-all group">
                                <div className="w-10 h-10 rounded-xl bg-brand-deep flex items-center justify-center text-text-muted group-hover:text-brand-lime transition-colors">
                                    <Scan className="w-5 h-5" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm font-bold text-text-primary uppercase tracking-tight">Passager AD-882{i}</p>
                                        <span className="text-[10px] font-bold text-text-faint uppercase tracking-widest">Il y a {i * 5} min</span>
                                    </div>
                                    <p className="text-xs text-text-muted italic">Enregistrement bagages (2 unités) effectué par Agt. 01</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Operational Security */}
                <div className="space-y-8">
                    <Card className="bg-brand-deep border-brand-bright/10 border rounded-[2rem] p-8 space-y-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,216,120,0.05)_0%,transparent_70%)]" />
                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-brand-lime">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-text-primary uppercase tracking-tight italic">Status Sécurité</h4>
                                <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">Périmètre AIBD V-04</p>
                            </div>
                        </div>
                        <div className="space-y-4 relative z-10">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-text-muted font-medium">Caméras Actives</span>
                                <span className="text-brand-lime font-bold">100%</span>
                            </div>
                            <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
                                <div className="h-full bg-brand-lime w-full" />
                            </div>
                            <p className="text-[10px] text-text-faint leading-relaxed italic">
                                Aucun incident signalé sur les parking A et B. Zone de transit fluide.
                            </p>
                        </div>
                    </Card>

                    <Card className="bg-surface border-muted-bg/50 border rounded-[2rem] p-8 flex flex-col items-center justify-center text-center space-y-4">
                        <Bell className="w-10 h-10 text-brand-lime opacity-50 mb-2" />
                        <h5 className="font-bold text-text-primary uppercase tracking-tight italic">Notifications</h5>
                        <p className="text-[10px] text-text-faint font-bold uppercase tracking-widest max-w-[150px]">3 alertes en attente de traitement</p>
                        <Button variant="ghost" className="text-brand-lime text-[10px] font-bold uppercase tracking-widest hover:bg-brand-deep w-full py-2">Tout voir</Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
