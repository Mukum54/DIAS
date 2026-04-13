"use client";

import Image from "next/image";
import Link from "next/link";
import { Fuel, Settings, Users, ArrowRight, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// Unused import removed

interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    mileage: number;
    type: string;
    category?: string;
    pricePerDay?: number;
    salePrice?: number;
    isAvailable: boolean;
    photos?: any;
    specs?: any;
}

interface VehicleCardProps {
    vehicle: Vehicle;
    mode: 'rental' | 'sale';
}

export function VehicleCard({ vehicle, mode }: VehicleCardProps) {
    // Unused import removed
    const photos = vehicle.photos as string[] || [];
    const primaryPhoto = photos[0];
    const specs = vehicle.specs as any || {};

    const formattedMileage = new Intl.NumberFormat().format(vehicle.mileage) + " km";
    const formattedPrice = new Intl.NumberFormat('fr-FR').format(
        mode === 'rental' ? vehicle.pricePerDay || 0 : vehicle.salePrice || 0
    );

    return (
        <Card className="group overflow-hidden bg-surface border-muted-bg/50 hover:border-brand-bright/20 transition-all duration-300 hover:-translate-y-1 shadow-xl">
            {/* Top: Photo Area */}
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-night">
                {primaryPhoto ? (
                    <Image
                        src={primaryPhoto}
                        alt={`${vehicle.make} ${vehicle.model}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-text-faint/20">
                        <Users className="w-16 h-16 mb-2" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">No Photo</span>
                    </div>
                )}

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                    {mode === 'rental' ? (
                        <Badge className={cn(
                            "font-bold text-[8px] uppercase tracking-widest px-2 py-0.5 border-none",
                            vehicle.isAvailable ? "bg-brand-action text-white" : "bg-danger text-white"
                        )}>
                            {vehicle.isAvailable ? "Disponible" : "Indisponible"}
                        </Badge>
                    ) : (
                        <Badge className={cn(
                            "font-bold text-[8px] uppercase tracking-widest px-2 py-0.5 border-none",
                            vehicle.isAvailable ? "bg-brand-lime text-brand-deep" : "bg-text-faint text-white"
                        )}>
                            {vehicle.isAvailable ? "En vente" : "Vendu"}
                        </Badge>
                    )}
                </div>

                {/* Category Pill */}
                {vehicle.category && (
                    <div className="absolute top-3 left-3 z-20">
                        <div className="bg-brand-deep/80 backdrop-blur-xl text-brand-lime px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border border-brand-lime/20 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-lime animate-pulse" />
                            {vehicle.category}
                        </div>
                    </div>
                )}

                {/* Central Icon Overlay (for "image behind" vibe) */}
                {!primaryPhoto && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <Car className="w-32 h-32 text-brand-lime" />
                    </div>
                )}
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
                <div className="space-y-1">
                    <h3 className="text-lg font-display font-bold text-text-primary uppercase tracking-tight truncate italic">
                        {vehicle.make} <span className="text-brand-lime">{vehicle.model}</span>
                    </h3>
                    <p className="text-[11px] text-text-muted font-bold tracking-widest flex items-center gap-2">
                        {vehicle.year} <span className="text-text-faint/30">•</span> {formattedMileage}
                    </p>
                </div>

                {/* Key Specs Row */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-muted-bg/10">
                    <div className="flex flex-col items-center gap-1">
                        <Fuel className="w-3.5 h-3.5 text-brand-lime opacity-60" />
                        <span className="text-[9px] font-bold text-text-muted uppercase truncate w-full text-center">{specs.fuel || "N/A"}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 border-x border-muted-bg/10">
                        <Settings className="w-3.5 h-3.5 text-brand-lime opacity-60" />
                        <span className="text-[9px] font-bold text-text-muted uppercase truncate w-full text-center">{specs.transmission || "Auto"}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-brand-lime opacity-60" />
                        <span className="text-[9px] font-bold text-text-muted uppercase truncate w-full text-center">{specs.seats || "5"} places</span>
                    </div>
                </div>

                {/* Price Row */}
                <div className="flex items-baseline gap-1 pt-1">
                    <span className="text-xl font-display font-bold text-brand-lime">{formattedPrice} FCFA</span>
                    {mode === 'rental' && <span className="text-[10px] text-text-faint font-bold uppercase">/ jour</span>}
                </div>

                {/* CTA Button */}
                <Button
                    asChild
                    className={cn(
                        "w-full h-11 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all group/btn shadow-lg",
                        mode === 'sale'
                            ? "bg-brand-lime text-brand-deep hover:bg-brand-bright"
                            : "bg-brand-action text-white hover:bg-brand-bright"
                    )}
                >
                    <Link href={`/diass-auto/${vehicle.id}`}>
                        {mode === 'rental'
                            ? (vehicle.isAvailable ? "Voir & Réserver" : "Voir les détails")
                            : "Voir & Contacter"}
                        <ArrowRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </div>
        </Card>
    );
}

// Internal wrapper to avoid Card import issue if shadcn not globally available
function Card({ children, className }: { children: React.ReactNode, className?: string }) {
    return <div className={cn("rounded-2xl border", className)}>{children}</div>;
}
