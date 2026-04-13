export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const vehicle = await prisma.vehicle.findUnique({
            where: { id },
            include: {
                rentalPeriods: {
                    where: {
                        endDate: { gte: new Date() }
                    }
                }
            }
        });

        if (!vehicle) {
            return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
        }

        return NextResponse.json(vehicle);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch vehicle" }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await req.json();
        const vehicle = await prisma.vehicle.update({
            where: { id },
            data: body
        });
        return NextResponse.json(vehicle);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update vehicle" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.vehicle.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete vehicle" }, { status: 500 });
    }
}
