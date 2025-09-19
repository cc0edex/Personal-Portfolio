import { NextRequest, NextResponse } from "next/server";
import BlogModel from "@/lib/config/models/BlogModel";
import { getUserFromRequest } from "@/lib/auth";
// DELETE METHOD FOR BLOG ENDPOINT //
export async function DELETE(
  request: NextRequest,
  { params }: { params: { _id: string } }
) {
  const _id = await params;
  try {
    const user = await getUserFromRequest();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    await BlogModel.findByIdAndDelete(_id);
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (err) {
    return NextResponse.json({ message: "Blog Not Found" }, { status: 404 });
  }
}
