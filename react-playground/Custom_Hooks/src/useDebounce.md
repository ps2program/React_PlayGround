Creating a custom hook for debouncing is a great way to manage scenarios where you need to delay an action (like an API call) until the user has stopped typing. This helps in reducing the number of unnecessary API requests and improving performance.

### `useDebounce` Custom Hook

The `useDebounce` hook will accept a value and a delay, and return the debounced value after the specified delay.

#### `useDebounce.js`

```javascript
import { useState, useEffect } from 'react';

// Custom hook for debouncing a value
function useDebounce(value, delay) {
  // State to hold the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update the debounced value
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function to clear the timeout if value changes or component unmounts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect if value or delay changes

  return debouncedValue;
}

export default useDebounce;
```

### Explanation

1. **State Management**:
   - `debouncedValue` holds the debounced version of the input value.

2. **Effect Hook**:
   - Sets a timeout to update `debouncedValue` after the specified `delay`.
   - The cleanup function clears the timeout if the value changes or the component unmounts, ensuring that only the most recent timeout is active.

3. **Dependencies**:
   - The `useEffect` hook depends on `value` and `delay`. If either changes, the effect will re-run, setting a new timeout.

### Using `useDebounce` in a Component

Here's how you can use the `useDebounce` hook in a component with a search input:

#### `SearchComponent.js`

```javascript
import React, { useState, useEffect } from 'react';
import useDebounce from './useDebounce'; // Import the custom hook

function SearchComponent() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const debouncedQuery = useDebounce(query, 500); // Debounce with a 500ms delay

  // Effect to fetch data when debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery) {
      // Simulate an API call
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

export default SearchComponent;
```

### Explanation

1. **State Management**:
   - `query` holds the current input value.
   - `results` holds the search results.

2. **Debounce Hook**:
   - `useDebounce` is used to create a debounced version of the `query`.

3. **Effect Hook**:
   - The effect fetches data based on `debouncedQuery` and updates the `results` state.
   - It only triggers the fetch when the `debouncedQuery` has a value and after the debounce delay.

4. **Input Handling**:
   - The input field updates the `query` state on every change.
   - The debounced value is used for the actual API request to minimize the number of calls.

This setup efficiently handles user input and reduces the number of API requests by only sending requests after the user has stopped typing for a specified delay.