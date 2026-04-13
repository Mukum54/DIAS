import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Navigation, CalendarClock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function TransportDispatchPage() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="border-b border-border/50 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-display font-bold uppercase tracking-widest">Dispatch Transport</h1>
                    <p className="text-muted-foreground mt-2 text-lg">Répartition et suivi satellite des chauffeurs Diass Auto.</p>
                </div>
                <Button size="lg" className="shadow-lg shadow-primary/20">+ Nouvelle Course</Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="text-xl font-bold font-display uppercase tracking-wider text-muted-foreground">Courses Actives</h3>

                    <Card className="border-border shadow-sm border-l-4 border-l-amber-500 bg-card overflow-hidden">
                        <CardContent className="p-0">
                            <div className="p-6 border-b border-border/50 bg-amber-500/5">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-bold text-lg font-mono tracking-widest uppercase">AD-84JQ</h4>
                                    <Badge variant="outline" className="font-mono text-xs shadow-sm bg-background">Chauffeur: A. SECK</Badge>
                                </div>
                                <p className="text-xs text-amber-500 font-bold uppercase tracking-wider flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></span>En approche aéroport</p>
                            </div>

                            <div className="p-6 flex flex-col gap-4 text-sm text-foreground bg-background/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0"><Navigation className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Trajet</p>
                                        <p className="font-semibold text-base">Dakar Plateau <span className="mx-2 text-muted-foreground">→</span> AIBD</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground shrink-0"><Car className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Véhicule</p>
                                        <p className="font-medium text-base">Mercedes Classe S (DK-1029-A)</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground shrink-0"><CalendarClock className="w-5 h-5" /></div>
                                    <div>
                                        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-0.5">Prise en charge</p>
                                        <p className="font-medium text-base">14:00 <span className="text-muted-foreground text-sm ml-2">(Il y a 35 min)</span></p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-bold font-display uppercase tracking-wider text-muted-foreground">Flotte Disponible</h3>

                    <Card className="border-border shadow-sm border-t-4 border-t-emerald-500">
                        <CardContent className="p-0 divide-y divide-border/50">
                            <div className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center shadow-inner border border-emerald-500/20">
                                        <Car className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-base uppercase tracking-wide">M. DIOP <span className="text-muted-foreground text-sm normal-case font-medium ml-2 border border-border px-2 py-0.5 rounded-full">Premium SUV</span></h5>
                                        <p className="text-sm text-emerald-600 font-medium mt-1">En attente Terminal VIP</p>
                                    </div>
                                </div>
                                <Button className="shadow-sm">Assigner</Button>
                            </div>

                            <div className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center shadow-inner border border-emerald-500/20">
                                        <Car className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-base uppercase tracking-wide">M. NDIAYE <span className="text-muted-foreground text-sm normal-case font-medium ml-2 border border-border px-2 py-0.5 rounded-full">Berline Exec</span></h5>
                                        <p className="text-sm text-emerald-600 font-medium mt-1">En attente Parking P1</p>
                                    </div>
                                </div>
                                <Button className="shadow-sm">Assigner</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
