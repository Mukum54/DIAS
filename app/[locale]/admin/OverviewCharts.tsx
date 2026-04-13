"use client";

import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import { Card } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

interface ChartsProps {
    revenueData: any[];
    distributionData: any[];
    colors: string[];
}

export function OverviewCharts({ revenueData, distributionData, colors }: ChartsProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Revenue Trend */}
            <Card className="lg:col-span-2 border-brand-bright/10 bg-surface shadow-2xl p-8 rounded-[2rem]">
                <div className="flex justify-between items-center mb-10">
                    <div className="space-y-1">
                        <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight italic">Flux Financier <span className="text-brand-lime">Consolidé</span></h3>
                        <p className="text-[10px] text-text-faint font-bold uppercase tracking-widest">Variation des revenus (M. XOF)</p>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-8 w-8 rounded-lg bg-brand-deep border border-brand-bright/10 flex items-center justify-center text-brand-lime">
                            <BarChart3 className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3d7a18" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#3d7a18" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#2a3d2a" vertical={false} />
                            <XAxis
                                dataKey="name"
                                stroke="#4a7a3a"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fontWeight: 'bold' }}
                            />
                            <YAxis
                                stroke="#4a7a3a"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(value: number | string) => `${value}M`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1a2a1a', border: '1px solid #3d7a18', borderRadius: '12px', fontSize: '12px', color: '#e8f4d0' }}
                                itemStyle={{ color: '#a8d878' }}
                            />
                            <Area type="monotone" dataKey="value" stroke="#7ab648" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            {/* Sector Distribution */}
            <Card className="border-brand-bright/10 bg-surface shadow-2xl p-8 rounded-[2rem]">
                <div className="space-y-1 mb-10">
                    <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight italic">Mix <span className="text-brand-lime">Clientèle</span></h3>
                    <p className="text-[10px] text-text-faint font-bold uppercase tracking-widest">B2B Corporate vs Particuliers VIP</p>
                </div>

                <div className="h-[300px] w-full flex flex-col items-center">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={distributionData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                paddingAngle={8}
                                dataKey="value"
                            >
                                {distributionData.map((_: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1a2a1a', border: '1px solid #3d7a18', borderRadius: '12px' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="mt-6 flex flex-col gap-4 w-full">
                        {distributionData.map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between items-center p-3 rounded-xl bg-brand-deep/50 border border-brand-bright/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[idx] }} />
                                    <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">{item.name}</span>
                                </div>
                                <span className="text-sm font-bold text-text-primary">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
}
