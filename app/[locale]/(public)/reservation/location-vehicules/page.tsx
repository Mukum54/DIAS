"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    CheckCircle2,
    XCircle,
    AlertTriangle,
    ChevronRight,
    ChevronLeft,
    Check,
    Loader2,
    Calendar,
    Users,
    ShieldCheck,
    Navigation,
    UserPlus,
    Car,
    CreditCard,
    Info,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ReferenceNumber } from "@/components/shared/ReferenceNumber";
import Link from "next/link";
import Image from "next/image";

export default function RentalBookingPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Step state
    const [step, setStep] = useState(searchParams.get("vehicleId") ? 1 : 0);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [refNum, setRefNum] = useState("");

    // Rental Data
    const [vehicleId, setVehicleId] = useState(searchParams.get("vehicleId") || "");
    const [vehicle, setVehicle] = useState<any>(null);
    const [startDate, setStartDate] = useState(searchParams.get("start") || "");
    const [endDate, setEndDate] = useState(searchParams.get("end") || "");

    // Driver Info
    const [driver, setDriver] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        licenseNum: "",
        licenseCountry: "Sénégal",
        phone: "",
        email: ""
    });

    // Options
    const [options, setOptions] = useState({
        insurance: false,
        gps: false,
        additionalDriver: false
    });

    const [catalogVehicles, setCatalogVehicles] = useState<any[]>([]);
    const [isCatalogLoading, setIsCatalogLoading] = useState(false);

    // Load catalog
    useEffect(() => {
        if (step === 0 && catalogVehicles.length === 0) {
            setIsCatalogLoading(true);
            fetch("/api/vehicles?type=RENTAL")
                .then(res => res.json())
                .then(data => {
                    setCatalogVehicles(data);
                    setIsCatalogLoading(false);
                })
                .catch(() => setIsCatalogLoading(false));
        }
    }, [step, catalogVehicles.length]);

    // Load vehicle if ID is present
    useEffect(() => {
        if (vehicleId) {
            fetch(`/api/vehicles/${vehicleId}`)
                .then(res => res.json())
                .then(data => setVehicle(data));
        }
    }, [vehicleId]);

    const duration = useMemo(() => {
        if (!startDate || !endDate) return 0;
        const d1 = new Date(startDate);
        const d2 = new Date(endDate);
        const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    }, [startDate, endDate]);

    const priceDetails = useMemo(() => {
        if (!vehicle) return { subtotal: 0, optionsTotal: 0, total: 0 };
        const subtotal = duration * (vehicle.pricePerDay || 0);
        let optionsTotal = 0;
        if (options.insurance) optionsTotal += 5000 * duration;
        if (options.gps) optionsTotal += 2500 * duration;
        if (options.additionalDriver) optionsTotal += 10000;

        return {
            subtotal,
            optionsTotal,
            total: subtotal + optionsTotal + (vehicle.specs?.caution || 0)
        };
    }, [vehicle, duration, options]);

    const validateAge = () => {
        if (!driver.dob) return true;
        const birth = new Date(driver.dob);
        const age = new Date().getFullYear() - birth.getFullYear();
        return age >= 23;
    };

    const handleConfirm = async () => {
        setIsLoading(true);
        // Simulate API call to /api/reservations
        setTimeout(() => {
            setRefNum("LOC-" + Math.random().toString(36).substring(2, 8).toUpperCase());
            setIsSuccess(true);
            setIsLoading(false);
        }, 1500);
    };

    if (isSuccess) {
        return (
            <div className="container py-24 flex flex-col items-center justify-center text-center space-y-12">
                <div className="w-24 h-24 bg-brand-lime/10 rounded-full flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-brand-lime/20 rounded-full animate-pulse" />
                    <CheckCircle2 className="w-12 h-12 text-brand-lime relative z-10" />
                </div>
                <div className="space-y-4">
                    <h1 className="text-4xl font-display font-bold uppercase tracking-tight italic">Réservation Confirmée !</h1>
                    <p className="text-text-muted text-lg italic max-w-md mx-auto">
                        Votre demande pour le {vehicle?.make} {vehicle?.model} est enregistrée.
                        Un email de confirmation vous a été envoyé.
                    </p>
                </div>
                <div className="w-full max-w-xs transition-transform hover:scale-105">
                    <ReferenceNumber reference={refNum} />
                </div>
                <Button asChild className="h-14 bg-brand-action text-white px-10 rounded-2xl font-bold uppercase tracking-widest text-xs">
                    <Link href="/">Retour à l&apos;accueil</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container px-4 md:px-8 max-w-7xl mx-auto py-12 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">

            {/* Form Side */}
            <div className="lg:col-span-8 space-y-12">

                {/* Stepper Header */}
                <div className="flex items-center gap-4 mb-2">
                    {[0, 1, 2, 3, 4].map((s) => (
                        <div key={s} className="flex items-center gap-4 flex-1">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs transition-all",
                                step === s ? "bg-brand-action text-white shadow-xl scale-110" :
                                    step > s ? "bg-brand-lime text-brand-deep" : "bg-muted-bg/30 text-text-faint"
                            )}>
                                {step > s ? <Check className="w-5 h-5" /> : s}
                            </div>
                            {s < 4 && <div className="h-[2px] flex-1 bg-muted-bg/20 rounded-full" />}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="bg-surface border border-muted-bg/50 rounded-[3rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-action/40" />

                    {/* Step 0: Vehicle Picker */}
                    {step === 0 && (
                        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-display font-bold uppercase italic">Choisissez votre <span className="text-brand-lime">Véhicule</span></h2>
                                <p className="text-text-muted italic">Parcourez notre catalogue et sélectionnez votre modèle.</p>
                            </div>

                            {isCatalogLoading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-10">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="h-64 bg-night/50 rounded-3xl animate-pulse" />
                                    ))}
                                </div>
                            ) : catalogVehicles.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {catalogVehicles.map((v) => (
                                        <div
                                            key={v.id}
                                            onClick={() => { setVehicleId(v.id); setVehicle(v); setStep(1); }}
                                            className={cn(
                                                "group relative bg-night/50 border border-muted-bg/30 rounded-3xl overflow-hidden cursor-pointer transition-all hover:border-brand-lime/50 hover:shadow-2xl hover:shadow-brand-lime/5"
                                            )}
                                        >
                                            <div className="relative h-48 w-full overflow-hidden">
                                                <Image
                                                    src={v.photos?.[0] || "/placeholder-car.jpg"}
                                                    alt={v.model}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute top-4 left-4">
                                                    <Badge className="bg-brand-deep/80 backdrop-blur-md text-brand-lime border-brand-lime/20 text-[8px] uppercase tracking-widest px-3 py-1">
                                                        {v.category}
                                                    </Badge>
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent opacity-60" />
                                            </div>
                                            <div className="p-6 space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-1">
                                                        <h3 className="text-lg font-display font-bold uppercase italic group-hover:text-brand-lime transition-colors">{v.make} {v.model}</h3>
                                                        <p className="text-[10px] font-bold text-text-faint uppercase tracking-widest">{v.year} · {v.specs?.fuel} · {v.specs?.trans}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-display font-bold text-brand-lime italic">{new Intl.NumberFormat().format(v.pricePerDay)} <span className="text-[10px] uppercase">F</span></p>
                                                        <p className="text-[8px] font-bold text-text-faint uppercase tracking-tighter">/ Jour</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-4 text-[9px] font-bold text-text-muted uppercase italic">
                                                    <div className="flex items-center gap-1.5">
                                                        <Users className="w-3.5 h-3.5" /> {v.specs?.seats} Places
                                                    </div>
                                                    <div className="flex items-center gap-1.5 ml-auto text-brand-lime opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                                                        Réserver <ChevronRight className="w-4 h-4" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center py-20 text-text-faint/30">
                                    <Car className="w-20 h-20 mb-4 opacity-50" />
                                    <p className="text-xs font-bold uppercase tracking-widest mb-8 text-center px-10 italic">Aucun véhicule disponible pour le moment. Veuillez contacter notre service client.</p>
                                    <Button asChild variant="outline" className="border-muted-bg/50 text-text-muted rounded-2xl h-14 px-10 uppercase tracking-widest text-[10px] font-black">
                                        <Link href="/services">Voir nos services</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 1: Dates */}
                    {step === 1 && (
                        <div className="space-y-10">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-display font-bold uppercase italic">Paramètres de <span className="text-brand-lime">Voyage</span></h2>
                                <p className="text-text-muted italic">Définissez vos dates de prise en charge et de retour.</p>
                            </div>

                            {vehicle && (
                                <div className="flex items-center gap-6 p-6 bg-brand-deep/30 border border-brand-bright/10 rounded-2xl border-l-4 border-l-brand-lime">
                                    <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 border border-muted-bg/20">
                                        <Image
                                            src={vehicle.photos?.[0] || "/placeholder-car.jpg"}
                                            alt=""
                                            fill
                                            className="object-cover"
                                            sizes="96px"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-brand-lime uppercase tracking-widest italic">Véhicule Sélectionné</p>
                                        <h3 className="text-xl font-display font-bold uppercase italic">{vehicle.make} {vehicle.model}</h3>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-faint ml-2">Date de départ</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-lime" />
                                        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="bg-night h-14 pl-12 rounded-2xl border-muted-bg/50" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-bold uppercase tracking-widest text-text-faint ml-2">Date de retour</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-lime" />
                                        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="bg-night h-14 pl-12 rounded-2xl border-muted-bg/50" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Driver */}
                    {step === 2 && (
                        <div className="space-y-10">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-display font-bold uppercase italic">Identité <span className="text-brand-lime">Conducteur</span></h2>
                                <p className="text-text-muted italic">Informations légales et permis de conduire.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Input placeholder="Prénom" value={driver.firstName} onChange={e => setDriver({ ...driver, firstName: e.target.value })} className="h-14 bg-night rounded-2xl border-muted-bg/50" />
                                <Input placeholder="Nom" value={driver.lastName} onChange={e => setDriver({ ...driver, lastName: e.target.value })} className="h-14 bg-night rounded-2xl border-muted-bg/50" />
                                <div className="space-y-2">
                                    <label className="text-[9px] font-bold text-text-faint uppercase ml-2">Date de naissance (Min. 23 ans)</label>
                                    <Input type="date" value={driver.dob} onChange={e => setDriver({ ...driver, dob: e.target.value })} className={cn("h-14 bg-night rounded-2xl border-muted-bg/50", !validateAge() && "border-danger text-danger")} />
                                    {!validateAge() && <p className="text-[10px] text-danger font-bold uppercase ml-2 flex items-center gap-1"><XCircle className="w-3 h-3" /> Âge minimum requis : 23 ans</p>}
                                </div>
                                <Input placeholder="N° Permis de conduire" value={driver.licenseNum} onChange={e => setDriver({ ...driver, licenseNum: e.target.value })} className="h-14 bg-night rounded-2xl border-muted-bg/50 mt-auto" />
                                <Input placeholder="Téléphone" value={driver.phone} onChange={e => setDriver({ ...driver, phone: e.target.value })} className="h-14 bg-night rounded-2xl border-muted-bg/50" />
                                <Input placeholder="Email" value={driver.email} onChange={e => setDriver({ ...driver, email: e.target.value })} className="h-14 bg-night rounded-2xl border-muted-bg/50" />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Options */}
                    {step === 3 && (
                        <div className="space-y-10">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-display font-bold uppercase italic">Options de <span className="text-brand-lime">Sécurité</span></h2>
                                <p className="text-text-muted italic">Personnalisez votre expérience et roulez en toute sérénité.</p>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { id: 'insurance', icon: ShieldCheck, title: "Assurance Tous Risques", desc: "Rayures, bris de glace et vol inclus (Zéro franchise).", price: "+ 5 000 FCFA / jour" },
                                    { id: 'gps', icon: Navigation, title: "GPS Premium", desc: "Système de navigation dernière génération inclus.", price: "+ 2 500 FCFA / jour" },
                                    { id: 'additionalDriver', icon: UserPlus, title: "Conducteur Supplémentaire", desc: "Assurance étendue pour une deuxième personne.", price: "+ 10 000 FCFA total" },
                                ].map((opt) => (
                                    <div
                                        key={opt.id}
                                        onClick={() => setOptions(prev => ({ ...prev, [opt.id]: !prev[opt.id as keyof typeof options] }))}
                                        className={cn(
                                            "flex items-center gap-6 p-6 rounded-3xl border-2 transition-all cursor-pointer group",
                                            options[opt.id as keyof typeof options]
                                                ? "border-brand-lime bg-brand-lime/10 shadow-lg shadow-brand-lime/5"
                                                : "border-muted-bg/50 hover:border-brand-bright/30 bg-night/30"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                                            options[opt.id as keyof typeof options] ? "bg-brand-lime text-brand-deep" : "bg-muted-bg/20 text-text-faint"
                                        )}>
                                            <opt.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1 space-y-1">
                                            <h4 className="text-sm font-bold uppercase tracking-tight text-text-primary">{opt.title}</h4>
                                            <p className="text-xs text-text-muted italic leading-snug">{opt.desc}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs font-black text-brand-lime italic">{opt.price}</p>
                                            <div className={cn(
                                                "w-6 h-6 rounded-md border-2 flex items-center justify-center mt-2 transition-all ml-auto",
                                                options[opt.id as keyof typeof options] ? "bg-brand-lime border-brand-lime text-brand-deep" : "border-muted-bg/50"
                                            )}>
                                                {options[opt.id as keyof typeof options] && <Check className="w-4 h-4 stroke-[3]" />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: Summary */}
                    {step === 4 && (
                        <div className="space-y-10">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-display font-bold uppercase italic">Résumé <span className="text-brand-lime">Final</span></h2>
                                <p className="text-text-muted italic">Vérifiez vos informations avant de confirmer.</p>
                            </div>

                            <div className="p-8 bg-brand-deep/30 border border-brand-bright/10 rounded-[2.5rem] space-y-8 relative overflow-hidden">
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="relative w-40 h-24 rounded-2xl overflow-hidden shadow-2xl shrink-0">
                                        <Image src={vehicle?.photos?.[0] || ""} alt="" fill className="object-cover" />
                                    </div>
                                    <div className="text-center md:text-left space-y-2">
                                        <h3 className="text-2xl font-display font-bold uppercase italic">{vehicle?.make} {vehicle?.model}</h3>
                                        <p className="text-[10px] font-bold text-text-faint uppercase tracking-[0.3em] italic">Catégorie {vehicle?.category}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-muted-bg/10">
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold uppercase text-text-faint">Période</p>
                                        <p className="text-xs font-bold text-brand-lime italic">{duration} Jours</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[9px] font-bold uppercase text-text-faint">Conducteur</p>
                                        <p className="text-xs font-bold text-text-primary italic">{driver.firstName} {driver.lastName}</p>
                                    </div>
                                    {options.insurance && (
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-bold uppercase text-text-faint">Assurance</p>
                                            <p className="text-xs font-bold text-brand-lime italic">Premium Incluse</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-[10px] font-bold text-text-faint uppercase tracking-widest leading-relaxed">
                                <input type="checkbox" className="w-5 h-5 accent-brand-lime rounded bg-night border-muted-bg/50" required />
                                <p>J&apos;accepte les <Link href="#" className="text-brand-lime underline">conditions générales de location</Link> de DIASS AUTO et certifie que les informations fournies sont exactes.</p>
                            </div>
                        </div>
                    )}

                    {/* Footer Nav */}
                    <div className="flex justify-between items-center mt-12 pt-8 border-t border-muted-bg/10 relative z-10">
                        <Button
                            variant="ghost"
                            onClick={() => setStep(prev => prev - 1)}
                            disabled={step === 0 || isLoading}
                            className="flex items-center gap-2 text-text-faint hover:text-text-primary uppercase tracking-widest text-[10px] font-black"
                        >
                            <ChevronLeft className="w-4 h-4" /> Retour
                        </Button>

                        {step < 4 ? (
                            <Button
                                onClick={() => setStep(prev => prev + 1)}
                                disabled={step === 1 && duration <= 0}
                                className="h-14 px-10 bg-brand-action hover:bg-brand-bright text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-brand-action/20"
                            >
                                Continuer <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        ) : (
                            <Button
                                onClick={handleConfirm}
                                disabled={isLoading}
                                className="h-14 px-10 bg-brand-lime hover:bg-brand-bright text-brand-deep rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl shadow-brand-lime/20"
                            >
                                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirmer la réservation"}
                                <Check className="w-4 h-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Sidebar: Live Price Table */}
            <div className="lg:col-span-4 space-y-8">
                <div className="bg-night border border-muted-bg/50 rounded-[2.5rem] p-8 space-y-8 sticky top-24 shadow-2xl">
                    <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-brand-lime" />
                        <h4 className="text-xs font-black uppercase tracking-[0.3em] text-text-primary italic">Détail du <span className="text-brand-lime">Tarif</span></h4>
                    </div>

                    <div className="space-y-6">
                        <div className="flex justify-between items-center group">
                            <div className="space-y-1">
                                <p className="text-[11px] font-bold text-text-primary uppercase italic">Location Véhicule</p>
                                <p className="text-[9px] text-text-faint font-bold uppercase tracking-widest">{duration} jours × {new Intl.NumberFormat().format(vehicle?.pricePerDay || 0)} FCFA</p>
                            </div>
                            <span className="text-sm font-bold text-text-primary font-mono">{new Intl.NumberFormat().format(priceDetails.subtotal)}</span>
                        </div>

                        {priceDetails.optionsTotal > 0 && (
                            <div className="flex justify-between items-center text-brand-bright/80 italic">
                                <span className="text-[11px] font-bold uppercase tracking-widest italic">Suppléments & Options</span>
                                <span className="text-sm font-bold font-mono">+{new Intl.NumberFormat().format(priceDetails.optionsTotal)}</span>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-6 border-t border-muted-bg/10">
                            <div className="space-y-1">
                                <p className="text-[11px] font-bold text-text-faint uppercase italic">Caution (Remboursable)</p>
                                <p className="text-[9px] text-text-faint font-bold uppercase tracking-widest italic flex items-center gap-2"><Info className="w-3 h-3" /> Bloquée sur carte</p>
                            </div>
                            <span className="text-sm font-bold text-text-primary font-mono">{new Intl.NumberFormat().format(vehicle?.specs?.caution || 250000)}</span>
                        </div>

                        <div className="bg-brand-lime/10 border border-brand-lime/20 p-6 rounded-2xl space-y-1">
                            <p className="text-[10px] font-black text-brand-lime uppercase tracking-widest italic">Total Estimé</p>
                            <p className="text-3xl font-display font-bold text-brand-lime italic">{new Intl.NumberFormat().format(priceDetails.total)} <span className="text-xs font-bold uppercase tracking-tighter">FCFA</span></p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 p-4 bg-surface rounded-xl border border-muted-bg/50">
                            <ShieldCheck className="w-8 h-8 text-brand-lime opacity-30" />
                            <div className="space-y-1">
                                <p className="text-[9px] font-black uppercase tracking-widest text-text-primary italic">Paiement Sécurisé</p>
                                <p className="text-[8px] text-text-faint font-bold uppercase italic leading-tight">Aucun prélèvement avant confirmation agent.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
