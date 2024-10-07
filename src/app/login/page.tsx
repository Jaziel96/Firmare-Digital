'use client';

import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Container, Title } from '@mantine/core';
import OneTapComponent from '../../components/OneTapComponent';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

function generateNonce() {
  return btoa(String.fromCharCode(...Array.from(crypto.getRandomValues(new Uint8Array(32)))));
}

async function hashNonce(nonce: string) {
  const encoder = new TextEncoder();
  const encodedNonce = encoder.encode(nonce);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export default function Login() {
  useEffect(() => {
    const nonce = generateNonce();

    hashNonce(nonce).then((hashedNonce) => {
      // Define the callback function
      (window as any).handleSignInWithGoogle = async (response: any) => {
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: response.credential,
          nonce: nonce,
        });

        if (error) {
          console.error('Error signing in:', error.message);
        } else {
          window.location.href = '/documents';
        }
      };

      // Set the nonce in the HTML element
      const gIdOnload = document.getElementById('g_id_onload');
      if (gIdOnload) {
        gIdOnload.setAttribute('data-nonce', hashedNonce);
      }
    });
  }, []);

  return (
    <Container>
      <Title order={1}>Login Page</Title>
      <OneTapComponent />
      <div
        id="g_id_onload"
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleSignInWithGoogle"
        data-auto_select="true"
        data-itp_support="true"
        data-use_fedcm_for_prompt="true"
      ></div>
      <div
        className="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      ></div>
    </Container>
  );
}