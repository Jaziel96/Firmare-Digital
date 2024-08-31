import { Container, Title, Text, Button } from '@mantine/core';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/api/auth/signin'); // Redirige a la página de inicio de sesión
  };

  return (
    <Container>
      <Title order={1}>Bienvenido a la Plataforma de Firma Electrónica</Title>
      <Text>
        Esta plataforma permite la gestión y firma electrónica de documentos
        digitales de manera segura y eficiente. 
      </Text>
      <Button onClick={handleLogin} mt="md">Iniciar Sesión</Button>
    </Container>
  );
}
