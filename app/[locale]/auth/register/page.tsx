"use client";

import { useState } from "react";
import {
    UserPlus,
    Mail,
    Lock,
    User,
    Phone,
    ArrowRight,
    ShieldCheck,
    CheckCircle2,
    Briefcase,
    Zap,
    ChevronLeft,
    MessageSquareText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function RegisterPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.confirmPassword) {
            toast.error("Mots de passe différents", {
                description: "Les deux mots de passe doivent être identiques.",
                className: "bg-surface border-danger/50 text-white font-black uppercase tracking-widest text-[10px]"
            });
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            });

            const result = await res.json();

            if (!res.ok) {
                toast.error("Erreur d'inscription", {
                    description: result.error || "Une erreur est survenue lors de l'inscription.",
                    className: "bg-surface border-danger/50 text-white font-black uppercase tracking-widest text-[10px]"
                });
            } else {
                toast.success("Compte créé avec succès", {
                    description: "Bienvenue chez AIR DIASS Excellence.",
                    className: "bg-surface border-brand-lime/50 text-white font-black uppercase tracking-widest text-[10px]"
                });
                setTimeout(() => router.push("/auth/login"), 2000);
            }
        } catch (error) {
            toast.error("Erreur système", {
                description: "Impossible de joindre le serveur d'authentification.",
                className: "bg-surface border-danger/50 text-white font-black uppercase tracking-widest text-[10px]"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-12 relative bg-night overflow-hidden selection:bg-brand-lime selection:text-brand-deep">
            {/* --- LEFT SECTION: PREMIUM VISUAL (4/12) --- */}
            <div className="hidden lg:flex lg:col-span-5 flex-col relative p-16 justify-between overflow-hidden border-r border-brand-bright/10">
                {/* Dynamic Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-deep/80 via-night to-brand-deep/80 z-0" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-lime rounded-full blur-[120px]"
                />

                <Link href="/" className="relative z-10 flex items-center gap-4 group/back">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-xl group-hover/back:border-brand-lime/50 group-hover/back:bg-brand-lime/10 transition-all duration-500">
                        <ChevronLeft className="w-6 h-6 text-text-muted group-hover/back:text-brand-lime" />
                    </div>
                </Link>

                <div className="relative z-10 space-y-12">
                    <div className="space-y-6">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-brand-lime/10 border border-brand-lime/20"
                        >
                            <Zap className="w-4 h-4 text-brand-lime" />
                            <span className="text-[10px] font-black text-brand-lime uppercase tracking-[0.3em]">Accès Premium Unifié</span>
                        </motion.div>
                        <h1 className="text-6xl xl:text-7xl font-display font-bold text-white uppercase tracking-tighter leading-[0.9] italic">
                            Élevez votre <br />
                            <span className="text-brand-lime">Standard</span>
                        </h1>
                        <p className="text-text-muted text-lg font-medium leading-relaxed max-w-md italic">
                            Un seul compte pour tous vos services : Aéroport, Conciergerie, Vente de véhicules et Maintenance.
                        </p>
                    </div>

                    <div className="grid gap-4">
                        {[
                            { icon: ShieldCheck, title: "Sécurité Absolue", desc: "Chiffrement AES-256 et conformité RGPD totale." },
                            { icon: Briefcase, title: "Gestion Corporate", desc: "Des outils dédiés pour vos flottes et vos équipes." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + i * 0.2 }}
                                className="flex gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-brand-lime/20 hover:bg-white/[0.07] transition-all duration-500"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-brand-deep flex items-center justify-center text-brand-lime shrink-0 shadow-inner">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-white">{item.title}</h3>
                                    <p className="text-xs text-text-faint/80 italic font-medium">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 opacity-30">
                    <div className="h-px w-20 bg-brand-lime mb-4" />
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em]">AIR DIASS Group • Excellence Nomade</p>
                </div>
            </div>

            {/* --- RIGHT SECTION: FORM (8/12) --- */}
            <div className="lg:col-span-7 flex flex-col items-center justify-start p-8 md:p-16 lg:p-24 overflow-y-auto max-h-screen custom-scrollbar">
                <div className="w-full max-w-2xl space-y-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                        <div className="space-y-2">
                            <h2 className="text-5xl font-display font-black text-white uppercase tracking-tight italic">
                                Devenir <span className="text-brand-lime">Membre</span>
                            </h2>
                            <p className="text-text-muted font-medium italic">Complétez votre profil pour accéder à l&apos;exclusivité.</p>
                        </div>
                        <div className="px-6 py-3 bg-brand-deep rounded-2xl border border-brand-bright/10 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-brand-lime animate-pulse" />
                            <span className="text-[10px] font-black text-brand-lime uppercase tracking-widest">Serveur Sécurisé</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10 group/form">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-faint ml-2 flex items-center gap-2">
                                    <User className="w-3 h-3 text-brand-lime" /> Prénom
                                </label>
                                <Input name="firstName" required placeholder="Ex: Moussa" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-faint ml-2 flex items-center gap-2">
                                    <User className="w-3 h-3 text-brand-lime" /> Nom
                                </label>
                                <Input name="lastName" required placeholder="Ex: Diop" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-faint ml-2 flex items-center gap-2">
                                    <Mail className="w-3 h-3 text-brand-lime" /> Email Professionnel
                                </label>
                                <Input name="email" type="email" required placeholder="m.diop@exemple.com" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-faint ml-2 flex items-center gap-2">
                                    <Phone className="w-3 h-3 text-brand-lime" /> Téléphone
                                </label>
                                <Input name="phone" type="tel" required placeholder="+221 ..." />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-faint ml-2 flex items-center gap-2">
                                    <Lock className="w-3 h-3 text-brand-lime" /> Mot de passe
                                </label>
                                <Input name="password" type="password" required placeholder="••••••••" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-faint ml-2 flex items-center gap-2">
                                    <Lock className="w-3 h-3 text-brand-lime" /> Confirmation
                                </label>
                                <Input name="confirmPassword" type="password" required placeholder="••••••••" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-faint ml-2 flex items-center gap-2">
                                <MessageSquareText className="w-3 h-3 text-brand-lime" /> Notes Additionnelles (Optionnel)
                            </label>
                            <Textarea
                                name="notes"
                                placeholder="Précisez ici vos préférences ou besoins spécifiques (ex: allergies, préférences de conduite, type de véhicule souhaité...)"
                            />
                        </div>

                        <div className="p-8 rounded-[2rem] bg-brand-deep/30 border border-brand-bright/10 space-y-6">
                            <div className="flex items-start gap-4">
                                <Checkbox id="consent" required className="mt-1 border-brand-bright/30 data-[state=checked]:bg-brand-lime data-[state=checked]:text-brand-deep" />
                                <label htmlFor="consent" className="text-xs font-medium text-text-muted leading-relaxed italic">
                                    Je consens au traitement de mes données personnelles conformément à la <Link href="/rgpd" className="text-brand-lime font-black underline underline-offset-4">Politique de Confidentialité</Link> de AIR DIASS.
                                </label>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-20 bg-brand-action hover:bg-brand-bright text-white font-black uppercase tracking-[0.4em] rounded-2xl shadow-2xl shadow-brand-action/20 group transition-all duration-500 overflow-hidden relative"
                            >
                                <AnimatePresence mode="wait">
                                    {isLoading ? (
                                        <motion.div
                                            key="loading"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center gap-4"
                                        >
                                            <Zap className="w-6 h-6 animate-pulse text-brand-lime" />
                                            <span>Traitement en cours</span>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="idle"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center gap-4"
                                        >
                                            <span>Valider l&apos;Inscription</span>
                                            <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-700" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>

                            <div className="relative py-2 flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-brand-bright/10"></div>
                                </div>
                                <div className="relative bg-brand-deep/30 px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                                    Ou
                                </div>
                            </div>

                            <Button
                                type="button"
                                disabled={isLoading}
                                onClick={() => {
                                    import("next-auth/react").then((mod) => {
                                        mod.signIn("google", { callbackUrl: "/fr/espace-client" });
                                    });
                                }}
                                className="w-full h-16 bg-white hover:bg-gray-100 text-black font-bold uppercase tracking-[0.2em] rounded-2xl shadow-lg group transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22.5601 12.2501C22.5601 11.4701 22.4901 10.7201 22.3601 10.0001H12.0001V14.2601H17.9201C17.6701 15.6301 16.8801 16.7901 15.6801 17.5501V20.3501H19.2401C21.3201 18.3901 22.5601 15.5801 22.5601 12.2501Z" fill="#4285F4" />
                                    <path d="M12.0001 23C14.9701 23 17.4601 22.02 19.2401 20.35L15.6801 17.55C14.7201 18.21 13.4701 18.61 12.0001 18.61C9.16012 18.61 6.75012 16.63 5.88012 13.99H2.22012V16.92C4.02012 20.61 7.71012 23 12.0001 23Z" fill="#34A853" />
                                    <path d="M5.88012 13.99C5.66012 13.33 5.53012 12.63 5.53012 11.91C5.53012 11.19 5.66012 10.49 5.88012 9.83001V6.90002H2.22012C1.48012 8.38002 1.05012 10.08 1.05012 11.91C1.05012 13.74 1.48012 15.44 2.22012 16.92L5.88012 13.99Z" fill="#FBBC05" />
                                    <path d="M12.0001 5.37996C13.6201 5.37996 15.0701 5.93996 16.2201 6.94996L19.3301 3.83997C17.4601 2.05997 14.9701 0.999969 12.0001 0.999969C7.71012 0.999969 4.02012 3.38997 2.22012 6.90001L5.88012 9.83001C6.75012 7.19001 9.16012 5.37996 12.0001 5.37996Z" fill="#EA4335" />
                                </svg>
                                <span>Continuer avec Google</span>
                            </Button>
                        </div>
                    </form>

                    <div className="pt-10 border-t border-muted-bg/20 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="space-y-1 text-center md:text-left">
                            <p className="text-[11px] font-black text-text-muted uppercase tracking-widest">Déjà membre de la communauté ?</p>
                            <Link href="/auth/login" className="text-lg font-display font-bold text-brand-lime hover:text-brand-bright transition-colors italic">
                                Se connecter à l&apos;Espace Client <ArrowRight className="w-4 h-4 inline ml-1" />
                            </Link>
                        </div>
                        <div className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-surface border border-muted-bg/30">
                            <ShieldCheck className="w-5 h-5 text-brand-lime" />
                            <div className="flex flex-col">
                                <span className="text-[8px] font-black text-white uppercase tracking-widest">RGPD Compliance</span>
                                <span className="text-[7px] font-bold text-text-faint uppercase tracking-[0.2em]">Verified Service</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
