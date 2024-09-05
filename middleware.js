import { getSession } from "next-auth/react";

export async function middleware(req, ev) {
  const session = await getSession({ req });
  if (!session || !session.isAllowed) {
    return new Response('No autorizado', { status: 401 });
  }
  return NextResponse.next();
}
