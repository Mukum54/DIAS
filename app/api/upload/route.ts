export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const folder = formData.get("folder") as string;
        const entityId = formData.get("entityId") as string;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // --- PRODUCTION LOGIC STUB ---
        // In a real production environment, you would:
        // 1. Validate file type and size
        // 2. Upload to S3, Cloudinary, or Vercel Blob
        // 3. Return the public URL

        console.log(`Uploading file for ${folder}/${entityId}: ${file.name}`);

        // Mocking a short delay and success response
        await new Promise(resolve => setTimeout(resolve, 800));

        // For demonstration, we'll return a deterministic Unsplash URL based on the filename length
        // to simulate a successful storage upload.
        const mockUrls = [
            "https://images.unsplash.com/photo-1606611013016-969c19ba27bb",
            "https://images.unsplash.com/photo-1520031441872-265e4ff70366",
            "https://images.unsplash.com/photo-1594568284297-7c64464062b1",
            "https://images.unsplash.com/photo-1583121274602-3e2820c69888"
        ];

        const randomUrl = mockUrls[file.name.length % mockUrls.length] + "?auto=format&fit=crop&q=80&w=800";

        return NextResponse.json({
            success: true,
            url: randomUrl,
            name: file.name
        });

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
