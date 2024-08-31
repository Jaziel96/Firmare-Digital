'use client'; // Asegúrate de añadir esto al principio del archivo

import { Container, Title, Text, Button, Group } from "@mantine/core";
import { useRouter } from "next/navigation"; // Usa next/navigation para el App Router

export default function Home() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/api/auth/signin'); // Redirige a la página de inicio de sesión
  };

  return (
    <Container>
      <Title order={1}>Bienvenido a la Plataforma de Firma Electrónica</Title>
      <Text mb="md">
        Esta plataforma permite la gestión y firma electrónica de documentos
        digitales de manera segura y eficiente.
      </Text>
      <Group>
        <Button onClick={handleLogin}>Iniciar Sesión</Button>
        <Button onClick={() => router.push("/documents")}>Ver Documentos</Button>
        <Button onClick={() => router.push("/sign")}>Firmar Documento</Button>
      </Group>
    </Container>
  );
}
