import {
    Settings,
    ShieldCheck,
    Database,
    Bell,
    Mail,
    Lock,
    Smartphone,
    Server,
    Code,
    ArrowRight,
    Cloud
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-12 max-w-[1200px] mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-muted-bg/50 pb-10">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                        <Settings className="w-4 h-4 text-brand-lime" />
                        <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[0.4em]">System Configuration</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-text-primary italic">
                        Paramètres <span className="text-brand-lime">Système</span>
                    </h1>
                    <p className="text-text-muted text-lg font-medium">Contrôle global, sécurité et intégrations API</p>
                </div>
                <Button className="h-14 bg-brand-action hover:bg-brand-bright text-white rounded-2xl px-8 shadow-xl shadow-brand-action/20 font-bold uppercase tracking-widest text-sm group">
                    Sauvegarder les modifications <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                {/* Sidebar Nav */}
                <div className="md:col-span-3 space-y-4">
                    {[
                        { label: "Général", icon: Server },
                        { label: "Sécurité & Auth", icon: Lock },
                        { label: "Notifications", icon: Bell },
                        { label: "Baggage Tracker API", icon: Code },
                        { label: "RGPD & Légal", icon: ShieldCheck },
                        { label: "Backup & Cloud", icon: Cloud },
                    ].map((item, idx) => (
                        <div key={idx} className={`p-4 rounded-xl flex items-center gap-4 cursor-pointer transition-all ${idx === 0 ? 'bg-brand-deep border border-brand-bright/10 text-brand-lime' : 'text-text-faint hover:text-text-primary hover:bg-brand-deep/30'}`}>
                            <item.icon className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                        </div>
                    ))}
                </div>

                {/* Settings Form */}
                <div className="md:col-span-9 space-y-10">
                    <div className="bg-surface border border-muted-bg/50 rounded-[2.5rem] p-10 space-y-10">
                        {/* Infrastructure */}
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold text-text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                                <Database className="w-4 h-4 text-brand-lime" /> Infrastructure Globale
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-faint ml-1">Environment Nommé</label>
                                    <Input defaultValue="AIR-DIASS-PROD-01" className="h-12 bg-brand-deep/50 border-muted-bg/50 rounded-xl text-text-primary focus:border-brand-lime/30 transition-all font-mono" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-faint ml-1">Région Primaire</label>
                                    <Input defaultValue="Dakar-AIBD (West-Africa)" className="h-12 bg-brand-deep/50 border-muted-bg/50 rounded-xl text-text-primary focus:border-brand-lime/30 transition-all" />
                                </div>
                            </div>
                        </div>

                        {/* Communication Channels */}
                        <div className="space-y-6 pt-10 border-t border-muted-bg/20">
                            <h4 className="text-sm font-bold text-text-primary uppercase tracking-[0.3em] flex items-center gap-2">
                                <Smartphone className="w-4 h-4 text-brand-lime" /> Canaux de Communication
                            </h4>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-6 bg-brand-deep/30 rounded-2xl border border-brand-bright/5">
                                    <div className="flex items-center gap-4">
                                        <Mail className="w-6 h-6 text-brand-lime" />
                                        <div>
                                            <p className="text-sm font-bold text-text-primary uppercase tracking-tight">E-mails Automatiques (Resend)</p>
                                            <p className="text-[10px] text-text-faint font-bold uppercase tracking-widest">Confirmation, Factures, Alertes</p>
                                        </div>
                                    </div>
                                    <Switch checked />
                                </div>
                                <div className="flex items-center justify-between p-6 bg-brand-deep/30 rounded-2xl border border-brand-bright/5">
                                    <div className="flex items-center gap-4">
                                        <Smartphone className="w-6 h-6 text-brand-lime" />
                                        <div>
                                            <p className="text-sm font-bold text-text-primary uppercase tracking-tight">Alertes SMS (Twilio)</p>
                                            <p className="text-[10px] text-text-faint font-bold uppercase tracking-widest">Suivi Bagages Temps Réel</p>
                                        </div>
                                    </div>
                                    <Switch checked />
                                </div>
                            </div>
                        </div>

                        {/* Maintenance Mode */}
                        <div className="p-8 bg-danger/10 border border-danger/20 rounded-[2rem] space-y-4">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="w-5 h-5 text-danger" />
                                <h5 className="font-bold text-danger uppercase tracking-tight italic">Zone de Danger</h5>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-xs text-text-muted font-medium pr-10">Activer le mode maintenance bloquera tous les accès clients et opérations en cours pour une mise à jour système.</p>
                                <Button variant="outline" className="h-10 border-danger/30 text-danger hover:bg-danger/20 font-bold uppercase tracking-widest text-[10px] rounded-xl px-6 whitespace-nowrap">Activer Maintenance</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
