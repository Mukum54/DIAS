import { cn } from "@/lib/utils";
import {
    BAGGAGE_STATUS_COLORS,
    BOOKING_STATUS_COLORS,
    JOB_STATUS_COLORS
} from "@/lib/status-colors";
import { Package, Truck, MapPin, CheckCircle2, AlertTriangle, Clock, Ban, Hammer, Receipt } from "lucide-react";

export type StatusType = "BAGGAGE" | "BOOKING" | "JOB";

interface StatusBadgeProps {
    status: string;
    type: StatusType;
    className?: string;
    showIcon?: boolean;
}

const ICON_MAP: Record<string, any> = {
    PRIS_EN_CHARGE: Package,
    EN_TRANSIT: Truck,
    EN_LIVRAISON: MapPin,
    LIVRE: CheckCircle2,
    INCIDENT: AlertTriangle,
    PENDING: Clock,
    CONFIRMED: CheckCircle2,
    IN_PROGRESS: Truck,
    COMPLETED: CheckCircle2,
    CANCELLED: Ban,
    WAITING: Clock,
    DONE: CheckCircle2,
    BILLED: Receipt
};

export function StatusBadge({ status, type, className, showIcon = true }: StatusBadgeProps) {
    let colors: any;

    if (type === "BAGGAGE") colors = (BAGGAGE_STATUS_COLORS as any)[status];
    else if (type === "BOOKING") colors = (BOOKING_STATUS_COLORS as any)[status];
    else if (type === "JOB") colors = (JOB_STATUS_COLORS as any)[status];

    if (!colors) return <span className={cn("text-[9px] font-bold uppercase", className)}>{status}</span>;

    const Icon = ICON_MAP[status];

    return (
        <div
            className={cn(
                "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-black uppercase italic tracking-widest transition-all",
                className
            )}
            style={{
                backgroundColor: colors.bg,
                color: colors.text,
                borderColor: colors.border
            }}
        >
            {showIcon && Icon && <Icon className="w-3.5 h-3.5" />}
            {colors.labelFR}
        </div>
    );
}
