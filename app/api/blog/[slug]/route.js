import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from '@/models/blog'

export async function GET(req,context){
    await dbConnect()
    console.log('req params', context)
    try {
        const blog = await Blog.findOne({slug: context.params.slug}).populate('postedBy','name')
        return NextResponse.json(
            blog, {
                status: 200
            }
        )
    } catch (error) {
        console.log('error', error)
        return NextResponse.json({
            err: 'Blog not found'
        },{
            status: 402
        })
    }
}