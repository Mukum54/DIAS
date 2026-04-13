"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload, Shield, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function DocumentsPage() {
    const [downloadingId, setDownloadingId] = useState<string | null>(null);

    const handleDownload = async (docId: string, docName: string) => {
        try {
            setDownloadingId(docId);

            const response = await fetch(`/api/documents/${docId}/download`);
            if (!response.ok) throw new Error("Erreur lors de la génération du PDF");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `AIR-DIASS-${docName.replace(/\s+/g, '-')}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.success("Document téléchargé avec succès");
        } catch (error) {
            console.error(error);
            toast.error("Impossible de télécharger le document");
        } finally {
            setDownloadingId(null);
        }
    };

    const documents = [
        { id: "FACT-2024-89", name: "Facture F-2024-89", type: "Administratif", date: "10/04/2026", size: "240 KB" },
        { id: "CONT-2026-DLR", name: "Contrat de location (Dakar)", type: "Administratif", date: "02/04/2026", size: "1.2 MB" },
    ];

    return (
        <div className="space-y-8 max-w-5xl mx-auto py-4">
            <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b border-muted-bg/50 pb-10">
                <div>
                    <h1 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-[0.1em] text-text-primary">
                        Mes Documents
                    </h1>
                    <p className="text-text-muted mt-3 text-lg">Consultez et téléchargez vos justificatifs, contrats et factures sécurisés.</p>
                </div>
                <Button variant="outline" className="gap-2 h-12 px-6 border-brand-bright/20 bg-brand-deep/10 text-brand-lime hover:bg-brand-deep/30">
                    <Upload className="w-4 h-4" /> Importer un document
                </Button>
            </div>

            <div className="bg-brand-deep/20 rounded-2xl p-6 flex items-start gap-4 border border-brand-bright/20 mb-10 max-w-4xl shadow-[0_0_30px_rgba(var(--primary),0.03)]">
                <div className="w-10 h-10 rounded-full bg-brand-action/20 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-brand-lime" />
                </div>
                <div className="space-y-1">
                    <p className="text-sm font-bold text-brand-lime uppercase tracking-widest">Confidentialité & Sécurité RGPD</p>
                    <p className="text-sm text-text-muted leading-relaxed">
                        Toutes vos pièces sont chiffrées en transit et au repos (AES-256-GCM). L&apos;accès est restreint aux seuls agents habilités durant votre parcours voyageur.
                    </p>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-label text-text-faint font-bold tracking-[0.2em] mb-4 mt-12">Archives Administratives</h3>

                <div className="grid gap-4">
                    {documents.map((doc) => (
                        <Card key={doc.id} className="group border-muted-bg hover:border-brand-bright/30 transition-all duration-standard shadow-sm bg-surface overflow-hidden">
                            <CardContent className="p-0">
                                <div className="p-5 flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-12 h-12 rounded-[var(--radius-md)] bg-brand-deep flex items-center justify-center text-brand-lime group-hover:bg-brand-action group-hover:text-white transition-colors shrink-0">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-text-primary text-base tracking-wide group-hover:text-brand-lime transition-colors">{doc.name}</p>
                                            <p className="text-xs text-text-faint mt-1.5 tabular-nums font-medium uppercase tracking-widest">{doc.date} • {doc.size}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-11 w-11 text-text-muted hover:bg-brand-deep hover:text-brand-lime shrink-0 border border-transparent hover:border-brand-bright/20"
                                        onClick={() => handleDownload(doc.id, doc.name)}
                                        disabled={downloadingId === doc.id}
                                    >
                                        {downloadingId === doc.id ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <Download className="w-5 h-5" />
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
