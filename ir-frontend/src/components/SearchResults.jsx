function SearchResults({ query, results }) {
  if (!query) return null;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-4">
        Results for:{" "}
        <span className="italic text-emerald-600 dark:text-emerald-400">
          {query}
        </span>
      </h2>

      {results.length === 0 ? (
        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            No results found for your query.
          </p>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">
            Try using different keywords or simplifying your search.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {results.map((res, index) => (
            <li
              key={index}
              className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:shadow-md transition-shadow"
            >
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <h3 className="text-lg font-medium text-emerald-600 dark:text-emerald-400 hover:underline mb-1">
                  {res.title}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">
                  {res.url}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {res.snippet}
                </p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
