import React, { useState, useCallback } from 'react';
import useInfiniteScroll from './useInfiniteScroll'; // Import the custom hook

const fetchMoreData = async () => {
  // Simulate fetching data from an API
  const response = await fetch('https://official-joke-api.appspot.com/random_joke');
  debugger;
  const data = await response.json();
  return data;
};

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreData = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const newItems = await fetchMoreData();
      setItems((prevItems) => [...prevItems, ...[newItems]]);
      setHasMore(newItems.length > 0); // Check if more data is available
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setLoading(false);
    }
  });

  useInfiniteScroll(loadMoreData); // Use the custom hook

  return (
    <div>
      <h1>Infinite Scrolling</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.setup}</li>
        ))}
      </ul>
      {loading && <p>Loading...</p>}
      {!hasMore && <p>No more items to load</p>}
    </div>
  );
}

export default App;
