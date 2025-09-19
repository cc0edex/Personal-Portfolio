const jwt = require("jsonwebtoken");
import { cookies } from "next/headers";
const ACCESS_SECRET = process.env.JWT_SECRET;
export function createAccessToken(admin: any) {
  return jwt.sign(admin, ACCESS_SECRET, { expiresIn: "15m" });
}
export function verifyAccessToken(token: string) {
  return jwt.verify(token, ACCESS_SECRET);
}
export async function getUserFromRequest() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  if (!token) return null;

  const user = verifyAccessToken(token);
  return user;
}
