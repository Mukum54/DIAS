export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import NextAuth from "next-auth/next";
import { authOptions } from "../../../../lib/auth";

export async function GET(req: any, res: any) {
    return NextAuth(authOptions)(req, res);
}

export async function POST(req: any, res: any) {
    return NextAuth(authOptions)(req, res);
}
