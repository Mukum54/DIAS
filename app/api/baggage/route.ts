export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !['AGENT', 'ADMIN', 'LIVREUR'].includes(session.user.role)) {
            return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");
        const query = searchParams.get("search");

        const where: any = {};
        if (status && status !== 'Tous') {
            where.status = status;
        }
        if (query) {
            where.OR = [
                { trackingId: { contains: query, mode: 'insensitive' } },
                { passenger: { firstName: { contains: query, mode: 'insensitive' } } },
                { passenger: { lastName: { contains: query, mode: 'insensitive' } } }
            ];
        }

        const baggageList = await prisma.baggage.findMany({
            where,
            include: {
                passenger: {
                    select: {
                        firstName: true,
                        lastName: true,
                        phone: true
                    }
                }
            },
            orderBy: {
                updatedAt: 'desc'
            }
        });

        return NextResponse.json(baggageList);
    } catch (error) {
        console.error("Baggage List API Error:", error);
        return NextResponse.json({ error: 'INTERNAL_ERROR' }, { status: 500 });
    }
}
