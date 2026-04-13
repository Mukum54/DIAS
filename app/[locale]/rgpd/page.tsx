import { ShieldCheck, Lock, Eye, FileText, Scale, Gavel } from "lucide-react";

export default function RGPDPage() {
    const sections = [
        {
            title: "Collecte des données",
            icon: Eye,
            content: "Nous collectons uniquement les informations nécessaires à la prestation de nos services : identité, coordonnées, détails de vol et informations sur le véhicule. Ces données sont essentielles pour assurer votre accueil personnalisé et la sécurité de vos biens."
        },
        {
            title: "Utilisation et Finalité",
            icon: FileText,
            content: "Vos données sont utilisées pour la gestion de vos réservations, le suivi de vos bagages en temps réel, et la facturation. En aucun cas vos données ne sont revendues à des tiers à des fins commerciales."
        },
        {
            title: "Sécurité et Stockage",
            icon: Lock,
            content: "Toutes les données sont stockées sur des serveurs sécurisés conformes aux standards internationaux. Nous utilisons le chiffrement AES-256 pour les informations sensibles et limitons l'accès physique et numérique à notre base de données."
        },
        {
            title: "Vos Droits",
            icon: Scale,
            content: "Conformément à la loi sénégalaise et au RGPD européen, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Vous pouvez exercer ce droit à tout moment via votre espace client ou en nous contactant."
        }
    ];

    return (
        <div className="flex flex-col min-h-[calc(100vh-16rem)] max-w-5xl mx-auto px-4 py-16 md:py-32 space-y-20">
            {/* Header */}
            <div className="space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-brand-bright/20 bg-brand-deep/50 px-4 py-1.5 backdrop-blur-md">
                    <ShieldCheck className="w-4 h-4 text-brand-lime" />
                    <span className="text-[10px] font-bold text-brand-lime tracking-[0.3em] uppercase">Protection des données</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-text-primary italic leading-tight max-w-3xl">
                    Engagement <span className="text-brand-lime">Confidentialité</span> & RGPD
                </h1>
                <p className="text-text-muted text-lg max-w-2xl leading-relaxed">
                    Chez AIR DIASS, la protection de votre vie privée est au cœur de notre contrat de confiance.
                    Nous appliquons les standards de sécurité les plus rigoureux pour garantir l'intégrité de vos informations.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {sections.map((section, idx) => (
                    <div key={idx} className="group p-8 md:p-10 bg-surface border border-muted-bg/50 rounded-[2rem] hover:border-brand-bright/20 transition-all duration-500 hover:shadow-2xl">
                        <div className="w-12 h-12 rounded-xl bg-brand-deep flex items-center justify-center text-brand-lime mb-8 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(var(--primary),0.1)]">
                            <section.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-display font-bold text-text-primary mb-4 uppercase tracking-wide italic">{section.title}</h3>
                        <p className="text-text-muted leading-relaxed text-sm">{section.content}</p>
                    </div>
                ))}
            </div>

            {/* Legal Footnote */}
            <div className="p-8 md:p-12 bg-brand-deep/20 border border-brand-bright/10 rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Gavel className="w-32 h-32 text-brand-lime" />
                </div>
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
                    <div className="space-y-2">
                        <h4 className="text-xl font-bold text-text-primary uppercase tracking-tight">Délégué à la Protection des Données (DPO)</h4>
                        <p className="text-text-muted text-sm">Pour toute question relative à vos données : <span className="text-brand-lime font-mono">dpo@airdiass.com</span></p>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-4 py-2 rounded-lg bg-surface border border-muted-bg/50 text-[10px] font-bold uppercase tracking-widest text-brand-lime self-center">
                            Dernière mise à jour : Mars 2024
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
