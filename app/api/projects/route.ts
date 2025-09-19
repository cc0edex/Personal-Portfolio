import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { ConnectDb } from "@/lib/config/db";
import ProjectsModel from "@/lib/config/models/ProjectsModel";
import { getUserFromRequest } from "@/lib/auth";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to upload image to Cloudinary
const uploadToCloudinary = async (
  file: File
): Promise<{ public_id: string; secure_url: string }> => {
  try {
    // Convert file to buffer and then to base64
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64String = `data:${file.type};base64,${buffer.toString(
      "base64"
    )}`;

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(base64String, {
      folder: "projects", // Organize uploads in a projects folder
      resource_type: "image",
      transformation: [
        { quality: "auto" }, // Auto optimize quality
        { fetch_format: "webp" }, // Auto choose best format (WebP, etc.)
      ],
    });

    return {
      public_id: uploadResponse.public_id,
      secure_url: uploadResponse.secure_url,
    };
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

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

// Load DB
const LoadDb = async () => {
  try {
    await ConnectDb();
  } catch (err) {
    console.error("Error loading DB", err);
  }
};
LoadDb();

// GET ALL PROJECTS ENDPOINT
export async function GET(request: NextRequest) {
  try {
    const projects = await ProjectsModel.find();
    return NextResponse.json({ projects });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST NEW PROJECT ENDPOINT
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const image = formData.get("image") as File;
    const tags = formData.get("tags") as string;

    // Ensure tags is an array
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    // Check if image is uploaded
    if (!image) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    if (!image.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Validate file size
    if (image.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds 5MB limit" },
        { status: 400 }
      );
    }

    // Upload image to Cloudinary
    const uploadResult = await uploadToCloudinary(image);

    const projectData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      },
      tags: tagsArray,
      liveUrl: formData.get("liveUrl") as string,
      githubUrl: formData.get("githubUrl") as string,
      featured: formData.get("featured") === "true",
    };

    await ProjectsModel.create(projectData);

    return NextResponse.json(
      {
        success: true,
        msg: "Project created successfully",
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating project:", err);
    return NextResponse.json(
      { msg: "Error creating project", error: err },
      { status: 500 }
    );
  }
}

// PUT METHOD FOR EDIT PROJECT ENDPOINT
export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromRequest();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const projectId = formData.get("_id") as string;

    // Find existing project
    const existingProject = await ProjectsModel.findById(projectId);
    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Handle image update if new image is provided
    let imageUrl = existingProject.image.url;
    let imagePublicId = existingProject.image.public_id;
    const newImage = formData.get("image") as File | null;

    if (newImage && newImage.size > 0) {
      // Validate new image
      if (!newImage.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Only image files are allowed" },
          { status: 400 }
        );
      }

      if (newImage.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "File size exceeds 5MB limit" },
          { status: 400 }
        );
      }

      // Upload new image to Cloudinary
      const uploadResult = await uploadToCloudinary(newImage);

      // Delete old image from Cloudinary
      if (existingProject.imagePublicId) {
        await deleteFromCloudinary(existingProject.imagePublicId);
      } else if (existingProject.image) {
        // Fallback: try to extract public_id from URL if imagePublicId doesn't exist
        const oldPublicId = extractPublicIdFromUrl(existingProject.image);
        if (oldPublicId) {
          await deleteFromCloudinary(oldPublicId);
        }
      }

      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    }

    const tags = formData.get("tags") as string;
    // Ensure tags is an array
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    // Prepare updated project data
    const updatedProjectData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      image: { url: imageUrl, public_id: imagePublicId },
      tags: tagsArray,
      liveUrl: formData.get("liveUrl") as string,
      githubUrl: formData.get("githubUrl") as string,
      featured: formData.get("featured") === "true",
    };

    // Update project in database
    const updatedProject = await ProjectsModel.findByIdAndUpdate(
      projectId,
      updatedProjectData,
      { new: true } // Return the updated document
    );

    return NextResponse.json(
      {
        success: true,
        msg: "Project updated successfully",
        project: updatedProject,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating project:", err);
    return NextResponse.json(
      { msg: "Error updating project", error: err },
      { status: 500 }
    );
  }
}

// DELETE PROJECT ENDPOINT (Optional - for complete CRUD)
export async function DELETE(request: NextRequest) {
  try {
    const user = await getUserFromRequest();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("id");

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID required" },
        { status: 400 }
      );
    }

    // Find and delete project
    const project = await ProjectsModel.findById(projectId);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Delete image from Cloudinary
    if (project.imagePublicId) {
      await deleteFromCloudinary(project.imagePublicId);
    } else if (project.image) {
      // Fallback: try to extract public_id from URL
      const publicId = extractPublicIdFromUrl(project.image);
      if (publicId) {
        await deleteFromCloudinary(publicId);
      }
    }

    // Delete project from database
    await ProjectsModel.findByIdAndDelete(projectId);

    return NextResponse.json(
      {
        success: true,
        msg: "Project deleted successfully",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting project:", err);
    return NextResponse.json(
      { msg: "Error deleting project", error: err },
      { status: 500 }
    );
  }
}
