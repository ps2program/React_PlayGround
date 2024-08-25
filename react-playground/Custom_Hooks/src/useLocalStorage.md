Creating a custom hook for managing local storage can simplify how you interact with local storage across different components. The `useLocalStorage` hook will provide a clean interface to get and set items in local storage and manage their state.

### `useLocalStorage` Custom Hook

Here's how to create a `useLocalStorage` hook:

#### `useLocalStorage.js`

```javascript
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
```

### Explanation

1. **State Initialization**:
   - `useLocalStorage` initializes the state with the value from local storage if available, or the `initialValue` otherwise.

2. **Get and Set Value**:
   - `setValue` updates both the local storage and the state.
   - It handles cases where `value` could be a function that receives the previous state.

3. **Error Handling**:
   - The hook includes error handling for issues like invalid JSON or local storage quota exceeded.

### Using `useLocalStorage` in a Component

Here's an example of how to use the `useLocalStorage` hook in a component:

#### `App.js`

```javascript
import React from 'react';
import useLocalStorage from './useLocalStorage'; // Import the custom hook

function App() {
  // Use the custom hook with a key and initial value
  const [name, setName] = useLocalStorage('name', 'John Doe');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div>
      <h1>Manage Local Storage</h1>
      <input
        type="text"
        value={name}
        onChange={handleChange}
        placeholder="Enter your name"
      />
      <p><strong>Stored Name:</strong> {name}</p>
    </div>
  );
}

export default App;
```

### Explanation

1. **Component Usage**:
   - The component uses `useLocalStorage` to manage a `name` value in local storage.
   - `name` is initialized to `'John Doe'` and can be updated through an input field.

2. **Input Handling**:
   - `handleChange` updates the `name` state and local storage whenever the input value changes.

3. **Display Stored Value**:
   - The current value of `name` is displayed below the input field.

This setup allows you to manage local storage in a reusable and clean way, making it easier to share state across components without directly interacting with the `localStorage` API in each component.