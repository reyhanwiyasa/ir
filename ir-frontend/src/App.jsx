"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { searchQuery } from "./api/search";

function App() {
  const [page, setPage] = useState(1); // ← new
  const [totalPages, setTotalPages] = useState(1);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (input, customPage = 1) => {
    setQuery(input);
    setPage(customPage); // track the current page
    setLoading(true);
    try {
      const data = await searchQuery(input, customPage); // pass page to API call
      setResults(data.results || []);
      setTotalPages(data.total_pages); // also track total pages
    } catch (error) {
      console.error("Search error:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            Forum{" "}
            <span className="text-emerald-600 dark:text-emerald-400">Turu</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Temukan informasi yang Anda butuhkan!
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8">
          <SearchBar onSearch={handleSearch} />

          {loading && (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
            </div>
          )}

          <SearchResults query={query} results={results} />
          {results.length > 0 && (
            <div className="flex justify-between mt-6">
              <button
                disabled={page <= 1}
                onClick={() => handleSearch(query, page - 1)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-slate-600 dark:text-slate-300 self-center">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => handleSearch(query, page + 1)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
