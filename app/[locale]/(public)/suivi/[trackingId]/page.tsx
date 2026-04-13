import { TrackingHero, StatusTimeline } from "@/components/baggage/TrackingUI";
import { PackageSearch, Phone, MessageSquare, Info, Scale, FileText, Navigation, UserCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getBaggageData(trackingId: string) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/baggage/track/${trackingId}`, {
        next: { revalidate: 30 }
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Connection failed");
    return res.json();
}

export default async function PublicTrackingPage({ params }: { params: Promise<{ trackingId: string }> }) {
    const { trackingId } = await params;
    const data = await getBaggageData(trackingId);

    if (!data) {
        return (
            <div className="min-h-[80vh] container flex flex-col items-center justify-center p-8 text-center space-y-10">
                <div className="w-32 h-32 bg-surface rounded-[2.5rem] border border-muted-bg/50 flex items-center justify-center -rotate-6">
                    <PackageSearch className="w-12 h-12 text-brand-lime opacity-40" />
                </div>
                <div className="space-y-4 max-w-md">
                    <h1 className="text-4xl font-display font-bold uppercase italic text-text-primary">Bagage <span className="text-brand-lime">Introuvable</span></h1>
                    <p className="text-text-muted text-lg italic">Le numéro de suivi <span className="text-brand-lime font-mono">{trackingId}</span> ne correspond à aucun bagage actif.</p>
                </div>
                <Button asChild className="h-14 bg-brand-lime text-brand-deep font-black uppercase rounded-2xl px-10">
                    <Link href="/">Contacter le support</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-night pb-32">
            <TrackingHero data={data} />

            <div className="container max-w-6xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-12 gap-20 animate-in fade-in slide-in-from-bottom-12 duration-1000 fill-mode-forwards">
                {/* Timeline Column */}
                <div className="lg:col-span-12 xl:col-span-7 bg-surface/30 p-10 md:p-16 rounded-[3rem] border border-muted-bg/50 relative overflow-hidden">
                    <div className="absolute top-10 right-10 opacity-5">
                        <PackageSearch className="w-40 h-40" />
                    </div>
                    <div className="space-y-2 mb-16 relative z-10">
                        <h3 className="text-2xl font-display font-bold uppercase italic text-text-primary">Parcours du <span className="text-brand-lime">Bagage</span></h3>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-text-faint italic">Chronologie des opérations de transit</p>
                    </div>
                    <StatusTimeline history={data.statusHistory} currentStatus={data.status} />
                </div>

                {/* Details Column */}
                <div className="lg:col-span-12 xl:col-span-5 space-y-10">

                    {/* Baggage Info Card */}
                    <div className="bg-surface border border-muted-bg/50 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden space-y-8">
                        <div className="absolute top-0 inset-x-0 h-1 bg-brand-lime opacity-30" />

                        <div className="space-y-1">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-text-primary italic">Caractéristiques</h4>
                            <p className="text-[9px] font-bold text-text-faint uppercase italic">Détails enregistrés au comptoir</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-6 p-4 bg-night/50 rounded-2xl border border-muted-bg/10 group">
                                <div className="w-10 h-10 bg-brand-deep rounded-xl flex items-center justify-center text-brand-lime shrink-0">
                                    <Info className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-bold uppercase text-brand-bright/40">Nombre de bagages</p>
                                    <p className="text-sm font-black text-text-primary uppercase italic">{data.count} Unité(s)</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 p-4 bg-night/50 rounded-2xl border border-muted-bg/10 group">
                                <div className="w-10 h-10 bg-brand-deep rounded-xl flex items-center justify-center text-brand-lime shrink-0">
                                    <Scale className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-bold uppercase text-brand-bright/40">Poids estimé</p>
                                    <p className="text-sm font-black text-text-primary uppercase italic">{data.weightKg ? `${data.weightKg} KG` : "Non spécifié"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 p-4 bg-night/50 rounded-2xl border border-muted-bg/10 group">
                                <div className="w-10 h-10 bg-brand-deep rounded-xl flex items-center justify-center text-brand-lime shrink-0">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-bold uppercase text-brand-bright/40">Description</p>
                                    <p className="text-sm font-black text-text-primary uppercase italic truncate max-w-[200px]">{data.description || "Aucune note"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Logistics Card */}
                    <div className="bg-surface border border-muted-bg/50 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden space-y-8">
                        <div className="space-y-6">
                            <div className="flex items-start gap-6">
                                <div className="w-10 h-10 bg-night rounded-xl flex items-center justify-center text-text-faint shrink-0">
                                    <Navigation className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[9px] font-bold uppercase text-text-faint italic">Lieu de livraison</p>
                                    <p className="text-xs font-bold text-text-muted uppercase italic leading-relaxed">{data.deliveryAddress || "Comptoir AIR DIASS Aéroport"}</p>
                                </div>
                            </div>

                            {data.assignedDriverName && (
                                <div className="pt-8 border-t border-muted-bg/10 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-brand-lime rounded-full flex items-center justify-center text-brand-deep">
                                            <UserCheck className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black uppercase text-brand-lime tracking-widest italic">Livreur Assigné</p>
                                            <p className="text-sm font-bold text-text-primary uppercase italic tracking-tight">{data.assignedDriverName}</p>
                                        </div>
                                    </div>
                                    <Button asChild className="w-full h-14 bg-brand-deep hover:bg-brand-action border border-brand-bright/20 text-brand-lime font-black uppercase tracking-widest text-[10px] rounded-2xl">
                                        <a href={`tel:${data.assignedDriverPhone}`}>
                                            <Phone className="w-4 h-4 mr-3" /> Appeler le livreur
                                        </a>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Support */}
                    <div className="flex items-center gap-4 p-6 bg-brand-action/10 border border-brand-action/20 rounded-3xl group">
                        <MessageSquare className="w-8 h-8 text-brand-bright opacity-40 shrink-0" />
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase text-brand-bright italic">Assistance Directe</p>
                            <p className="text-[9px] font-bold text-text-muted uppercase italic leading-tight">Une question sur votre bagage ?<br />Contactez-nous sur WhatsApp.</p>
                        </div>
                        <Button asChild size="icon" variant="ghost" className="ml-auto text-brand-lime hover:bg-brand-lime/10">
                            <Link href="https://wa.me/221770000000"><ArrowLeft className="w-5 h-5 rotate-180" /></Link>
                        </Button>
                    </div>

                </div>
            </div>
        </div >
    );
}
