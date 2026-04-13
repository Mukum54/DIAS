import {
    Wrench,
    Droplets,
    CheckSquare,
    Filter,
    Plus,
    ChevronRight,
    AlertCircle,
    Play,
    CheckCircle2,
    FileBarChart,
    User as UserIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function GarageJobsPage() {
    const columns = [
        { id: "WAITING", label: "En attente", color: "bg-amber-500/10 text-amber-500" },
        { id: "IN_PROGRESS", label: "En cours", color: "bg-brand-lime/10 text-brand-lime" },
        { id: "DONE", label: "Terminé", color: "bg-blue-500/10 text-blue-500" },
        { id: "BILLED", label: "Facturé", color: "bg-text-faint/10 text-text-faint" },
    ];

    const jobs = [
        { id: "J01", type: "VIDANGE", vehicle: "Toyota Prado (AA 001 SN)", client: "Sonatel", status: "WAITING", tech: "ND" },
        { id: "J02", type: "LAVERIE", vehicle: "Range Rover", client: "Moussa Diop", status: "IN_PROGRESS", tech: "AD" },
        { id: "J03", type: "ENTRETIEN", vehicle: "Peugeot 508", client: "BCEAO", status: "IN_PROGRESS", tech: "KO" },
        { id: "J04", type: "VISITE_TECHNIQUE", vehicle: "Mercedes GLS", client: "Exécutif VIP", status: "DONE", tech: "ND" },
    ];

    return (
        <div className="space-y-12 pb-20 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-muted-bg/50 pb-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                        <Wrench className="w-4 h-4 text-brand-lime" />
                        <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[0.4em]">Workshop Operations</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-text-primary italic">
                        Tableau <span className="text-brand-lime">Kanban</span>
                    </h1>
                    <p className="text-text-muted text-lg font-medium">Gestion des ordres de réparation & maintenance</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" asChild className="h-14 border-muted-bg/50 bg-brand-deep/30 text-text-muted rounded-2xl px-6 hover:bg-brand-deep font-bold uppercase tracking-widest text-[10px]">
                        <Link href="/garage/stock"><FileBarChart className="w-4 h-4 mr-2" /> Stock Pièces</Link>
                    </Button>
                    <Button asChild className="h-14 bg-brand-action hover:bg-brand-bright text-white rounded-2xl px-6 shadow-xl shadow-brand-action/20 font-bold uppercase tracking-widest text-[10px]">
                        <Link href="/garage/nouveau"><Plus className="w-4 h-4 mr-2" /> Nouvel Ordre</Link>
                    </Button>
                </div>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {columns.map((col) => (
                    <div key={col.id} className="space-y-6">
                        <div className="flex items-center justify-between px-4">
                            <div className="flex items-center gap-3">
                                <Badge className={`${col.color} border-0 text-[10px] font-bold tracking-[0.2em] uppercase rounded-md px-2 py-0.5`}>
                                    {col.label}
                                </Badge>
                                <span className="text-text-faint font-mono text-[10px] font-bold">
                                    {jobs.filter(j => j.status === col.id).length}
                                </span>
                            </div>
                            <Filter className="w-3 h-3 text-text-faint" />
                        </div>

                        <div className="space-y-4 min-h-[500px] p-2 bg-brand-deep/20 rounded-[2rem] border border-muted-bg/10 border-dashed">
                            {jobs.filter(j => j.status === col.id).map(job => (
                                <div key={job.id} className="bg-surface border border-muted-bg/50 p-6 rounded-2xl shadow-lg hover:border-brand-lime/30 transition-all group cursor-grab active:cursor-grabbing relative overflow-hidden">
                                    {job.status === 'IN_PROGRESS' && (
                                        <div className="absolute top-0 right-0 p-4">
                                            <div className="w-2 h-2 rounded-full bg-brand-lime animate-ping" />
                                        </div>
                                    )}

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2">
                                            {job.type === 'VIDANGE' && <Droplets className="w-4 h-4 text-brand-lime" />}
                                            {job.type === 'LAVERIE' && <CheckSquare className="w-4 h-4 text-brand-lime" />}
                                            {job.type === 'ENTRETIEN' && <Wrench className="w-4 h-4 text-brand-lime" />}
                                            {job.type === 'VISITE_TECHNIQUE' && <AlertCircle className="w-4 h-4 text-brand-lime" />}
                                            <span className="text-[10px] font-bold text-text-primary uppercase tracking-widest">{job.type}</span>
                                        </div>

                                        <div className="space-y-1">
                                            <h5 className="font-bold text-text-primary text-sm uppercase tracking-tight leading-tight">{job.vehicle}</h5>
                                            <p className="text-[10px] text-text-faint font-bold uppercase tracking-widest flex items-center gap-1">
                                                <UserIcon className="w-3 h-3" /> {job.client}
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-center pt-4 border-t border-muted-bg/10">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-lg bg-brand-deep border border-brand-bright/10 flex items-center justify-center text-[8px] font-bold text-brand-lime uppercase tracking-tighter">
                                                    {job.tech}
                                                </div>
                                                <span className="text-[9px] font-bold text-text-faint uppercase font-mono">{job.id}</span>
                                            </div>
                                            <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-text-faint hover:text-brand-lime hover:bg-brand-deep">
                                                <Link href={`/garage/jobs/${job.id}`}><ChevronRight className="w-4 h-4" /></Link>
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions Footer */}
            <div className="flex flex-wrap items-center gap-6 p-10 bg-brand-deep/30 border border-brand-bright/10 rounded-[2.5rem] backdrop-blur-xl">
                <div className="space-y-1 flex-1">
                    <h4 className="text-xl font-bold text-text-primary uppercase tracking-tight italic">Status <span className="text-brand-lime">Temps-Réel</span></h4>
                    <p className="text-xs text-text-muted">Mise à jour automatique toutes les 60 secondes</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-6 py-3 bg-surface border border-muted-bg/50 rounded-xl flex items-center gap-4">
                        <Play className="w-4 h-4 text-brand-lime" />
                        <div className="space-y-0.5">
                            <p className="text-[9px] font-bold text-text-faint uppercase tracking-widest">En cours</p>
                            <p className="text-sm font-bold text-text-primary">12 Travaux</p>
                        </div>
                    </div>
                    <div className="px-6 py-3 bg-surface border border-muted-bg/50 rounded-xl flex items-center gap-4">
                        <CheckCircle2 className="w-4 h-4 text-brand-lime" />
                        <div className="space-y-0.5">
                            <p className="text-[9px] font-bold text-text-faint uppercase tracking-widest">Finalisés (Today)</p>
                            <p className="text-sm font-bold text-text-primary">08 Travaux</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
