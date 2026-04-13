export const dynamic = 'force-dynamic';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Plane, Car, Clock, CreditCard, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

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
    clientId: string | null;
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

export default async function ClientDashboardPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        redirect("/auth/login");
    }

    // Fetch user from DB
    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) redirect("/auth/login");

    // Fetch user's reservations
    const reservations = (await prisma.reservation.findMany({
        where: { clientId: user.id },
        orderBy: { createdAt: "desc" },
        take: 10,
    })) as unknown as TypedReservation[];

    const now = new Date();
    const activeReservations = reservations.filter(
        (r: TypedReservation) => r.status === "CONFIRMED" || r.status === "PENDING" || r.status === "IN_PROGRESS"
    );
    const pendingPayment = reservations.filter((r: TypedReservation) => !r.isPaid && r.status !== "CANCELLED");
    const nextReservation = reservations.find(
        (r: TypedReservation) => new Date(r.startDate) >= now && r.status !== "CANCELLED"
    );
    const totalSpent = reservations
        .filter((r: TypedReservation) => r.isPaid)
        .reduce((acc: number, r: TypedReservation) => acc + r.amount, 0);

    return (
        <div className="space-y-10 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-widest text-foreground">
                    Vue d&apos;ensemble
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">
                    Bienvenue sur votre espace premium, <strong>{user.firstName} {user.lastName}</strong>.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="shadow-sm border-border bg-card/60 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Réservations Actives</CardTitle>
                        <CalendarDays className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-display">{activeReservations.length}</div>
                        <p className="text-xs text-muted-foreground mt-1 font-medium">
                            {reservations.length} au total
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-border bg-card/60 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Prochain Service</CardTitle>
                        <Plane className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-display">
                            {nextReservation ? new Date(nextReservation.startDate).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }) : "—"}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 font-medium">
                            {nextReservation ? SERVICE_LABELS[nextReservation.serviceType] || nextReservation.serviceType : "Aucune réservation"}
                        </p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-border bg-card/60 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Total Dépensé</CardTitle>
                        <Car className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold font-display">
                            {totalSpent > 0 ? `${(totalSpent / 1000).toFixed(0)}k` : "0"}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 font-medium">XOF payés</p>
                    </CardContent>
                </Card>

                <Card className={`shadow-sm border-border ${pendingPayment.length > 0 ? "border-amber-500/30 bg-amber-500/5" : "bg-card/60"} backdrop-blur-sm`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Factures en attente</CardTitle>
                        <CreditCard className={`h-4 w-4 ${pendingPayment.length > 0 ? "text-amber-500" : "text-muted-foreground"}`} />
                    </CardHeader>
                    <CardContent>
                        <div className={`text-3xl font-bold font-display ${pendingPayment.length > 0 ? "text-amber-500" : ""}`}>
                            {pendingPayment.length}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 font-medium">
                            {pendingPayment.length > 0
                                ? `${pendingPayment.reduce((a: number, r: any) => a + r.amount, 0).toLocaleString("fr-FR")} XOF`
                                : "Tout est à jour"}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Reservations List */}
            <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-border/50 pb-4">
                    <h2 className="text-xl font-display font-bold uppercase tracking-wider">Mes Réservations</h2>
                    <Button variant="ghost" className="text-primary hover:text-primary/80 font-medium tracking-wide uppercase text-xs" asChild>
                        <Link href="reservation/nouveau">Nouvelle Réservation</Link>
                    </Button>
                </div>

                {reservations.length === 0 ? (
                    <div className="text-center py-16 text-muted-foreground">
                        <CalendarDays className="w-12 h-12 mx-auto mb-4 opacity-30" />
                        <p className="font-semibold text-lg mb-2">Aucune réservation</p>
                        <p className="text-sm mb-6">Découvrez nos services et réservez votre première prestation.</p>
                        <Button asChild>
                            <Link href="/services">Explorer les services</Link>
                        </Button>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {reservations.map((r) => {
                            const status = STATUS_CONFIG[r.status] || STATUS_CONFIG.PENDING;
                            const StatusIcon = status.icon;
                            return (
                                <div key={r.id} className="flex flex-col md:flex-row md:items-center justify-between bg-card/60 border border-border rounded-2xl p-5 hover:border-primary/30 transition-all group gap-4">
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 font-bold text-[10px] border border-primary/20">
                                            {SERVICE_LABELS[r.serviceType]?.substring(0, 3).toUpperCase() || "SRV"}
                                        </div>
                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <p className="font-bold text-sm text-text-primary">
                                                    {r.details?.offeringName || SERVICE_LABELS[r.serviceType] || r.serviceType}
                                                </p>
                                                <span className="text-[10px] text-text-faint font-mono bg-muted-bg/30 px-2 py-0.5 rounded border border-muted-bg/50">
                                                    #{r.referenceNumber}
                                                </span>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                                                <CalendarDays className="w-3 h-3" />
                                                {new Date(r.startDate).toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "long" })}
                                                {r.endDate && (
                                                    <>
                                                        <ArrowRight className="w-3 h-3" />
                                                        {new Date(r.endDate).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                                                    </>
                                                )}
                                            </p>
                                            {r.serviceType === "BAGGAGE" && r.details?.baggageCount && (
                                                <div className="flex gap-3 mt-2 text-[9px] uppercase font-black text-brand-lime bg-brand-lime/10 w-fit px-2 py-0.5 rounded-full border border-brand-lime/20">
                                                    <span>{r.details.baggageCount} Bagage(s)</span>
                                                    {r.details.baggageWeight && <span>• {r.details.baggageWeight} KG</span>}
                                                </div>
                                            )}
                                            {r.notes && <p className="text-xs text-muted-foreground/70 mt-1.5 italic line-clamp-1 max-w-sm">{r.notes}</p>}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-border/30">
                                        <div className="text-right">
                                            <p className="font-display font-bold text-sm text-text-primary">
                                                {r.amount > 0 ? `${r.amount.toLocaleString("fr-FR")} XOF` : "Devis en cours"}
                                            </p>
                                            <p className={`text-[10px] font-bold uppercase tracking-widest ${r.isPaid ? "text-brand-lime" : "text-amber-400"}`}>
                                                {r.isPaid ? "✓ Règlement effectué" : "● Paiement en attente"}
                                            </p>
                                        </div>
                                        <div className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border-2 transition-transform group-hover:scale-105 ${status.color}`}>
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
