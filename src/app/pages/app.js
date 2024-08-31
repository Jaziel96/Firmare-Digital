import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import '../styles/globals.css'; // Asegúrate de que tienes este archivo

function MyApp({ Component, pageProps }) {
  return (
    <MantineProvider>
      <NotificationsProvider>
        <Component {...pageProps} />
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default MyApp;
