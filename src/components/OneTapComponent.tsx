import Script from 'next/script';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Declarar la variable global google
declare global {
  interface Window {
    google: any;
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const OneTapComponent = () => {
  const router = useRouter();

  // generate nonce to use for google id token sign-in
  const generateNonce = async (): Promise<string[]> => {
    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
    const encoder = new TextEncoder();
    const encodedNonce = encoder.encode(nonce);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    return [nonce, hashedNonce];
  };

  useEffect(() => {
    const initializeGoogleOneTap = () => {
      console.log('Initializing Google One Tap');
      window.addEventListener('load', async () => {
        const [nonce, hashedNonce] = await generateNonce();
        console.log('Nonce: ', nonce, hashedNonce);

        // check if there's already an existing session before initializing the one-tap UI
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session', error);
        }
        if (data.session) {
          router.push('/');
          return;
        }

        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: async (response: any) => {
            try {
              // send id token returned in response.credential to supabase
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: response.credential,
                nonce,
              });

              if (error) throw error;
              console.log('Session data: ', data);
              console.log('Successfully logged in with Google One Tap');

              // redirect to protected page
              router.push('/');
            } catch (error) {
              console.error('Error logging in with Google One Tap', error);
            }
          },
          nonce: hashedNonce,
          // with chrome's removal of third-party cookies, we need to use FedCM instead (https://developers.google.com/identity/gsi/web/guides/fedcm-migration)
          use_fedcm_for_prompt: true,
        });
        window.google.accounts.id.prompt(); // Display the One Tap UI
      });
    };
    initializeGoogleOneTap();
    return () => window.removeEventListener('load', initializeGoogleOneTap);
  }, []);

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" />
      <div id="oneTap" className="fixed top-0 right-0 z-[100]" />
    </>
  );
};

export default OneTapComponent;