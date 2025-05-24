export async function searchQuery(query, page = 1) {
  const response = await fetch("http://143.198.220.249:8000/search/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: query,
      index_name: "my-index",
      page: page,
      page_size: 5,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }

  return response.json();
}
