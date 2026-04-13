export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(req.url);
        const startDate = searchParams.get("start");
        const endDate = searchParams.get("end");

        if (!startDate || !endDate) {
            return NextResponse.json({ error: "Missing dates" }, { status: 400 });
        }

        const start = new Date(startDate);
        const end = new Date(endDate);

        const conflicts = await prisma.rentalPeriod.findMany({
            where: {
                vehicleId: id,
                status: "ACTIVE",
                AND: [
                    { startDate: { lt: end } },
                    { endDate: { gt: start } }
                ]
            }
        });

        return NextResponse.json({
            available: conflicts.length === 0,
            conflicts
        });
    } catch (error) {
        return NextResponse.json({ error: "Failed to check availability" }, { status: 500 });
    }
}
