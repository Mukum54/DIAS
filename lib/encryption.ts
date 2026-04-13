import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
// Ensures we have exactly 32 bytes key if the env is smaller
const getEncryptionKey = () => {
    const secret = process.env.ENCRYPTION_KEY || 'default_32_bytes_long_secret_key!';
    return crypto.createHash('sha256').update(String(secret)).digest('base64').substring(0, 32);
};

export function encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const key = Buffer.from(getEncryptionKey(), 'utf-8');
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag();

    return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
}

export function decrypt(text: string): string | null {
    try {
        const [ivHex, authTagHex, encryptedText] = text.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');
        const key = Buffer.from(getEncryptionKey(), 'utf-8');

        const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch {
        return null;
    }
}
