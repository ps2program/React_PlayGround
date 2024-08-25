// App.js
import React from 'react';
import useGeolocation from './useGeolocation'; // Adjust the path as needed

function App() {
  const { position, error, loading } = useGeolocation();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Users Geolocation</h1>
      {position ? (
        <div>
          <p>Latitude: {position.latitude}</p>
          <p>Longitude: {position.longitude}</p>
        </div>
      ) : (
        <p>Location not available</p>
      )}
    </div>
  );
}

export default App;
