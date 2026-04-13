"use client"

import { useEffect } from "react"
import { AlertTriangle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error("Critical Page Error:", error)
    }, [error])

    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-8 text-center space-y-8 animate-in fade-in duration-700">
            <div className="w-24 h-24 bg-brand-deep/50 rounded-full flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-brand-lime/5 group-hover:bg-brand-lime/10 transition-colors" />
                <AlertTriangle className="w-10 h-10 text-brand-bright opacity-40 group-hover:scale-110 transition-transform duration-500" />
            </div>

            <div className="space-y-3 max-w-md">
                <h2 className="text-3xl font-display font-bold uppercase tracking-tight italic text-text-primary">
                    Une <span className="text-brand-lime">Interruption</span> est survenue
                </h2>
                <p className="text-text-muted text-sm leading-relaxed italic">
                    Nous nous excusons pour ce contretemps technique. Nos équipes ont été notifiées et travaillent à la résolution.
                </p>
            </div>

            <Button
                onClick={reset}
                className="h-14 px-10 bg-brand-action hover:bg-brand-bright text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-brand-action/20 group transition-all"
            >
                <RefreshCcw className="w-4 h-4 mr-3 group-hover:rotate-180 transition-transform duration-500" />
                Réessayer la connexion
            </Button>

            <div className="pt-12 border-t border-muted-bg/10 w-full max-w-xs">
                <p className="text-[10px] font-bold text-text-faint uppercase tracking-[0.2em]">AIR DIASS — Code de support : {error.digest || "ERR_UNKNOWN"}</p>
            </div>
        </div>
    )
}
