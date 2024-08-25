import { useEffect } from 'react';

// Custom hook for infinite scrolling
function useInfiniteScroll(callback) {
  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      // Check if the user has scrolled to the bottom of the page
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      
      // Trigger the callback to load more data
      callback();
    };

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback]); // Dependency array includes callback to ensure the latest version is used

  // Optionally, you could return some values or functions here if needed
}

export default useInfiniteScroll;
