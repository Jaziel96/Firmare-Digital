import { Container, Title, Button } from "@mantine/core";
import { signIn } from "next-auth/react";

export default function Login() {
  const handleLogin = () => {
    signIn("google"); // Inicia sesión con Google
  };

  return (
    <Container>
      <Title order={1}>Iniciar Sesión</Title>
      <Button onClick={handleLogin} mt="md">
        Iniciar Sesión con Google
      </Button>
    </Container>
  );
}
