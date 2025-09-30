import { cookies } from "next/headers";

export async function getTokenFromCookies() {
  const cookieStore = await cookies(); // 👈 await here
  const token = cookieStore.get("token"); // assuming your cookie name is "token"
  return token?.value || null;
}