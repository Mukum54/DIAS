"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function NotificationBell() {
    const [unreadCount, setUnreadCount] = useState<number>(3);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-destructive">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
                <div className="flex items-center justify-between px-3 py-2 border-b border-border">
                    <span className="text-sm font-semibold">Notifications</span>
                    {unreadCount > 0 && (
                        <span className="text-xs text-primary cursor-pointer hover:underline" onClick={() => setUnreadCount(0)}>
                            Tout lire
                        </span>
                    )}
                </div>
                <div className="py-2">
                    {unreadCount > 0 ? (
                        <>
                            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                                <span className="text-sm font-medium">Réservation confirmée</span>
                                <span className="text-xs text-muted-foreground">Votre transport est validé.</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                                <span className="text-sm font-medium text-amber-500">Vol retardé</span>
                                <span className="text-xs text-muted-foreground">Le vol de M. NDIAYE a 2h de retard.</span>
                            </DropdownMenuItem>
                        </>
                    ) : (
                        <div className="p-4 text-center text-sm text-muted-foreground">
                            Aucune notification
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
