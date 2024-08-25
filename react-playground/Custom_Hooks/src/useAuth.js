import { useState, useEffect, useCallback } from 'react';

// Utility functions for interacting with localStorage or cookies
const getToken = () => localStorage.getItem('authToken');
const setToken = (token) => localStorage.setItem('authToken', token);
const removeToken = () => localStorage.removeItem('authToken');

// Custom hook for authentication
function useAuth() {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    token: getToken(),
  });

  // Check authentication status on component mount
  useEffect(() => {
    const token = getToken();
    if (token) {
      // Validate token or fetch user data
      setAuthState({
        isAuthenticated: true,
        token,
      });
    }
  }, []);

  // Handle login
  const login = useCallback((token) => {
    setToken(token);
    setAuthState({
      isAuthenticated: true,
      token,
    });
  }, []);

  // Handle logout
  const logout = useCallback(() => {
    removeToken();
    setAuthState({
      isAuthenticated: false,
      token: null,
    });
  }, []);

  // Return authentication state and functions
  return {
    authState,
    login,
    logout,
  };
}

export default useAuth;


/**
 * Explanation
State Management:

authState manages the authentication status and token.
Utility Functions:

getToken, setToken, and removeToken interact with localStorage to manage the authentication token.
Effect Hook:

On component mount, the hook checks for a token and updates the authentication state accordingly.
login Function:

Updates the token in localStorage and sets the authentication state.
logout Function:

Removes the token from localStorage and updates the authentication state.
 * 
 * 
 */