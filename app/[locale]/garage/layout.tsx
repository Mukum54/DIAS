import { Sidebar } from "@/components/layouts/Sidebar";

export default function GarageLayout({ children }: { children: React.ReactNode }) {
    const garageRoutes = [
        { href: "/garage", label: "Tableau de bord (Kanban)", icon: "wrench" },
        { href: "/garage/jobs", label: "File d'attente (Jobs)", icon: "settings-alt" },
        { href: "/garage/stock", label: "Inventaire & Pièces", icon: "package" },
    ];

    return (
        <div className="flex bg-muted/20 min-h-[calc(100vh-4rem)]">
            <Sidebar routes={garageRoutes} title="DIASS AUTO GARAGE" />
            <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-x-hidden w-full max-w-[100vw]">
                {children}
            </main>
        </div>
    );
}
