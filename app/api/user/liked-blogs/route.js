import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import Blog from '@/models/blog';
import dbConnect from "@/utils/dbConnect";

export async function GET(req){
    await dbConnect()
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
     });

     try {
        const blog = await Blog.find({likes: token?.user?._id})
        return NextResponse.json(blog, {
            status: 200
        })
     } catch (error) {
        console.log(error)
        return NextResponse.json({
            err: 'server error'
        },{
            status: 500
        })
     }
}