import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from '@/models/blog'
import { getToken } from "next-auth/jwt";

export async function PUT(req){
    await dbConnect()

    const _req = await req.json()
    const {blogId} = _req

    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    })
    console.log('token',token)
    try {
        const updated = await Blog.findByIdAndUpdate(
            blogId,
            {$pull: {likes: token?.user?._id}},
            {new:true}
        )

        return NextResponse.json(updated, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            err: 'Something went wrong'
        },{
            status: 500
        })        
    }
}