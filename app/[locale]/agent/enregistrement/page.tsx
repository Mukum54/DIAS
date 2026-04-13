import {
    UserPlus,
    Camera,
    Search,
    CheckCircle2,
    Plane,
    Luggage,
    ShieldAlert,
    Save,
    Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export default function AgentEnregistrementPage() {
    return (
        <div className="space-y-12 pb-20 max-w-[1600px] mx-auto">
            {/* Header with quick stats */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-muted-bg/50 pb-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
                        <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[0.4em]">Desk Opérations</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-text-primary italic">
                        Nouvel <span className="text-brand-lime">Enregistrement</span>
                    </h1>
                    <p className="text-text-muted text-lg font-medium">Terminal AIBD • Prise en charge passagers & bagages</p>
                </div>
                <div className="flex gap-4">
                    <div className="px-6 py-4 bg-surface border border-muted-bg/50 rounded-2xl flex flex-col items-end">
                        <span className="text-[10px] font-bold text-text-faint uppercase tracking-widest">Session Agent</span>
                        <span className="text-sm font-bold text-brand-lime">ID: AGT-882 (Diagne M.)</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                {/* Registration Form */}
                <div className="xl:col-span-8 space-y-10">
                    <div className="bg-surface border border-muted-bg/50 rounded-[2.5rem] p-10 space-y-12">
                        {/* Section 1: Identity */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight flex items-center gap-3">
                                    <UserPlus className="w-5 h-5 text-brand-lime" />
                                    1. Identité du Passager
                                </h3>
                                <Button variant="outline" className="h-10 border-brand-bright/20 bg-brand-deep/30 text-brand-lime text-[10px] font-bold uppercase tracking-widest rounded-xl px-4 hover:bg-brand-deep group">
                                    <Camera className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" /> OCR Scan (C)
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-faint ml-1">Prénom</label>
                                    <Input placeholder="Ex: Moussa" className="h-14 bg-brand-deep border-muted-bg/50 rounded-2xl text-text-primary placeholder:text-text-faint/30 focus:border-brand-lime/50 focus:ring-1 focus:ring-brand-lime/50 transition-all font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-faint ml-1">Nom</label>
                                    <Input placeholder="Ex: Diop" className="h-14 bg-brand-deep border-muted-bg/50 rounded-2xl text-text-primary placeholder:text-text-faint/30 focus:border-brand-lime/50 focus:ring-1 focus:ring-brand-lime/50 transition-all font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-faint ml-1">Document (Passeport / CNI)</label>
                                    <Input placeholder="N° Document" className="h-14 bg-brand-deep border-muted-bg/50 rounded-2xl text-text-primary placeholder:text-text-faint/30 focus:border-brand-lime/50 focus:ring-1 focus:ring-brand-lime/50 transition-all font-mono" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-faint ml-1">Nationalité</label>
                                    <Input placeholder="Rechercher pays..." className="h-14 bg-brand-deep border-muted-bg/50 rounded-2xl text-text-primary placeholder:text-text-faint/30 focus:border-brand-lime/50 focus:ring-1 focus:ring-brand-lime/50 transition-all font-medium" />
                                </div>
                            </div>
                        </div>

                        {/* Section 2: Flight & Service */}
                        <div className="space-y-8 pt-6 border-t border-muted-bg/20">
                            <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight flex items-center gap-3">
                                <Plane className="w-5 h-5 text-brand-lime" />
                                2. Vol & Bagages
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-faint ml-1">N° de Vol</label>
                                    <Input placeholder="Ex: AF718" className="h-14 bg-brand-deep border-muted-bg/50 rounded-2xl text-text-primary placeholder:text-text-faint/30 focus:border-brand-lime/50 focus:ring-1 focus:ring-brand-lime/50 transition-all font-mono uppercase" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-faint ml-1">Nombre de Bagages</label>
                                    <Input type="number" defaultValue="1" className="h-14 bg-brand-deep border-muted-bg/50 rounded-2xl text-text-primary focus:border-brand-lime/50 focus:ring-1 focus:ring-brand-lime/50 transition-all font-bold" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-faint ml-1">Poids Global (kg)</label>
                                    <Input type="number" placeholder="23.5" className="h-14 bg-brand-deep border-muted-bg/50 rounded-2xl text-text-primary focus:border-brand-lime/50 focus:ring-1 focus:ring-brand-lime/50 transition-all font-bold" />
                                </div>
                            </div>
                        </div>

                        {/* Section 3: Notes & Compliance */}
                        <div className="space-y-8 pt-6 border-t border-muted-bg/20">
                            <div className="flex items-start gap-4 p-6 bg-brand-deep/50 border border-brand-lime/10 rounded-2xl">
                                <ShieldAlert className="w-5 h-5 text-brand-lime shrink-0 mt-1" />
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-text-primary uppercase tracking-tight italic">Conformité RGPD</p>
                                    <p className="text-xs text-text-muted leading-relaxed">
                                        Le passager a été informé de la collecte de ses données identitaires pour les besoins de prise en charge et de transport. Consentement verbal obtenu.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-faint ml-1">Notes Opérationnelles</label>
                                <Textarea placeholder="Fragile, Priority, Livraison hôtel..." className="min-h-[120px] bg-brand-deep border-muted-bg/50 rounded-2xl text-text-primary focus:border-brand-lime/50 focus:ring-1 focus:ring-brand-lime/50 transition-all text-sm leading-relaxed" />
                            </div>
                        </div>

                        {/* Action Bar */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <Button className="flex-1 h-14 bg-brand-action hover:bg-brand-bright text-white font-bold rounded-2xl shadow-xl shadow-brand-action/20 group text-sm uppercase tracking-widest">
                                <Save className="w-4 h-4 mr-3" /> Valider & Imprimer (Enter)
                            </Button>
                            <Button variant="outline" className="h-14 px-8 border-muted-bg/50 bg-transparent text-text-muted font-bold rounded-2xl hover:bg-danger/10 hover:text-danger hover:border-danger/30 transition-all uppercase tracking-widest text-[10px]">
                                <Trash2 className="w-4 h-4 mr-2" /> Réinitialiser
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Sidebar: Live Preview */}
                <div className="xl:col-span-4 space-y-8">
                    <div className="sticky top-10 space-y-8">
                        <div className="bg-brand-deep/30 border border-brand-bright/10 rounded-[2.5rem] p-8 backdrop-blur-3xl space-y-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-[0.05] pointer-events-none">
                                <Luggage className="w-48 h-48" />
                            </div>

                            <div className="space-y-4 relative z-10">
                                <h4 className="text-xs font-bold text-brand-lime uppercase tracking-[0.4em]">Carte Enregistrement</h4>
                                <div className="h-[1px] w-full bg-brand-bright/10" />
                            </div>

                            <div className="space-y-8 relative z-10">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-text-faint font-bold uppercase tracking-wider">Passager</p>
                                    <p className="text-2xl font-display font-bold text-text-primary uppercase tracking-tight italic">AIBD <span className="text-brand-lime">GUEST</span></p>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-text-faint font-bold uppercase tracking-wider">Réf. AD</p>
                                        <p className="text-sm font-bold text-text-primary font-mono tabular-nums tracking-widest">AD-20240412-XXXX</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-text-faint font-bold uppercase tracking-wider">Statut</p>
                                        <Badge className="bg-brand-deep border-brand-lime/20 text-brand-lime text-[8px] font-bold tracking-[0.2em] uppercase">Draft</Badge>
                                    </div>
                                </div>

                                <div className="p-6 bg-brand-deep/50 border border-brand-bright/10 rounded-2xl space-y-4">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-text-faint font-bold uppercase tracking-widest font-mono">Total Bags</span>
                                        <span className="text-text-primary font-bold">1 Unit</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-text-faint font-bold uppercase tracking-widest font-mono">Weight</span>
                                        <span className="text-text-primary font-bold">-- kg</span>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-text-faint uppercase tracking-[0.2em]">
                                        <CheckCircle2 className="w-3 h-3 text-brand-lime" /> Scan Document
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-text-faint uppercase tracking-[0.2em]">
                                        <CheckCircle2 className="w-3 h-3 text-text-faint/30" /> Link Reservation
                                    </div>
                                    <div className="flex items-center gap-3 text-[10px] font-bold text-text-faint uppercase tracking-[0.2em]">
                                        <CheckCircle2 className="w-3 h-3 text-text-faint/30" /> Print Label
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-surface border border-muted-bg/50 rounded-[2rem] flex items-start gap-4 group">
                            <div className="w-10 h-10 rounded-xl bg-brand-deep border border-brand-bright/10 flex items-center justify-center text-brand-lime group-hover:scale-110 transition-transform">
                                <Search className="w-5 h-5" />
                            </div>
                            <div className="space-y-1">
                                <h5 className="text-sm font-bold text-text-primary uppercase tracking-tight">Recherche Rapide</h5>
                                <p className="text-[10px] text-text-faint font-bold uppercase tracking-widest">Retrouver un passager par nom ou vol</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
