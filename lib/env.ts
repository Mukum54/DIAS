import { z } from 'zod'

const envSchema = z.object({
    // Required
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET must be at least 32 characters'),
    NEXTAUTH_URL: z.string().min(1, 'NEXTAUTH_URL is required'),
    ENCRYPTION_KEY: z.string().min(32, 'ENCRYPTION_KEY must be at least 32 characters'),

    // Public
    NEXT_PUBLIC_APP_URL: z.string().min(1, 'NEXT_PUBLIC_APP_URL is required').optional(),

    // Email (optional — app works without it)
    RESEND_API_KEY: z.string().startsWith('re_').optional(),

    // Google OAuth (optional — conditionally enabled in lib/auth.ts)
    GOOGLE_CLIENT_ID: z.string().min(1).optional(),
    GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),

    // SMS (optional)
    TWILIO_ACCOUNT_SID: z.string().min(1).optional(),
    TWILIO_AUTH_TOKEN: z.string().min(1).optional(),
    TWILIO_PHONE_NUMBER: z.string().min(1).optional(),

    // Redis (optional)
    UPSTASH_REDIS_REST_URL: z.string().min(1).optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),

    // Cloudflare R2 (optional — used for file uploads)
    CLOUDFLARE_R2_ENDPOINT: z.string().url().optional(),
    CLOUDFLARE_R2_ACCESS_KEY_ID: z.string().min(1).optional(),
    CLOUDFLARE_R2_SECRET_ACCESS_KEY: z.string().min(1).optional(),
    CLOUDFLARE_R2_BUCKET_NAME: z.string().min(1).optional(),
    CLOUDFLARE_R2_PUBLIC_URL: z.string().url().optional(),

    // AWS S3 (optional — legacy, being replaced by R2)
    AWS_S3_REGION: z.string().min(1).optional(),
    AWS_S3_ACCESS_KEY_ID: z.string().min(1).optional(),
    AWS_S3_SECRET_ACCESS_KEY: z.string().min(1).optional(),
    AWS_S3_BUCKET_NAME: z.string().min(1).optional(),
})

const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
    console.warn('⚠️  Invalid environment variables detected:')
    console.warn(JSON.stringify(parsed.error.flatten().fieldErrors, null, 2));
}

/**
 * Validated environment variables.
 *
 * Missing optional fields will be `undefined`.
 * Missing required fields produce a warning but won't crash the app
 * so that local development and build-time generation can proceed.
 */
export const env = (parsed.data || process.env) as z.infer<typeof envSchema>
