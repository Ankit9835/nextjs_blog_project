import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/blog";
import queryString from "query-string";

export async function GET(req){
    await dbConnect()
    const { searchQuery } = queryString.parseUrl(req.url).query;
    
    try {
        const blogs = await Blog.find({
            $or: [
                { title: { $regex: searchQuery, $options: "i" } }, 
                { content: { $regex: searchQuery, $options: "i" } }, 
                { category: { $regex: searchQuery, $options: "i" } }, 
            ]
        }).sort({createdAt: -1})

        console.log('blogs',blogs)

        return NextResponse.json(blogs, {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            err: 'something went wrong'
        },{
            status: 500
        })
    }
}