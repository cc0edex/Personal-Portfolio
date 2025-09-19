import { NextRequest, NextResponse } from "next/server";
import { ConnectDb } from "@/lib/config/db";
import BlogModel from "@/lib/config/models/BlogModel";
import { getUserFromRequest } from "@/lib/auth";
import slugify from "slugify";
// load DB //
const LoadDb = async () => {
  try {
    await ConnectDb();
  } catch (err) {
    console.error("error Loading Db", err);
  }
};
LoadDb();
// GET METHOD ALL BLOGS //
export async function GET(request: NextRequest) {
  const blogs = await BlogModel.find();
  return NextResponse.json({ blogs });
}
// POST METHOD TO CREATE NEW BLOGS //
export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromRequest();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.formData();
    const categories = formData.get("categories") as String;
    const title = formData.get("title") as String;
    // Ensure tags is an array
    const categoriesArray = categories
      .split(",")
      .map((categorie) => categorie.trim())
      .filter((categorie) => categorie.length > 0);
    const blogData = {
      title: title,
      slug: slugify(`${title.trim().split(/\s+/).slice(0, 4).join(" ")}`, {
        lower: true,
        strict: true,
        replacement: "_",
      }),
      excerpt: formData.get("excerpt") as String,
      categories: categoriesArray as String[],
      content: formData.get("content") as String,
    };
    await BlogModel.create(blogData);
    return NextResponse.json(
      {
        success: true,
        msg: "Blog created successfully",
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { msg: "Error Creating Blog", error: err },
      { status: 500 }
    );
  }
}
// PUT METHOD FOR EDIT BLOG ENDPOINT //
export async function PUT(request: NextRequest) {
  try {
    const user = await getUserFromRequest();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const formData = await request.formData();
    const blogId = formData.get("_id") as string;
    const title = formData.get("title") as String;
    // Find existing blog
    const existingBlog = await BlogModel.findById(blogId);
    if (!existingBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }
    const categories = formData.get("categories") as String;
    // Ensure tags is an array
    const categoriesArray = categories
      .split(",")
      .map((categorie) => categorie.trim())
      .filter((categorie) => categorie.length > 0);
    // Prepare updated blog data
    const updatedBlogData = {
      title: title,
      slug: slugify(`${title.trim().split(/\s+/).slice(0, 4).join(" ")}`, {
        lower: true,
        strict: true,
        replacement: "_",
      }),
      excerpt: formData.get("excerpt") as String,
      categories: categoriesArray as String[],
      content: formData.get("content") as String,
    };
    // Update Blog in database
    const updatedBlog = await BlogModel.findByIdAndUpdate(
      blogId,
      updatedBlogData,
      { new: true } // Return the updated document
    );
    return NextResponse.json(
      {
        success: true,
        msg: "Blog updated successfully",
        blog: updatedBlog,
      },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { msg: "Error updating blog", error: err },
      { status: 500 }
    );
  }
}
