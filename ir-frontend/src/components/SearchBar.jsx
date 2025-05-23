"use client";

import { useState } from "react";
import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your query..."
          className="w-full p-4 pl-12 pr-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
        />
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
          <Search size={18} />
        </div>
      </div>
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-md transition-colors"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
