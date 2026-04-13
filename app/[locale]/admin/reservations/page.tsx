export const dynamic = 'force-dynamic';

import { prisma } from "@/lib/prisma";

const SERVICE_LABELS: Record<string, string> = {
    HOTEL: "Hébergement",
    TRANSPORT: "Transport",
    PARKING: "Parking",
    BAGGAGE: "Bagages",
    RENTAL: "Location",
    GARAGE: "Garage",
    WASH: "Lavage",
    SALES_INQUIRY: "Vente",
};

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: any }> = {
    PENDING: { label: "En attente", color: "text-amber-400 bg-amber-400/10 border-amber-400/30", icon: Clock },
    CONFIRMED: { label: "Confirmée", color: "text-brand-lime bg-brand-lime/10 border-brand-lime/30", icon: CheckCircle2 },
    IN_PROGRESS: { label: "En cours", color: "text-blue-400 bg-blue-400/10 border-blue-400/30", icon: ArrowRight },
    COMPLETED: { label: "Terminée", color: "text-text-muted bg-muted-bg/30 border-muted-bg", icon: CheckCircle2 },
    CANCELLED: { label: "Annulée", color: "text-red-400 bg-red-400/10 border-red-400/30", icon: AlertCircle },
};

interface ServiceDetail {
    offeringId?: string;
    offeringName?: string;
    baggageCount?: string;
    baggageWeight?: string;
    pickupAddress?: string;
    deliveryAddress?: string;
}

interface TypedReservation {
    id: string;
    referenceNumber: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    serviceType: string;
    startDate: Date;
    endDate: Date | null;
    amount: number;
    isPaid: boolean;
    status: string;
    notes: string | null;
    details: ServiceDetail | null;
    createdAt: Date;
}

export default async function AdminReservationsPage() {
    const reservations = (await prisma.reservation.findMany({
        orderBy: { createdAt: "desc" },
        take: 100,
    })) as unknown as TypedReservation[];

    const totalAmount = reservations.reduce((acc: number, r: TypedReservation) => acc + r.amount, 0);
    const confirmed = reservations.filter((r: TypedReservation) => r.status === "CONFIRMED" || r.status === "IN_PROGRESS").length;
    const pending = reservations.filter((r: TypedReservation) => r.status === "PENDING").length;

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="border-b border-border/50 pb-6 mb-8">
                <h1 className="text-3xl font-display font-bold uppercase tracking-widest text-foreground">
                    Toutes les <span className="text-primary">Réservations</span>
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Base complète — tous services et clients confondus.
                </p>
            </div>

            {/* Summary Strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Total", value: reservations.length, color: "" },
                    { label: "Confirmées", value: confirmed, color: "text-brand-lime" },
                    { label: "En attente", value: pending, color: "text-amber-400" },
                    { label: "Chiffre d'affaires", value: `${(totalAmount / 1000).toFixed(0)}k XOF`, color: "text-brand-lime" },
                ].map((s) => (
                    <div key={s.label} className="bg-card border border-border rounded-2xl p-4">
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">{s.label}</p>
                        <p className={`text-2xl font-display font-bold ${s.color}`}>{s.value}</p>
                    </div>
                ))}
            </div>

            {/* Reservations Table */}
            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                {reservations.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p className="font-semibold text-lg">Aucune réservation pour l&apos;instant</p>
                        <p className="text-sm mt-1">Les nouvelles réservations apparaîtront ici en temps réel.</p>
                    </div>
                ) : (
                    <div className="divide-y divide-border">
                        {reservations.map((r) => {
                            const status = STATUS_CONFIG[r.status] || STATUS_CONFIG.PENDING;
                            const StatusIcon = status.icon;
                            return (
                                <div key={r.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 hover:bg-muted/30 transition-colors gap-3">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 font-bold text-[10px] border border-primary/20">
                                            {SERVICE_LABELS[r.serviceType]?.substring(0, 3).toUpperCase() || "SRV"}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="font-bold text-sm text-text-primary">{r.clientName}</p>
                                                <span className="text-[10px] text-text-faint font-mono bg-muted-bg/30 px-2 py-0.5 rounded border border-muted-bg/50">#{r.referenceNumber}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                {r.details?.offeringName || SERVICE_LABELS[r.serviceType]} •{" "}
                                                {new Date(r.startDate).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" })}
                                                {r.endDate && ` → ${new Date(r.endDate).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}`}
                                            </p>
                                            {r.serviceType === "BAGGAGE" && r.details?.baggageCount && (
                                                <div className="flex gap-2 mt-1 text-[9px] uppercase font-black text-brand-lime bg-brand-lime/10 w-fit px-2 py-0.5 rounded-full border border-brand-lime/20">
                                                    <span>{r.details.baggageCount} Bagages</span>
                                                    {r.details.baggageWeight && <span>| {r.details.baggageWeight} KG</span>}
                                                </div>
                                            )}
                                            {r.notes && <p className="text-xs text-muted-foreground/70 mt-0.5 italic">{r.notes}</p>}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 shrink-0 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-border/20">
                                        <div className="text-right">
                                            <p className="font-bold text-sm text-text-primary">
                                                {r.amount > 0 ? `${r.amount.toLocaleString("fr-FR")} XOF` : "—"}
                                            </p>
                                            <p className={`text-[10px] font-bold uppercase tracking-widest ${r.isPaid ? "text-brand-lime" : "text-amber-400"}`}>
                                                {r.isPaid ? "✓ Payé" : "Non payé"}
                                            </p>
                                        </div>
                                        <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl border-2 ${status.color}`}>
                                            <StatusIcon className="w-3.5 h-3.5" />
                                            {status.label}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
