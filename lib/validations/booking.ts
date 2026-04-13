import { z } from "zod";

// DTO Schemas for API Request Validations

export const passengerSchema = z.object({
    id: z.string().optional(),
    firstName: z.string().min(2, "Le prénom est requis et doit contenir au moins 2 caractères."),
    lastName: z.string().min(2, "Le nom est requis et doit contenir au moins 2 caractères."),
    passportNumber: z.string().optional(),
    email: z.string().email("L'adresse email fournie est invalide.").optional(),
    phone: z.string().optional(),
});

export const baseBookingSchema = z.object({
    serviceType: z.enum(["TRANSPORT", "HEBERGEMENT", "PARKING", "BAGAGES", "GARAGE", "LOCATION_VEHICULE"]),
    date: z.coerce.date(),
    passengerIds: z.array(z.string()).min(1, "Au moins un passager doit être rattaché à la réservation."),
    specialRequests: z.string().max(1000).optional(),
});

// Implementation specific extensions
export const transportBookingSchema = baseBookingSchema.extend({
    pickupLocation: z.string().min(1, "Le lieu de prise en charge est requis."),
    dropoffLocation: z.string().min(1, "La destination est requise."),
    flightNumber: z.string().optional(),
    vehicleCategory: z.enum(["BERLINE", "SUV", "VAN", "MINIBUS"]),
});

export const garageJobSchema = z.object({
    vehiclePlate: z.string().min(5),
    jobType: z.enum(["REVISION", "MECANIQUE", "CLIMATISATION", "DIAGNOSTIC", "PNEUMATIQUE"]),
    urgency: z.enum(["NORMAL", "HIGH", "CRITICAL"]),
    description: z.string(),
});
