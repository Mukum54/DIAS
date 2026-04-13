"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    CalendarDays,
    Plane,
    Car,
    FileText,
    Users,
    Building2,
    BarChart3,
    FileEdit,
    Settings,
    Briefcase,
    Wrench,
    Settings2,
    PackageSearch,
    ShieldCheck,
    UserCheck,
    MapPin
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
    "dashboard": LayoutDashboard,
    "calendar": CalendarDays,
    "plane": Plane,
    "car": Car,
    "file": FileText,
    "users": Users,
    "building": Building2,
    "chart": BarChart3,
    "edit": FileEdit,
    "settings": Settings,
    "briefcase": Briefcase,
    "wrench": Wrench,
    "settings-alt": Settings2,
    "package": PackageSearch,
    "shield": ShieldCheck,
    "user-check": UserCheck,
    "map-pin": MapPin,
};

const clientRoutes = [
    { href: "/espace-client", label: "Vue d'ensemble", icon: "dashboard" },
    { href: "/espace-client/reservations", label: "Réservations", icon: "calendar" },
    { href: "/espace-client/bagages", label: "Tracking Bagages", icon: "plane" },
    { href: "/espace-client/vehicules", label: "Véhicules", icon: "car" },
    { href: "/espace-client/documents", label: "Documents", icon: "file" },
];

export function Sidebar({ routes = clientRoutes, title = "ESPACE CLIENT" }) {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-border bg-card/30 backdrop-blur-md min-h-[calc(100vh-4rem)] hidden md:block">
            <div className="p-6">
                <h2 className="font-display font-bold text-sm tracking-widest text-muted-foreground uppercase mb-6">{title}</h2>
                <nav className="space-y-1.5">
                    {routes.map((route) => {
                        const isActive = pathname === route.href || pathname.startsWith(`${route.href}/`);
                        const IconComponent = ICON_MAP[route.icon] || LayoutDashboard;

                        return (
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200",
                                    isActive
                                        ? "bg-primary text-primary-foreground font-semibold shadow-md shadow-primary/20"
                                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                                )}
                            >
                                <IconComponent className={cn("w-4 h-4", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                                {route.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </aside>
    );
}
