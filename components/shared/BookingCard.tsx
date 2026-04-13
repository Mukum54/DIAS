"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { MapPin, CalendarDays, Car, Plane } from "lucide-react";
import { StatusBadge, StatusType } from "./StatusBadge";
import { ReferenceNumber } from "./ReferenceNumber";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BookingCardProps {
    id: string;
    reference: string;
    serviceType: "HOTEL" | "TRANSPORT" | "PARKING" | "BAGGAGE" | "RENTAL" | "GARAGE";
    status: StatusType;
    startDate: Date | string;
    location?: string;
    className?: string;
}

export function BookingCard({ id, reference, serviceType, status, startDate, location, className }: BookingCardProps) {
    const serviceIcons = {
        HOTEL: MapPin,
        TRANSPORT: Car,
        PARKING: Car,
        BAGGAGE: Plane,
        RENTAL: Car,
        GARAGE: Car,
    };

    const serviceNames = {
        HOTEL: "Hébergement",
        TRANSPORT: "Transport",
        PARKING: "Parking",
        BAGGAGE: "Bagages",
        RENTAL: "Location",
        GARAGE: "Garage",
    };

    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    const Icon = serviceIcons[serviceType];
    const formattedDate = mounted ? format(new Date(startDate), "d MMMM yyyy 'à' HH:mm", { locale: fr }) : "";

    if (!mounted) return (
        <div className={cn("bg-surface border border-muted-bg/50 rounded-[var(--radius-md)] h-32 animate-pulse", className)} />
    );

    return (
        <Link href={`/espace-client/reservations/${id}`}>
            <Card className={cn("hover:border-primary/50 transition-colors h-full flex flex-col", className)}>
                <CardContent className="p-4 flex flex-col h-full gap-4">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                <Icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-semibold">{serviceNames[serviceType]}</p>
                                <div className="flex items-center text-xs text-muted-foreground mt-0.5">
                                    <CalendarDays className="w-3 h-3 mr-1" />
                                    {formattedDate}
                                </div>
                            </div>
                        </div>
                        <StatusBadge status={status} type="BOOKING" />
                    </div>

                    <div className="mt-auto pt-2 flex items-center justify-between border-t border-border pt-3">
                        <div className="text-xs text-muted-foreground truncate max-w-[120px]">
                            {location && (
                                <span className="flex items-center">
                                    <MapPin className="w-3 h-3 mr-1 shrink-0" />
                                    <span className="truncate">{location}</span>
                                </span>
                            )}
                        </div>
                        <div onClick={(e) => e.preventDefault()}>
                            <ReferenceNumber reference={reference} />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
