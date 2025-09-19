import { NextRequest, NextResponse } from "next/server";
import { ConnectDb } from "@/lib/config/db";
import MessagesModel from "@/lib/config/models/MessagesModel";
// load DB //
const LoadDb = async () => {
  try {
    await ConnectDb();
  } catch (err) {
    console.error("error Loading Db", err);
  }
};
LoadDb();
// GET METHOD FOR MESSAGES //
export async function GET(request: NextRequest) {
  const messages = await MessagesModel.find();
  return NextResponse.json({ messages });
}
// POST METHOD FOR MESSAGES //
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const newMessage = await MessagesModel.create(data);
    return NextResponse.json(
      {
        success: true,
        msg: "Message created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Error Creating Message", error: error },
      { status: 500 }
    );
  }
}
// DELETE METHOD FOR MESSAGES //
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json(
        { msg: "Message ID is required" },
        { status: 400 }
      );
    }
    const deletedMessage = await MessagesModel.findByIdAndDelete(id);
    if (!deletedMessage) {
      return NextResponse.json({ msg: "Message not found" }, { status: 404 });
    }
    return NextResponse.json(
      {
        success: true,
        msg: "Message deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Error Deleting Message", error: error },
      { status: 500 }
    );
  }
}
