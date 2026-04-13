import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

declare global {
    // eslint-disable-next-line no-var
    var prisma: PrismaClient | undefined
}

function getClient(): PrismaClient {
    if (global.prisma) return global.prisma

    const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/__dummy__'

    const pool = new Pool({ connectionString })
    const adapter = new PrismaPg(pool)
    const client = new PrismaClient({ adapter } as any)

    if (process.env.NODE_ENV !== 'production') {
        global.prisma = client
    }

    return client
}

/**
 * Lazy Prisma client proxy.
 *
 * The actual PrismaClient + Pool are only created on first property access,
 * so routes marked `dynamic = 'force-dynamic'` will never instantiate this
 * during the Next.js build step.
 */
export const prisma = new Proxy({} as PrismaClient, {
    get(_target, prop) {
        const client = getClient()
        return (client as any)[prop]
    },
})

export default prisma
