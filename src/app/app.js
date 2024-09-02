import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react'; // Asegúrate de importar esto
import '../styles/globals.css'; // Asegúrate de que tienes este archivo

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider>
      <NotificationsProvider>
        <SessionProvider session={pageProps.session}> {/* Envuelve el componente con SessionProvider */}
          <Component {...pageProps} />
        </SessionProvider>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default MyApp;

