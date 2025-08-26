import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    pages: {
        signIn: '/sign-in',
    },
    providers: [
        GoogleProvider({
            name: "Google",
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                // Chama sua API para trocar dados do Google por um JWT próprio
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include", // permite receber o Set-Cookie
                    body: JSON.stringify({
                        email: user.email,
                        name: user.name,
                        avatar: user.image,
                        provider: account?.provider,
                        providerAccountId: account?.providerAccountId,
                    }),
                });

                if (!res.ok) {
                    console.error("Falha ao autenticar na API externa");
                    return false;
                }

                // Sua API já deve setar o cookie HttpOnly no response
                return true;
            } catch (err) {
                console.error("Erro integração API:", err);
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST }