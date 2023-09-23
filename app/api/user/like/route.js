import { NextResponse } from "next";
import dbConnect from "@/utils/dbConnect";
import Blog from '@/models/blog'
import {getToken} from 'next-auth/jwt'

export async function PUT(req){
    await dbConnect()

    const _req = req.json()
    const {blogId} = _req
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    })

    try {
        const blog = await Blog.findByIdAndUpdate(
            blogId,
            {$addToSet: {likes: token.user._id}},
            {new: true}
        )

        return NextResponse.json(
            blog, {
                status: 200
            }
        )
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            err: 'something went wrong'
        },{
            status: 500
        })
    }
}