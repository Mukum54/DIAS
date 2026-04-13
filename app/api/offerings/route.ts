export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/offerings — list all offerings, optionally filter by serviceType
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const serviceType = searchParams.get("serviceType");

        const offerings = await prisma.serviceOffering.findMany({
            where: serviceType ? {
                serviceType: serviceType as any,
                isAvailable: true,
            } : { isAvailable: true },
            orderBy: { sortOrder: 'asc' },
        });

        return NextResponse.json(offerings);
    } catch (error) {
        console.error("Error fetching offerings:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

// POST /api/offerings — create a new offering (admin only)
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { serviceType, name, description, price, priceUnit, imageUrl, capacity, duration, features, sortOrder } = body;

        if (!serviceType || !name || !description || price == null) {
            return NextResponse.json({ error: "Champs requis: serviceType, name, description, price" }, { status: 400 });
        }

        const offering = await prisma.serviceOffering.create({
            data: {
                serviceType,
                name,
                description,
                price: parseFloat(price),
                priceUnit: priceUnit || "XOF",
                imageUrl: imageUrl || null,
                capacity: capacity ? parseInt(capacity) : null,
                duration: duration || null,
                features: features || null,
                sortOrder: sortOrder ? parseInt(sortOrder) : 0,
            },
        });

        return NextResponse.json(offering, { status: 201 });
    } catch (error) {
        console.error("Error creating offering:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
