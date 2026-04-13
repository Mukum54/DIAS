export const dynamic = 'force-dynamic';

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Users, Clock, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

// Map slug to ServiceType and metadata
const SERVICES_META: Record<string, { serviceType: string; title: string; brand: string; tagline: string; fallbackDescription: string; fallbackFeatures: string[] }> = {
    "vip": {
        serviceType: "HOTEL",
        title: "Assistance VIP",
        brand: "AIR DIASS",
        tagline: "Un accueil sur mesure dès la passerelle d'embarquement",
        fallbackDescription: "Une prise en charge totale dès l'avion jusqu'à la sortie de l'aéroport.",
        fallbackFeatures: ["Meet & Greet à la passerelle", "Fast-track douane", "Salon VIP premium", "Porteur dédié"],
    },
    "bagages": {
        serviceType: "BAGGAGE",
        title: "Traitement Bagages",
        brand: "AIR DIASS",
        tagline: "Vos effets personnels, notre responsabilité",
        fallbackDescription: "Nous gérons l'enlèvement, le stockage et la livraison de vos bagages.",
        fallbackFeatures: ["Enlèvement à domicile", "Traçabilité temps réel", "Livraison à domicile"],
    },
    "hebergement": {
        serviceType: "HOTEL",
        title: "Hébergement Transit",
        brand: "AIR DIASS",
        tagline: "Repos premium à proximité de l'aéroport",
        fallbackDescription: "Reposez-vous dans des hôtels partenaires de grand standing pour vos escales.",
        fallbackFeatures: ["Transfert aéroport-hôtel inclus", "Chambres premium insonorisées", "Restauration 24/7"],
    },
    "transport": {
        serviceType: "TRANSPORT",
        title: "Transport Privé",
        brand: "DIASS AUTO",
        tagline: "Flotte de prestige et chauffeurs d'élite",
        fallbackDescription: "Véhicules luxueux avec des chauffeurs formés à la conduite sécurisée.",
        fallbackFeatures: ["Berlines et SUV récents", "Chauffeurs bilingues", "Wi-Fi et confort à bord"],
    },
    "garage": {
        serviceType: "GARAGE",
        title: "Garage & Expertise",
        brand: "DIASS AUTO",
        tagline: "Maintenance et réparations certifiées",
        fallbackDescription: "Notre atelier garantit la réparation et l'entretien de vos véhicules.",
        fallbackFeatures: ["Mécaniciens certifiés", "Pièces d'origine", "Remorquage 24/7"],
    },
    "location": {
        serviceType: "RENTAL",
        title: "Location Périodique",
        brand: "DIASS AUTO",
        tagline: "Votre véhicule, votre liberté",
        fallbackDescription: "Louez un véhicule performant pour une courte ou moyenne durée.",
        fallbackFeatures: ["Large choix de catégories", "Kilométrage flexible", "Assurance tous risques"],
    },
    "parking": {
        serviceType: "PARKING",
        title: "Parking VIP Sécurisé",
        brand: "AIR DIASS",
        tagline: "Stationnement sous haute surveillance",
        fallbackDescription: "Zone sécurisée AIBD avec vidéosurveillance 24/7 et voiturier inclus.",
        fallbackFeatures: ["Vidéosurveillance 24/7", "Navette gratuite", "Nettoyage optionnel", "Espaces XXL"],
    },
    "lavage": {
        serviceType: "WASH",
        title: "Lavage & Esthétique",
        brand: "DIASS AUTO",
        tagline: "Nettoyage professionnel et soin du véhicule",
        fallbackDescription: "Redonnez de l'éclat à votre véhicule avec nos formules de lavage complet.",
        fallbackFeatures: ["Lavage haute pression", "Nettoyage intérieur vapeur", "Polissage carrosserie", "Traitement des cuirs"],
    },
};

// Price unit display
function formatPrice(price: number, unit: string) {
    const formatted = price.toLocaleString("fr-FR");
    switch (unit) {
        case "per_night": return `${formatted} XOF / nuit`;
        case "per_day": return `${formatted} XOF / jour`;
        case "per_trip": return `${formatted} XOF / trajet`;
        case "per_hour": return `${formatted} XOF / heure`;
        default: return `${formatted} XOF`;
    }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const meta = SERVICES_META[slug];

    if (!meta) {
        notFound();
    }

    // Fetch offerings from the database
    let offerings: any[] = [];
    try {
        offerings = await prisma.serviceOffering.findMany({
            where: {
                serviceType: meta.serviceType as any,
                isAvailable: true,
            },
            orderBy: { sortOrder: 'asc' },
        });
    } catch (error) {
        console.error("Error fetching offerings:", error);
        // Will show fallback content if DB is not connected
    }

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 md:py-28 bg-charcoal overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-luminosity" />
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/80 to-charcoal pointer-events-none" />

                <div className="container relative z-10 px-4 md:px-6 max-w-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
                    <div className="text-sm font-bold tracking-widest text-brand-lime uppercase mb-4 opacity-0 animate-in fade-in slide-in-from-left-8 duration-700 delay-300 fill-mode-forwards">
                        {meta.brand}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold font-display mb-6 text-text-primary uppercase tracking-tight italic opacity-0 animate-in fade-in slide-in-from-left-12 duration-1000 delay-500 fill-mode-forwards">
                        {meta.title}
                    </h1>
                    <p className="text-xl text-text-muted leading-relaxed max-w-2xl italic opacity-0 animate-in fade-in duration-1000 delay-700 fill-mode-forwards">
                        {meta.tagline}
                    </p>
                </div>
            </section>

            {/* Offerings Grid */}
            <section className="py-16 md:py-24 bg-surface">
                <div className="container px-4 md:px-6 max-w-6xl">
                    {offerings.length > 0 ? (
                        <>
                            <div className="mb-12 animate-in fade-in slide-in-from-left-8 duration-700 delay-200 fill-mode-forwards">
                                <h2 className="text-2xl md:text-3xl font-bold font-display text-text-primary mb-3 uppercase tracking-tight italic">
                                    Nos <span className="text-brand-lime subrayado">Offres</span>
                                </h2>
                                <p className="text-text-muted text-lg italic">
                                    Choisissez l&apos;offre qui correspond à vos besoins. Tous les prix sont en Francs CFA (XOF).
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-forwards">
                                {offerings.map((offering, idx) => (
                                    <div
                                        key={offering.id}
                                        className="group bg-charcoal border border-muted-bg/50 rounded-3xl overflow-hidden hover:border-brand-lime/30 transition-all duration-500 flex flex-col shadow-xl"
                                    >
                                        {/* Image */}
                                        {offering.imageUrl ? (
                                            <div className="h-52 overflow-hidden">
                                                <img
                                                    src={offering.imageUrl}
                                                    alt={offering.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                />
                                            </div>
                                        ) : (
                                            <div className="h-36 bg-brand-deep/50 flex items-center justify-center">
                                                <Star className="w-10 h-10 text-brand-lime/30" />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="text-lg font-bold text-text-primary uppercase tracking-tight italic group-hover:text-brand-lime transition-colors mb-2">
                                                {offering.name}
                                            </h3>
                                            <p className="text-text-muted text-sm mb-4 flex-1">
                                                {offering.description}
                                            </p>

                                            {/* Capacity & Duration */}
                                            <div className="flex gap-4 mb-4">
                                                {offering.capacity && (
                                                    <div className="flex items-center gap-1.5 text-xs text-text-faint">
                                                        <Users className="w-3.5 h-3.5 text-brand-lime" />
                                                        <span>{offering.capacity} pers.</span>
                                                    </div>
                                                )}
                                                {offering.duration && (
                                                    <div className="flex items-center gap-1.5 text-xs text-text-faint">
                                                        <Clock className="w-3.5 h-3.5 text-brand-lime" />
                                                        <span>{offering.duration}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Features */}
                                            {Array.isArray(offering.features) && offering.features.length > 0 && (
                                                <ul className="space-y-1.5 mb-6">
                                                    {(offering.features as string[]).slice(0, 4).map((f: string, i: number) => (
                                                        <li key={i} className="flex items-center text-xs text-text-muted">
                                                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-lime mr-2 shrink-0" />
                                                            {f}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {/* Price & CTA */}
                                            <div className="pt-4 border-t border-muted-bg/30 flex items-center justify-between">
                                                <div>
                                                    <span className="text-2xl font-display font-bold text-brand-lime">
                                                        {offering.price.toLocaleString("fr-FR")}
                                                    </span>
                                                    <span className="text-xs text-text-faint ml-1 font-bold uppercase">
                                                        {formatPrice(0, offering.priceUnit).replace("0 ", "")}
                                                    </span>
                                                </div>
                                                <Button size="sm" className="bg-brand-action hover:bg-brand-bright text-white rounded-xl font-bold text-xs shadow-lg" asChild>
                                                    <Link href={`/reservation/${slug}?offeringId=${offering.id}`}>
                                                        Réserver <ArrowRight className="ml-1.5 w-3.5 h-3.5" />
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        /* Fallback Content When No Offerings in DB */
                        <>
                            <div className="mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold font-display text-text-primary mb-3 uppercase tracking-tight">
                                    À propos de ce <span className="text-brand-lime">service</span>
                                </h2>
                                <p className="text-text-muted text-lg leading-relaxed max-w-3xl">
                                    {meta.fallbackDescription}
                                </p>
                            </div>

                            <div className="bg-charcoal border border-muted-bg/50 p-8 rounded-2xl mb-12 shadow-xl">
                                <h3 className="text-xl font-bold mb-6 font-display text-text-primary uppercase tracking-tight">Ce qui est <span className="text-brand-lime">inclus</span></h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {meta.fallbackFeatures.map((feature, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <CheckCircle2 className="w-5 h-5 text-brand-lime mr-3 shrink-0 mt-0.5" />
                                            <span className="text-text-muted">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}

                    {/* CTA Section */}
                    <div className="flex flex-col sm:flex-row items-center justify-between bg-brand-deep/30 p-8 rounded-2xl border border-brand-bright/20">
                        <div>
                            <h3 className="text-2xl font-display font-bold mb-2 text-text-primary">Prêt à voyager autrement ?</h3>
                            <p className="text-text-muted mb-6 md:mb-0">
                                Réservez ce service en quelques clics ou contactez l&apos;un de nos conseillers.
                            </p>
                        </div>
                        <Button size="lg" className="shrink-0 shadow-lg shadow-brand-action/20 hover:scale-105 transition-transform bg-brand-action hover:bg-brand-bright text-white font-bold" asChild>
                            <Link href={`/reservation/${slug}`}>
                                Réserver maintenant <ArrowRight className="ml-2 w-4 h-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
