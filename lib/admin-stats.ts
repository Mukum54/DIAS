import { prisma } from "./prisma";


export interface AdminClient {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    reservations: number;
    totalSpent: string;
}

export async function getAdminOverviewStats() {
    // 1. Total Clients
    const clientCount = await prisma.user.count({
        where: { role: "CLIENT" }
    });

    // 2. Total Revenue (Confirmed/Paid Reservations)
    const reservations = await prisma.reservation.findMany({
        where: { isPaid: true },
        select: { amount: true }
    });
    const totalRevenue = reservations.reduce((sum: number, res: { amount: number }) => sum + res.amount, 0);

    // 3. Active Reservations
    const activeReservations = await prisma.reservation.count({
        where: {
            status: { in: ['PENDING', 'CONFIRMED', 'IN_PROGRESS'] }
        }
    });

    // 4. Sector Distribution (B2B vs B2C)
    const corporateClients = await prisma.user.count({
        where: {
            role: "CLIENT",
            companyId: { not: null }
        }
    });

    const individualClients = clientCount - corporateClients;
    const corporatePercentage = clientCount > 0 ? Math.round((corporateClients / clientCount) * 100) : 0;
    const individualPercentage = clientCount > 0 ? 100 - corporatePercentage : 0;

    // 5. Dynamic Revenue Trend (Last 4 Months)
    const now = new Date();
    const revenueTrend = [];
    for (let i = 3; i >= 0; i--) {
        const monthDate = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const nextMonthDate = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
        const monthLabel = monthDate.toLocaleDateString('fr-FR', { month: 'short' });

        const monthRevenueData = await prisma.reservation.findMany({
            where: {
                isPaid: true,
                createdAt: {
                    gte: monthDate,
                    lt: nextMonthDate
                }
            },
            select: { amount: true }
        });

        const monthValue = monthRevenueData.reduce((sum: number, res: { amount: number }) => sum + res.amount, 0) / 1000000;
        revenueTrend.push({ name: monthLabel, value: Number(monthValue.toFixed(2)) });
    }

    return {
        totalRevenue,
        clientCount,
        activeReservations,
        npsScore: 4.8,
        sectorDistribution: [
            { name: 'B2B Corporate', value: corporatePercentage },
            { name: 'B2C VIP', value: individualPercentage },
        ],
        revenueTrend
    };
}

export async function getAdminClients() {
    return prisma.user.findMany({
        where: { role: "CLIENT" },
        include: {
            _count: {
                select: { reservations: true }
            },
            reservations: {
                where: { isPaid: true },
                select: { amount: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    }).then((users: any[]) => users.map((user: any) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phone: user.phone || "Non renseigné",
        status: user._count.reservations > 10 ? "PLATINUM" : "STANDARD",
        reservations: user._count.reservations,
        totalSpent: user.reservations.reduce((sum: number, res: { amount: number }) => sum + res.amount, 0).toLocaleString() + " XOF"
    })));
}
