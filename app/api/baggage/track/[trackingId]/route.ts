export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ trackingId: string }> }
) {
    try {
        const { trackingId } = await params;

        const baggage = await prisma.baggage.findFirst({
            where: { trackingId },
            include: {
                passenger: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        }) as any;

        if (!baggage) {
            return NextResponse.json(
                { error: 'NOT_FOUND', message: 'Bagage introuvable' },
                { status: 404 }
            );
        }

        // Parse statusHistory safefy
        let statusHistory = [];
        try {
            statusHistory = typeof baggage.statusHistory === 'string'
                ? JSON.parse(baggage.statusHistory)
                : (baggage.statusHistory || []);
        } catch (e) {
            console.error("History parse error:", e);
        }

        const data = {
            trackingId: baggage.trackingId,
            status: baggage.status,
            count: baggage.count,
            weightKg: baggage.weightKg,
            description: baggage.description,
            pickupAddress: baggage.pickupAddress,
            deliveryAddress: baggage.deliveryAddress,
            currentLocation: baggage.currentLocation,
            estimatedDelivery: baggage.estimatedDelivery,
            assignedDriverName: baggage.assignedDriverName,
            assignedDriverPhone: baggage.assignedDriverPhone,
            deliveredAt: baggage.deliveredAt,
            deliveryPhotoUrl: baggage.deliveryPhotoUrl,
            incidentDescription: baggage.incidentDescription,
            passenger: baggage.passenger,
            statusHistory: statusHistory,
            updatedAt: baggage.updatedAt
        };

        return NextResponse.json(data);
    } catch (error) {
        console.error("Track API Error:", error);
        return NextResponse.json(
            { error: 'INTERNAL_ERROR', message: 'Erreur lors du suivi' },
            { status: 500 }
        );
    }
}
