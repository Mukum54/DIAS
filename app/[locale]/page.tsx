"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { TimelineTracker } from "@/components/shared/TimelineTracker";
import { CountUp } from "@/components/shared/CountUp";
import {
    ArrowRight,
    Plane,
    Car,
    Luggage,
    Hotel,
    ParkingSquare,
    Wrench,
    Droplets,
    ShoppingCart,
    Shield,
    Users,
    Clock,
    Star,
    MapPin
} from "lucide-react";
import Link from "next/link";
// import { useTranslations } from "next-intl";

export default function LandingPage() {
    // const t = useTranslations("Index");

    const stats = [
        { icon: Shield, label: "Sécurité 24h/24", value: 100, suffix: "%" },
        { icon: Users, label: "Clients par mois", value: 500, suffix: "+" },
        { icon: Clock, label: "Prise en charge", value: 15, suffix: "min" },
        { icon: Star, label: "Service certifié", value: 4.9, suffix: "/5" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const orbitIcons = [
        { Icon: Plane, delay: 0 },
        { Icon: Car, delay: -2.5 },
        { Icon: Luggage, delay: -5 },
        { Icon: Hotel, delay: -7.5 },
        { Icon: ParkingSquare, delay: -10 },
        { Icon: Wrench, delay: -12.5 },
        { Icon: Droplets, delay: -15 },
        { Icon: ShoppingCart, delay: -17.5 },
    ];

    return (
        <div className="flex flex-col min-h-screen selection:bg-brand-lime/30">
            {/* 1. HERO SECTION */}
            <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-charcoal">
                {/* Runway Grid Background */}
                <div className="absolute inset-0 bg-runway-grid opacity-[0.03] pointer-events-none" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/50 to-charcoal pointer-events-none" />

                {/* Orbiting Icons Container (Desktop Only) */}
                <div className="absolute inset-0 items-center justify-center hidden lg:flex pointer-events-none opacity-20">
                    <div className="relative w-[600px] h-[600px]">
                        {orbitIcons.map(({ Icon, delay }, i) => (
                            <div
                                key={i}
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-orbit"
                                style={{ animationDelay: `${delay}s` }}
                            >
                                <div className="p-4 rounded-full bg-brand-deep border border-brand-bright/20 text-brand-lime shadow-[0_0_15px_rgba(168,216,120,0.1)]">
                                    <Icon className="w-6 h-6" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="container relative z-10 px-4 md:px-6">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto"
                    >
                        <motion.div variants={itemVariants} className="inline-flex items-center gap-3 rounded-full border border-brand-bright/20 bg-brand-deep/50 px-4 py-1.5 backdrop-blur-md">
                            <span className="text-label text-brand-lime tracking-[0.2em]">AIR DIASS × DIASS AUTO</span>
                        </motion.div>

                        <motion.h1 variants={itemVariants} className="text-display sm:text-6xl md:text-7xl lg:text-8xl text-text-primary">
                            Votre voyage. Votre véhicule.<br />
                            <span className="text-brand-lime">Notre expertise.</span>
                        </motion.h1>

                        <motion.p variants={itemVariants} className="max-w-[32rem] text-lg md:text-xl text-text-muted leading-relaxed">
                            L&apos;excellence opérationnelle au service de votre mobilité.
                            Conciergerie aéroportuaire VIP et expertise automobile de pointe.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto pt-4">
                            <Button size="lg" className="h-14 px-10 rounded-[var(--radius-md)] bg-brand-action hover:bg-brand-bright text-white font-bold text-base shadow-xl shadow-brand-action/20 transition-all hover:scale-105" asChild>
                                <Link href="/services">
                                    Réserver un service <ArrowRight className="ml-3 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-14 px-10 rounded-[var(--radius-md)] border-brand-bright/30 bg-brand-deep/30 backdrop-blur text-brand-lime hover:bg-brand-deep/60 hover:border-brand-bright font-bold text-base transition-all" asChild>
                                <Link href="/suivi">
                                    <MapPin className="mr-3 h-5 w-5" /> Suivre mes bagages
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] text-text-faint uppercase tracking-widest">Découvrir</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-brand-lime to-transparent" />
                </motion.div>
            </section>

            {/* 2. TRUST BAR */}
            <section className="w-full bg-surface border-y border-muted-bg/50 py-10 md:py-14">
                <div className="container px-4 md:px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-2">
                                <div className="flex items-center gap-3 mb-1">
                                    <stat.icon className="w-5 h-5 text-brand-lime" />
                                    <CountUp
                                        end={stat.value}
                                        suffix={stat.suffix}
                                        className="text-3xl font-bold font-display text-text-primary"
                                    />
                                </div>
                                <p className="text-xs text-text-muted font-semibold uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. SERVICES BENTO GRID */}
            <section className="w-full py-24 md:py-32 bg-charcoal relative">
                <div className="container px-4 md:px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-bold font-display text-text-primary mb-6">
                                Écosystème de Services <span className="text-brand-lime">Intégrés</span>
                            </h2>
                            <p className="text-text-muted text-lg leading-relaxed">
                                De l&apos;atterrissage à l&apos;entretien de votre véhicule, nous orchestrons chaque détail
                                pour une expérience sans friction.
                            </p>
                        </div>
                        <Button variant="ghost" className="text-brand-lime hover:bg-brand-deep/50 gap-2 font-bold" asChild>
                            <Link href="/services">Voir tout le catalogue <ArrowRight className="w-4 h-4" /></Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-2">
                            <ServiceCard
                                title="Hébergement & Transit"
                                description="Repos immédiat dans nos lounges ou hôtels partenaires avec transfert prioritaire inclus."
                                icon={Hotel}
                                href="/services/hebergement"
                                brand="AIR DIASS"
                                featured
                            />
                        </div>
                        <ServiceCard
                            title="Bagages Express"
                            description="Enregistrement, portage et livraison de vos effets personnels en toute sécurité."
                            icon={Luggage}
                            href="/services/bagages"
                            brand="AIR DIASS"
                        />
                        <ServiceCard
                            title="Transport Privé"
                            description="Chauffeurs chevronnés et berlines de prestige pour vos déplacements urbains."
                            icon={Car}
                            href="/services/transport"
                            brand="DIASS AUTO"
                        />
                        <div className="lg:col-span-2">
                            <ServiceCard
                                title="Garage & Expertise"
                                description="Maintenance préventive et réparations high-tech pendant votre absence."
                                icon={Wrench}
                                href="/services/garage"
                                brand="DIASS AUTO"
                                featured
                            />
                        </div>
                        <ServiceCard
                            title="Parking Longue Durée"
                            description="Stationnement sécurisé sous surveillance 24/7 avec rapport de condition."
                            icon={ParkingSquare}
                            href="/services/parking"
                            brand="AIR DIASS"
                        />
                        <ServiceCard
                            title="Location & Vente"
                            description="Large choix de véhicules et opportunités d&apos;acquisition certifiées."
                            icon={ShoppingCart}
                            href="/services/location"
                            brand="DIASS AUTO"
                        />
                    </div>
                </div>
            </section>

            {/* 4. HOW IT WORKS */}
            <section className="w-full py-24 md:py-32 bg-surface border-y border-muted-bg/50">
                <div className="container px-4 md:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-3xl md:text-5xl font-bold font-display text-text-primary mb-6">La promesse AIR DIASS</h2>
                        <p className="text-text-muted text-lg">Trois étapes simples pour une tranquillité absolue.</p>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        <TimelineTracker
                            steps={[
                                {
                                    status: "completed",
                                    title: "Réservation Digitale",
                                    description: "Configurez vos services sur notre interface sécurisée en moins de 2 minutes."
                                },
                                {
                                    status: "current",
                                    title: "Prise en Charge",
                                    description: "Présentez votre QR code à nos agents dès votre arrivée pour une activation immédiate."
                                },
                                {
                                    status: "upcoming",
                                    title: "Suivi & Livraison",
                                    description: "Suivez l&apos;état de vos bagages ou de votre véhicule en temps réel via votre tableau de bord."
                                }
                            ]}
                            direction="horizontal"
                            className="hidden md:flex"
                        />
                        {/* Mobile view fallback */}
                        <div className="md:hidden">
                            <TimelineTracker
                                steps={[
                                    { status: "completed", title: "Réservation Digitale", description: "Configurez vos services sur notre interface sécurisée." },
                                    { status: "current", title: "Prise en Charge", description: "Présentez votre QR code à nos agents." },
                                    { status: "upcoming", title: "Suivi & Livraison", description: "Suivez l&apos;état en temps réel." }
                                ]}
                                direction="vertical"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
