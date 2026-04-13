"use client";

import { getSession } from "next-auth/react";
import { useState } from "react";
import {
    ShieldCheck,
    Mail,
    Lock,
    ArrowRight,
    CheckCircle2,
    ChevronLeft,
    Sparkles,
    Key,
    Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const params = useParams();
    const locale = params.locale as string || "fr";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError("Identifiants invalides. Veuillez vérifier votre email et mot de passe.");
                setIsLoading(false);
            } else {
                // Correct redirect based on role after successful signIn
                const session = await getSession();
                if (session?.user?.role === "ADMIN") {
                    router.push(`/${locale}/admin`);
                } else {
                    router.push(`/${locale}/espace-client`);
                }

            }
        } catch (err) {
            setError("Une erreur de connexion au service d'authentification est survenue.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-12 relative bg-night overflow-hidden selection:bg-brand-lime selection:text-brand-deep">
            {/* --- LEFT SECTION: BRANDING (5/12) --- */}
            <div className="hidden lg:flex lg:col-span-5 flex-col relative p-16 justify-between overflow-hidden border-r border-brand-bright/10">
                {/* Background Decor */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-deep/80 via-night to-brand-deep/80 z-0" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 0.1, scale: 1.1 }}
                    transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
                    className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-brand-action rounded-full blur-[150px]"
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
                            <ShieldCheck className="w-4 h-4 text-brand-lime" />
                            <span className="text-[10px] font-black text-brand-lime uppercase tracking-[0.3em]">Accès Sécurisé 256-bit</span>
                        </motion.div>
                        <h1 className="text-6xl xl:text-7xl font-display font-bold text-white uppercase tracking-tighter leading-[0.9] italic">
                            Votre <br />
                            <span className="text-brand-lime">Privilège</span> <br />
                            Connecté
                        </h1>
                        <p className="text-text-muted text-lg font-medium leading-relaxed max-w-md italic animate-in fade-in duration-1000">
                            Gérez vos réservations, suivez vos envois et accédez à vos privilèges exclusifs en un seul lieu sécurisé.
                        </p>
                    </div>

                    <div className="flex items-center gap-6 pt-10">
                        <div className="flex -space-x-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-14 h-14 rounded-full border-4 border-night bg-brand-deep flex items-center justify-center overflow-hidden">
                                    <User className="w-6 h-6 text-brand-lime opacity-40" />
                                </div>
                            ))}
                        </div>
                        <div className="space-y-1">
                            <p className="text-[11px] font-black text-white uppercase tracking-widest">+2,400 Membres</p>
                            <p className="text-[9px] font-bold text-text-faint uppercase tracking-widest tracking-tighter">Communauté AIR DIASS Excellence</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 opacity-30">
                    <div className="h-px w-20 bg-brand-lime mb-4" />
                    <p className="text-[9px] font-black text-text-muted uppercase tracking-[0.4em]">Protocoles de Sécurité Bancaire Actifs</p>
                </div>
            </div>

            {/* --- RIGHT SECTION: LOGIN FORM (7/12) --- */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-8 md:p-12 lg:p-20 relative overflow-y-auto max-h-screen">
                <div className="absolute bottom-0 right-0 p-12 opacity-5 pointer-events-none overflow-hidden translate-x-1/4 translate-y-1/4">
                    <Key className="w-[600px] h-[600px] text-brand-lime" />
                </div>

                <div className="w-full max-w-2xl space-y-12 relative z-10">
                    <div className="flex flex-col gap-4">
                        <h2 className="text-5xl font-display font-black text-white uppercase tracking-tight italic">
                            S&apos;identifier
                        </h2>
                        <p className="text-text-muted font-medium italic">Accédez au portail AIR DIASS pour vos services personnalisés.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="p-5 rounded-2xl bg-red-500/10 border border-red-500/50 text-red-500 text-xs font-bold uppercase tracking-wide flex items-center gap-4 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                                >
                                    <Sparkles className="w-5 h-5 shrink-0" />
                                    <span>{error}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="space-y-8">
                            <div className="space-y-3">
                                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-faint ml-2 flex items-center gap-2">
                                    <Mail className="w-3 h-3 text-brand-lime" /> Identifiant (Email)
                                </label>
                                <Input
                                    name="email"
                                    required
                                    type="email"
                                    placeholder="votre@email.com"
                                />
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center px-2">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-text-faint flex items-center gap-2">
                                        <Lock className="w-3 h-3 text-brand-lime" /> Mot de passe
                                    </label>
                                    <Link href="/auth/forgot" className="text-[9px] font-black uppercase tracking-widest text-brand-lime hover:text-brand-bright underline decoration-brand-lime/20 underline-offset-4">
                                        Mot de passe oublié ?
                                    </Link>
                                </div>
                                <Input
                                    name="password"
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-16 bg-brand-action hover:bg-brand-bright text-white font-black uppercase tracking-[0.4em] rounded-2xl shadow-2xl shadow-brand-action/20 group transition-all duration-500 overflow-hidden relative"
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
                                            <span>Vérification...</span>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="idle"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center gap-4"
                                        >
                                            <span>Se Connecter</span>
                                            <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-700" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Button>

                            <div className="relative py-4 flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-muted-bg/30"></div>
                                </div>
                                <div className="relative bg-night px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted">
                                    Ou
                                </div>
                            </div>

                            <Button
                                type="button"
                                disabled={isLoading}
                                onClick={() => signIn("google", { callbackUrl: `/${locale}/espace-client` })}
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

                    <div className="pt-10 border-t border-muted-bg/20 flex flex-col md:flex-row justify-between items-center gap-10">
                        <div className="space-y-1 text-center md:text-left">
                            <p className="text-[11px] font-black text-text-muted uppercase tracking-widest">Pas encore membre ?</p>
                            <Link href="/auth/register" className="text-lg font-display font-bold text-brand-lime hover:text-brand-bright transition-colors italic">
                                S&apos;inscrire maintenant <ArrowRight className="w-4 h-4 inline ml-1" />
                            </Link>
                        </div>
                        <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-surface border border-muted-bg/30 grayscale hover:grayscale-0 transition-all">
                            <CheckCircle2 className="w-4 h-4 text-brand-lime" />
                            <span className="text-[8px] font-black text-text-faint uppercase tracking-[0.2em]">SSL Secured 256-bit</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Simple internal icon for the avatars since we didn't import it in all scopes
function User(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}
