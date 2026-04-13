"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    ChevronLeft,
    ChevronRight,
    Car,
    Maximize2
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface VehicleGalleryProps {
    photos: string[];
    vehicleName: string;
}

export function VehicleGallery({ photos, vehicleName }: VehicleGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    const nextPhoto = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % photos.length);
    }, [photos.length]);

    const prevPhoto = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
    }, [photos.length]);

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isLightboxOpen) return;
            if (e.key === "Escape") setIsLightboxOpen(false);
            if (e.key === "ArrowRight") nextPhoto();
            if (e.key === "ArrowLeft") prevPhoto();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isLightboxOpen, nextPhoto, prevPhoto]);

    if (!photos || photos.length === 0) {
        return (
            <div className="w-full aspect-video rounded-3xl bg-surface border border-muted-bg/50 flex flex-col items-center justify-center gap-4 text-text-faint">
                <Car className="w-16 h-16 opacity-20" />
                <p className="text-sm font-bold uppercase tracking-[0.2em]">Aucune photo disponible</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Primary View */}
            <div className="relative aspect-video rounded-3xl overflow-hidden border border-muted-bg/50 bg-night group cursor-zoom-in shadow-2xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        className="relative w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsLightboxOpen(true)}
                    >
                        <Image
                            src={photos[activeIndex]!}
                            alt={`${vehicleName} - View ${activeIndex + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1200px) 100vw, 800px"
                            priority={activeIndex === 0}
                        />
                    </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8 pointer-events-none">
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.4em] flex items-center gap-2">
                        <Maximize2 className="w-4 h-4 text-brand-lime" /> Agrandir l&apos;image
                    </span>
                </div>
            </div>

            {/* Thumbnails */}
            {photos.length > 1 && (
                <div className="flex flex-wrap gap-4 pt-2">
                    {photos.slice(0, 5).map((photo, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            className={cn(
                                "relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all",
                                activeIndex === idx
                                    ? "border-brand-lime scale-105 shadow-lg shadow-brand-lime/10"
                                    : "border-muted-bg/50 hover:border-brand-bright/30 grayscale hover:grayscale-0 opacity-60 hover:opacity-100"
                            )}
                        >
                            <Image
                                src={photo}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="96px"
                            />
                        </button>
                    ))}
                    {photos.length > 5 && (
                        <div className="w-24 h-16 rounded-xl bg-surface border border-muted-bg/50 flex items-center justify-center text-[10px] font-bold text-text-faint uppercase">
                            +{photos.length - 5}
                        </div>
                    )}
                </div>
            )}

            {/* Lightbox */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] bg-night/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
                    >
                        <button
                            onClick={() => setIsLightboxOpen(false)}
                            className="absolute top-8 right-8 text-white hover:text-brand-lime transition-colors"
                        >
                            <X className="w-8 h-8" />
                        </button>

                        <div className="relative w-full max-w-6xl aspect-video">
                            <motion.div
                                key={activeIndex}
                                className="relative w-full h-full"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                            >
                                <Image
                                    src={photos[activeIndex]!}
                                    alt={vehicleName}
                                    fill
                                    className="object-contain select-none"
                                    sizes="100vw"
                                />
                            </motion.div>

                            <div className="absolute inset-y-0 -left-16 hidden md:flex items-center">
                                <button onClick={prevPhoto} className="p-4 text-white/40 hover:text-brand-lime transition-all">
                                    <ChevronLeft className="w-12 h-12" />
                                </button>
                            </div>
                            <div className="absolute inset-y-0 -right-16 hidden md:flex items-center">
                                <button onClick={nextPhoto} className="p-4 text-white/40 hover:text-brand-lime transition-all">
                                    <ChevronRight className="w-12 h-12" />
                                </button>
                            </div>

                            <div className="absolute bottom-0 inset-x-0 text-center pb-4">
                                <span className="text-[10px] font-black text-brand-lime uppercase tracking-[0.4em]">
                                    {activeIndex + 1} / {photos.length} • {vehicleName}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
