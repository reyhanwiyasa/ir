"use client";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function QuestionDetail() {
  const query = useQuery();
  const question = query.get("q");

  const [answers, setAnswers] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loadingAnswers, setLoadingAnswers] = useState(true);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showDiscussionFlow, setShowDiscussionFlow] = useState(false);

  const loadingMessages = [
    "🤔 Identifying core issue...",
    "💡 Proposing possible solutions...",
    "🧠 Analyzing viewpoints...",
    "📊 Evaluating consensus...",
    "⏳ Finalizing summary...",
  ];

  const formatAnswerText = (text) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 dark:text-emerald-400 hover:underline break-all"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  useEffect(() => {
    async function fetchAnswers() {
      try {
        const res = await fetch(
          "http://143.198.220.249:8000/search/answers-by-exact-question/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              text: question,
              index_name: "my-index",
              page: 1,
              page_size: 10,
            }),
          }
        );

        const data = await res.json();
        setAnswers(data.answers || []);
      } catch (err) {
        console.error("Error fetching answers:", err);
        setAnswers(["Error loading answers."]);
      }
      setLoadingAnswers(false);
    }

    if (question) fetchAnswers();
  }, [question]);

  useEffect(() => {
    if (loadingSummary) {
      setLoadingStep(0);
      const interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev >= loadingMessages.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 1600);
      return () => clearInterval(interval);
    }
  }, [loadingSummary]);

  const handleFetchSummary = async () => {
    setLoadingSummary(true);
    try {
      const res = await fetch(
        "http://143.198.220.249:8000/search/summarize-discussion/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: question,
            index_name: "my-index",
            page: 1,
            page_size: 10,
          }),
        }
      );

      const data = await res.json();
      setSummary(data.analysis);
    } catch (err) {
      console.error("Error fetching summary:", err);
      setSummary({ summary: "Error loading summary." });
    }
    setLoadingSummary(false);
    setShowSummary(true);
  };

  if (!question) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-12 flex items-center justify-center">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 text-center">
          <p className="text-slate-500 dark:text-slate-400 text-lg">
            No question provided.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white leading-relaxed">
            {question}
          </h1>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            💬 Answers
          </h2>

          {loadingAnswers ? (
            <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-slate-200 dark:border-slate-700 border-t-emerald-500"></div>
              <p className="text-slate-600 dark:text-slate-400">
                Loading answers...
              </p>
            </div>
          ) : (
            <div className="relative">
              <div className="max-h-96 overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-slate-100 dark:scrollbar-track-slate-800">
                {answers.map((answer, i) => (
                  <div
                    key={i}
                    className="p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg border-l-4 border-l-emerald-500"
                  >
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed break-words break-all overflow-wrap-anywhere">
                      {formatAnswerText(answer)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 text-sm text-slate-500 dark:text-slate-400 text-center">
                Showing {answers.length} answer{answers.length !== 1 ? "s" : ""}
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
              🤖 AI Summary
            </h2>

            {!showSummary && !loadingSummary && (
              <button
                onClick={handleFetchSummary}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Generate Summary
              </button>
            )}
          </div>

          {loadingSummary && (
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="animate-spin rounded-full h-6 w-6 border-2 border-slate-200 dark:border-slate-700 border-t-emerald-500"></div>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                  Analyzing discussion...
                </p>
              </div>

              <div className="space-y-2">
                {loadingMessages
                  .slice(0, loadingStep + 1)
                  .map((message, index) => (
                    <div
                      key={index}
                      className={`py-2 text-sm transition-all duration-300 ease-in-out ${
                        index === loadingStep
                          ? "text-slate-600 dark:text-slate-400 opacity-100 transform translate-x-0"
                          : "text-slate-500 dark:text-slate-500 opacity-60 transform -translate-x-2"
                      }`}
                    >
                      {message}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {showSummary && summary && !loadingSummary && (
            <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              {/* Summary */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-3">
                  📝 Summary
                </h3>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {summary.summary}
                </p>
              </div>

              {/* Key Points */}
              {summary.key_points && (
                <div className="mb-6">
                  <h4 className="text-base font-semibold text-slate-800 dark:text-white mb-3">
                    🔑 Key Points
                  </h4>
                  <div className="space-y-2">
                    {summary.key_points.map((point, i) => (
                      <div
                        key={i}
                        className="p-3 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700 border-l-4 border-l-emerald-500"
                      >
                        <p className="text-slate-700 dark:text-slate-300 text-sm">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Toggle button */}
              {summary.discussion_flow && (
                <button
                  onClick={() => setShowDiscussionFlow(!showDiscussionFlow)}
                  className="mb-4 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white px-4 py-2 rounded hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm"
                >
                  {showDiscussionFlow
                    ? "Hide Discussion Flow"
                    : "Show Discussion Flow"}
                </button>
              )}

              {/* Conditionally render Discussion Flow */}
              {showDiscussionFlow && summary.discussion_flow && (
                <div>
                  <h4 className="text-base font-semibold text-slate-800 dark:text-white mb-3">
                    🔄 Discussion Flow
                  </h4>
                  <div className="space-y-4">
                    {/* Problem */}
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-red-600 dark:text-red-400 text-sm mb-2">
                        🚨 Problem Identified:
                      </p>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        {summary.discussion_flow.problem_identified}
                      </p>
                    </div>

                    {/* Solutions */}
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-blue-600 dark:text-blue-400 text-sm mb-2">
                        💡 Proposed Solutions:
                      </p>
                      <div className="space-y-1">
                        {summary.discussion_flow.solutions_proposed?.map(
                          (solution, i) => (
                            <div
                              key={i}
                              className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-sm"
                            >
                              <p className="text-slate-700 dark:text-slate-300">
                                • {solution}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Outcome */}
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-emerald-600 dark:text-emerald-400 text-sm mb-2">
                        ✅ Outcome:
                      </p>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        {summary.discussion_flow.final_outcome}
                      </p>
                    </div>

                    {/* Consensus */}
                    <div className="p-4 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                      <p className="font-semibold text-purple-600 dark:text-purple-400 text-sm mb-2">
                        🤝 Community Consensus:
                      </p>
                      {/* Resolution Status */}
                      <div className="p-4 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                        <p className="font-semibold text-yellow-600 dark:text-yellow-400 text-sm mb-2">
                          🧩 Resolution Status:
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 text-sm">
                          {summary.is_resolved
                            ? "Resolved ✅"
                            : "Unresolved ❌"}
                        </p>
                      </div>

                      {/* Confidence */}
                      <div className="p-4 bg-white dark:bg-slate-800 rounded-md border border-slate-200 dark:border-slate-700">
                        <p className="font-semibold text-cyan-600 dark:text-cyan-400 text-sm mb-2">
                          📈 AI Confidence Level:
                        </p>
                        <p className="text-slate-700 dark:text-slate-300 text-sm">
                          {summary.confidence
                            ? `${(summary.confidence * 100).toFixed(1)}%`
                            : "N/A"}
                        </p>
                      </div>

                      <p className="text-slate-700 dark:text-slate-300 text-sm">
                        {summary.discussion_flow.community_consensus}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;
