import { PackageSearch, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-8 text-center space-y-10">
            <div className="relative">
                <div className="w-32 h-32 bg-surface rounded-[2.5rem] border border-muted-bg/50 flex items-center justify-center -rotate-6 group hover:rotate-0 transition-transform duration-500">
                    <PackageSearch className="w-12 h-12 text-brand-lime opacity-40" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-brand-action rounded-2xl flex items-center justify-center shadow-2xl rotate-12 group-hover:rotate-0 transition-transform duration-500">
                    <span className="text-white font-black italic text-sm">404</span>
                </div>
            </div>

            <div className="space-y-4 max-w-md">
                <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight italic text-text-primary">
                    Page <span className="text-brand-lime">Introuvable</span>
                </h1>
                <p className="text-text-muted text-lg italic leading-relaxed">
                    Le vol vers cette destination a été annulé ou n&apos;existe plus.
                    Vérifiez l&apos;URL ou retournez à la base.
                </p>
            </div>

            <Button asChild className="h-14 h-14 bg-brand-lime hover:bg-brand-bright text-brand-deep font-black uppercase tracking-widest text-[11px] rounded-2xl shadow-2xl shadow-brand-lime/20">
                <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-3" /> Retour à l&apos;accueil
                </Link>
            </Button>

            <div className="pt-20 opacity-10">
                <p className="text-[9px] font-black uppercase tracking-[0.5em] italic">AIR DIASS OPERATIONAL EXCELLENCE</p>
            </div>
        </div>
    )
}
