import {
    Luggage,
    MapPin,
    Clock,
    ShieldCheck,
    CheckCircle2,
    AlertTriangle,
    QrCode,
    Package,
    Truck,
    History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function ClientBagagesPage() {
    const baggages = [
        { id: "BG-2024-001", trackingId: "TRK-992-882", status: "EN_TRANSIT", weight: "23.5kg", description: "Valise rigide Samsonite Noire", lastUpdate: "Il y a 10 min", location: "Hub AIBD Dakar" },
        { id: "BG-2024-002", trackingId: "TRK-992-883", status: "PRIS_EN_CHARGE", weight: "12.0kg", description: "Sac de sport Nike Bleu", lastUpdate: "Il y a 1h", location: "Point de collecte Terminal 1" },
    ];

    const statusMap = {
        PRIS_EN_CHARGE: { label: "Pris en charge", color: "text-blue-400 bg-blue-400/10 border-blue-400/20", icon: Package },
        EN_TRANSIT: { label: "En transit", color: "text-brand-lime bg-brand-lime/10 border-brand-lime/20 shadow-[0_0_10px_rgba(var(--primary),0.1)]", icon: Truck },
        LIVRE: { label: "Livré", color: "text-text-faint bg-text-faint/10 border-text-faint/20", icon: CheckCircle2 },
        INCIDENT: { label: "Incident", color: "text-danger bg-danger/10 border-danger/20", icon: AlertTriangle },
    };

    return (
        <div className="space-y-12 pb-20 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-muted-bg/50 pb-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Luggage className="w-4 h-4 text-brand-lime" />
                        <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[0.4em]">Service Bagages Privé</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-text-primary italic">
                        Mes <span className="text-brand-lime">Bagages</span>
                    </h1>
                    <p className="text-text-muted text-lg font-medium italic">Suivi temps-réel et historique de transport</p>
                </div>
                <div className="flex gap-4">
                    <Button asChild className="h-14 bg-brand-action hover:bg-brand-bright text-white rounded-2xl px-8 shadow-xl shadow-brand-action/20 font-bold uppercase tracking-widest text-sm group">
                        <Link href="/reservation/bagages"><Plus className="w-4 h-4 mr-3" /> Nouveau Transport</Link>
                    </Button>
                </div>
            </div>

            {/* Live Tracking Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {baggages.map((bag, idx) => {
                    const status = statusMap[bag.status as keyof typeof statusMap];
                    return (
                        <Card key={idx} className="bg-surface border-muted-bg/50 border rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group hover:border-brand-bright/20 transition-all">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                                <status.icon className="w-48 h-48" />
                            </div>

                            <div className="relative z-10 space-y-8">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-text-faint font-bold uppercase tracking-widest">Tracking ID</p>
                                        <h4 className="text-xl font-bold text-text-primary font-mono tabular-nums tracking-widest">{bag.trackingId}</h4>
                                    </div>
                                    <Badge className={`${status.color} border font-bold text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-md`}>
                                        <status.icon className="w-3 h-3 mr-2" /> {status.label}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-muted-bg/10">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-text-faint font-bold uppercase tracking-wider">Poids</p>
                                        <p className="text-sm font-bold text-text-primary tabular-nums">{bag.weight}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-text-faint font-bold uppercase tracking-wider">Localisation</p>
                                        <p className="text-sm font-bold text-text-primary italic flex items-center gap-1"><MapPin className="w-3 h-3 text-brand-lime" /> {bag.location}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-text-faint font-bold uppercase tracking-wider">Dernier Scan</p>
                                        <p className="text-sm font-bold text-text-primary italic flex items-center gap-1"><Clock className="w-3 h-3 text-brand-lime" /> {bag.lastUpdate}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <Button asChild className="flex-1 h-12 bg-brand-deep hover:bg-brand-deep/80 text-brand-lime border border-brand-bright/10 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg">
                                        <Link href={`/suivi/${bag.trackingId}`}><QrCode className="w-4 h-4 mr-2" /> Voir QR Code</Link>
                                    </Button>
                                    <Button variant="outline" asChild className="flex-1 h-12 border-muted-bg/50 text-text-muted rounded-xl bg-transparent hover:bg-brand-deep font-bold uppercase tracking-widest text-[10px]">
                                        <Link href={`/suivi/${bag.trackingId}`}>Détails complets</Link>
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Information Footer */}
            <div className="p-10 bg-brand-deep/30 border border-brand-bright/10 rounded-[2.5rem] backdrop-blur-xl flex flex-col md:flex-row items-center gap-10">
                <div className="w-20 h-20 rounded-[2rem] bg-brand-deep flex items-center justify-center text-brand-lime shadow-2xl border border-brand-bright/10 shadow-brand-lime/10">
                    <ShieldCheck className="w-10 h-10" />
                </div>
                <div className="flex-1 space-y-2 text-center md:text-left">
                    <h4 className="text-xl font-bold text-text-primary uppercase tracking-tight italic">Audit <span className="text-brand-lime">Sécurité</span> 24h/24</h4>
                    <p className="text-sm text-text-muted leading-relaxed max-w-2xl">
                        Chaque étape du transport de vos bagages est scannée et géolocalisée. Nos agents AIR DIASS opèrent avec une assurance tout risque pour garantir l&apos;intégrité de vos biens.
                    </p>
                </div>
                <Button variant="ghost" asChild className="text-text-faint hover:text-brand-lime font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                    <Link href="/espace-client/reservations"><History className="w-4 h-4" /> Historique complet</Link>
                </Button>
            </div>
        </div>
    );
}

function Plus(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
