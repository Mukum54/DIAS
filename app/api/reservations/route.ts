export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Map slug to ServiceType enum
const SLUG_TO_SERVICE_TYPE: Record<string, string> = {
    "vip": "HOTEL",
    "bagages": "BAGGAGE",
    "hebergement": "HOTEL",
    "transport": "TRANSPORT",
    "garage": "GARAGE",
    "location": "RENTAL",
    "parking": "PARKING",
};

// POST /api/reservations — create a new reservation
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            service,
            clientName,
            clientPhone,
            clientEmail,
            startDate,
            notes,
            offeringId,
            // Baggage fields
            baggageCount,
            baggageWeight,
            baggageDescription,
            pickupAddress,
            deliveryAddress
        } = body;

        if (!service || !clientName || !clientPhone || !clientEmail || !startDate) {
            return NextResponse.json(
                { error: "Champs requis: service, clientName, clientPhone, clientEmail, startDate" },
                { status: 400 }
            );
        }

        // Fetch user from session automatically if logged in
        const session = await getServerSession(authOptions);
        let clientId = null;
        if (session?.user?.email) {
            const user = await prisma.user.findUnique({
                where: { email: session.user.email }
            });
            if (user) {
                clientId = user.id;
            }
        }

        // Determine ServiceType from slug
        const serviceType = SLUG_TO_SERVICE_TYPE[service] || "HOTEL";

        // Generate reference number
        const refPrefix = "AD";
        const refRandom = Math.random().toString(36).substring(2, 8).toUpperCase();
        const referenceNumber = `${refPrefix}-${refRandom}`;

        // Look up offering price if provided
        let amount = 0;
        let offeringName = null;
        if (offeringId) {
            const offering = await prisma.serviceOffering.findUnique({
                where: { id: offeringId },
            });
            if (offering) {
                amount = offering.price;
                offeringName = offering.name;
            }
        }

        // Prepare details JSON
        const details = {
            offeringId,
            offeringName,
            notes,
            ...(service === "bagages" && {
                baggageCount,
                baggageWeight,
                baggageDescription,
                pickupAddress,
                deliveryAddress,
            })
        };

        const reservation = await prisma.reservation.create({
            data: {
                referenceNumber,
                clientId,
                clientName,
                clientPhone,
                clientEmail,
                serviceType: serviceType as any,
                startDate: new Date(startDate),
                endDate: body.endDate ? new Date(body.endDate) : null,
                amount,
                notes: notes || null,
                details,
            },
        });

        // IF BAGGAGE: Create Passenger + Baggage record for tracking
        if (service === "bagages") {
            try {
                // Split name safely
                const names = clientName.split(" ");
                const firstName = names[0] || "Client";
                const lastName = names.slice(1).join(" ") || "Air Diass";

                const passenger = await prisma.passenger.create({
                    data: {
                        userId: clientId,
                        firstName,
                        lastName,
                        phone: clientPhone,
                        nationality: "Sénégal", // Default
                        documentType: "CNI",    // Default
                        registrationRef: referenceNumber,
                    }
                });

                await prisma.baggage.create({
                    data: {
                        passengerId: passenger.id,
                        trackingId: referenceNumber, // Use reservation ref for tracking
                        count: parseInt(baggageCount) || 1,
                        weightKg: parseFloat(baggageWeight) || null,
                        description: notes || baggageDescription || "Service de bagages",
                        pickupAddress: pickupAddress || null,
                        deliveryAddress: deliveryAddress || null,
                        status: "PRIS_EN_CHARGE",
                        statusHistory: [{
                            status: "PRIS_EN_CHARGE",
                            location: "Plateforme AIR DIASS",
                            timestamp: new Date().toISOString(),
                            note: "Votre demande de prise en charge a été enregistrée.",
                            agentName: "Système Automatique"
                        }] as any
                    }
                });
            } catch (err) {
                console.error("Failed to create linked baggage tracking:", err);
                // We don't fail the whole reservation if tracking creation fails
            }
        }

        return NextResponse.json({
            reservation,
            referenceNumber: reservation.referenceNumber,
            message: "Réservation créée avec succès",
        }, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error("Error creating reservation:", message);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}

// GET /api/reservations — list reservations
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const status = searchParams.get("status");
        const serviceType = searchParams.get("serviceType");

        const reservations = await prisma.reservation.findMany({
            where: {
                ...(status && { status: status as any }),
                ...(serviceType && { serviceType: serviceType as any }),
            },
            orderBy: { createdAt: 'desc' },
            take: 100,
        });

        return NextResponse.json(reservations);
    } catch (error) {
        console.error("Error fetching reservations:", error);
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
