// App.js
import React, { useState } from 'react';
import useGrpc from './useGrpc';

function App() {
  const [name, setName] = useState('World');
  debugger
  const { message, loading, error } = useGrpc(name);

  const handleChange = (e) => setName(e.target.value);

  return (
    <div>
      <h1>gRPC Client Example</h1>
      <input type="text" value={name} onChange={handleChange} />
      <button onClick={() => setName(name)}>Send</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {message && <p>Message: {message}</p>}
    </div>
  );
}

export default App;
