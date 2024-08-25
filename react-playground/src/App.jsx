import React, { useMemo } from 'react';
import useFetch from './useFetch';

function App() {
  const url = 'https://catfact.ninja/fact';
  const options = useMemo(() => ({
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }), []);

  const { data, loading, error, refetch } = useFetch(url, options);

  return (
    <div>
      <h1>Fetched Data</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <pre>{JSON.stringify(data, null, 2)}</pre>
          <button onClick={refetch}>Refetch Data</button>
        </>
      )}
    </div>
  );
}

export default App;
