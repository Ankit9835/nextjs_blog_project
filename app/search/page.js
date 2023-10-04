"use client";
import { useEffect } from "react";
import ListBlog from "@/components/blog/ListBlog";
import { useSearchParams } from "next/navigation";
import { useSearch } from "@/context/search";

export default function SearchPage() {
  const { setSearchQuery, searchResults, setSearchResults } = useSearch();

  const searchParams = useSearchParams();
  const query = searchParams.get("searchQuery");

  useEffect(() => {
    if (query) {
      console.log(
        "Got search params in search page => ",
        searchParams.get("searchQuery")
      );
      setSearchQuery(query);
      fetchResultsOnLoad(query);
    }
  }, [query]);

  const fetchResultsOnLoad = async () => {
    try {
      const response = await fetch(
        `${process.env.API}/search?searchQuery=${query}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p>Search result {searchResults.length}</p>
          {/* <pre>{JSON.stringify(searchResults, null, 4)}</pre> */}
          {searchResults ? <ListBlog blogs={searchResults} /> : ""}
        </div>
      </div>
    </div>
  );
}
