"use client";

import { useState } from "react";
import { QrCode, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import dynamic from "next/dynamic";

// Dynamically import QRCodeSVG to avoid SSR issues
const QRCodeSVG = dynamic(() => import("qrcode.react").then(m => m.QRCodeSVG), {
    ssr: false,
    loading: () => (
        <div className="w-48 h-48 bg-muted animate-pulse rounded-lg flex items-center justify-center">
            <QrCode className="w-8 h-8 text-muted-foreground/30" />
        </div>
    ),
});

interface ReferenceNumberProps {
    reference: string;
    showCopy?: boolean;
    showQR?: boolean;
    size?: "sm" | "md" | "lg";
}

export function ReferenceNumber({
    reference,
    showCopy = true,
    showQR = true,
    size = "md",
}: ReferenceNumberProps) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(reference);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const textSize = size === "lg" ? "text-xl" : size === "sm" ? "text-xs" : "text-sm";

    return (
        <div className="flex items-center gap-2 bg-muted/40 px-3 py-2 rounded-[var(--radius-md)] border border-border">
            <span className={`font-mono ${textSize} font-bold select-all tracking-widest text-primary`}>
                {reference}
            </span>

            <div className="h-4 w-px bg-border mx-1" />

            {showCopy && (
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 hover:bg-primary/10 hover:text-primary"
                    onClick={copyToClipboard}
                    title="Copier la référence"
                >
                    {copied
                        ? <Check className="w-4 h-4 text-brand-lime" />
                        : <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                    }
                </Button>
            )}

            {showQR && (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 hover:bg-primary/10 hover:text-primary"
                            title="Afficher le QR Code"
                        >
                            <QrCode className="w-3.5 h-3.5 text-muted-foreground" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-sm bg-card border-border">
                        <DialogHeader>
                            <DialogTitle className="font-display tracking-wide text-center">
                                Code QR
                            </DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col items-center justify-center gap-6 py-4">
                            {/* White background required for QR scanability */}
                            <div className="bg-white p-5 rounded-[var(--radius-md)] border-2 border-brand-bright">
                                <QRCodeSVG
                                    value={`${process.env.NEXT_PUBLIC_APP_URL || 'https://airdiass.com'}/suivi/${reference}`}
                                    size={192}
                                    level="M"
                                    includeMargin={false}
                                    fgColor="#141f14"
                                    bgColor="#ffffff"
                                />
                            </div>
                            <div className="text-center space-y-1">
                                <p className="font-mono text-base font-bold tracking-widest text-primary">
                                    {reference}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Présentez ce code à l&apos;agent lors de votre arrivée.
                                </p>
                            </div>
                            <Button
                                onClick={copyToClipboard}
                                variant="outline"
                                size="sm"
                                className="gap-2 border-brand-bright text-brand-lime hover:bg-brand-deep"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copié !" : "Copier la référence"}
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}

export default ReferenceNumber;
