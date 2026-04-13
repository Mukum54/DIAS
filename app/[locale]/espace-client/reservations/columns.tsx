"use client"

import { ColumnDef } from "@tanstack/react-table"
import { StatusBadge, StatusType } from "@/components/shared/StatusBadge"
import { ReferenceNumber } from "@/components/shared/ReferenceNumber"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, FileText, X } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export type ReservationType = {
    id: string
    reference: string
    service: string
    status: string
    date: Date
    amount: number
}

export const columns: ColumnDef<ReservationType>[] = [
    {
        accessorKey: "reference",
        header: "Référence",
        cell: ({ row }) => {
            const ref = row.original.reference;
            return <div className="font-mono w-[120px]"><ReferenceNumber reference={ref} /></div>
        },
        enableSorting: false,
        enableGlobalFilter: true,
    },
    {
        accessorKey: "service",
        header: "Service",
        cell: ({ row }) => <div className="font-semibold uppercase tracking-wider text-xs">{row.original.service}</div>
    },
    {
        accessorKey: "date",
        header: "Date de début",
        cell: ({ row }) => {
            const date = row.original.date;
            return <div>{format(date, "dd MMM yyyy, HH:mm", { locale: fr })}</div>
        }
    },
    {
        accessorKey: "amount",
        header: "Tarif",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("fr-SN", {
                style: "currency",
                currency: "XOF",
            }).format(amount)
            return <div className="font-medium">{formatted}</div>
        },
    },
    {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => <StatusBadge status={row.original.status} type="BOOKING" />
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const res = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Ouvrir le menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                            <Link href={`/espace-client/reservations/${res.id}`} className="cursor-pointer">
                                Voir les détails
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                            <FileText className="w-4 h-4 mr-2" />
                            Télécharger Facture
                        </DropdownMenuItem>
                        {res.status === "PENDING" && (
                            <DropdownMenuItem className="text-destructive cursor-pointer">
                                <X className="w-4 h-4 mr-2" />
                                Annuler
                            </DropdownMenuItem>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
