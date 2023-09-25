"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";


export default function BlogLike({ blog }) {
  const { data, status } = useSession();
  const [likes, setLikes] = useState(blog?.likes);
  const router = useRouter();
  const pathname = usePathname();
  console.log("data", data);
  const isLiked = likes?.includes(data?.user?._id);

  const handleLike = async () => {
    if (status != "authenticated") {
        toast.error("please login first");
        router.push(
          `/login?callbackUrl=${process.env.API.replace("/api", "")}${pathname}`
        );
        return;
      }


  
      console.log("status", status);
  
      try {
        if (isLiked) {
            const answer = window.confirm("You liked it. Want to unlike?");
            if (answer) {
                handleUnLike();
            }
        } else {
            const response = await fetch(
                `${process.env.API}/user/blog/like`,
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                      blogId: blog._id
                  }),
                }
              );
              console.log("response", response);
              if (!response.ok) {
                throw new Error(
                  `Failed to like: ${response.status} ${response.statusText}`
                );
              }
              const data = await response.json();
              console.log("blog liked response => ", data);
              setLikes(data.likes);
              toast.success("Blog liked");
              router.refresh(); // only works in server components
        }
        
      } catch (error) {
        console.log(error);
      }
  };

  const handleUnLike = async () => {
    if (status != "authenticated") {
      toast.error("please login first");
      router.push(
        `/login?callbackUrl=${process.env.API.replace("/api", "")}${pathname}`
      );
      return;
    }

    console.log("status", status);

    try {
      console.log("blogid", blog._id);

      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          blogId: blog._id,
        }),
      };

      const response = await fetch(
        `${process.env.API}/user/blog/unlike`,
        options
      );
      console.log("response", response);
      if (!response.ok) {
        throw new Error(
          `Failed to like: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      console.log("blog liked response => ", data);
      setLikes(data.likes);
      toast.success("Blog liked");
      router.refresh(); // only works in server components
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <small className="pointer">
        <span onClick={handleLike}>❤{blog.likes?.length} likes</span>
      </small>
    </>
  );
}
