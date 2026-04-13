import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";

interface StockRow {
    ref: string;
    name: string;
    category: string;
    quantity: number;
    price: string;
}

export default function GarageStockPage() {
    const columns = [
        { accessorKey: "ref", header: "Référence", cell: ({ row }: { row: { original: StockRow } }) => <div className="font-mono text-xs tracking-widest font-bold">{row.original.ref}</div> },
        { accessorKey: "name", header: "Désignation", cell: ({ row }: { row: { original: StockRow } }) => <div className="font-bold text-foreground">{row.original.name}</div> },
        { accessorKey: "category", header: "Catégorie", cell: ({ row }: { row: { original: StockRow } }) => <div className="text-muted-foreground uppercase text-xs tracking-wider font-semibold">{row.original.category}</div> },
        {
            accessorKey: "quantity", header: "En Stock", cell: ({ row }: { row: { original: StockRow } }) => (
                <div className="flex items-center gap-3">
                    <span className="font-bold text-lg tabular-nums">{row.original.quantity}</span>
                    {row.original.quantity < 5 && <Badge variant="destructive" className="px-2 py-0 text-[10px] font-bold uppercase tracking-widest shadow-sm">Faible</Badge>}
                </div>
            )
        },
        { accessorKey: "price", header: "Prix Unitaire (XOF)", cell: ({ row }: { row: { original: StockRow } }) => <div className="font-semibold text-right tabular-nums">{row.original.price} FCFA</div> }
    ];

    const data: StockRow[] = [
        { ref: "PF-001", name: "Plaquettes de frein Avant (SUV)", category: "Freinage", quantity: 12, price: "45 000" },
        { ref: "F-H02", name: "Filtre à Huile Premium", category: "Entretien", quantity: 45, price: "12 000" },
        { ref: "BATT-90", name: "Batterie 90Ah VARTA", category: "Électrique", quantity: 3, price: "85 000" },
        { ref: "PNEU-18", name: "Pneu Michelin 225/55 R18", category: "Liaison au sol", quantity: 8, price: "110 000" }
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="border-b border-border/50 pb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 shadow-sm mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold uppercase tracking-widest text-primary">Inventaire & Pièces</h1>
                    <p className="text-muted-foreground mt-2 text-lg">Gestion du stock de pièces détachées Diass Auto en temps réel.</p>
                </div>
                <Button size="lg" className="shadow-lg shadow-primary/20">+ Nouvelle Pièce</Button>
            </div>

            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
                <DataTable columns={columns as ColumnDef<StockRow, unknown>[]} data={data} searchKey="name" searchPlaceholder="Rechercher une pièce par désignation ou Réf..." />
            </div>
        </div>
    );
}
