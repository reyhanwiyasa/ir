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
            No results found.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {results.map((res, index) => (
            <li key={index} className="p-0 border-none">
              <a
                href={`/question?q=${encodeURIComponent(res.question)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <p className="text-slate-700 dark:text-slate-200 font-medium">
                  {res.question}
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
