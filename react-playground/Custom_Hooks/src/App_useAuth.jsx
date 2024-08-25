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
