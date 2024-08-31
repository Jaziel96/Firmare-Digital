"use client";  // Añadir esta línea

import { Container, Title, Text, Button } from "@mantine/core";
import { useRouter } from "next/navigation";  // Importación correcta

export default function Home() {
  const router = useRouter();  // Uso del hook en un componente de cliente

  const handleClick = () => {
    router.push("/another-page");  // Ejemplo de uso de router
  };

  return (
    <Container>
      <Title>Bienvenido a mi página</Title>
      <Text>Este es un ejemplo de uso de Mantine con Next.js 13.</Text>
      <Button onClick={handleClick}>Ir a otra página</Button>
    </Container>
  );
}
