import ProjectsModel from "@/lib/config/models/ProjectsModel";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getUserFromRequest } from "@/lib/auth";
// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Helper function to delete image from Cloudinary
const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    // Don't throw here as it's not critical for the main operation
  }
};
// Helper function to extract public_id from Cloudinary URL
const extractPublicIdFromUrl = (url: string): string | null => {
  try {
    // Extract public_id from Cloudinary URL
    const matches = url.match(/\/projects\/([^\.]+)/);
    return matches ? `projects/${matches[1]}` : null;
  } catch (error) {
    console.error("Error extracting public_id:", error);
    return null;
  }
};

// DELETE PROJECT ENDPOINT //
export async function DELETE(
  request: NextRequest,
  { params }: { params: { _id: string } }
) {
  try {
    const _id = params;
    if (!_id) {
      return NextResponse.json(
        { error: "Project ID required" },
        { status: 400 }
      );
    }
    const user = await getUserFromRequest();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    // Find and delete project
    const project = await ProjectsModel.findById(_id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    // Delete image from Cloudinary
    if (project.image.public_id) {
      await deleteFromCloudinary(project.image.public_id);
    } else if (project.image.url) {
      // Fallback: try to extract public_id from URL
      const publicId = extractPublicIdFromUrl(project.image.url);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }
    await ProjectsModel.findByIdAndDelete(_id);
    return NextResponse.json({ message: "Project deleted successfully" });
  } catch (err) {
    return NextResponse.json({ message: "Project Not Found" }, { status: 404 });
  }
}
