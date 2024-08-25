import React, { useState, useEffect } from 'react';
import useDebounce from './useDebounce'; // Import the custom hook

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query, 500); // Debounce with a 500ms delay

  // Effect to fetch data when debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery) {
      // Simulate an API call, here paste some working end point, use LLM if required, local one
      fetch(`https://api.example.com/search?q=${debouncedQuery}`)
        .then(response => response.json())
        .then(data => setResults(data.results))
        .catch(error => console.error('Error fetching data:', error));
    } else {
      setResults([]);
    }
  }, [debouncedQuery]); // Effect runs when debouncedQuery changes

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
