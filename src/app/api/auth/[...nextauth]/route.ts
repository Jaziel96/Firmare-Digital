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
    async redirect({ url, baseUrl }) {
      // Redirige a la página de documentos después del inicio de sesión
      return `${baseUrl}/documents`;  // Asegúrate de que la ruta coincida con la página de documentos
    },
  },
};

// Exportar el manejador de NextAuth directamente como el manejador de solicitudes para todas las rutas HTTP
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
