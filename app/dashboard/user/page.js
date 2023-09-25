"use-client"
import { useState } from "react"
import { useEffect } from "react"
import ListBlog from "@/components/blog/ListBlog"
import { NextResponse } from "next/server"
import toast from "react-hot-toast"

const [likedBlog, setLikedBlog] = useState([])

const fetchLikedBlog = async () => {
    try {
        const response = await fetch(`${process.env.API}/user/liked-blogs`)
        console.log('response',response)
        if(!response.ok){
           throw new Error('Failed to fetch blogs')
        }
        const data = await response.json()
        setLikedBlog(response.data)        
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {
    fetchLikedBlog()
},[])



export default function UserDashboard() {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <p className="lead"> Dashboard </p>
                </div>
            </div>
        </div>
    )
}