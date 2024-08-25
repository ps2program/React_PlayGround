import { useState } from 'react';

// Custom hook for managing local storage
function useLocalStorage(key, initialValue) {
  // Initialize state with value from local storage or initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get item from local storage
      const item = window.localStorage.getItem(key);
      // Parse stored item or return initial value if item is not found
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Handle error (e.g., invalid JSON) and return initial value
      console.error('Error reading local storage:', error);
      return initialValue;
    }
  });

  // Function to update local storage and state
  const setValue = (value) => {
    try {
      // Allow value to be a function that receives the previous state
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;

      // Update local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      // Update state
      setStoredValue(valueToStore);
    } catch (error) {
      // Handle errors (e.g., quota exceeded)
      console.error('Error writing local storage:', error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
