import { useState, useEffect, useCallback, useMemo } from 'react';

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize the options object
  const memoizedOptions = useMemo(() => options, [options]);

  // Function to fetch data
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url, memoizedOptions);
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [url, memoizedOptions]);

  // Fetch data initially
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Return data, loading, error, and refetch function
  return { data, loading, error, refetch: fetchData };
}

export default useFetch;
