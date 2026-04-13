"use client";

import { useState } from "react";
import {
    Droplet,
    Sparkles,
    Star,
    Check,
    Clock,
    ArrowRight,
    ChevronRight,
    Car,
    Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PACKAGES = [
    {
        id: "exterior",
        icon: Droplet,
        title: "Lavage Extérieur",
        price: "5 000 FCFA",
        duration: "30 min",
        features: ["Prélavage mousse", "Lavage haute pression", "Nettoyage jantes", "Séchage manuel"],
        color: "text-brand-lime"
    },
    {
        id: "complete",
        icon: Sparkles,
        title: "Lavage Complet",
        price: "10 000 FCFA",
        duration: "1h 00",
        featured: true,
        features: ["Pack Extérieur", "Aspiration habitacle", "Nettoyage plastiques", "Parfum d&apos;ambiance"],
        color: "text-brand-lime"
    },
    {
        id: "premium",
        icon: Star,
        title: "Lavage Premium",
        price: "18 000 FCFA",
        duration: "2h 00",
        features: ["Pack Complet", "Cire de protection", "Soin des cuirs", "Nettoyage moteur", "Shampoing sièges"],
        color: "text-brand-lime"
    }
];

export default function LaveriePage() {
    const [step, setStep] = useState(1);
    const [selectedPackage, setSelectedPackage] = useState<any>(null);

    return (
        <div className="container px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-24 space-y-20">
            {/* Header */}
            <div className="text-center space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-bright/20 bg-brand-deep/50 px-4 py-1.5 backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 text-brand-lime" />
                    <span className="text-[10px] font-bold text-brand-lime tracking-[0.3em] uppercase italic">Service Esthétique Automobile</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold uppercase tracking-tight text-text-primary italic leading-tight">
                    LUMINOSITE <span className="text-brand-lime">& ECLAT</span>
                </h1>
                <p className="text-text-muted text-lg md:text-xl italic leading-relaxed">
                    Redonnez à votre véhicule son aspect showroom. Un soin artisanal allié à des produits de haute performance.
                </p>
            </div>

            {step === 1 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PACKAGES.map((pkg) => (
                        <div
                            key={pkg.id}
                            className={cn(
                                "group relative bg-surface border rounded-[2.5rem] p-10 flex flex-col space-y-10 transition-all duration-500 hover:-translate-y-2 shadow-2xl overflow-hidden",
                                pkg.featured ? "border-brand-lime/40 scale-105" : "border-muted-bg/50 hover:border-brand-bright/20"
                            )}
                        >
                            {pkg.featured && (
                                <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-lime shadow-[0_0_15px_rgba(var(--brand-lime),0.5)]" />
                            )}

                            {pkg.featured && (
                                <div className="absolute top-4 right-10">
                                    <Badge className="bg-brand-lime text-brand-deep font-black text-[8px] uppercase tracking-widest">Le Plus Populaire</Badge>
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className={cn("w-14 h-14 rounded-2xl bg-night flex items-center justify-center border border-muted-bg/50", pkg.color)}>
                                    <pkg.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-display font-bold uppercase italic text-text-primary">{pkg.title}</h3>
                                <div className="flex items-center gap-3 text-text-faint text-[10px] font-bold uppercase tracking-widest italic">
                                    <Clock className="w-3.5 h-3.5" /> {pkg.duration}
                                </div>
                            </div>

                            <div className="space-y-4 flex-1">
                                {pkg.features.map((feat, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <Check className="w-4 h-4 text-brand-lime shrink-0" />
                                        <span className="text-xs font-bold text-text-muted uppercase tracking-tight italic">{feat}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-6 pt-6 border-t border-muted-bg/10">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-display font-bold text-brand-lime italic">{pkg.price}</span>
                                </div>
                                <Button
                                    onClick={() => { setSelectedPackage(pkg); setStep(2); }}
                                    className={cn(
                                        "w-full h-14 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all",
                                        pkg.featured ? "bg-brand-lime text-brand-deep hover:bg-brand-bright" : "bg-brand-action text-white hover:bg-brand-bright"
                                    )}
                                >
                                    Réserver ce forfait <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="max-w-4xl mx-auto bg-surface border border-muted-bg/50 rounded-[3rem] p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-lime shadow-[0_0_15px_rgba(var(--brand-lime),0.3)]" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="space-y-10">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-display font-bold uppercase italic">Détails <span className="text-brand-lime">Rendez-vous</span></h2>
                                <p className="text-text-muted italic">Organisez votre passage à la station AIR DIASS.</p>
                            </div>

                            <div className="p-6 bg-brand-deep/30 border border-brand-bright/10 rounded-2xl space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-night flex items-center justify-center text-brand-lime">
                                        <selectedPackage.icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold text-brand-lime uppercase tracking-widest">Forfait Choisi</p>
                                        <p className="text-lg font-display font-bold uppercase italic text-text-primary">{selectedPackage.title}</p>
                                    </div>
                                </div>
                            </div>

                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input type="date" className="h-14 bg-night border-muted-bg/50 rounded-2xl text-[10px] font-bold uppercase text-brand-lime" />
                                    <Input type="time" className="h-14 bg-night border-muted-bg/50 rounded-2xl text-[10px] font-bold uppercase text-brand-lime" />
                                </div>
                                <Input placeholder="Immatriculation du véhicule" className="h-14 bg-night border-muted-bg/50 rounded-2xl text-xs font-bold uppercase tracking-widest" />
                                <div className="grid grid-cols-2 gap-4">
                                    <Input placeholder="Votre Nom" className="h-14 bg-night border-muted-bg/50 rounded-2xl text-xs font-bold uppercase tracking-widest" />
                                    <Input placeholder="Téléphone" className="h-14 bg-night border-muted-bg/50 rounded-2xl text-xs font-bold uppercase tracking-widest" />
                                </div>
                                <div className="pt-6">
                                    <Button className="w-full h-16 bg-brand-action hover:bg-brand-bright text-white font-black uppercase tracking-widest text-[10px] rounded-2xl shadow-2xl shadow-brand-action/20">
                                        Confirmer le Nettoyage <ArrowRight className="w-4 h-4 ml-4" />
                                    </Button>
                                </div>
                            </form>
                        </div>

                        <div className="hidden md:flex flex-col justify-center space-y-8">
                            {[
                                { title: "Station de Diass", desc: "Ouvert 24h/24 & 7j/7 pour vos besoins urgents.", icon: Shield },
                                { title: "Expertise Artisanale", desc: "Nos techniciens traitent chaque véhicule comme une oeuvre d&apos;art.", icon: Car },
                                { title: "Produits Bio", desc: "Nous utilisons des solutions de nettoyage biodégradables.", icon: Droplet },
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-6 items-start group">
                                    <div className="w-12 h-12 rounded-xl bg-surface border border-muted-bg/50 flex items-center justify-center shrink-0 group-hover:border-brand-bright/20 transition-all shadow-lg">
                                        <item.icon className="w-5 h-5 text-brand-lime" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-black uppercase italic text-text-primary">{item.title}</h4>
                                        <p className="text-xs text-text-muted leading-relaxed italic">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <span className={cn("px-2 py-0.5 rounded-full", className)}>
            {children}
        </span>
    );
}
