import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { ConnectDb } from "@/lib/config/db";
import SettingsModel from "@/lib/config/models/SettingsModel";
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
// load DB //
const LoadDb = async () => {
  try {
    await ConnectDb();
  } catch (err) {
    console.error("error Loading Db", err);
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
LoadDb();

// GET METHOD FOR SETTINGS //
export async function GET(request: NextRequest) {
  const settings = await SettingsModel.find();
  return NextResponse.json({ settings });
}
// PUT METHOD FOR ABOUT //
export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromRequest();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.formData();
    const profileImg = formData.get("profileImg") as File | null;

    // Get existing settings first
    const existingSettings = await SettingsModel.findOne({});

    // Prepare data object with form fields
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      location: formData.get("location") as string,
      phone: formData.get("phone") as string,
      cvLink: formData.get("cvLink") as string,
      profileImg: existingSettings?.profileImg || null,
      bio: formData.get("bio") as string,
      about: formData.get("about") as string,
      siteTitle: formData.get("siteTitle") as string,
      siteDescription: formData.get("siteDescription") as string,
      facebookUrl: formData.get("facebookUrl") as string,
      githubUrl: formData.get("githubUrl") as string,
      linkedinUrl: formData.get("linkedinUrl") as string,
      twitterUrl: formData.get("twitterUrl") as string,
    };

    // Handle profile image upload if provided
    if (profileImg && profileImg.size > 0) {
      // Validate file type
      if (!profileImg.type.startsWith("image/")) {
        return NextResponse.json(
          { error: "Only image files are allowed" },
          { status: 400 }
        );
      }

      // Validate file size
      if (profileImg.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "File size exceeds 5MB limit" },
          { status: 400 }
        );
      }

      // If updating existing settings and there's an old image, delete it from Cloudinary
      if (existingSettings?.profileImg?.public_id) {
        try {
          await deleteFromCloudinary(existingSettings.profileImg.public_id);
        } catch (deleteError) {
          console.warn(
            "Failed to delete old image from Cloudinary:",
            deleteError
          );
          // Continue with upload even if deletion fails
        }
      }

      // Upload new image to Cloudinary
      const uploadResult = await uploadToCloudinary(profileImg);

      // Add profileImg to data object
      data.profileImg = {
        url: uploadResult.secure_url,
        public_id: uploadResult.public_id,
      };
    } else if (existingSettings?.profileImg) {
      // Keep existing image if no new image is uploaded
      data.profileImg = existingSettings.profileImg;
    }

    // Update or create settings
    if (existingSettings) {
      await SettingsModel.updateOne({}, data);
      return NextResponse.json(
        { success: true, msg: "Settings section updated successfully" },
        { status: 200 }
      );
    } else {
      await SettingsModel.create(data);
      return NextResponse.json(
        { success: true, msg: "Settings section created successfully" },
        { status: 200 }
      );
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error message:", err.message);
    } else {
      console.error("An unknown error occurred:", err);
    }
    return NextResponse.json({ msg: "error somewhere", err }, { status: 400 });
  }
}
