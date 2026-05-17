import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "omm_admin";
const ALG = "HS256";

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("AUTH_SECRET must be set (at least 16 chars) in .env");
  }
  return new TextEncoder().encode(secret);
}

export async function createAdminSession(username: string) {
  const token = await new SignJWT({ role: "admin", username })
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());

  const jar = await cookies();
  jar.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroyAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE_NAME);
}

export async function getAdminSession(): Promise<{ username: string } | null> {
  const jar = await cookies();
  const token = jar.get(COOKIE_NAME)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (payload.role !== "admin") return null;
    return { username: String(payload.username ?? "admin") };
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export function verifyAdminCredentials(username: string, password: string) {
  const expectedUser = process.env.ADMIN_USERNAME ?? "admin";
  const expectedPwd = process.env.ADMIN_PASSWORD ?? "";
  if (!expectedPwd) return false;
  // constant-time-ish compare
  if (username.length !== expectedUser.length) return false;
  if (password.length !== expectedPwd.length) return false;
  let diff = 0;
  for (let i = 0; i < username.length; i++)
    diff |= username.charCodeAt(i) ^ expectedUser.charCodeAt(i);
  for (let i = 0; i < password.length; i++)
    diff |= password.charCodeAt(i) ^ expectedPwd.charCodeAt(i);
  return diff === 0;
}
