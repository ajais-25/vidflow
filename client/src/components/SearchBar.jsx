import { useState } from "react";
import axios from "axios";
import { API } from "../api";

const SearchBar = ({ onSearchResults }) => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${API}/videos/search?query=${encodeURIComponent(query)}`
      );
      onSearchResults(response.data.data);
    } catch (error) {
      console.error("Error searching videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center my-4">
      <form onSubmit={handleSearch} className="flex w-full max-w-lg">
        <input
          type="text"
          placeholder="Search videos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none dark:bg-gray-800 dark:text-white dark:border-gray-600"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`p-2 bg-blue-500 text-white rounded-r-md ${
            isLoading ? "cursor-not-allowed bg-gray-400" : "hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
