import { NextResponse } from "next/server";

export async function POST() {
  // Overwrite cookie with empty value & immediate expiry
  const res = NextResponse.json({ success: true });
  res.cookies.set({
    name: "token",
    value: "",
    maxAge: 0,
    path: "/",
  });
  return res;
}
