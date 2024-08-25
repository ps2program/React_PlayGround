// useGeolocation.js
import { useState, useEffect } from 'react';

function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if Geolocation API is available
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
      return;
    }

    // Define success and error handlers
    const successHandler = (position) => {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLoading(false);
    };

    const errorHandler = (error) => {
      setError(error.message);
      setLoading(false);
    };

    // Request the user's position
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);

    // Cleanup function
    return () => {
      // No specific cleanup needed for Geolocation API in this case
    };
  }, []);

  return { position, error, loading };
}

export default useGeolocation;
