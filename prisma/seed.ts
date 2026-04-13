import { loadEnvConfig } from '@next/env'
loadEnvConfig(process.cwd())

import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import { hash } from 'bcryptjs'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter } as any)

async function main() {
    console.log('🌱 Seeding AIR DIASS database...')
    const passwordHash = await hash('password123', 12)

    // ─── USERS ────────────────────────────────────────────────────────────────
    const admin = await prisma.user.upsert({
        where: { email: 'admin@airdiass.com' },
        update: {},
        create: {
            email: 'admin@airdiass.com',
            passwordHash,
            role: 'ADMIN',
            firstName: 'Super',
            lastName: 'Admin',
            consentGiven: true,
            consentDate: new Date(),
        },
    })

    const client = await prisma.user.upsert({
        where: { email: 'client@airdiass.com' },
        update: {},
        create: {
            email: 'client@airdiass.com',
            passwordHash,
            role: 'CLIENT',
            firstName: 'Moussa',
            lastName: 'Diop',
            phone: '+221 77 111 22 33',
            consentGiven: true,
            consentDate: new Date(),
        },
    })

    console.log('✅ Users seeded')

    // ─── SERVICE OFFERINGS ─────────────────────────────────────────────────────
    const offerings = [
        // HOTEL / HÉBERGEMENT
        {
            serviceType: 'HOTEL',
            name: 'Chambre Standard Transit',
            description: 'Chambre confortable pour escales de courte durée, idéale pour un repos de qualité entre deux vols.',
            price: 35000,
            priceUnit: 'per_night',
            imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1200',
            capacity: 2,
            duration: '1 nuit min.',
            features: ['Lit double ou twin', 'Wi-Fi haut débit', 'Petit-déjeuner inclus', 'Navette aéroport gratuite', 'Check-in 24h/24'],
            sortOrder: 1,
        },
        {
            serviceType: 'HOTEL',
            name: 'Suite Exécutive',
            description: 'Suite spacieuse avec salon privé, idéale pour les voyageurs d\'affaires en transit.',
            price: 75000,
            priceUnit: 'per_night',
            imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200',
            capacity: 2,
            duration: '1 nuit min.',
            features: ['Salon privé séparé', 'Bureau de travail', 'Minibar premium', 'Room service 24/7', 'Accès spa inclus', 'Navette limousine'],
            sortOrder: 2,
        },
        {
            serviceType: 'HOTEL',
            name: 'Suite Présidentielle VIP',
            description: 'Notre suite la plus luxueuse, réservée aux dignitaires et cadres supérieurs exigeant un niveau de service absolu.',
            price: 150000,
            priceUnit: 'per_night',
            imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200',
            capacity: 4,
            duration: '1 nuit min.',
            features: ['200m² avec terrasse privée', 'Majordome personnel 24/7', 'Jacuzzi et hammam', 'Cuisine privée', 'Salle de réunion intégrée', 'Accueil Fast-track AIBD'],
            sortOrder: 3,
        },
        // TRANSPORT
        {
            serviceType: 'TRANSPORT',
            name: 'Berline Prestige',
            description: 'Mercedes Classe E ou équivalent avec chauffeur professionnel bilingue. Confort et discrétion garantis.',
            price: 25000,
            priceUnit: 'per_trip',
            imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200',
            capacity: 3,
            duration: 'Par trajet',
            features: ['Mercedes Classe E ou BMW Série 5', 'Chauffeur en tenue', 'Wi-Fi et eau minérale à bord', 'Suivi GPS en temps réel'],
            sortOrder: 1,
        },
        {
            serviceType: 'TRANSPORT',
            name: 'SUV Premium 4x4',
            description: 'Toyota Land Cruiser ou Range Rover pour vos déplacements en tout terrain ou vos missions dans la région.',
            price: 40000,
            priceUnit: 'per_trip',
            imageUrl: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200',
            capacity: 5,
            duration: 'Par trajet',
            features: ['Transmission intégrale', '7 places optionnel', 'Idéal zones difficiles', 'Chauffeur expérimenté'],
            sortOrder: 2,
        },
        {
            serviceType: 'TRANSPORT',
            name: 'Minibus Groupe',
            description: 'Transferts collectifs pour conférences, séminaires ou groupes touristiques.',
            price: 60000,
            priceUnit: 'per_trip',
            imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200',
            capacity: 15,
            duration: 'Par trajet',
            features: ['12 à 18 places', 'Climatisation renforcée', 'Idéal événements', 'Tarif groupe avantageux'],
            sortOrder: 3,
        },
        // PARKING
        {
            serviceType: 'PARKING',
            name: 'Parking Standard Couvert',
            description: 'Parking sécurisé couvert à 5 minutes de l\'aéroport AIBD avec navette gratuite.',
            price: 5000,
            priceUnit: 'per_day',
            imageUrl: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=1200',
            capacity: 100,
            features: ['Couvert et éclairé', 'Navette gratuite AIBD', 'Vidéosurveillance 24/7', 'Entrée badge sécurisé'],
            sortOrder: 1,
        },
        {
            serviceType: 'PARKING',
            name: 'Parking VIP Voiturier',
            description: 'Service voiturier premium. Déposez votre véhicule à l\'entrée et retrouvez-le devant vous à votre retour.',
            price: 15000,
            priceUnit: 'per_day',
            imageUrl: 'https://images.unsplash.com/photo-1470224114660-3f6686c562eb?q=80&w=1200',
            capacity: 30,
            features: ['Voiturier à l\'arrivée et au départ', 'Zone ultra-sécurisée', 'Lavage optionnel', 'Emplacements XXL disponibles'],
            sortOrder: 2,
        },
        // GARAGE
        {
            serviceType: 'GARAGE',
            name: 'Vidange & Révision Rapide',
            description: 'Vidange, filtres et contrôle des 50 points essentiels en moins de 2 heures.',
            price: 45000,
            priceUnit: 'XOF',
            imageUrl: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?q=80&w=1200',
            duration: '1-2h',
            features: ['Huile moteur synthétique', 'Filtre à huile + air + habitacle', '50 points de contrôle', 'Rapport d\'état électronique'],
            sortOrder: 1,
        },
        {
            serviceType: 'GARAGE',
            name: 'Visite Technique Complète',
            description: 'Diagnostic complet avec rapport PDF certifié. Idéal avant un long voyage ou une vente.',
            price: 35000,
            priceUnit: 'XOF',
            imageUrl: 'https://images.unsplash.com/photo-1554979734-854b27b1bdd3?q=80&w=1200',
            duration: '3-4h',
            features: ['Diagnostic électronique OBD', 'Vérification freins / pneumatiques', 'Rapport certifié PDF', 'Photos de l\'état du véhicule'],
            sortOrder: 2,
        },
        // LOCATION
        {
            serviceType: 'RENTAL',
            name: 'Citadine Économique',
            description: 'Toyota Yaris ou Dacia Sandero. Parfaite pour vos déplacements urbains et régionaux.',
            price: 25000,
            priceUnit: 'per_day',
            imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1200',
            capacity: 4,
            features: ['Kilométrage illimité', 'Assurance tous risques incluse', 'Livraison aéroport', '24/7 assistance'],
            sortOrder: 1,
        },
        {
            serviceType: 'RENTAL',
            name: 'SUV Familial',
            description: 'Hyundai Tucson ou Toyota RAV4. Confort et espace pour vos déplacements en famille.',
            price: 55000,
            priceUnit: 'per_day',
            imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1200',
            capacity: 5,
            features: ['5 places', 'Grand coffre', 'GPS intégré', 'Siège bébé disponible'],
            sortOrder: 2,
        },
        // BAGAGES
        {
            serviceType: 'BAGGAGE',
            name: 'Prise en Charge Standard',
            description: 'Enlèvement, stockage et livraison sécurisée de vos bagages avec suivi QR en temps réel.',
            price: 10000,
            priceUnit: 'XOF',
            imageUrl: 'https://images.unsplash.com/photo-1553547571-25a6437a7a4a?q=80&w=1200',
            features: ['Enlèvement à domicile', 'Stockage climatisé sécurisé', 'Livraison sous 24h', 'Suivi QR code temps réel'],
            sortOrder: 1,
        },
        {
            serviceType: 'BAGGAGE',
            name: 'Service Express VIP',
            description: 'Livraison express en 4 heures max avec agent dédié et assurance bagages premium.',
            price: 25000,
            priceUnit: 'XOF',
            imageUrl: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1200',
            features: ['Livraison en 4h garantie', 'Agent dédié exclusif', 'Assurance 500 000 XOF incluse', 'Notification SMS à chaque étape'],
            sortOrder: 2,
        },
    ]

    for (const o of offerings) {
        await (prisma as any).serviceOffering.upsert({
            where: { id: `seed_${o.serviceType}_${o.sortOrder}` },
            update: { ...o, features: o.features as any },
            create: { id: `seed_${o.serviceType}_${o.sortOrder}`, ...o, features: o.features as any },
        })
    }
    console.log('✅ Service offerings seeded:', offerings.length)

    // ─── DEMO RESERVATIONS for the client ─────────────────────────────────────
    const reservations = [
        {
            id: 'demo_res_1',
            referenceNumber: 'AD-HOTEL1',
            clientId: client.id,
            clientName: 'Moussa Diop',
            clientPhone: '+221 77 111 22 33',
            clientEmail: 'client@airdiass.com',
            serviceType: 'HOTEL',
            status: 'CONFIRMED',
            startDate: new Date(Date.now() + 86400000 * 3),
            endDate: new Date(Date.now() + 86400000 * 5),
            amount: 75000,
            notes: 'Suite Exécutive — Vol Air France AF718',
        },
        {
            id: 'demo_res_2',
            referenceNumber: 'AD-TRANS1',
            clientId: client.id,
            clientName: 'Moussa Diop',
            clientPhone: '+221 77 111 22 33',
            clientEmail: 'client@airdiass.com',
            serviceType: 'TRANSPORT',
            status: 'PENDING',
            startDate: new Date(Date.now() + 86400000 * 1),
            amount: 25000,
            notes: 'AIBD → Hôtel Terrou-Bi, Berline prestige',
        },
        {
            id: 'demo_res_3',
            referenceNumber: 'AD-PARK1',
            clientId: client.id,
            clientName: 'Moussa Diop',
            clientPhone: '+221 77 111 22 33',
            clientEmail: 'client@airdiass.com',
            serviceType: 'PARKING',
            status: 'COMPLETED',
            startDate: new Date(Date.now() - 86400000 * 5),
            endDate: new Date(Date.now() - 86400000 * 2),
            amount: 15000,
            isPaid: true,
            notes: 'Parking VIP Voiturier — 3 jours',
        },
    ]

    for (const r of reservations) {
        await (prisma as any).reservation.upsert({
            where: { id: r.id },
            update: {},
            create: { ...r, serviceType: r.serviceType as any, status: r.status as any },
        })
    }
    console.log('✅ Demo reservations seeded:', reservations.length)
    console.log('\n🎉 Database seeded successfully!')
    console.log('\n📧 Demo accounts:')
    console.log('   Admin: admin@airdiass.com / password123')
    console.log('   Client: client@airdiass.com / password123')
}

main()
    .catch((e) => {
        console.error('❌ Seeding error:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
        await pool.end()
    })
