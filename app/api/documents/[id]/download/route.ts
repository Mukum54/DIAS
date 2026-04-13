export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";
import { renderToStream } from "@react-pdf/renderer";
import { InvoicePDF } from "@/components/shared/InvoicePDF";
import React from "react";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = params.id;

        // Mock data for the invoice (in a real app, fetch from DB using ID)
        const mockData = {
            date: new Date().toLocaleDateString('fr-FR'),
            clientName: "Mamadou NDIAYE",
            clientEmail: "m.ndiaye@example.com",
            service: "Assistance VIP",
            description: "Passage prioritaire et accès salon (AIBD)",
            amount: 75000,
            reference: "AD-2026-X892",
        };

        const stream = await renderToStream(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            React.createElement(InvoicePDF, { id, data: mockData }) as any
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new NextResponse(stream as any, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename="AIR-DIASS-FACT-${id}.pdf"`,
            },
        });
    } catch (error) {
        console.error("PDF Generation Error:", error);
        return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
    }
}
