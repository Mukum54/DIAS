export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const updateStatusSchema = z.object({
    status: z.enum([
        'PRIS_EN_CHARGE', 'EN_TRANSIT', 'EN_LIVRAISON', 'LIVRE', 'INCIDENT'
    ]),
    note: z.string().min(5, 'Note requise (min 5 caractères)'),
    location: z.string().min(2, 'Localisation requise'),
    incidentDescription: z.string().optional(),
    estimatedDelivery: z.string().datetime().optional(),
    assignedDriverName: z.string().optional(),
    assignedDriverPhone: z.string().optional(),
}).refine(
    data => data.status !== 'INCIDENT' || !!data.incidentDescription,
    { message: 'Description requise pour un incident', path: ['incidentDescription'] }
);

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);

        if (!session || !['AGENT', 'ADMIN'].includes(session.user.role)) {
            return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
        }

        const body = await req.json();
        const parsed = updateStatusSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ error: 'VALIDATION_ERROR', issues: parsed.error.issues }, { status: 400 });
        }

        const currentBaggage = await prisma.baggage.findUnique({ where: { id } }) as any;
        if (!currentBaggage) {
            return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
        }

        // Update history
        const history = typeof currentBaggage.statusHistory === 'string'
            ? JSON.parse(currentBaggage.statusHistory)
            : (currentBaggage.statusHistory || []);

        const newEvent = {
            status: parsed.data.status,
            timestamp: new Date().toISOString(),
            note: parsed.data.note,
            agentName: session.user.name || "Agent",
            location: parsed.data.location
        };

        history.push(newEvent);

        const updateData: any = {
            status: parsed.data.status,
            statusHistory: history,
            currentLocation: parsed.data.location,
            updatedAt: new Date()
        };

        if (parsed.data.status === 'LIVRE') {
            updateData.deliveredAt = new Date();
        }
        if (parsed.data.status === 'INCIDENT') {
            updateData.incidentDescription = parsed.data.incidentDescription;
        }
        if (parsed.data.estimatedDelivery) {
            updateData.estimatedDelivery = new Date(parsed.data.estimatedDelivery);
        }
        if (parsed.data.assignedDriverName) {
            updateData.assignedDriverName = parsed.data.assignedDriverName;
        }
        if (parsed.data.assignedDriverPhone) {
            updateData.assignedDriverPhone = parsed.data.assignedDriverPhone;
        }

        const updated = await prisma.baggage.update({
            where: { id },
            data: updateData
        });

        // Trigger SMS notification (Mock/Placeholder for Africa's Talking)
        console.log(`[SMS] Notifying passenger about status ${parsed.data.status}`);

        return NextResponse.json(updated);
    } catch (error) {
        console.error("Status Update API Error:", error);
        return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
    }
}
