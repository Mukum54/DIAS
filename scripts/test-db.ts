import { prisma } from "../lib/prisma";
import { hash } from "bcryptjs";

async function main() {
    console.log("Testing Prisma connection with Adapter...");
    try {
        const passwordHash = await hash("password123", 12);
        console.log("Password hashed.");

        const email = `test-${Date.now()}@example.com`;

        console.log(`Attempting create: ${email}`);
        const user = await prisma.user.create({
            data: {
                email,
                firstName: "Test",
                lastName: "User",
                passwordHash,
                phone: "+221770000000",
                role: "CLIENT"
            }
        });
        console.log("SUCCESS: User created ID:", user.id);

        await prisma.user.delete({ where: { id: user.id } });
        console.log("Cleanup success.");
    } catch (err: any) {
        console.error("--- TEST FAILED ---");
        console.error("Error Name:", err.name);
        console.error("Error Code:", err.code);
        console.error("Error Message:", err.message);
        if (err.meta) console.error("Error Meta:", JSON.stringify(err.meta, null, 2));
        process.exit(1);
    }
}

main();
