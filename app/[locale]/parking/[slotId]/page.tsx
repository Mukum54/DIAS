import { Badge } from "@/components/ui/badge";
import {
    ShieldCheck,
    Car,
    Timer,
    User as UserIcon
} from "lucide-react";

export default function ParkingSlotView() {
    return (
        <div className="space-y-12 pb-20 max-w-5xl mx-auto">
            {/* Simple public view of a parking slot status */}
            <div className="flex flex-col items-center text-center space-y-8 py-20">
                <div className="w-32 h-32 rounded-3xl bg-brand-deep flex items-center justify-center text-brand-lime shadow-2xl border border-brand-bright/10 mb-6">
                    <Car className="w-16 h-16" />
                </div>
                <h1 className="text-4xl font-display font-bold uppercase tracking-tight text-text-primary italic">
                    Place <span className="text-brand-lime">A-05</span>
                </h1>
                <Badge className="bg-brand-lime/10 text-brand-lime border-brand-lime/20 font-bold px-6 py-2 rounded-xl text-lg uppercase tracking-widest">Occupée</Badge>

                <div className="p-8 bg-surface border border-muted-bg/50 rounded-[2rem] w-full max-w-md space-y-6">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-text-muted font-bold uppercase tracking-widest flex items-center gap-2"><UserIcon className="w-4 h-4" /> Client</span>
                        <span className="text-text-primary font-bold italic">Moussa Diop</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-t border-muted-bg/10 pt-6">
                        <span className="text-text-muted font-bold uppercase tracking-widest flex items-center gap-2"><Timer className="w-4 h-4" /> Durée</span>
                        <span className="text-text-primary font-bold italic">4 Jours Restants</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-10">
                    <div className="w-12 h-12 rounded-xl bg-brand-deep flex items-center justify-center text-brand-lime border border-brand-bright/10">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <p className="text-[10px] text-text-faint font-bold uppercase tracking-[0.2em] max-w-[200px] text-left">Emplacement sous surveillance 24/7. Système AIR DIASS Securitas.</p>
                </div>
            </div>
        </div>
    );
}
