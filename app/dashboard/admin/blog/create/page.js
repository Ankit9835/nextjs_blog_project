"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function AdminBlogCreate() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET);
      try {
        const response = await fetch(process.env.CLOUDINARY_URL, {
          method: "POST",
          body: formData,
        });
        console.log("response", response);
        if (response.ok) {
          const data = await response.json();
          setImage(data.secure_url);
        } else {
          console.log("Image upload failed");
        }
      } catch (err) {
        console.log("Error uploading image:", err);
      }
      setLoading(false);
    }
  };

  const createBlog = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/admin/blog`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            category,
            image,
          }),
        }
      );
      if (response.ok) {
        router.push("/dashboard/admin");
        toast.success("Blog created successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.err);
      }
    } catch (err) {
      console.log("err => ", err);
      toast.error("An error occurred while creating the blog");
    }
  };

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col">
          <p>Create Blog</p>
          <label className="text-secondary">Blog title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control p-2 my-2"
          />
          <label className="text-secondary">Blog content</label>
          <ReactQuill
            className="border rounded my-2"
            value={content}
            onChange={setContent}
          />
          <label className="text-secondary">Blog category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="form-control p-2 my-2"
          />
          {image && (
            <img src={image} alt="preview" style={{ width: "100px" }} />
          )}
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-outline-secondary">
              <label className="mt-2" htmlFor="upload-button">
                {loading ? "Uploading..." : "Upload image"}
              </label>
              <input
                id="upload-button"
                type="file"
                accept="image/*"
                hidden
                onChange={uploadImage}
              />
            </button>
            <button className="btn bg-primary text-light" onClick={createBlog}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
