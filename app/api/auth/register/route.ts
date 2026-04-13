export const dynamic = 'force-dynamic';
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, firstName, lastName, phone } = body;

        if (!email || !password || !firstName || !lastName || !phone) {
            return NextResponse.json({ error: "Tous les champs sont requis." }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ error: "Un compte existe déjà avec cet email." }, { status: 400 });
        }

        // Hash password
        const hashedPassword = await hash(password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                firstName,
                lastName,
                passwordHash: hashedPassword,
                phone,
                role: "CLIENT", // Default role
            },
        });

        // Don't leak password
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { passwordHash: _, ...userWithoutPassword } = user as any;

        return NextResponse.json({ user: userWithoutPassword, message: "Compte créé avec succès" }, { status: 201 });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Une erreur interne est survenue." }, { status: 500 });
    }
}
