"use client";

import Link from "next/link";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { NotificationBell } from "@/components/shared/NotificationBell";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";
import { LogOut, Menu, User, Briefcase, Car } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
    const { data: session } = useSession();
    const t = useTranslations("Nav");
    const pathname = usePathname();

    if (pathname.includes("/auth/")) return null;

    const navLinks = [
        { href: "/services", label: t('services'), icon: Briefcase },
        { href: "/suivi", label: t('tracking'), icon: Car },
        { href: "/contact", label: "Contact", icon: User },
    ];

    return (
        <header className="sticky top-0 z-[100] w-full border-b border-muted-bg/50 bg-charcoal/90 backdrop-blur-md supports-[backdrop-filter]:bg-charcoal/60">
            <div className="container flex h-18 items-center px-4 md:px-8">
                <div className="mr-8 flex items-center">
                    <Link href="/" className="mr-10 flex items-center space-x-3 group">
                        <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-brand-action text-white flex items-center justify-center font-display font-bold shadow-[0_0_15px_rgba(61,122,24,0.3)] group-hover:scale-105 transition-transform">
                            AI
                        </div>
                        <span className="hidden font-display text-lg font-bold sm:inline-block tracking-[0.2em] uppercase text-text-primary group-hover:text-brand-lime transition-colors">
                            AIR DIASS
                        </span>
                    </Link>

                    <nav className="hidden lg:flex items-center space-x-8 text-sm font-semibold">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "transition-colors hover:text-brand-lime tracking-wide uppercase text-[11px]",
                                    pathname.includes(link.href) ? "text-brand-lime" : "text-text-muted"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="flex flex-1 items-center justify-end space-x-5">
                    <div className="hidden sm:flex items-center space-x-4 pr-2 border-r border-muted-bg/50 mr-2">
                        <LanguageToggle />
                    </div>

                    <nav className="flex items-center space-x-3">
                        {session ? (
                            <>
                                <NotificationBell />
                                <Button variant="outline" asChild className="hidden md:flex h-9 px-5 border-brand-bright/20 bg-brand-deep/20 text-brand-lime hover:bg-brand-deep hover:border-brand-bright">
                                    <Link href={session.user.role === "CLIENT" ? "/espace-client" : `/${session.user.role.toLowerCase()}`}>
                                        Tableau de bord
                                    </Link>
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => signOut()} className="h-9 w-9 text-danger hover:bg-danger/10">
                                    <LogOut className="w-4 h-4" />
                                </Button>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link href="/auth/login" className="hidden sm:block text-xs font-bold uppercase tracking-widest text-text-muted hover:text-text-primary px-4 py-2 transition-colors">
                                    {t('login')}
                                </Link>
                                <Button asChild className="h-9 px-6 font-bold tracking-wide rounded-[var(--radius-md)] bg-brand-action hover:bg-brand-bright text-white shadow-lg shadow-brand-action/10 hover:shadow-brand-action/20">
                                    <Link href="/reservation/vip">Réserver</Link>
                                </Button>
                            </div>
                        )}

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden text-text-primary h-9 w-9">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-[85vw] max-w-[320px] bg-charcoal border-muted-bg p-0 flex flex-col">
                                <div className="p-8 border-b border-muted-bg/50">
                                    <Link href="/" className="flex items-center space-x-3 mb-2">
                                        <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-brand-action text-white flex items-center justify-center font-display font-bold">
                                            AI
                                        </div>
                                        <span className="font-display text-lg font-bold tracking-[0.2em] uppercase text-text-primary">
                                            AIR DIASS
                                        </span>
                                    </Link>
                                </div>

                                <div className="flex flex-col p-6 space-y-2">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={cn(
                                                "flex items-center gap-4 px-4 py-4 rounded-xl font-bold transition-all text-sm tracking-wide uppercase",
                                                pathname.includes(link.href)
                                                    ? "bg-brand-deep text-brand-lime border border-brand-bright/20"
                                                    : "text-text-muted hover:bg-muted-bg/30 hover:text-text-primary"
                                            )}
                                        >
                                            <link.icon className="w-4 h-4" />
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>

                                <div className="mt-auto p-6 border-t border-muted-bg/50 space-y-4">
                                    <div className="flex items-center justify-between mb-4 px-4">
                                        <span className="text-xs text-text-faint font-bold uppercase tracking-widest">Langue</span>
                                        <LanguageToggle />
                                    </div>
                                    {session ? (
                                        <>
                                            <Button variant="outline" asChild className="w-full justify-center h-12 border-brand-bright/20 text-brand-lime">
                                                <Link href={session.user.role === "CLIENT" ? "/espace-client" : `/${session.user.role.toLowerCase()}`}>
                                                    Tableau de bord
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" className="w-full justify-center h-12 text-danger hover:bg-danger/10" onClick={() => signOut()}>
                                                <LogOut className="w-4 h-4 mr-2" /> Déconnexion
                                            </Button>
                                        </>
                                    ) : (
                                        <Button asChild className="w-full h-12 font-bold tracking-wide bg-brand-action text-white">
                                            <Link href="/auth/login">{t('login')}</Link>
                                        </Button>
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </nav>
                </div>
            </div>
        </header>
    );
}
