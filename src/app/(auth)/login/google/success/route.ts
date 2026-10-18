import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookieStore = await cookies();
  
  const redirectAfter = cookieStore.get("redirectUri")?.value ?? "/";
  cookieStore.delete(redirectAfter);

  redirect(redirectAfter);
}