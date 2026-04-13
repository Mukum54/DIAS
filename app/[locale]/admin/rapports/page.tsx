import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3, AlertCircle } from "lucide-react";

export default function RapportsPage() {
    return (
        <div className="space-y-12 max-w-[1600px] mx-auto pb-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-muted-bg/50 pb-10 mb-10">
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="h-2 w-2 rounded-full bg-brand-lime animate-pulse" />
                        <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[0.4em]">Business Intelligence</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-text-primary italic">
                        Rapports & <span className="text-brand-lime">Analytiques</span>
                    </h1>
                    <p className="text-text-muted mt-3 text-lg font-medium">Générateur de rapports consolidés AIR DIASS</p>
                </div>
            </div>

            <Card className="border-brand-bright/10 bg-surface shadow-2xl p-8 rounded-[2rem] flex flex-col items-center justify-center min-h-[400px] text-center space-y-6">
                <div className="w-20 h-20 rounded-full bg-brand-deep border border-brand-bright/20 flex items-center justify-center">
                    <BarChart3 className="w-10 h-10 text-brand-lime opacity-50" />
                </div>
                <div className="space-y-2 max-w-md">
                    <h2 className="text-2xl font-display font-bold uppercase tracking-tight italic text-text-primary">
                        Module en <span className="text-brand-lime">Construction</span>
                    </h2>
                    <p className="text-text-muted">
                        Le générateur de rapports détaillés (BI) est actuellement en cours de développement. Il permettra l'export comptable, l'analyse des KPIs de performance et la génération de PDF automatisés.
                    </p>
                </div>
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-brand-lime/10 border border-brand-lime/20 text-brand-lime text-xs font-bold uppercase tracking-widest mt-6">
                    <AlertCircle className="w-4 h-4" />
                    <span>Disponible Prochainement</span>
                </div>
            </Card>
        </div>
    );
}
