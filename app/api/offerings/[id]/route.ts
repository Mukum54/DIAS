export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PUT /api/offerings/[id] — update an offering
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();

        const offering = await prisma.serviceOffering.update({
            where: { id },
            data: {
                ...(body.name && { name: body.name }),
                ...(body.description && { description: body.description }),
                ...(body.price != null && { price: parseFloat(body.price) }),
                ...(body.priceUnit && { priceUnit: body.priceUnit }),
                ...(body.imageUrl !== undefined && { imageUrl: body.imageUrl }),
                ...(body.capacity !== undefined && { capacity: body.capacity ? parseInt(body.capacity) : null }),
                ...(body.duration !== undefined && { duration: body.duration }),
                ...(body.features !== undefined && { features: body.features }),
                ...(body.isAvailable !== undefined && { isAvailable: body.isAvailable }),
                ...(body.sortOrder !== undefined && { sortOrder: parseInt(body.sortOrder) }),
            },
        });

        return NextResponse.json(offering);
    } catch (error) {
        console.error("Error updating offering:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

// DELETE /api/offerings/[id] — delete an offering
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        await prisma.serviceOffering.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Offre supprimée" });
    } catch (error) {
        console.error("Error deleting offering:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
