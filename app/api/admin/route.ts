import { NextRequest, NextResponse } from "next/server";
import { ConnectDb } from "@/lib/config/db";
import AdminModel from "@/lib/config/models/AdminModel";
import { getUserFromRequest } from "@/lib/auth";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// load DB //
const LoadDb = async () => {
  try {
    await ConnectDb();
  } catch (err) {
    console.error("error Loading Db", err);
  }
};
LoadDb();

// POST METHOD FOR AUTH //
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const username = formData.get("username") as String;
    const password = formData.get("password") as String;
    // check if admin exists
    const admin = await AdminModel.findOne({ username });
    if (!admin) {
      return NextResponse.json(
        {
          msg: "Invalid credentials. Please try again.",
        },
        { status: 401 }
      );
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json(
        {
          msg: "Invalid credentials. Please try again.",
        },
        { status: 401 }
      );
    }
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const response = NextResponse.json({ success: true });
    response.cookies.set("access_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hour
    });
    return response;
  } catch (err) {
    return NextResponse.json(
      { msg: "Error Finding Admins", error: err },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const user = await getUserFromRequest();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
