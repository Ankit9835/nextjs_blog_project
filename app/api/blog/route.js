import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/blog"
import queryString from "query-string";

export async function GET(req) {
    await dbConnect()
    const searchParams = queryString.parseUrl(req.url).query
    const {page} = searchParams || {}
    const pageSize = 6
    try {
        const currentpage = Number(page) || 1
        const skip = (currentpage - 1) * pageSize
        const totalBlogs = await Blog.countDocuments({})

        const blogs = await Blog.find({}).populate('postedBy','name').skip(skip).limit(pageSize).sort({createdAt: '-1'})

        return NextResponse.json({
            blogs,
            currentpage,
            totalPages: Math.ceil(totalBlogs / pageSize)
        },{
            status:200
        })
        
    } catch (error) {
        console.log(error)
       return NextResponse.json({
            err: 'server error, please try again'
        },{
            status: '500'
        })
    }
}