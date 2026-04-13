import { Sidebar } from "@/components/layouts/Sidebar";
import { LayoutDashboard, Users, CalendarDays, Building2, BarChart3, FileEdit, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const adminRoutes = [
        { href: "/admin", label: "Vue d'ensemble", icon: "dashboard" },
        { href: "/admin/clients", label: "CRM Clients", icon: "users" },
        { href: "/admin/reservations", label: "Réservations", icon: "calendar" },
        { href: "/admin/entreprises", label: "Comptes B2B", icon: "building" },
        { href: "/admin/rapports", label: "Rapports (BI)", icon: "chart" },
        { href: "/admin/contenu", label: "CMS Contenu", icon: "edit" },
        { href: "/admin/parametres", label: "Paramètres & RGPD", icon: "settings" },
    ];

    return (
        <div className="flex bg-muted/20 min-h-[calc(100vh-4rem)]">
            <Sidebar routes={adminRoutes} title="ADMINISTRATION GÉNÉRALE" />
            <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-x-hidden w-full max-w-[100vw]">
                {children}
            </main>
        </div>
    );
}
