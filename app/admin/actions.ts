"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import AdminModel from "@/lib/config/models/AdminModel";

export async function login(prevState: any, formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  // check if admin exists
  const admin = await AdminModel.findOne({ username });
  if (!admin) {
    return { error: "Invalid credentials. Please try again." };
  }
  // check if password matches
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return { error: "Invalid credentials. Please try again." };
  }
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  (await cookies()).set("access_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60, // 1 hour
  });
  redirect("/admin/dashboard");
}
