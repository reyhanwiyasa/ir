export async function searchQuery(query) {
  const response = await fetch("http://152.42.224.69:8000/search/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: query,
      index_name: "my-index",
      page: 1,
      page_size: 5,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }

  return response.json();
}
