export const dynamic = 'force-dynamic';

import { DataTable } from "@/components/shared/DataTable";
import { columns, ReservationType } from "./columns";
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

export default async function ReservationsPage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
        redirect("/auth/login");
    }

    const user = await (prisma as any).user.findUnique({
        where: { email: session.user.email },
    });

    if (!user) redirect("/auth/login");

    const rawReservations = await (prisma as any).reservation.findMany({
        where: { clientId: user.id },
        orderBy: { createdAt: "desc" },
    });

    const data: ReservationType[] = rawReservations.map((r: any) => ({
        id: r.id,
        reference: r.referenceNumber,
        service: r.details?.offeringName || SERVICE_LABELS[r.serviceType] || r.serviceType,
        status: r.status,
        date: new Date(r.startDate),
        amount: r.amount || 0,
    }));

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-widest text-foreground">
                    Mes Réservations
                </h1>
                <p className="text-muted-foreground mt-2 text-lg">Retrouvez l&apos;historique complet de vos services.</p>
            </div>

            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
                <DataTable
                    columns={columns}
                    data={data}
                    searchKey="reference"
                    searchPlaceholder="Chercher par référence..."
                />
            </div>
        </div>
    );
}
