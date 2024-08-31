import { Button, Container, Title, Text } from '@mantine/core';
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <Container>
      <Title>Inicia Sesión</Title>
      <Text>Utiliza tu cuenta de Google institucional para iniciar sesión.</Text>
      <Button onClick={() => signIn('google')}>Iniciar sesión con Google</Button>
    </Container>
  );
}
