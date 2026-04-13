"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Globe,
    Share2,
    MessageSquare,
    Phone,
    Mail,
    MapPin,
    ShieldCheck,
    ExternalLink
} from "lucide-react";

export function Footer() {
    const pathname = usePathname();

    if (pathname && pathname.includes("/auth/")) return null;

    return (
        <footer className="w-full bg-night border-t border-muted-bg/50 pt-16 pb-8">
            <div className="container px-4 md:px-8 max-w-screen-2xl">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 mb-16">
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6 lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-3 group w-fit">
                            <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-brand-action text-white flex items-center justify-center font-display font-bold">
                                AI
                            </div>
                            <span className="font-display text-lg font-bold tracking-[0.2em] uppercase text-text-primary group-hover:text-brand-lime transition-colors">
                                AIR DIASS
                            </span>
                        </Link>
                        <p className="text-sm text-text-muted leading-relaxed">
                            L&apos;excellence aéroportuaire et l&apos;expertise automobile réunies.
                            Nous redéfinissons les standards de la conciergerie VIP et du service technique en Afrique de l&apos;Ouest.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="/contact" className="p-2 rounded-lg bg-surface border border-muted-bg/50 text-text-muted hover:text-brand-lime hover:border-brand-bright/30 transition-all">
                                <Globe className="w-4 h-4" />
                            </Link>
                            <Link href="/contact" className="p-2 rounded-lg bg-surface border border-muted-bg/50 text-text-muted hover:text-brand-lime hover:border-brand-bright/30 transition-all">
                                <Share2 className="w-4 h-4" />
                            </Link>
                            <Link href="/contact" className="p-2 rounded-lg bg-surface border border-muted-bg/50 text-text-muted hover:text-brand-lime hover:border-brand-bright/30 transition-all">
                                <MessageSquare className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links - AIR DIASS */}
                    <div className="flex flex-col gap-5">
                        <h4 className="text-label text-brand-lime font-bold">AIR DIASS</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="/services/vip" className="text-sm text-text-muted hover:text-text-primary flex items-center group">
                                Assistance VIP <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <Link href="/services/bagages" className="text-sm text-text-muted hover:text-text-primary flex items-center group">
                                Traitement Bagages <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <Link href="/services/hebergement" className="text-sm text-text-muted hover:text-text-primary flex items-center group">
                                Hébergement Transit <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <Link href="/reservation/parking" className="text-sm text-text-muted hover:text-text-primary flex items-center group">
                                Parking Longue Durée <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </nav>
                    </div>

                    {/* Quick Links - DIASS AUTO */}
                    <div className="flex flex-col gap-5">
                        <h4 className="text-label text-brand-lime font-bold">DIASS AUTO</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="/services/transport" className="text-sm text-text-muted hover:text-text-primary flex items-center group">
                                Transport Privé <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <Link href="/services/garage" className="text-sm text-text-muted hover:text-text-primary flex items-center group">
                                Garage & Assistance <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <Link href="/services/location" className="text-sm text-text-muted hover:text-text-primary flex items-center group">
                                Location de Véhicules <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <Link href="/auth/login" className="text-sm text-brand-bright/60 hover:text-brand-bright flex items-center">
                                Espace Employé
                            </Link>
                        </nav>
                    </div>

                    {/* Contact info */}
                    <div className="flex flex-col gap-5">
                        <h4 className="text-label text-brand-lime font-bold">Contact</h4>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-brand-lime mt-1 shrink-0" />
                                <span className="text-sm text-text-muted leading-relaxed">Aéroport International Blaise Diagne (AIBD), Sénégal</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-brand-lime shrink-0" />
                                <span className="text-sm text-text-muted">+221 33 800 00 00</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-brand-lime shrink-0" />
                                <span className="text-sm text-text-muted">contact@airdiass.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-muted-bg/30 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-2 text-[11px] text-text-faint font-bold uppercase tracking-widest">
                        <ShieldCheck className="w-4 h-4" />
                        <span>RGPD Compliant • Secure Data Handling</span>
                    </div>

                    <p className="text-[11px] text-text-faint font-bold uppercase tracking-[0.2em]">
                        © {new Date().getFullYear()} AIR DIASS GROUP. ALL RIGHTS RESERVED.
                    </p>

                    <div className="flex items-center gap-6">
                        <Link href="/rgpd" className="text-[11px] text-text-faint hover:text-text-muted transition-colors font-bold uppercase tracking-widest">Privacy Policy</Link>
                        <Link href="/terms" className="text-[11px] text-text-faint hover:text-text-muted transition-colors font-bold uppercase tracking-widest">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
