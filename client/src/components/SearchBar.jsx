import { useState, useMemo } from "react";
import axios from "axios";
import { API } from "../api";

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultsCache, setResultsCache] = useState({});

  const memoizedResults = useMemo(
    () => resultsCache[query],
    [query, resultsCache]
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    if (memoizedResults) {
      onSearchResults(memoizedResults);
      return;
    }

    console.log("Searching for videos...");
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API}/videos/search?query=${encodeURIComponent(query)}`
      );
      setResultsCache((prevCache) => ({
        ...prevCache,
        [query]: response.data.data,
      }));
      onSearchResults(response.data.data);
    } catch (error) {
      console.error("Error searching videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 sm:px-0">
      <form onSubmit={handleSearch} className="relative group">
        <div className="relative">
          <input
            type="text"
            placeholder="Search videos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-3 sm:py-4 pl-4 sm:pl-6 pr-16 sm:pr-32 text-base sm:text-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-700 rounded-full focus:outline-none focus:border-blue-400 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-300 shadow-lg focus:shadow-xl group-hover:shadow-xl"
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`absolute right-2 top-1/2 -translate-y-1/2 px-3 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              isLoading
                ? "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl active:scale-95"
            }`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span className="hidden sm:inline">Searching</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="hidden sm:inline">Search</span>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
