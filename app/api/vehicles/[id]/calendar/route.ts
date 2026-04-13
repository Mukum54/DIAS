export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        // Get booked ranges for the next 60 days
        const limitDate = new Date();
        limitDate.setDate(limitDate.getDate() + 60);

        const bookedRanges = await prisma.rentalPeriod.findMany({
            where: {
                vehicleId: id,
                status: "ACTIVE",
                endDate: { gte: new Date() },
                startDate: { lte: limitDate }
            },
            select: {
                startDate: true,
                endDate: true
            },
            orderBy: {
                startDate: 'asc'
            }
        });

        return NextResponse.json({ bookedRanges });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch calendar" }, { status: 500 });
    }
}
