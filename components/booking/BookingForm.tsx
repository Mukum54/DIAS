"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, ChevronLeft, Check, Loader2, PackageSearch, ExternalLink, MapPin } from "lucide-react";
import confetti from "canvas-confetti";
import { ReferenceNumber } from "@/components/shared/ReferenceNumber";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BookingFormProps {
    service: string;
    offeringId?: string;
}

export function BookingForm({ service, offeringId }: BookingFormProps) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [reference, setReference] = useState("");
    const [mounted, setMounted] = useState(false);

    // Form data state
    const [formData, setFormData] = useState({
        clientName: "",
        clientEmail: "",
        clientPhone: "",
        startDate: "",
        startTime: "",
        flightNumber: "",
        notes: "",
        // Baggage specific fields
        baggageCount: "1",
        baggageWeight: "",
        baggageDescription: "",
        pickupAddress: "",
        deliveryAddress: "",
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const totalSteps = 3;

    const nextStep = () => {
        if (step === 1 && (!formData.clientName || !formData.clientEmail || !formData.clientPhone)) {
            toast.error("Veuillez remplir tous les champs obligatoires");
            return;
        }
        if (step === 2 && !formData.startDate) {
            toast.error("Veuillez sélectionner une date");
            return;
        }
        if (step < totalSteps) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const res = await fetch("/api/reservations", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    service,
                    clientName: formData.clientName,
                    clientEmail: formData.clientEmail,
                    clientPhone: formData.clientPhone,
                    startDate: `${formData.startDate}T${formData.startTime || "00:00"}`,
                    notes: formData.notes,
                    offeringId,
                    // Pass baggage fields
                    baggageCount: formData.baggageCount,
                    baggageWeight: formData.baggageWeight,
                    baggageDescription: formData.baggageDescription,
                    pickupAddress: formData.pickupAddress,
                    deliveryAddress: formData.deliveryAddress,
                }),
            });

            const result = await res.json();

            if (res.ok) {
                setReference(result.referenceNumber);
                setIsSuccess(true);
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ["#a8d878", "#c8d888", "#7ac0d8"]
                });
                toast.success("Réservation confirmée !");
            } else {
                toast.error(result.error || "Erreur lors de la réservation");
            }
        } catch {
            toast.error("Impossible de joindre le serveur");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!mounted) return null;

    if (isSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center p-12 bg-surface border border-brand-bright/10 rounded-3xl text-center shadow-2xl max-w-2xl mx-auto overflow-hidden relative"
            >
                <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-action" />

                <div className="w-24 h-24 bg-brand-lime/10 text-brand-lime rounded-full flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 rounded-full animate-pulse-ring bg-brand-lime/20" />
                    <Check className="w-12 h-12 relative z-10" />
                </div>

                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-text-primary uppercase tracking-wider">Réservation Confirmée</h2>
                <p className="text-text-muted mb-10 text-lg leading-relaxed max-w-md">
                    Votre demande pour le service <span className="text-brand-lime font-bold">{service}</span> est enregistrée. Présentez ce code à nos agents lors de votre arrivée.
                </p>

                <div className="mb-12 w-full max-w-xs group transition-transform hover:scale-105">
                    <ReferenceNumber reference={reference} />
                </div>

                {service === "bagages" && (
                    <div className="mb-10 w-full max-w-md bg-brand-lime/10 border border-brand-lime/20 p-6 rounded-2xl space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
                        <div className="flex items-center justify-center gap-3 text-brand-lime">
                            <PackageSearch className="w-5 h-5" />
                            <p className="text-[10px] font-black uppercase tracking-[0.2em]">Suivi en temps réel activé</p>
                        </div>
                        <p className="text-[11px] text-text-muted italic leading-relaxed">
                            Vous pouvez désormais suivre le transit de vos bagages en utilisant votre numéro de référence.
                        </p>
                        <Button asChild className="w-full h-11 bg-brand-lime hover:bg-brand-bright text-brand-deep font-black uppercase tracking-widest text-[9px] rounded-xl transition-all">
                            <Link href={`/suivi/${reference}`}>
                                Suivre mon bagage <ExternalLink className="w-3.5 h-3.5 ml-2" />
                            </Link>
                        </Button>
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                    <Button asChild size="lg" className="h-12 px-8 rounded-[var(--radius-md)] bg-brand-action hover:bg-brand-bright text-white font-bold">
                        <Link href="/espace-client/reservations">Mes réservations</Link>
                    </Button>
                    <Button variant="outline" asChild size="lg" className="h-12 px-8 rounded-[var(--radius-md)] border-brand-bright/20 bg-brand-deep/30 text-brand-lime">
                        <Link href="/">Retour à l&apos;accueil</Link>
                    </Button>
                </div>
            </motion.div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto bg-surface border border-muted-bg/50 rounded-3xl overflow-hidden shadow-2xl relative">
            {/* Progress Bar */}
            <div className="w-full bg-muted-bg/30 h-1.5 flex gap-1 px-1 pt-1">
                {[1, 2, 3].map((s) => (
                    <div
                        key={s}
                        className={cn(
                            "h-1 flex-1 rounded-full transition-all duration-500",
                            s <= step ? "bg-brand-action shadow-[0_0_8px_rgba(var(--primary),0.3)]" : "bg-muted-bg/50"
                        )}
                    />
                ))}
            </div>

            <div className="p-8 md:p-12">
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-lime bg-brand-deep px-2 py-0.5 rounded">Processus</span>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-muted-bg/50 to-transparent" />
                    </div>
                    <h2 className="text-3xl font-bold font-display text-text-primary uppercase tracking-tight">Configuration <span className="text-brand-lime">Aéroportuaire</span></h2>
                    <p className="text-text-muted mt-2 text-sm">Étape {step} sur {totalSteps} • Veuillez confirmer vos paramètres de voyage.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="relative min-h-[320px]">
                        {step === 1 && (
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Nom complet *</label>
                                    <Input
                                        value={formData.clientName}
                                        onChange={e => setFormData(p => ({ ...p, clientName: e.target.value }))}
                                        placeholder="Jean Dupont"
                                        required
                                        className="bg-background/50 h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email *</label>
                                    <Input
                                        type="email"
                                        value={formData.clientEmail}
                                        onChange={e => setFormData(p => ({ ...p, clientEmail: e.target.value }))}
                                        placeholder="jean@example.com"
                                        required
                                        className="bg-background/50 h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Téléphone *</label>
                                    <Input
                                        type="tel"
                                        value={formData.clientPhone}
                                        onChange={e => setFormData(p => ({ ...p, clientPhone: e.target.value }))}
                                        placeholder="+221 77 000 00 00"
                                        required
                                        className="bg-background/50 h-12"
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Date souhaitée *</label>
                                    <Input
                                        type="date"
                                        value={formData.startDate}
                                        onChange={e => setFormData(p => ({ ...p, startDate: e.target.value }))}
                                        required
                                        className="bg-background/50 h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Heure</label>
                                    <Input
                                        type="time"
                                        value={formData.startTime}
                                        onChange={e => setFormData(p => ({ ...p, startTime: e.target.value }))}
                                        className="bg-background/50 h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Numéro de vol (optionnel)</label>
                                    <Input
                                        value={formData.flightNumber}
                                        onChange={e => setFormData(p => ({ ...p, flightNumber: e.target.value }))}
                                        placeholder="Ex: HC 301"
                                        className="bg-background/50 h-12"
                                    />
                                </div>
                                {service === "bagages" && (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Nombre de bagages *</label>
                                                <Input
                                                    type="number"
                                                    min="1"
                                                    value={formData.baggageCount}
                                                    onChange={e => setFormData(p => ({ ...p, baggageCount: e.target.value }))}
                                                    required
                                                    className="bg-background/50 h-12"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Poids total (kg)</label>
                                                <Input
                                                    type="number"
                                                    placeholder="Ex: 23"
                                                    value={formData.baggageWeight}
                                                    onChange={e => setFormData(p => ({ ...p, baggageWeight: e.target.value }))}
                                                    className="bg-background/50 h-12"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Adresse d&apos;enlèvement</label>
                                            <Input
                                                value={formData.pickupAddress}
                                                onChange={e => setFormData(p => ({ ...p, pickupAddress: e.target.value }))}
                                                placeholder="Lieu de récupération"
                                                className="bg-background/50 h-12"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Adresse de livraison</label>
                                            <Input
                                                value={formData.deliveryAddress}
                                                onChange={e => setFormData(p => ({ ...p, deliveryAddress: e.target.value }))}
                                                placeholder="Destination finale"
                                                className="bg-background/50 h-12"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-5">
                                <div className="p-6 bg-brand-deep/20 rounded-2xl border border-brand-bright/10 backdrop-blur-sm">
                                    <h3 className="font-bold text-brand-lime text-xs uppercase tracking-widest mb-4">Récapitulatif de la commande</h3>
                                    <ul className="space-y-3 text-sm text-muted-foreground">
                                        <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                            <span>Service:</span>
                                            <span className="font-bold text-primary uppercase tracking-wider">{service}</span>
                                        </li>
                                        <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                            <span>Client:</span>
                                            <span className="font-bold text-foreground">{formData.clientName}</span>
                                        </li>
                                        <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                            <span>Date:</span>
                                            <span className="font-bold text-foreground">{formData.startDate} {formData.startTime && `à ${formData.startTime}`}</span>
                                        </li>
                                        <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                            <span>Contact:</span>
                                            <span className="font-bold text-foreground">{formData.clientEmail}</span>
                                        </li>
                                        {service === "bagages" && (
                                            <>
                                                <li className="flex justify-between items-center border-b border-border/50 pb-2">
                                                    <span>Bagages:</span>
                                                    <span className="font-bold text-brand-lime">{formData.baggageCount} unité(s) {formData.baggageWeight && `(${formData.baggageWeight} KG)`}</span>
                                                </li>
                                                <li className="flex justify-between items-start border-b border-border/50 pb-2">
                                                    <span className="mt-1">Trajet:</span>
                                                    <div className="text-right">
                                                        <p className="font-bold text-foreground text-xs">{formData.pickupAddress || "Aéroport"}</p>
                                                        <p className="text-[10px] text-muted-foreground">Vers</p>
                                                        <p className="font-bold text-foreground text-xs">{formData.deliveryAddress || "Destination"}</p>
                                                    </div>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">
                                        {service === "bagages" ? "Contenu et description des bagages" : "Demandes particulières"}
                                    </label>
                                    <textarea
                                        value={formData.notes}
                                        onChange={e => setFormData(p => ({ ...p, notes: e.target.value }))}
                                        className="flex min-h-[100px] w-full rounded-xl border border-input bg-background/50 px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder={service === "bagages" ? "Décrivez le contenu de vos bagages (ex: vêtements, fragile...)" : "Avez-vous des informations complémentaires à nous transmettre ?"}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between mt-12 pt-8 border-t border-muted-bg/50 relative z-10 bg-surface">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={prevStep}
                            disabled={step === 1 || isSubmitting}
                            className="h-12 px-6 border-brand-bright/10 text-text-muted hover:text-text-primary hover:bg-muted-bg/30"
                        >
                            <ChevronLeft className="w-4 h-4 mr-2" /> Retour
                        </Button>

                        {step < totalSteps ? (
                            <Button type="button" onClick={nextStep} className="h-12 px-8 bg-brand-action hover:bg-brand-bright text-white font-bold transition-all hover:scale-105 active:scale-95">
                                Continuer <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button type="submit" disabled={isSubmitting} className="h-12 px-8 bg-brand-action hover:bg-brand-bright text-white font-bold transition-all hover:scale-105 active:scale-95 shadow-xl shadow-brand-action/20">
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Traitement...
                                    </>
                                ) : (
                                    <>
                                        Confirmer la réservation
                                        <Check className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}
