'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Container, Title, Button, Loader } from "@mantine/core";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleViewDocuments = () => {
    if (status === "authenticated") {
      router.push("/documents");
    } else {
      router.push("/login");
    }
  };

  return (
    <Container>
      <Title order={1}>Bienvenido a la Plataforma de Firma Electrónica</Title>
      <p>
        Esta plataforma permite la gestión y firma electrónica de documentos digitales de manera segura y eficiente.
      </p>
      {status === "loading" ? (
        <Loader />
      ) : (
        <Button onClick={handleViewDocuments}>
          {status === "authenticated" ? "Ver Documentos" : "Iniciar Sesión"}
        </Button>
      )}
    </Container>
  );
}
