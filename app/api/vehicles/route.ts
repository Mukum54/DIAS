export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type"); // RENTAL | FOR_SALE
        const category = searchParams.get("category");
        const maxPrice = searchParams.get("maxPrice");
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");
        const isFeatured = searchParams.get("isFeatured") === "true";

        const where: any = {};
        if (type) where.type = type;
        if (category) where.category = category;
        if (isFeatured) where.isFeatured = true;
        if (maxPrice) {
            if (type === "RENTAL") {
                where.pricePerDay = { lte: parseFloat(maxPrice) };
            } else if (type === "FOR_SALE") {
                where.salePrice = { lte: parseFloat(maxPrice) };
            }
        }

        // Fetch vehicles
        let vehicles = await prisma.vehicle.findMany({
            where,
            include: {
                rentalPeriods: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // Filter by date overlap if provided
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            vehicles = vehicles.filter((vehicle: any) => {
                const conflicts = vehicle.rentalPeriods.filter((period: any) => {
                    return start < new Date(period.endDate) && end > new Date(period.startDate);
                });
                return conflicts.length === 0;
            });
        }

        return NextResponse.json(vehicles);
    } catch (error) {
        console.error("Vehicles API Error:", error);
        return NextResponse.json({ error: "Failed to fetch vehicles" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const vehicle = await prisma.vehicle.create({
            data: body
        });
        return NextResponse.json(vehicle);
    } catch (error) {
        console.error("Vehicle Creation Error:", error);
        return NextResponse.json({ error: "Failed to create vehicle" }, { status: 500 });
    }
}
