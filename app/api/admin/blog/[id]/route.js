import { NextResponse } from "next/server";
import dbConnect from '@/utils/dbConnect'
import Blog from '@/models/blog'

export async function PUT(req,context){
    await dbConnect();
    const _req = await req.json();
    console.log('req',_req)
    try {
        const blog = await Blog.findByIdAndUpdate(context.params.id, {
            ..._req
        }, {
            new: true
        })

        if(!blog){
           return resizeBy.status(404).json({
                error: 'Blog not found'
           })
        }

        return NextResponse.json(blog, {
            status: 200
        })
    } catch (error) {
        console.log(error)
        NextResponse.json({
            err: 'Something went wrong'
        },{
            status: 500
        })
    }
}

export async function DELETE(req, context){
    await dbConnect()
    console.log('id', context.params)
    try {
        const blog = Blog.findByIdAndDelete(context.params.id)
        if(!blog){
            return resizeBy.status(404).json({
                error: 'Blog not found'
            })
        }  
        return NextResponse.json(blog, {
            status: 200
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            err: 'something went wrong'
        }, {
            status: 500
        })
    }
}