import {
    Building2,
    Plus,
    Search,
    Filter,
    Globe,
    Users,
    FileCheck,
    ArrowUpRight,
    Briefcase,
    Mail,
    MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

export default function AdminEntreprisesPage() {
    const companies = [
        { name: "Group Sonatel", contact: "Aminata Seck", email: "a.seck@sonatel.sn", type: "Corporate VIP", status: "Active", employees: 42, lastInvoice: "12 Mar 2024" },
        { name: "Air France West", contact: "Julien Morel", email: "jmorel@af.com", type: "Partenaire", status: "Active", employees: 125, lastInvoice: "05 Mar 2024" },
        { name: "TotalEnergies SN", contact: "Omar Ndiaye", email: "o.ndiaye@total.sn", type: "Fret & Logistique", status: "Review", employees: 18, lastInvoice: "28 Feb 2024" },
        { name: "Bank of Africa", contact: "Sarah Sall", email: "s.sall@boa.sn", type: "Exécutif", status: "Active", employees: 64, lastInvoice: "15 Mar 2024" },
    ];

    return (
        <div className="space-y-12 max-w-[1600px] mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-muted-bg/50 pb-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-2 w-2 rounded-full bg-brand-lime" />
                        <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[0.4em]">Corporate Management</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-text-primary italic">
                        Comptes <span className="text-brand-lime">Entreprises</span>
                    </h1>
                    <p className="text-text-muted text-lg font-medium">Gestion du réseau B2B et contrats cadres</p>
                </div>
                <Button className="bg-brand-action hover:bg-brand-bright text-white h-14 rounded-2xl px-8 shadow-xl shadow-brand-action/20 font-bold uppercase tracking-widest text-sm group">
                    <Plus className="w-4 h-4 mr-3 group-hover:rotate-90 transition-transform" /> Nouvelle Entreprise
                </Button>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-surface border border-muted-bg/50 rounded-3xl p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="w-10 h-10 rounded-xl bg-brand-deep flex items-center justify-center text-brand-lime">
                            <Building2 className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-brand-lime bg-brand-lime/10 px-2 py-1 rounded-full">+12 (M-1)</span>
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-bold text-text-primary font-display">84</p>
                        <p className="text-[10px] text-text-faint font-bold uppercase tracking-[0.2em]">Entreprises Sous Contrat</p>
                    </div>
                </div>

                <div className="bg-surface border border-muted-bg/50 rounded-3xl p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="w-10 h-10 rounded-xl bg-brand-deep flex items-center justify-center text-brand-lime">
                            <Users className="w-5 h-5" />
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-brand-lime" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-bold text-text-primary font-display">1,890</p>
                        <p className="text-[10px] text-text-faint font-bold uppercase tracking-[0.2em]">Employés VIP Actifs</p>
                    </div>
                </div>

                <div className="bg-surface border border-muted-bg/50 rounded-3xl p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <div className="w-10 h-10 rounded-xl bg-brand-deep flex items-center justify-center text-brand-lime">
                            <FileCheck className="w-5 h-5" />
                        </div>
                        <Badge className="bg-brand-deep border-brand-bright/10 text-brand-lime text-[8px] uppercase font-bold tracking-widest">85% Paid</Badge>
                    </div>
                    <div className="space-y-1">
                        <p className="text-3xl font-bold text-text-primary font-display">42.8M</p>
                        <p className="text-[10px] text-text-faint font-bold uppercase tracking-[0.2em]">Volume B2B (M. XOF)</p>
                    </div>
                </div>
            </div>

            {/* Filters & Table */}
            <div className="bg-surface border border-muted-bg/50 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="p-8 border-b border-muted-bg/20 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-faint" />
                        <Input placeholder="Rechercher une entreprise..." className="w-full h-12 pl-12 bg-brand-deep border-muted-bg/50 rounded-xl text-sm focus:border-brand-lime/30 transition-all" />
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button variant="outline" className="h-12 border-muted-bg/50 bg-brand-deep/30 text-text-muted rounded-xl px-4 hover:bg-brand-deep">
                            <Filter className="w-4 h-4 mr-2" /> Filtres
                        </Button>
                        <Button variant="outline" className="h-12 border-muted-bg/50 bg-brand-deep/30 text-text-muted rounded-xl px-4 hover:bg-brand-deep">
                            <Globe className="w-4 h-4 mr-2" /> Export CSV
                        </Button>
                    </div>
                </div>

                <Table>
                    <TableHeader className="bg-brand-deep/20 hover:bg-brand-deep/20">
                        <TableRow className="border-muted-bg/20 hover:bg-transparent">
                            <TableHead className="text-[10px] font-bold text-text-faint uppercase tracking-[0.2em] h-14 pl-8">Entreprise</TableHead>
                            <TableHead className="text-[10px] font-bold text-text-faint uppercase tracking-[0.2em] h-14">Contact Principal</TableHead>
                            <TableHead className="text-[10px] font-bold text-text-faint uppercase tracking-[0.2em] h-14">Type</TableHead>
                            <TableHead className="text-[10px] font-bold text-text-faint uppercase tracking-[0.2em] h-14">Statut</TableHead>
                            <TableHead className="text-[10px] font-bold text-text-faint uppercase tracking-[0.2em] h-14">Utilisateurs</TableHead>
                            <TableHead className="text-[10px] font-bold text-text-faint uppercase tracking-[0.2em] h-14">Dernière Facture</TableHead>
                            <TableHead className="text-[10px] font-bold text-text-faint uppercase tracking-[0.2em] h-14 text-right pr-8">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {companies.map((company, idx) => (
                            <TableRow key={idx} className="border-muted-bg/10 hover:bg-brand-deep/10 transition-colors">
                                <TableCell className="pl-8 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-brand-deep border border-brand-bright/10 flex items-center justify-center text-brand-lime">
                                            <Briefcase className="w-4 h-4" />
                                        </div>
                                        <span className="font-bold text-text-primary uppercase tracking-tight">{company.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-text-primary">{company.contact}</p>
                                        <p className="text-[10px] text-text-faint font-mono flex items-center gap-1"><Mail className="w-3 h-3" /> {company.email}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="text-xs text-text-muted font-medium italic">{company.type}</span>
                                </TableCell>
                                <TableCell>
                                    <Badge className={`${company.status === 'Active' ? 'bg-brand-lime/10 text-brand-lime border-brand-lime/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'} border font-bold text-[8px] uppercase tracking-widest px-2 py-0.5`}>
                                        {company.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-sm font-bold text-text-primary tabular-nums">{company.employees}</TableCell>
                                <TableCell className="text-sm font-bold text-text-muted tabular-nums">{company.lastInvoice}</TableCell>
                                <TableCell className="text-right pr-8">
                                    <Button variant="ghost" size="icon" className="text-text-faint hover:text-brand-lime hover:bg-brand-deep rounded-lg">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="p-8 border-t border-muted-bg/20 flex justify-between items-center">
                    <p className="text-[10px] text-text-faint font-bold uppercase tracking-widest">Affichage de 1-4 sur 84 entreprises</p>
                    <div className="flex gap-2">
                        <Button disabled variant="ghost" className="text-[10px] font-bold uppercase tracking-widest h-8 px-3 border border-muted-bg/30 rounded-lg">Précédent</Button>
                        <Button variant="ghost" className="text-[10px] font-bold uppercase tracking-widest h-8 px-3 border border-muted-bg/30 rounded-lg hover:border-brand-lime hover:text-brand-lime">Suivant</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
