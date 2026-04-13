import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Mail,
    Phone,
    MapPin,
    Send,
    ShieldCheck
} from "lucide-react";

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-[calc(100vh-16rem)] max-w-7xl mx-auto px-4 py-16 md:py-24 space-y-24">
            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-bright/20 bg-brand-deep/50 px-4 py-1.5 backdrop-blur-md">
                    <span className="text-[10px] font-bold text-brand-lime tracking-[0.3em] uppercase">Contact & Support</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-text-primary italic">
                    Parlons de votre <span className="text-brand-lime">prochain voyage</span>
                </h1>
                <p className="text-text-muted text-lg md:text-xl leading-relaxed">
                    Besoin d&apos;une assistance particulière ou d&apos;un devis sur mesure ?
                    Nos concierges et experts automobiles sont à votre écoute 24h/24.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                {/* Contact Info */}
                <div className="space-y-12 order-2 lg:order-1">
                    <div className="grid gap-10">
                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-brand-deep border border-brand-bright/10 flex items-center justify-center text-brand-lime group-hover:bg-brand-action group-hover:text-white transition-all shadow-[0_0_20px_rgba(var(--primary),0.1)]">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-text-primary text-lg mb-2 uppercase tracking-wide">Siège Social</h3>
                                <p className="text-text-muted leading-relaxed">
                                    Zone Aéroportuaire, AIBD<br />
                                    Boîte Postale 42, Thiès, Sénégal
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-brand-deep border border-brand-bright/10 flex items-center justify-center text-brand-lime group-hover:bg-brand-action group-hover:text-white transition-all">
                                <Phone className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-text-primary text-lg mb-2 uppercase tracking-wide">Ligne Directe</h3>
                                <p className="text-text-muted leading-relaxed font-mono">
                                    +221 33 800 00 00 (Standard)<br />
                                    +221 77 000 00 00 (Conciergerie)
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-brand-deep border border-brand-bright/10 flex items-center justify-center text-brand-lime group-hover:bg-brand-action group-hover:text-white transition-all">
                                <Mail className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-text-primary text-lg mb-2 uppercase tracking-wide">Email & Suivi</h3>
                                <p className="text-text-muted leading-relaxed italic">
                                    contact@airdiass.com<br />
                                    ops@airdiass.com (Operations)
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quality Badges */}
                    <div className="p-8 bg-surface border border-muted-bg/50 rounded-3xl space-y-6">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-brand-lime" />
                            <span className="font-bold text-xs uppercase tracking-[0.2em] text-text-faint">Standard d&apos;excellence</span>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <p className="text-2xl font-bold font-display text-text-primary">24/7</p>
                                <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Disponibilité</p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-2xl font-bold font-display text-text-primary">&lt;15m</p>
                                <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Réactivité</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="order-1 lg:order-2">
                    <div className="p-8 md:p-12 bg-surface border border-muted-bg/50 rounded-[2rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-action" />

                        <div className="space-y-8">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-display font-bold text-text-primary">Envoyez un message</h3>
                                <p className="text-text-muted text-sm">Nous vous répondrons dans les plus brefs délais.</p>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-faint px-1">Nom complet</label>
                                        <Input placeholder="Jean Dupont" className="bg-night/50 border-muted-bg/50 h-12 rounded-xl focus:border-brand-bright/50 transition-all" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-widest text-text-faint px-1">Email</label>
                                        <Input type="email" placeholder="jean@example.com" className="bg-night/50 border-muted-bg/50 h-12 rounded-xl focus:border-brand-bright/50 transition-all" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-faint px-1">Objet de la demande</label>
                                    <Input placeholder="Ex: Devis assistance groupe" className="bg-night/50 border-muted-bg/50 h-12 rounded-xl focus:border-brand-bright/50 transition-all" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-faint px-1">Votre message</label>
                                    <Textarea
                                        placeholder="Comment pouvons-nous vous aider ?"
                                        className="bg-night/50 border-muted-bg/50 min-h-[160px] rounded-2xl focus:border-brand-bright/50 transition-all resize-none p-4"
                                    />
                                </div>

                                <Button className="w-full h-14 bg-brand-action hover:bg-brand-bright text-white font-bold text-base rounded-xl shadow-xl shadow-brand-action/20 group transition-all">
                                    Envoyer la demande <Send className="ml-3 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
