/**
 * Notification Service Stub layer
 * Provides abstraction for Resend (Emails) and Twilio (SMS).
 * 
 * NOTE: Production implementations requires API keys populated in .env.local:
 * RESEND_API_KEY
 * TWILIO_ACCOUNT_SID
 * TWILIO_AUTH_TOKEN
 * TWILIO_PHONE_NUMBER
 */

export async function sendEmailConfirmation(email: string, reference: string) {
    if (!process.env.RESEND_API_KEY) {
        console.warn("[DEV STUB] Resend API key missing. Email simulation running.");
        console.log(`\x1b[36m[EMAIL DISPATCH]\x1b[0m To: ${email} | Ref: ${reference}`);
        console.log(`SUBJECT: AIR DIASS - Confirmation Réservation ${reference}`);
        return { success: true, stub: true, sentAt: new Date().toISOString() };
    }

    // Example Production implementation:
    // await resend.emails.send({ ... })

    return { success: true };
}

export async function sendSMSNotification(phone: string, message: string) {
    if (!process.env.TWILIO_AUTH_TOKEN) {
        console.warn("[DEV STUB] Twilio configuration missing. SMS simulation running.");
        console.log(`\x1b[32m[SMS DISPATCH]\x1b[0m To: ${phone}`);
        console.log(`MESSAGE: ${message}`);
        return { success: true, stub: true, sentAt: new Date().toISOString() };
    }

    // Example Production implementation:
    // await twilioClient.messages.create({ ... })

    return { success: true };
}

export async function pushInternalDashboardAlert(title: string, severity: 'INFO' | 'WARN' | 'CRITICAL', data: Record<string, unknown>) {
    // Integration for Pusher / Socket.io live dashboard websockets
    console.log(`\x1b[33m[SYSTEM ALERT]\x1b[0m [${severity}] ${title}`, data);
    return { success: true };
}
