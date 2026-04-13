import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    href: string;
    brand: "AIR DIASS" | "DIASS AUTO";
    featured?: boolean;
}

export function ServiceCard({ title, description, icon: Icon, href, brand, featured }: ServiceCardProps) {
    return (
        <Card className={cn(
            "group overflow-hidden transition-all duration-300 bg-surface border-muted-bg hover:-translate-y-1",
            featured ? "border-brand-action/50 shadow-[0_0_20px_rgba(var(--primary),0.05)]" : "hover:border-brand-bright/50"
        )}>
            <CardHeader className="relative pb-4">
                {featured && (
                    <div className="absolute top-4 right-6">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-lime opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-lime"></span>
                        </span>
                    </div>
                )}
                <div className="w-11 h-11 rounded-[var(--radius-md)] bg-brand-deep flex items-center justify-center mb-5 text-brand-lime group-hover:scale-110 transition-transform duration-standard">
                    <Icon className="w-5 h-5" />
                </div>
                <div className="text-label text-brand-lime/80 mb-2">{brand}</div>
                <CardTitle className="text-xl font-display tracking-wide">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-sm text-text-muted leading-relaxed">
                    {description}
                </CardDescription>
            </CardContent>
            <CardFooter className="pt-2">
                <Button asChild variant="ghost" className="w-full justify-between h-10 group-hover:text-brand-lime group-hover:bg-brand-deep/50 transition-colors border border-transparent hover:border-brand-bright/20">
                    <Link href={href}>
                        <span className="font-semibold tracking-wide">Découvrir</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
