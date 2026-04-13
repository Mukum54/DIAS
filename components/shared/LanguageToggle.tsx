"use client";

import { Button } from "@/components/ui/button";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Languages } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function LanguageToggle() {
    const [isPending, startTransition] = useTransition();
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        startTransition(() => {
            // Removing current locale from start and replacing with new
            const withoutLocale = pathname.replace(`/${locale}`, "");
            const newPath = `/${newLocale}${withoutLocale === "" ? "" : withoutLocale}`;
            router.replace(newPath);
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" disabled={isPending} className="rounded-full">
                    <Languages className="h-5 w-5" />
                    <span className="sr-only">Toggle language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => switchLocale("fr")} className={locale === "fr" ? "bg-muted font-bold" : ""}>
                    Français (FR)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLocale("en")} className={locale === "en" ? "bg-muted font-bold" : ""}>
                    English (EN)
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
