import {
    ChevronLeft,
    Calendar,
    CreditCard,
    Clock,
    ShieldCheck,
    Download,
    Printer,
    MoreVertical,
    Zap,
    Tag,
    FileText,
    User as UserIcon,
    Phone,
    Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import ReferenceNumber from "@/components/shared/ReferenceNumber";

export default async function ReservationDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    // Stub data matching the new Section 4 schema
    const reservation = {
        id: id,
        referenceNumber: id.toUpperCase(),
        clientName: "Moussa Diop",
        clientEmail: "moussa.diop@example.com",
        clientPhone: "+221 77 123 45 67",
        serviceType: "PARKING",
        status: "CONFIRMED",
        startDate: "2024-04-12T08:00:00Z",
        endDate: "2024-04-20T18:00:00Z",
        amount: 85000,
        isPaid: true,
        invoiceId: "INV-2024-001",
        notes: "Accès VIP Deck B1. Lavage express inclus.",
        agentId: "agent_001",
        createdAt: "2024-04-01T10:30:00Z",
        details: {
            vehicle: "Range Rover Sport",
            plate: "AA 123 AA",
            zone: "VIP Gold",
            slot: "A15"
        }
    };

    const statusConfig = {
        PENDING: { label: "En attente", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
        CONFIRMED: { label: "Confirmée", color: "bg-brand-lime/10 text-brand-lime border-brand-lime/20" },
        IN_PROGRESS: { label: "En cours", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
        COMPLETED: { label: "Terminée", color: "bg-text-faint/10 text-text-faint border-text-faint/20" },
        CANCELLED: { label: "Annulée", color: "bg-danger/10 text-danger border-danger/20" }
    };

    const config = statusConfig[reservation.status as keyof typeof statusConfig];

    return (
        <div className="space-y-10 max-w-6xl mx-auto pb-20">
            {/* Header / Nav */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-muted-bg/30">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild className="rounded-xl border border-muted-bg/50 hover:bg-brand-deep">
                        <Link href="/espace-client/reservations"><ChevronLeft className="w-5 h-5" /></Link>
                    </Button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[0.3em]">Réservation</span>
                            <Badge className={`${config.color} border font-bold text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-md`}>
                                {config.label}
                            </Badge>
                        </div>
                        <h1 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight italic">
                            Détails <span className="text-brand-lime">#{reservation.referenceNumber}</span>
                        </h1>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" className="border-brand-bright/20 bg-brand-deep/30 text-text-primary h-11 rounded-xl px-5 hover:bg-brand-deep">
                        <Printer className="w-4 h-4 mr-2" /> Imprimer
                    </Button>
                    <Button className="bg-brand-action hover:bg-brand-bright text-white h-11 rounded-xl px-6 shadow-lg shadow-brand-action/20">
                        <Download className="w-4 h-4 mr-2" /> Facture PDF
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-10">
                    {/* QR Code & Summary Section */}
                    <div className="bg-surface border border-muted-bg/50 rounded-[2.5rem] p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                            <ShieldCheck className="w-64 h-64" />
                        </div>

                        <div className="flex flex-col md:flex-row gap-12 items-start md:items-center relative z-10">
                            <div className="shrink-0 scale-110 p-4 bg-white rounded-3xl shadow-2xl">
                                <ReferenceNumber reference={reservation.referenceNumber} showQR showCopy={false} />
                            </div>
                            <div className="space-y-6">
                                <h3 className="text-2xl font-display font-bold text-text-primary uppercase tracking-tight italic">Identification <span className="text-brand-lime">Prioritaire</span></h3>
                                <p className="text-text-muted leading-relaxed max-w-md">
                                    Présentez ce code QR à l&apos;accueil ou scannez-le aux bornes automatiques pour valider votre arrivée.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <div className="px-3 py-1.5 rounded-lg bg-brand-deep border border-brand-bright/10 flex items-center gap-2">
                                        <Zap className="w-3 h-3 text-brand-lime" />
                                        <span className="text-[10px] font-bold text-brand-lime uppercase tracking-widest">Service: {reservation.serviceType}</span>
                                    </div>
                                    <div className="px-3 py-1.5 rounded-lg bg-brand-deep border border-brand-bright/10 flex items-center gap-2">
                                        <Tag className="w-3 h-3 text-brand-lime" />
                                        <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest">ID Facture: {reservation.invoiceId}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Operational Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-surface border border-muted-bg/50 rounded-[2rem] p-8 space-y-8">
                            <h4 className="text-xs font-bold text-brand-lime uppercase tracking-[0.3em] flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> Planning & Dates
                            </h4>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center group">
                                    <span className="text-sm text-text-faint font-medium">Date d&apos;arrivée</span>
                                    <span className="text-sm font-bold text-text-primary font-mono bg-brand-deep px-2 py-1 rounded">12 Avr. 2024 — 08:00</span>
                                </div>
                                <div className="flex justify-between items-center group">
                                    <span className="text-sm text-text-faint font-medium">Date de départ</span>
                                    <span className="text-sm font-bold text-text-primary font-mono bg-brand-deep px-2 py-1 rounded">20 Avr. 2024 — 18:00</span>
                                </div>
                                <div className="pt-4 border-t border-muted-bg/20 flex items-center gap-3 text-brand-lime/80 italic">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Durée estimée: 8 jours</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface border border-muted-bg/50 rounded-[2rem] p-8 space-y-8">
                            <h4 className="text-xs font-bold text-brand-lime uppercase tracking-[0.3em] flex items-center gap-2">
                                <CreditCard className="w-4 h-4" /> Règlement
                            </h4>
                            <div className="space-y-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-text-faint font-medium">Montant Total</span>
                                    <span className="text-xl font-bold text-text-primary tabular-nums">85.000 <span className="text-[10px] text-brand-lime ml-1">XOF</span></span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-text-faint font-medium">Statut Paiement</span>
                                    <Badge className="bg-brand-lime/10 text-brand-lime border-brand-lime/20 font-bold text-[10px] uppercase tracking-widest">Acquitté</Badge>
                                </div>
                                <div className="pt-4 border-t border-muted-bg/20 flex items-center gap-3 text-text-muted italic">
                                    <FileText className="w-4 h-4 text-brand-lime" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Méthode: Carte VIP Corporate</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-8">
                    {/* Client Info Card */}
                    <div className="bg-brand-deep/30 border border-brand-bright/10 rounded-[2rem] p-8 backdrop-blur-xl space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-brand-deep flex items-center justify-center text-brand-lime shadow-xl">
                                <UserIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-text-primary uppercase tracking-tight italic">Propriétaire</h4>
                                <p className="text-xs text-text-muted font-bold tracking-widest uppercase">Compte CLIENT VIP</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-text-faint group-hover:text-brand-lime transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span className="text-sm text-text-muted font-medium">{reservation.clientEmail}</span>
                            </div>
                            <div className="flex items-center gap-3 group">
                                <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-text-faint group-hover:text-brand-lime transition-colors">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span className="text-sm text-text-muted font-medium font-mono">{reservation.clientPhone}</span>
                            </div>
                        </div>
                    </div>

                    {/* Additional Details Card */}
                    <div className="bg-surface border border-muted-bg/50 rounded-[2rem] p-8 space-y-6">
                        <h4 className="text-[10px] font-bold text-text-faint uppercase tracking-[0.4em]">Spécifications</h4>
                        <div className="space-y-4">
                            {Object.entries(reservation.details).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center py-2 border-b border-muted-bg/10 last:border-0">
                                    <span className="text-xs text-text-muted uppercase tracking-wider">{key}</span>
                                    <span className="text-xs font-bold text-text-primary uppercase">{value as string}</span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-6">
                            <Button variant="ghost" className="w-full text-text-muted hover:text-brand-lime hover:bg-brand-deep/50 text-xs font-bold uppercase tracking-widest italic group">
                                Modifier la réservation <MoreVertical className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
