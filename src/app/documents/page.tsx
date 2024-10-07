'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Container, Title, Loader } from '@mantine/core';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export default function Documents() {
  const [session, setSession] = useState<{ user: { email: string | undefined } } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) {
        router.push('/login');
      } else {
        setSession({
          user: {
            email: data.session.user.email || 'default@example.com'
          }
        });
      }
    };

    getSession();
  }, [router]);

  if (!session) return <Loader />;

  return (
    <Container>
      <Title order={1}>Documents Page</Title>
      <p>Welcome, {session.user.email}</p>
    </Container>
  );
}