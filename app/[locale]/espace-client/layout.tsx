import { Sidebar } from "@/components/layouts/Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex bg-muted/20 min-h-[calc(100vh-4rem)]">
            <Sidebar />
            <main className="flex-1 p-6 md:p-10 lg:p-14 overflow-hidden w-full max-w-[100vw]">
                {children}
            </main>
        </div>
    );
}
