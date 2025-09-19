import { NextRequest, NextResponse } from "next/server";
import { ConnectDb } from "@/lib/config/db";
import AboutModel from "@/lib/config/models/AboutModel";
import { getUserFromRequest } from "@/lib/auth";
// load DB //
const LoadDb = async () => {
  try {
    await ConnectDb();
  } catch (err) {
    console.error("error Loading Db", err);
  }
};
LoadDb();

// GET METHOD FOR ABOUT //
export async function GET(request: NextRequest) {
  const about = await AboutModel.find();
  return NextResponse.json({ about });
}
// PUT METHOD FOR ABOUT //
export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromRequest();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const data = await request.json();
    const existingAbout = await AboutModel.findOne({ uniqId: data.uniqId });
    if (existingAbout) {
      await AboutModel.updateOne(data);
      return NextResponse.json(
        {
          success: true,
          msg: "About section Updated successfully",
        },
        { status: 200 }
      );
    } else {
      await AboutModel.create(data);
      return NextResponse.json(
        { success: true, msg: "About section Created successfully" },
        { status: 200 }
      );
    }
  } catch (err) {
    return NextResponse.json({ msg: "error", err }, { status: 400 });
  }
}
