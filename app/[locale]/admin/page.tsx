export const dynamic = 'force-dynamic';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users,
    DollarSign,
    Star,
    ArrowUpRight,
    Zap
} from "lucide-react";
import { getAdminOverviewStats } from "@/lib/admin-stats";
import { OverviewCharts } from "./OverviewCharts";

export default async function AdminOverviewPage() {
    const stats = await getAdminOverviewStats();

    const COLORS = ['#3d7a18', '#a8d878'];

    return (
        <div className="space-y-12 max-w-[1600px] mx-auto pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-muted-bg/50 pb-10 mb-10">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="h-2 w-2 rounded-full bg-brand-lime animate-pulse" />
                        <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[0.4em]">Operational Intelligence</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-text-primary italic">Tableau de <span className="text-brand-lime">Bord</span></h1>
                    <p className="text-text-muted mt-3 text-lg font-medium">Analyse temps-réel du réseau AIR DIASS • Hub AIBD</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-4 py-2 bg-brand-deep rounded-xl border border-brand-bright/10 text-[10px] font-bold uppercase tracking-widest text-brand-lime">
                        Session: Admin Root
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="shadow-2xl border-brand-bright/10 bg-surface relative overflow-hidden group hover:border-brand-bright/30 transition-all">
                    <div className="absolute top-0 inset-x-0 h-1 bg-brand-action opacity-50" />
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-faint">Chiffre d&apos;Affaires</CardTitle>
                        <div className="p-2 rounded-lg bg-brand-deep border border-brand-bright/10 text-brand-lime">
                            <DollarSign className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold font-display text-text-primary tabular-nums">
                            {(stats.totalRevenue / 1000000).toFixed(1)}M <span className="text-sm font-mono text-text-faint">XOF</span>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="flex items-center text-[10px] font-bold text-brand-lime bg-brand-lime/10 px-2 py-0.5 rounded-full uppercase">
                                <ArrowUpRight className="w-3 h-3 mr-1" /> Real-time
                            </span>
                            <span className="text-[10px] text-text-faint font-bold uppercase tracking-wider">Cumul consolidé</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-2xl border-brand-bright/10 bg-surface relative overflow-hidden group hover:border-brand-bright/30 transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-faint">Clients VIP</CardTitle>
                        <div className="p-2 rounded-lg bg-brand-deep border border-brand-bright/10 text-brand-lime">
                            <Users className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold font-display text-text-primary tabular-nums">{stats.clientCount.toLocaleString()}</div>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="flex items-center text-[10px] font-bold text-brand-lime bg-brand-lime/10 px-2 py-0.5 rounded-full uppercase">
                                <ArrowUpRight className="w-3 h-3 mr-1" /> Active
                            </span>
                            <span className="text-[10px] text-text-faint font-bold uppercase tracking-wider">Utilisateurs enregistrés</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-2xl border-brand-bright/10 bg-surface relative overflow-hidden group hover:border-brand-bright/30 transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-faint">Réservations</CardTitle>
                        <div className="p-2 rounded-lg bg-brand-deep border border-brand-bright/10 text-brand-lime">
                            <Zap className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold font-display text-text-primary tabular-nums">{stats.activeReservations.toLocaleString()}</div>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="flex items-center text-[10px] font-bold text-text-muted bg-muted-bg/30 px-2 py-0.5 rounded-full uppercase">
                                Flux Live
                            </span>
                            <span className="text-[10px] text-text-faint font-bold uppercase tracking-wider">En cours de traitement</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-2xl border-brand-bright/10 bg-surface relative overflow-hidden group hover:border-brand-bright/30 transition-all">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <CardTitle className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-faint">NPS Score</CardTitle>
                        <div className="p-2 rounded-lg bg-brand-deep border border-brand-bright/10 text-brand-lime">
                            <Star className="h-4 w-4" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold font-display text-text-primary tabular-nums">{stats.npsScore}<span className="text-sm font-mono text-text-faint">/5</span></div>
                        <div className="mt-4 flex items-center gap-2">
                            <span className="flex items-center text-[10px] font-bold text-brand-lime bg-brand-lime/10 px-2 py-0.5 rounded-full uppercase">
                                Excellent
                            </span>
                            <span className="text-[10px] text-text-faint font-bold uppercase tracking-wider">Indice satisfaction</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <OverviewCharts
                revenueData={stats.revenueTrend}
                distributionData={stats.sectorDistribution}
                colors={COLORS}
            />
        </div>
    );
}
