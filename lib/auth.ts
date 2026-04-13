import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from './prisma';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET || 'build-time-placeholder-secret',
    providers: [
        ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
            ? [GoogleProvider({
                clientId: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            })]
            : []),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user.passwordHash) {
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);

                if (!isPasswordValid) return null;

                return {
                    id: user.id,
                    email: user.email,
                    name: `${user.firstName} ${user.lastName}`,
                    role: user.role
                };
            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            if (account?.provider === 'google') {
                if (!user.email) return false;

                // Check if user exists
                let dbUser = await prisma.user.findUnique({
                    where: { email: user.email }
                });

                // Auto-create user if they don't exist
                if (!dbUser) {
                    const nameParts = user.name?.split(' ') || ['User'];
                    const firstName = nameParts[0];
                    const lastName = nameParts.slice(1).join(' ') || '';

                    dbUser = await prisma.user.create({
                        data: {
                            email: user.email,
                            firstName,
                            lastName,
                            role: 'CLIENT',
                        }
                    });
                }

                // Mutate the user object to pass properties to the jwt callback
                user.id = dbUser.id;
                (user as any).role = dbUser.role;
                return true;
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                (session.user as any).role = token.role as string;
                (session.user as any).id = token.id as string;
            }
            return session;
        }
    },
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/auth/login',
    }
};
