Creating a custom hook for managing authentication state can greatly simplify handling user authentication across your application. The `useAuth` hook can manage login, logout, token storage, and provide the current authentication state.

Here's how to create a `useAuth` hook:

### `useAuth` Custom Hook

#### `useAuth.js`

```javascript
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
```

### Explanation

1. **State Management**:
   - `authState` manages the authentication status and token.

2. **Utility Functions**:
   - `getToken`, `setToken`, and `removeToken` interact with `localStorage` to manage the authentication token.

3. **Effect Hook**:
   - On component mount, the hook checks for a token and updates the authentication state accordingly.

4. **`login` Function**:
   - Updates the token in `localStorage` and sets the authentication state.

5. **`logout` Function**:
   - Removes the token from `localStorage` and updates the authentication state.

### Using `useAuth` in a Component

Here's an example of how you might use the `useAuth` hook in a React component:

#### `App.js`

```javascript
import React from 'react';
import useAuth from './useAuth'; // Import the custom hook

function App() {
  const { authState, login, logout } = useAuth();

  const handleLogin = () => {
    // Simulate login and token retrieval
    const token = 'sample-auth-token';
    login(token);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Authentication State</h1>
      {authState.isAuthenticated ? (
        <div>
          <p>Logged in</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>Not logged in</p>
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;
```

### Explanation

1. **Component Usage**:
   - The component uses `useAuth` to manage authentication state.
   - `handleLogin` and `handleLogout` functions simulate login and logout actions.

2. **Conditional Rendering**:
   - Displays different UI based on the authentication state.

This setup provides a clean and centralized way to handle authentication state across your application, making it easier to manage and use authentication-related functionality.