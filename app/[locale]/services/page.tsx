import { ServiceCard } from "@/components/shared/ServiceCard";
import { PlaneTakeoff, Car, MapPin, Briefcase } from "lucide-react";

export default function ServicesIndexPage() {
    return (
        <div className="container px-4 md:px-6 py-16 md:py-24">
            <div className="flex flex-col items-center text-center space-y-4 mb-16">
                <h1 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-widest">
                    Notre <span className="text-primary">Catalogue</span>
                </h1>
                <p className="text-muted-foreground max-w-2xl text-lg">
                    Découvrez l&apos;ensemble des services premium proposés par AIR DIASS et DIASS AUTO.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ServiceCard
                    title="Assistance VIP"
                    description="Accueil personnalisé à la passerelle, passage rapide des contrôles et salon privatif."
                    icon={Briefcase}
                    href="/services/vip"
                    brand="AIR DIASS"
                />
                <ServiceCard
                    title="Traitement Bagages"
                    description="Confiez-nous vos bagages depuis l'enregistrement jusqu'à la livraison à domicile."
                    icon={PlaneTakeoff}
                    href="/services/bagages"
                    brand="AIR DIASS"
                />
                <ServiceCard
                    title="Hébergement Transit"
                    description="Des chambres élégantes à proximité immédiate de l'aéroport pour vos correspondances."
                    icon={MapPin}
                    href="/services/hebergement"
                    brand="AIR DIASS"
                />
                <ServiceCard
                    title="Transport Privé"
                    description="Chauffeurs courtois et flotte de véhicules haut de gamme pour tous vos transferts."
                    icon={Car}
                    href="/services/transport"
                    brand="DIASS AUTO"
                />
                <ServiceCard
                    title="Garage & Dépannage"
                    description="Intervention rapide, remorquage sécurisé et réparations certifiées 24h/24."
                    icon={Car}
                    href="/services/garage"
                    brand="DIASS AUTO"
                />
                <ServiceCard
                    title="Location Périodique"
                    description="Véhicules de courtoisie et location courte durée adaptés à vos exigences."
                    icon={Car}
                    href="/services/location"
                    brand="DIASS AUTO"
                />
                <ServiceCard
                    title="Parking VIP Sécurisé"
                    description="Zone de stationnement surveillée à proximité immédiate de l'AIBD avec service de navette."
                    icon={MapPin}
                    href="/services/parking"
                    brand="AIR DIASS"
                />
                <ServiceCard
                    title="Lavage & Esthétique"
                    description="Redonnez de l'éclat à votre véhicule avec nos formules de lavage complet et soin intérieur."
                    icon={Car}
                    href="/services/lavage"
                    brand="DIASS AUTO"
                />
            </div>
        </div>
    );
}
