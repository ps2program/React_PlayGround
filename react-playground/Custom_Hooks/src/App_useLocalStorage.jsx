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
