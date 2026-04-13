import { Sidebar } from "@/components/layouts/Sidebar";

export default function AgentLayout({ children }: { children: React.ReactNode }) {
    const agentRoutes = [
        { href: "/agent", label: "Desk Principal", icon: "shield" },
        { href: "/agent/enregistrement", label: "Enregistrement", icon: "user-check" },
        { href: "/agent/bagages", label: "Opérations Bagages", icon: "plane" },
        { href: "/agent/transport", label: "Dispatch Transport", icon: "car" },
        { href: "/agent/parking", label: "Parkings", icon: "map-pin" },
    ];

    return (
        <div className="flex bg-muted/20 min-h-[calc(100vh-4rem)]">
            <Sidebar routes={agentRoutes} title="PORTAIL AGENT" />
            <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-hidden w-full max-w-[100vw]">
                {children}
            </main>
        </div>
    );
}
