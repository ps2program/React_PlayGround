import React from 'react';
import useDarkMode from './useDarkMode'; // Import the custom hook

function App() {
  const [theme, toggleTheme] = useDarkMode();

  return (
    <div>
      <h1>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      <p>Content goes here...</p>
    </div>
  );
}

export default App;
