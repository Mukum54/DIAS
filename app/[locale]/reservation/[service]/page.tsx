import { BookingForm } from "@/components/booking/BookingForm";
import { notFound } from "next/navigation";

const VALID_SERVICES = ["vip", "bagages", "hebergement", "transport", "garage", "location", "rental", "parking"];

export default async function ReservationPage({
    params,
    searchParams
}: {
    params: Promise<{ service: string }>;
    searchParams?: any;
}) {
    const { service } = await params;
    const resolvedSearchParams = await searchParams;
    const offeringId = resolvedSearchParams?.offeringId;

    if (!VALID_SERVICES.includes(service)) {
        notFound();
    }

    return (
        <div className="container px-4 md:px-6 py-12 md:py-20 min-h-[calc(100vh-16rem)] flex flex-col items-center">
            <div className="text-center mb-12 w-full max-w-2xl">
                <h1 className="text-3xl md:text-5xl font-display font-bold uppercase mb-4 tracking-wider">
                    Réservation <span className="text-primary">{service}</span>
                </h1>
                <p className="text-muted-foreground text-lg">
                    Finalisez votre demande en complétant ce formulaire sécurisé. Notre équipe prendra le relais immédiatement.
                </p>
            </div>

            <div className="w-full">
                <BookingForm key={service} service={service} offeringId={offeringId} />
            </div>
        </div>
    );
}
