import { useState, useEffect } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch suggestions from the API
  const fetchSuggestions = async (searchQuery) => {
    try {
      const response = await fetch(`/api/products/suggestions?q=${searchQuery}`);
      const data = await response.json();

      if (response.ok) {
        setSuggestions(data.suggestions); // Update suggestions list
        setError(null);
      } else {
        setError(data.message);
        setSuggestions([]);
      }
    } catch (error) {
      setError('Error fetching suggestions: ' + error.message);
      setSuggestions([]);
    }
  };

  // Handle input change and fetch suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 1) {
      setShowSuggestions(true);
      fetchSuggestions(value); // Fetch suggestions when input is more than 1 character
    } else {
      setShowSuggestions(false);
      setSuggestions([]); // Reset suggestions if input is cleared or too short
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.product_name); // Set selected suggestion in input
    setShowSuggestions(false); // Hide suggestions after selection
  };

  return (
    <div className='absolute top-1/2 left-[45%] transform -translate-x-1/2 -translate-y-1/2 text-center'>
      {/* Search Input */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for products"
        className="border p-2 rounded-lg w-full"
      />

      {/* Auto-Suggestions List */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion.product_name}
            </li>
          ))}
        </ul>
      )}

      {/* Error Handling */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SearchBar;
