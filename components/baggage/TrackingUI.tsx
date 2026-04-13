"use client";

import {
    Package,
    Truck,
    MapPin,
    CheckCircle2,
    AlertTriangle,
    Clock,
    Copy,
    CheckCheck,
    MapPin as MapPinIcon,
    RefreshCw,
    ArrowLeft
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import confetti from "canvas-confetti";

export function TrackingHero({ data }: { data: any }) {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (data.status === 'LIVRE') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#a8d878', '#7ab648', '#3d7a18', '#c8d888']
            });
        }
    }, [data.status]);

    const handleCopy = () => {
        navigator.clipboard.writeText(data.trackingId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const statusMap: Record<string, any> = {
        PRIS_EN_CHARGE: {
            icon: Package, label: "Pris en charge",
            colors: "bg-[#1a3a4a] text-[#7ac0d8] border-[#2a5a6a]"
        },
        EN_TRANSIT: {
            icon: Truck, label: "En transit",
            colors: "bg-[#3d4a1a] text-[#c8d888] border-[#5a6a2a]",
            animate: "animate-pulse"
        },
        EN_LIVRAISON: {
            icon: MapPin, label: "En cours de livraison",
            colors: "bg-[#1a4a1a] text-[#a8d878] border-[#3d7a18]",
            animate: "animate-bounce"
        },
        LIVRE: {
            icon: CheckCircle2, label: "Livré",
            colors: "bg-[#0f3a0f] text-[#a8d878] border-[#3d7a18]"
        },
        INCIDENT: {
            icon: AlertTriangle, label: "Incident signalé",
            colors: "bg-[#3a1a0a] text-[#e8a878] border-[#6a3a1a]",
            animate: "animate-pulse"
        }
    };

    const config = statusMap[data.status] || statusMap.PRIS_EN_CHARGE;
    const Icon = config.icon;

    return (
        <div className="w-full bg-charcoal relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-[3px] bg-brand-action" />

            <div className="container max-w-6xl mx-auto py-8 px-6 flex justify-between items-center relative z-20">
                <Button variant="ghost" asChild className="text-text-faint hover:text-brand-lime hover:bg-white/5 transition-all">
                    <Link href="/"><ArrowLeft className="w-4 h-4 mr-2" /> Retour</Link>
                </Button>
                <Button variant="outline" onClick={() => window.location.reload()} className="border-muted-bg/30 bg-surface/30 text-[10px] font-black uppercase tracking-widest text-text-muted hover:bg-brand-deep hover:text-brand-lime transition-all rounded-xl h-10 px-4">
                    <RefreshCw className="w-3.5 h-3.5 mr-2" /> Actualiser
                </Button>
            </div>

            <div className="container max-w-2xl mx-auto pb-16 pt-8 px-6 text-center space-y-10 group">
                <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-lime opacity-60 italic">AIR DIASS OPERATIONAL EXCELLENCE</p>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-text-faint">Suivi de Bagages</h2>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <div className="flex items-center gap-4 bg-surface px-6 py-4 rounded-2xl border border-muted-bg/50 shadow-2xl group">
                        <span className="font-mono text-xl md:text-2xl font-bold tracking-widest text-brand-lime">
                            {data.trackingId}
                        </span>
                        <button
                            onClick={handleCopy}
                            className="p-2 hover:bg-night rounded-lg transition-colors text-text-faint hover:text-brand-lime"
                        >
                            {copied ? <CheckCheck className="w-5 h-5 text-brand-action" /> : <Copy className="w-5 h-5" />}
                        </button>
                    </div>

                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest italic">
                        Pour: {data.passenger.firstName} <span className="opacity-30">{data.passenger.lastName?.charAt(0)}.</span>
                    </p>
                </div>

                {/* Status Badge */}
                <div className={cn(
                    "inline-flex items-center gap-4 px-8 py-5 rounded-[2rem] border-2 shadow-2xl animate-in zoom-in duration-500",
                    config.colors
                )}>
                    <div className={cn("p-3 rounded-xl bg-black/20", config.animate)}>
                        <Icon className="w-7 h-7" />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60 italic">Statut Actuel</p>
                        <p className="text-xl font-display font-bold uppercase italic tracking-tight">{config.label}</p>
                    </div>
                </div>

                <div className="pt-4">
                    {data.status === 'LIVRE' ? (
                        <div className="flex items-center justify-center gap-3 text-xs font-bold text-text-muted uppercase tracking-widest italic animate-in fade-in duration-1000">
                            <CheckCircle2 className="w-4 h-4 text-brand-action" />
                            Livré le : {format(new Date(data.deliveredAt), "PPP 'à' HH'h'mm", { locale: fr })}
                        </div>
                    ) : data.estimatedDelivery && (
                        <div className="flex items-center justify-center gap-3 text-xs font-bold text-text-muted uppercase tracking-widest italic">
                            <Clock className="w-4 h-4 text-brand-lime" />
                            Livraison estimée : {format(new Date(data.estimatedDelivery), "PPP 'à' HH'h'mm", { locale: fr })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export function StatusTimeline({ history, currentStatus }: { history: any[], currentStatus: string }) {
    const canonicalOrder = ['PRIS_EN_CHARGE', 'EN_TRANSIT', 'EN_LIVRAISON', 'LIVRE'];

    return (
        <div className="space-y-12 py-10">
            {canonicalOrder.map((statusKey, idx) => {
                const event = history.find(h => h.status === statusKey);
                const isCompleted = !!event;
                const isCurrent = currentStatus === statusKey;
                const isPending = !isCompleted && !isCurrent;

                const statusMap: Record<string, any> = {
                    PRIS_EN_CHARGE: { icon: Package, title: "Pris en charge" },
                    EN_TRANSIT: { icon: Truck, title: "En transit" },
                    EN_LIVRAISON: { icon: MapPin, title: "En livraison" },
                    LIVRE: { icon: CheckCircle2, title: "Livré" }
                };

                const config = statusMap[statusKey];
                const Icon = config.icon;

                return (
                    <div key={statusKey} className="relative pl-12 group">
                        {/* Connector Line */}
                        {idx < canonicalOrder.length - 1 && (
                            <div className={cn(
                                "absolute left-5 top-10 w-[2px] h-20 -translate-x-1/2",
                                isCompleted ? "bg-brand-action" : "bg-muted-bg/30 border-l-2 border-dashed border-muted-bg"
                            )} />
                        )}

                        {/* Node */}
                        <div className={cn(
                            "absolute left-0 top-0 w-10 h-10 rounded-xl border-2 flex items-center justify-center transition-all duration-500",
                            isCompleted ? "bg-brand-action border-brand-bright text-white shadow-xl shadow-brand-action/20" :
                                isCurrent ? "bg-brand-deep border-brand-lime text-brand-lime animate-pulse ring-4 ring-brand-lime/10" :
                                    "bg-surface border-muted-bg/50 text-text-faint"
                        )}>
                            <Icon className="w-5 h-5" />
                        </div>

                        <div className="space-y-2 pb-12">
                            <div className="flex items-center gap-4">
                                <h4 className={cn(
                                    "text-lg font-display font-bold uppercase italic tracking-tight",
                                    isCurrent ? "text-brand-lime" : isCompleted ? "text-text-primary" : "text-text-faint"
                                )}>
                                    {config.title}
                                </h4>
                                {isCurrent && (
                                    <Badge className="bg-brand-deep text-brand-lime font-black text-[8px] uppercase tracking-widest animate-pulse border-brand-lime/30">
                                        En cours
                                    </Badge>
                                )}
                            </div>

                            {isCompleted && (
                                <div className="space-y-3 animate-in fade-in slide-in-from-left-4 duration-500">
                                    <p className="text-[11px] font-bold text-text-muted italic max-w-md">
                                        &ldquo;{event.note}&rdquo;
                                    </p>
                                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-text-faint uppercase tracking-widest italic">
                                            <Clock className="w-3.5 h-3.5" /> {format(new Date(event.timestamp), "HH:mm")}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-text-faint uppercase tracking-widest italic">
                                            <MapPinIcon className="w-3.5 h-3.5" /> {event.location}
                                        </div>
                                        <div className="text-[10px] font-bold text-brand-bright/40 uppercase tracking-widest italic">
                                            Par: {event.agentName}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
