import { useState, useEffect } from 'react';

// Custom hook for managing dark mode
function useDarkMode() {
  // Retrieve the initial theme from local storage or default to 'light'
  const [theme, setTheme] = useState(() => {
    try {
      const storedTheme = window.localStorage.getItem('theme');
      return storedTheme || 'light';
    } catch (error) {
      console.error('Error reading local storage:', error);
      return 'light';
    }
  });

  // Update local storage whenever the theme changes
  useEffect(() => {
    try {
      window.localStorage.setItem('theme', theme);
      // Apply the theme to the document body
      document.body.className = theme;
    } catch (error) {
      console.error('Error writing local storage:', error);
    }
  }, [theme]);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return [theme, toggleTheme];
}

export default useDarkMode;
