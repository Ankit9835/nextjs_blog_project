import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ListBlog from "@/components/blog/ListBlog";

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
    
  const blogs = await getBlog(params.slug);
  return (
    <main>
      <p className="text-center lead fw-bold">Blogs</p>
      <ListBlog blogs={blogs} />
      {/* <pre>{JSON.stringify(blogs, null, 4)}</pre> */}
      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {hasPreviousPage && (
              <li className="page-item">
                <Link
                  className="page-link px-3"
                  href={`/?page=${currentPage - 1}`}
                  as={`/?page=${currentPage - 1}`}
                >
                  Previous
                </Link>
              </li>
            )}
            {Array.from({ length: totalPages }, (_, index) => {
              const page = index + 1;
              return (
                <li
                  key={page}
                  className={`page-item${
                    currentPage === page ? " active" : ""
                  }`}
                >
                  <Link
                    className="page-link"
                    href={`/?page=${page}`}
                    // use 'as' to avoid interpreting it as a separate
                    route
                    as={`/?page=${page}`}
                  >
                    {page}
                  </Link>
                </li>
              );
            })}
            {hasNextPage && (
              <li className="page-item">
                <Link
                  className="page-link px-3"
                  href={`/?page=${currentPage + 1}`}
                  as={`/?page=${currentPage + 1}`}
                >
                  Next
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </main>
  );
}
