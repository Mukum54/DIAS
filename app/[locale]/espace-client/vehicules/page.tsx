import {
    Car,
    Calendar,
    MapPin,
    ShieldCheck,
    ArrowRight,
    History,
    Fuel,
    Settings,
    AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function ClientVehiculesPage() {
    const activeVehicles = [
        { id: "VEH-001", make: "Range Rover", model: "Sport SVR", registrationNumber: "AA 123 AA", type: "RENTAL", status: "ACTIVE", nextService: "15 Mai 2024", fuel: "85%", daysRemaining: 4, image: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?auto=format&fit=crop&q=80&w=800" },
        { id: "VEH-002", make: "Mercedes-Benz", model: "G-Class AMG", registrationNumber: "DK 8827 AS", type: "RENTAL", status: "ACTIVE", nextService: "10 Juin 2024", fuel: "60%", daysRemaining: 2, image: "https://images.unsplash.com/photo-1520031441872-265e4ff70366?auto=format&fit=crop&q=80&w=800" },
        { id: "VEH-003", make: "Toyota", model: "Land Cruiser V8", registrationNumber: "DK 9901 AB", type: "FLEET", status: "AVAILABLE", nextService: "22 Juil 2024", fuel: "100%", daysRemaining: 0, image: "https://images.unsplash.com/photo-1594568284297-7c64464062b1?auto=format&fit=crop&q=80&w=800" },
    ];

    return (
        <div className="space-y-12 pb-20 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-muted-bg/50 pb-10">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Car className="w-4 h-4 text-brand-lime" />
                        <span className="text-[10px] font-bold text-brand-lime uppercase tracking-[0.4em]">Services Mobilité DIASS AUTO</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight text-text-primary italic">
                        Mes <span className="text-brand-lime">Véhicules</span>
                    </h1>
                    <p className="text-text-muted text-lg font-medium italic">Contrats de location actifs et historique d&apos;entretien</p>
                </div>
                <div className="flex gap-4">
                    <Button asChild className="h-14 bg-brand-action hover:bg-brand-bright text-white rounded-2xl px-8 shadow-xl shadow-brand-action/20 font-bold uppercase tracking-widest text-sm group">
                        <Link href="/reservation/location">Louer un véhicule <ArrowRight className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform" /></Link>
                    </Button>
                </div>
            </div>

            {/* Active Contracts */}
            <div className="space-y-8">
                <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight italic flex items-center gap-3">
                    <History className="w-5 h-5 text-brand-lime" />
                    Contrants <span className="text-brand-lime">Actifs</span>
                </h3>

                <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                    <div className="xl:col-span-8 space-y-8">
                        {activeVehicles.map((veh, idx) => (
                            <Card key={idx} className="bg-surface border-muted-bg/50 border rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden group hover:border-brand-bright/20 transition-all">
                                <div className="absolute top-0 right-0 p-10 opacity-[0.05] pointer-events-none w-1/2 h-full">
                                    <img src={veh.image} alt={veh.model} className="w-full h-full object-cover grayscale brightness-50 contrast-125" />
                                </div>

                                <div className="relative z-10 space-y-10">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Badge className="bg-brand-lime/10 text-brand-lime border-brand-lime/20 font-bold text-[8px] uppercase tracking-widest px-2">Location Premium</Badge>
                                                <span className="text-[10px] font-mono font-bold text-text-faint uppercase tracking-widest">ID: {veh.id}</span>
                                            </div>
                                            <h4 className="text-2xl font-display font-bold text-text-primary uppercase tracking-tight italic">
                                                {veh.make} <span className="text-brand-lime">{veh.model}</span>
                                            </h4>
                                            <p className="text-xs font-bold text-text-muted font-mono tracking-widest">{veh.registrationNumber}</p>
                                        </div>
                                        <div className="text-right space-y-1">
                                            <p className="text-[10px] text-text-faint font-bold uppercase tracking-widest">Jours Restants</p>
                                            <p className="text-3xl font-display font-bold text-brand-lime tabular-nums">{veh.daysRemaining}</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-muted-bg/10">
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-text-faint font-bold uppercase tracking-wider flex items-center gap-2"><Fuel className="w-3 h-3" /> Carburant</p>
                                            <p className="text-sm font-bold text-text-primary tabular-nums">{veh.fuel}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-text-faint font-bold uppercase tracking-wider flex items-center gap-2"><Settings className="w-3 h-3" /> Prochain Entretien</p>
                                            <p className="text-sm font-bold text-text-primary tabular-nums text-amber-500">{veh.nextService}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[10px] text-text-faint font-bold uppercase tracking-wider flex items-center gap-2"><Calendar className="w-3 h-3" /> Retour prévu</p>
                                            <p className="text-sm font-bold text-text-primary tabular-nums">16 Avr. 2024</p>
                                        </div>
                                        <div className="space-y-1 text-right">
                                            <p className="text-[10px] text-text-faint font-bold uppercase tracking-wider flex items-center justify-end gap-2"><MapPin className="w-3 h-3" /> Zone</p>
                                            <p className="text-sm font-bold text-text-primary italic">Dakar Centre</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Button asChild className="flex-1 h-12 bg-brand-deep hover:bg-brand-deep/80 text-brand-lime border border-brand-bright/10 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-lg">
                                            <a href={`/api/documents/${veh.id}/download`}>Contrat de location (PDF)</a>
                                        </Button>
                                        <Button variant="outline" asChild className="flex-1 h-12 border-muted-bg/50 text-text-muted rounded-xl bg-transparent hover:bg-brand-deep font-bold uppercase tracking-widest text-[10px]">
                                            <Link href="/contact">Signaler un incident</Link>
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="xl:col-span-4 space-y-8">
                        <Card className="bg-brand-deep/30 border border-brand-bright/10 rounded-[2.5rem] p-8 backdrop-blur-2xl space-y-8 shadow-2xl">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="w-5 h-5 text-brand-lime" />
                                <h4 className="text-sm font-bold text-text-primary uppercase tracking-tight italic">Rappel <span className="text-brand-lime">Sécurité</span></h4>
                            </div>
                            <p className="text-xs text-text-muted leading-relaxed italic">
                                Votre Range Rover arrive à échéance de maintenance dans <span className="text-brand-lime font-bold">12 jours</span>. Réservez votre passage au garage DIASS AUTO dès aujourd&apos;hui pour conserver votre garantie.
                            </p>
                            <Button variant="outline" asChild className="w-full border-brand-bright/10 bg-brand-deep text-brand-lime text-[10px] font-bold uppercase tracking-widest h-12 rounded-xl hover:bg-brand-deep/80 py-2">
                                <Link href="/reservation/garage">Prendre rendez-vous (Garage)</Link>
                            </Button>
                        </Card>

                        <div className="p-8 bg-surface border border-muted-bg/50 rounded-3xl flex flex-col items-center justify-center text-center space-y-4">
                            <ShieldCheck className="w-10 h-10 text-brand-lime opacity-50 mb-2" />
                            <h4 className="text-xs font-bold text-text-primary uppercase tracking-tight italic">DIASS Protection</h4>
                            <p className="text-[8px] text-text-faint font-bold uppercase tracking-[0.2em] max-w-[150px]">Assurance VIP & Assistance 24/7 Incluse</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
