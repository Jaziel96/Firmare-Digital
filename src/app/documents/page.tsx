'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Container, Title, Loader } from "@mantine/core";

export default function Documents() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Manejo de redirección si no está autenticado
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <Loader />;
  if (status === "unauthenticated") return <p>Redirecting...</p>;

  return (
    <Container>
      <Title order={1}>Documents Page</Title>
      <p>Welcome, {session?.user?.name}</p>
    </Container>
  );
}

