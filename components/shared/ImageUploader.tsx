"use client";

import { useState, useRef, useEffect } from "react";
import {
    Upload,
    X,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Plus,
    Image as ImageIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ImageUploaderProps {
    folder: string;
    entityId: string;
    existingUrls?: string[];
    maxFiles?: number;
    onUploadComplete: (urls: string[]) => void;
    label?: string;
}

interface FileState {
    id: string;
    file?: File;
    url: string;
    status: 'idle' | 'uploading' | 'success' | 'error';
    isExisting?: boolean;
}

export function ImageUploader({
    folder,
    entityId,
    existingUrls = [],
    maxFiles = 1,
    onUploadComplete,
    label = "Images"
}: ImageUploaderProps) {
    const [files, setFiles] = useState<FileState[]>([]);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Initialize with existing URLs
    useEffect(() => {
        if (existingUrls.length > 0) {
            setFiles(existingUrls.map(url => ({
                id: Math.random().toString(36).substring(7),
                url,
                status: 'success',
                isExisting: true
            })));
        }
    }, [existingUrls]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            addFiles(Array.from(e.target.files));
        }
    };

    const addFiles = (newFiles: File[]) => {
        const remaining = maxFiles - files.length;
        const slice = newFiles.slice(0, remaining);

        const newStates: FileState[] = slice.map(file => ({
            id: Math.random().toString(36).substring(7),
            file,
            url: URL.createObjectURL(file),
            status: 'idle'
        }));

        setFiles(prev => [...prev, ...newStates]);
    };

    const removeFile = (id: string) => {
        setFiles(prev => {
            const filtered = prev.filter(f => f.id !== id);
            const removed = prev.find(f => f.id === id);
            if (removed && !removed.isExisting) {
                URL.revokeObjectURL(removed.url);
            }
            return filtered;
        });
    };

    const handleUpload = async () => {
        const pending = files.filter(f => f.status === 'idle' || f.status === 'error');
        if (pending.length === 0) return;

        // Update status to uploading
        setFiles(prev => prev.map(f =>
            pending.find(p => p.id === f.id) ? { ...f, status: 'uploading' } : f
        ));

        for (const fileState of pending) {
            if (!fileState.file) continue;

            const formData = new FormData();
            formData.append('file', fileState.file);
            formData.append('folder', folder);
            formData.append('entityId', entityId);

            try {
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) throw new Error('Upload failed');

                const data = await response.json();

                setFiles(prev => prev.map(f =>
                    f.id === fileState.id ? { ...f, status: 'success', url: data.url } : f
                ));
            } catch (error) {
                setFiles(prev => prev.map(f =>
                    f.id === fileState.id ? { ...f, status: 'error' } : f
                ));
            }
        }
    };

    // Notify parent on success
    useEffect(() => {
        const successfulUrls = files.filter(f => f.status === 'success').map(f => f.url);
        onUploadComplete(successfulUrls);
    }, [files]);

    return (
        <div className="space-y-4">
            {label && (
                <label className="text-[10px] font-bold uppercase tracking-[.2em] text-text-faint ml-1">
                    {label}
                </label>
            )}

            <div className="flex flex-wrap gap-4">
                {/* Thumbnails */}
                {files.map((file, idx) => (
                    <div
                        key={file.id}
                        className="relative w-24 h-24 rounded-xl border border-muted-bg/50 overflow-hidden group bg-night"
                    >
                        <img
                            src={file.url}
                            alt="Preview"
                            className="w-full h-full object-cover"
                        />

                        {/* Overlays */}
                        {file.status === 'uploading' && (
                            <div className="absolute inset-0 bg-night/60 flex items-center justify-center">
                                <Loader2 className="w-5 h-5 text-brand-lime animate-spin" />
                            </div>
                        )}

                        {file.status === 'success' && (
                            <div className="absolute top-1 right-1">
                                <CheckCircle2 className="w-4 h-4 text-brand-lime fill-night" />
                            </div>
                        )}

                        {file.status === 'error' && (
                            <div className="absolute inset-0 bg-danger/20 flex flex-col items-center justify-center gap-1">
                                <AlertCircle className="w-5 h-5 text-danger" />
                                <button
                                    onClick={(e) => { e.preventDefault(); handleUpload(); }}
                                    className="text-[8px] font-bold uppercase text-white bg-danger/40 px-1 rounded hover:bg-danger"
                                >
                                    Retry
                                </button>
                            </div>
                        )}

                        {/* Badges */}
                        {idx === 0 && (
                            <div className="absolute bottom-1 left-1">
                                <Badge className="bg-brand-lime text-brand-deep text-[7px] font-black px-1 py-0 h-3 uppercase tracking-tighter border-none">
                                    Principal
                                </Badge>
                            </div>
                        )}

                        {/* Remove Button */}
                        <button
                            onClick={(e) => { e.preventDefault(); removeFile(file.id); }}
                            className="absolute top-1 left-1 p-0.5 rounded-full bg-night/40 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-danger"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </div>
                ))}

                {/* Drop Zone / Add Button */}
                {files.length < maxFiles && (
                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            setIsDragging(false);
                            if (e.dataTransfer.files) {
                                addFiles(Array.from(e.dataTransfer.files));
                            }
                        }}
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                            "w-24 h-24 rounded-xl border-2 border-dashed flex flex-col items-center justify-center gap-1 cursor-pointer transition-all",
                            isDragging
                                ? "border-brand-lime bg-brand-lime/10"
                                : "border-muted-bg/50 hover:border-brand-bright/30 hover:bg-surface"
                        )}
                    >
                        <Upload className={cn("w-5 h-5", isDragging ? "text-brand-lime" : "text-text-faint")} />
                        <span className="text-[8px] font-bold text-text-faint uppercase tracking-widest px-1 text-center">
                            {isDragging ? "Drop here" : "Ajouter"}
                        </span>
                        <input
                            type="file"
                            ref={fileInputRef}
                            hidden
                            multiple={maxFiles > 1}
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleFileSelect}
                        />
                    </div>
                )}
            </div>

            {files.some(f => f.status === 'idle' || f.status === 'error') && (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleUpload}
                    className="h-8 border-brand-bright/20 bg-brand-deep/30 text-brand-lime text-[10px] font-black uppercase tracking-widest px-4 hover:bg-brand-deep"
                >
                    <Upload className="w-3 h-3 mr-2" /> Lancer l&apos;envoi
                </Button>
            )}
        </div>
    );
}
