import {
    Mail,
    ArrowRight,
    RefreshCcw,
    UserCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyPage() {
    return (
        <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center py-12 px-4 bg-night">
            <div className="max-w-md w-full space-y-10 bg-surface border border-muted-bg/50 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden text-center">
                <div className="absolute top-0 inset-x-0 h-1 bg-brand-action opacity-50" />

                <div className="mx-auto h-20 w-20 rounded-[2rem] bg-brand-deep flex items-center justify-center text-brand-lime mb-8 shadow-2xl border border-brand-bright/10 animate-morph">
                    <Mail className="w-10 h-10" />
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-display font-bold text-text-primary uppercase tracking-tight italic">
                        Vérifiez votre <span className="text-brand-lime">E-mail</span>
                    </h2>
                    <p className="text-text-muted text-sm leading-relaxed max-w-xs mx-auto">
                        Un lien de validation a été envoyé à votre adresse. Merci de cliquer dessus pour activer votre accès VIP.
                    </p>
                </div>

                <div className="pt-8 space-y-4">
                    <Button className="w-full h-14 bg-brand-action hover:bg-brand-bright text-white font-bold rounded-2xl shadow-xl shadow-brand-action/20 text-sm uppercase tracking-widest group">
                        Ouvrir ma messagerie <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="ghost" className="w-full h-12 text-text-faint hover:text-brand-lime font-bold text-[10px] uppercase tracking-widest">
                        <RefreshCcw className="w-3 h-3 mr-2" /> Renvoyer le lien
                    </Button>
                </div>

                <div className="pt-8 border-t border-muted-bg/20">
                    <Link href="/auth/login" className="flex items-center justify-center gap-2 group">
                        <UserCheck className="w-4 h-4 text-brand-lime" />
                        <span className="text-xs font-bold text-text-muted group-hover:text-brand-lime transition-colors">Retour à la connexion</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
