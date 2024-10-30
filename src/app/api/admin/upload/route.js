// app/api/admin/upload/route.js
import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const { image } = await req.json();

  try {
    const uploadResponse = await cloudinary.v2.uploader.upload(image, {
      upload_preset: "my_upload_preset",
    });
    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error("Error uploading image:", error);
    return new NextResponse("Failed to upload image", { status: 500 });
  }
}