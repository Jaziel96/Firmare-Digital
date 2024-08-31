import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { SupabaseAdapter } from '@next-auth/supabase-adapter';
import { NextRequest, NextResponse } from 'next/server';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  secret: process.env.NEXTAUTH_SECRET!,
};

export async function GET(request: NextRequest) {
  const res = await NextAuth(request, authOptions);
  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  const res = await NextAuth(request, authOptions);
  return NextResponse.json(res);
}
