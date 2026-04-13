"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    TableCell,
    TableRow
} from "@/components/ui/table";
import { Mail, MoreHorizontal } from "lucide-react";

interface ClientRowProps {
    client: {
        id: string;
        name: string;
        email: string;
        phone: string;
        status: string;
        reservations: number;
        totalSpent: string;
    };
}

export function ClientRow({ client }: ClientRowProps) {
    return (
        <TableRow className="border-muted-bg/10 hover:bg-brand-deep/10 transition-colors">
            <TableCell className="pl-8 py-6">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-brand-deep flex items-center justify-center text-brand-lime font-bold border border-brand-bright/10">
                        {client.name.charAt(0)}
                    </div>
                    <div>
                        <p className="font-bold text-text-primary uppercase tracking-tight italic">{client.name}</p>
                        <p className="text-[10px] text-text-faint font-mono"><Mail className="w-3 h-3 inline mr-1" /> {client.email}</p>
                    </div>
                </div>
            </TableCell>
            <TableCell>
                <Badge className={`${client.status === 'PLATINUM' ? 'bg-brand-lime/10 text-brand-lime' : 'bg-brand-deep text-text-faint'} border font-bold text-[8px] uppercase tracking-widest px-3`}>
                    {client.status}
                </Badge>
            </TableCell>
            <TableCell className="text-sm font-bold text-text-primary font-mono tabular-nums">{client.reservations}</TableCell>
            <TableCell className="text-sm font-bold text-brand-lime font-mono tabular-nums">{client.totalSpent}</TableCell>
            <TableCell className="text-right pr-8">
                <Button variant="ghost" size="icon" className="text-text-faint hover:text-brand-lime hover:bg-brand-deep rounded-lg">
                    <MoreHorizontal className="w-4 h-4" />
                </Button>
            </TableCell>
        </TableRow>
    );
}
