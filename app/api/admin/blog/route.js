import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/blog";
import slugify from "slugify";
import { getToken } from "next-auth/jwt";

export async function GET(request) {
  return NextResponse.json({ message: "Hello from Blog GET endpoint" });
}

export async function POST(req) {
  const _req = await req.json();
  console.log("_req => ", _req);
  await dbConnect();
  try {
    const { title, content, category, image } = _req;
    // Check if required fields are filled
    switch (true) {
      case !title:
        return NextResponse.json({ err: "Title is required" }, { status: 400 });
      case !content:
        return NextResponse.json(
          { err: "Content is required" },
          { status: 400 }
        );
      case !category:
        return NextResponse.json(
          { err: "Category is required" },
          { status: 400 }
        );
    }
    // Check if blog with that title already exists
    const existingBlog = await Blog.findOne({
      slug: slugify(title?.toLowerCase()),
    });
    // get token to get current user's id
    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });
    if (existingBlog) {
      return NextResponse.json(
        {
          err: "Blog with that title already exists",
        },
        { status: 409 }
      );
    } else {
      const blog = await Blog.create({
        title,
        content,
        category,
        image: image ? image : null,
        postedBy: token.user._id,
        slug: slugify(title?.toLowerCase()),
      });
      return NextResponse.json(blog, { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: "Server error. Please try again.",
      },
      { status: 500 }
    );
  }

  //   const _req = await req.json();
  //   await dbConnect();
  //   try {
  //     const { title, content, category, image } = _req;
  //     switch (true) {
  //       case !title:
  //         return NextResponse.json({ err: "Title is required" }, { status: 400 });
  //       case !content:
  //         return NextResponse.json(
  //           { err: "Content is required" },
  //           { status: 400 }
  //         );
  //       case !category:
  //         return NextResponse.json(
  //           { err: "Category is required" },
  //           { status: 400 }
  //         );
  //     }

  //     const existingBlog = await Blog.findOne({
  //       slug: slugify(title?.toLowerCase()),
  //     });

  //     const token = await getToken({
  //       req,
  //       secret: process.env.NEXTAUTH_SECRET,
  //     });

  //     if (existingBlog) {
  //       return NextResponse.json(
  //         {
  //           err: "Blog already exists",
  //         },
  //         {
  //           status: 409,
  //         }
  //       );
  //     } else {
  //       const blog = await Blog.create({
  //         title,
  //         content,
  //         category,
  //         image: image ? image : null,
  //         postedBy: token.user._id,
  //         slug: slugify(title?.toLowerCase()),
  //       });
  //       return NextResponse.json(blog, { status: 200 });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     return NextResponse.json(
  //       {
  //         err: "Server error. Please try again.",
  //       },
  //       { status: 500 }
  //     );
  //   }
}
