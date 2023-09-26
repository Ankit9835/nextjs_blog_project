"use client";
import { useState, useEffect } from "react";
import ListBlog from "@/components/blog/ListBlog";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";

export default function UserDashboard() {
  const [likedBlog, setLikedBlog] = useState([]);
  const fetchLikedBlog = async () => {
    try {
      const response = await fetch(`${process.env.API}/user/liked-blogs`);
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      console.log("data", data);
      setLikedBlog(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLikedBlog();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="lead">
            Liked Blogs
          </p>
          <br />
          <ListBlog blogs={likedBlog}/>
        </div>
      </div>
    </div>
  );
}
