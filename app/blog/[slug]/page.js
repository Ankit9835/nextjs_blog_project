import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ListBlog from "@/components/blog/ListBlog";
import Link from "next/link";
import BlogLike from "@/components/blog/BlogLike";

dayjs.extend(relativeTime);

async function getBlog(slug) {
  const response = await fetch(`${process.env.API}/blog/${slug}`, {
    method: "GET",
    next: { revalidate: 1 },
  });

  console.log("response", response);
  const data = await response.json();
  return data;
}

export default async function BlogViewpage({ params }) {
    
  const blog = await getBlog(params.slug);
  return (
    <div className="card mb-4">
      <div style={{ height: "200px", overflow: "hidden" }}>
        <img
          src={blog?.image || "/images/default.jpg"}
          className="card-img-top"
          style={{ objectFit: "cover", height: "100%", width: "100%" }}
          alt={blog.title}
        />
      </div>
      <div className="card-body">
        <h5 className="card-title">
          <Link href={`/blog/${blog.slug}`}>{blog.title}</Link>
        </h5>
        <div className="card-text">
          <div>
           {blog.content}
          </div>
        </div>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <small className="text-muted">Category: {blog.category}</small>
        <small className="text-muted">
          Author: {blog.postedBy?.name || "Admin"}
        </small>
      </div>
      <div className="card-footer d-flex justify-content-between">
        {/* <small>💓{blog?.likes?.length} likes</small> */}
        <BlogLike blog={blog}/>
        <small className="text-muted">
          Posted {dayjs(blog.updatedAt).fromNow()}
        </small>
      </div>
    </div>
  );
}
