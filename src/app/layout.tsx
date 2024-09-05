'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { SessionProvider } from 'next-auth/react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* El proveedor de sesión debe envolver toda la aplicación */}
        <SessionProvider>
          {/* MantineProvider para UI */}
          <MantineProvider>
            {/* Notificaciones dentro del proveedor Mantine */}
            <Notifications />
            {/* Todos los componentes hijos */}
            {children}
          </MantineProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
