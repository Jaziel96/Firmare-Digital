import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';

// Configuración de NextAuth
const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async signIn({ user, account, profile }) {
      const email = user.email || '';
      // Permitir solo emails del dominio @ucol.mx
      if (email.endsWith('@ucol.mx')) {
        return true;
      } else {
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // Redirigir a /documents después de iniciar sesión
      return '/documents'; // Aquí se asegura de que el usuario sea redirigido a la página de documentos
    },
  },
};

// Exportar el manejador de NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
