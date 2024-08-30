import { Button } from '@mantine/core';
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div>
      <Button onClick={() => signIn('google')}>Iniciar sesión con Google</Button>
    </div>
  );
}
