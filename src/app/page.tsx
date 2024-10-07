'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Container, Title, Button, Loader } from '@mantine/core';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default function Home() {
  const [session, setSession] = useState<{ user: { email: string | undefined } } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        setSession(null);
      } else {
        setSession({
          user: {
            email: data.session.user.email || 'default@example.com'
          }
        });
      }
    };

    getSession();
  }, []);

  const handleViewDocuments = () => {
    if (session) {
      router.push('/documents');
    } else {
      router.push('/login');
    }
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <Container>
      <Title order={1}>Bienvenido a la Plataforma de Firma Electrónica</Title>
      <p>
        Esta plataforma permite la gestión y firma electrónica de documentos digitales de manera segura y eficiente.
      </p>
      {session === null ? (
        <Loader />
      ) : (
        <>
          <Button onClick={handleViewDocuments}>
            Ver Documentos
          </Button>
          <Button onClick={handleLogin} style={{ marginLeft: '10px' }}>
            Iniciar Sesión
          </Button>
        </>
      )}
    </Container>
  );
}