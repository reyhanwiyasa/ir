"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import { searchQuery } from "./api/search";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (input) => {
    setQuery(input);
    setLoading(true);
    try {
      const data = await searchQuery(input);
      setResults(data.results || []);
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
            IR{" "}
            <span className="text-emerald-600 dark:text-emerald-400">
              Search
            </span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Find what you're looking for
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
        </div>
      </div>
    </div>
  );
}

export default App;
