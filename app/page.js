import queryString from "query-string";
import Link from "next/link";
import { NextResponse } from "next/server";

async function getBlogs(searchParams) {
  const urlParams = {
    page: searchParams.page || 1,
  };

  const searchQuery = new URLSearchParams(urlParams).toString();

  const response = await fetch(`${process.env.API}/blog?${searchQuery}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 1 },
  });

  console.log("response", response);
  if (!response.ok) {
    throw new Error("Failed To fetch");
  }

  const data = response.json();
  return data;
}

export default async function Home({ searchParams = { page: "1" } }) {
  const data = await getBlogs(searchParams);
  console.log("data in response", data);
  const { currentPage, totalPages, blogs } = data;

  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  return (
    <main>
      <p className="text-center lead fw-bold">Blogs {blogs?.length}</p>
      <pre>{JSON.stringify(blogs, null, 4)}</pre>
      <div className="d-flex justify-content-center">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {hasPreviousPage && (
              <li className="page-item">
                <Link
                  className="page-link px-3"
                  href={`?page=${currentPage - 1}`}
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
                  <Link className="page-link" href={`?page=${page}`}>
                    {page}
                  </Link>
                </li>
              );
            })}
            {hasNextPage && (
              <li className="page-item">
                <Link
                  className="page-link px-3"
                  href={`?page=${currentPage + 1}`}
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
