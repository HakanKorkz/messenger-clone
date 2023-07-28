import bcrypt from "bcrypt"
import NextAuth, {AuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import {PrismaAdapter} from "@next-auth/prisma-adapter";

// @ts-ignore
import prisma from "@/app/libs/prismadb";
import exp from "constants";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as String,
            clientSecret: process.env.GITHUB_CLIENT_SCRET as String,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as String,
            clientSecret: process.env.GOOGLE_CLIENT_SCRET as String,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: {label: 'email', type: 'text'}, password: {label: 'password', type: 'password'}

            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Geçersiz kimlik bilgileri");
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if (!user || !user?.hashedPassword) {
                    throw new Error("Geçersiz kimlik bilgileri");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )

                if (!isCorrectPassword) {
                    throw new Error("Geçersiz kimlik bilgileri");
                }

                return user;
            }

        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};