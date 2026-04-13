export const dynamic = 'force-dynamic';

import {
    Users,
    Search,
    Plus,
    Filter,
    ShieldCheck,
    ArrowUpRight,
    TrendingUp,
    Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { getAdminClients, type AdminClient } from "@/lib/admin-stats";
import { ClientRow } from "./ClientRow";

export default async function AdminClientsPage() {
    const clients: AdminClient[] = await getAdminClients();

    return (
        <div className="space-y-12 max-w-[1600px] mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-muted-bg/50 pb-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-brand-lime" />
                        <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[0.4em]">Customer Base</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-text-primary italic">
                        Gestion <span className="text-brand-lime">Clients</span>
                    </h1>
                    <p className="text-text-muted text-lg font-medium">Base de données unifiée et segmentation VIP</p>
                </div>
                <Button className="bg-brand-action hover:bg-brand-bright text-white h-14 rounded-2xl px-8 shadow-xl shadow-brand-action/20 font-bold uppercase tracking-widest text-sm group">
                    <Plus className="w-4 h-4 mr-3" /> Nouveau Client
                </Button>
            </div>

            {/* Loyalty Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-surface border border-muted-bg/50 rounded-3xl p-6 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-text-faint uppercase tracking-widest">Total Clients</span>
                    <div className="flex items-end justify-between mt-4">
                        <p className="text-3xl font-display font-bold text-text-primary">{clients.length}</p>
                        <TrendingUp className="w-5 h-5 text-brand-lime mb-1" />
                    </div>
                </div>
                <div className="bg-brand-deep border border-brand-bright/10 rounded-3xl p-6 flex flex-col justify-between shadow-xl">
                    <span className="text-[10px] font-bold text-brand-lime uppercase tracking-widest">Elite Platinum</span>
                    <div className="flex items-end justify-between mt-4">
                        <p className="text-3xl font-display font-bold text-text-primary">
                            {clients.filter((c: AdminClient) => c.status === "PLATINUM").length}
                        </p>
                        <Award className="w-5 h-5 text-brand-lime mb-1" />
                    </div>
                </div>
                <div className="bg-surface border border-muted-bg/50 rounded-3xl p-6 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-text-faint uppercase tracking-widest">Taux Rétention</span>
                    <div className="flex items-end justify-between mt-4">
                        <p className="text-3xl font-display font-bold text-text-primary">84%</p>
                        <ArrowUpRight className="w-5 h-5 text-brand-lime mb-1" />
                    </div>
                </div>
                <div className="bg-surface border border-muted-bg/50 rounded-3xl p-6 flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-text-faint uppercase tracking-widest">Satisfaction</span>
                    <div className="flex items-end justify-between mt-4">
                        <p className="text-3xl font-display font-bold text-text-primary">98.2%</p>
                        <ShieldCheck className="w-5 h-5 text-brand-lime mb-1" />
                    </div>
                </div>
            </div>

            {/* Clients Table */}
            <div className="bg-surface border border-muted-bg/50 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-muted-bg/20 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
                        <Input placeholder="Rechercher par nom ou e-mail..." className="w-full h-12 pl-12 bg-brand-deep border-muted-bg/50 rounded-xl text-sm focus:border-brand-lime/30 transition-all font-medium" />
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="h-12 border-muted-bg/50 bg-brand-deep/30 text-text-muted rounded-xl px-6 hover:bg-brand-deep font-bold uppercase tracking-widest text-[10px]">
                            <Filter className="w-4 h-4 mr-2" /> Segments
                        </Button>
                    </div>
                </div>

                <Table>
                    <TableHeader className="bg-brand-deep/20">
                        <TableRow className="border-muted-bg/20 hover:bg-transparent">
                            <TableHead className="text-[10px] font-bold text-text-faint uppercase tracking-[0.2em] h-14 pl-8">Client</TableHead>
                            <TableHead className="text-[10px] font-bold text-text-faint uppercase tracking-[0.2em] h-14">Statut Fidélité</TableHead>
                            <TableHead className="text-[10px] font-bold text-text-faint uppercase tracking-[0.2em] h-14">Réservations</TableHead>
                            <TableHead className="text-[10px] font-bold text-text-faint uppercase tracking-[0.2em] h-14">Chiffre d&apos;Affaires</TableHead>
                            <TableHead className="text-[10px] font-bold text-text-faint uppercase tracking-[0.2em] h-14 text-right pr-8">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clients.map((client) => (
                            <ClientRow key={client.id} client={client} />
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
