import { Container, Title, Text, Button } from '@mantine/core';
import { signIn } from 'next-auth/react';

export default function Login() {
  const handleLogin = () => {
    signIn('google');
  };

  return (
    <Container>
      <Title order={1}>Iniciar Sesión</Title>
      <Text mb="md">Inicia sesión utilizando tu cuenta de Google para acceder a la plataforma.</Text>
      <Button onClick={handleLogin} mt="md">
        Iniciar Sesión con Google
      </Button>
    </Container>
  );
}
