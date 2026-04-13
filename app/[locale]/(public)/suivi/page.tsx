"use client";

import { useState } from "react";
import { PackageSearch, ArrowRight, ShieldCheck, Zap, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function TrackingSearchPage() {
    const [trackingId, setTrackingId] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackingId.trim()) return;

        setIsLoading(true);
        // Navigate to the dynamic route
        router.push(`/suivi/${trackingId.trim().toUpperCase()}`);
    };

    return (
        <div className="min-h-screen bg-night relative overflow-hidden flex flex-col">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-lime/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-action/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

            {/* Main Content */}
            <div className="container relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-20">
                <div className="max-w-3xl w-full space-y-16">
                    {/* Hero Section */}
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-lime/10 border border-brand-lime/20 animate-in fade-in slide-in-from-top duration-700">
                            <Zap className="w-4 h-4 text-brand-lime" />
                            <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[0.2em]">Suivi en Temps Réel</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white uppercase tracking-tighter leading-[0.85] italic">
                            Où est votre <br />
                            <span className="text-brand-lime underline decoration-brand-lime/20 underline-offset-8">Bagage ?</span>
                        </h1>
                        <p className="text-text-muted text-lg md:text-xl font-medium max-w-xl mx-auto italic leading-relaxed">
                            Entrez votre numéro de suivi pour localiser vos effets personnels et suivre leur transit vers votre destination.
                        </p>
                    </div>

                    {/* Search Form */}
                    <div className="bg-surface/50 border border-muted-bg/30 p-2 md:p-3 rounded-[3rem] backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in duration-1000 delay-300">
                        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1 group">
                                <PackageSearch className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-text-faint group-focus-within:text-brand-lime transition-all" />
                                <Input
                                    value={trackingId}
                                    onChange={(e) => setTrackingId(e.target.value)}
                                    placeholder="N° DE SUIVI (Ex: AD-12345)"
                                    className="h-20 bg-night/50 border-transparent text-lg md:text-2xl font-display font-bold uppercase tracking-widest pl-16 rounded-[2rem] focus:ring-brand-lime/20 placeholder:text-text-faint/30"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={isLoading || !trackingId.trim()}
                                className="h-20 md:w-64 bg-brand-lime hover:bg-brand-bright text-brand-deep font-black uppercase tracking-[0.2em] text-xs rounded-[2rem] transition-all group"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-4 h-4 border-2 border-brand-deep/30 border-t-brand-deep rounded-full animate-spin" />
                                        <span>Recherche...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        <span>Suivre</span>
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
                                )}
                            </Button>
                        </form>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
                        {[
                            { icon: Navigation, title: "Précision GPS", desc: "Localisation exacte au mètre près de votre trajet." },
                            { icon: ShieldCheck, title: "Sécurité Totale", desc: "Accès restreint aux seuls détenteurs du code." },
                            { icon: Zap, title: "Instantanné", desc: "Mise à jour en temps réel des étapes logistiques." }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center text-center space-y-4 p-8 rounded-[2rem] bg-surface/20 border border-muted-bg/10 hover:bg-surface/40 hover:border-brand-lime/10 transition-all duration-500 group">
                                <div className="w-12 h-12 rounded-2xl bg-brand-deep border border-brand-bright/10 flex items-center justify-center text-brand-lime group-hover:scale-110 transition-transform">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-text-primary">{item.title}</h3>
                                    <p className="text-[11px] text-text-muted italic leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Support Link */}
            <div className="container py-8 flex flex-col items-center gap-4 relative z-10 border-t border-muted-bg/10">
                <p className="text-[10px] font-bold text-text-faint uppercase tracking-widest">
                    Un problème ? Contactez notre logistique au
                    <span className="text-brand-lime ml-2">+221 77 000 00 00</span>
                </p>
            </div>
        </div>
    );
}
