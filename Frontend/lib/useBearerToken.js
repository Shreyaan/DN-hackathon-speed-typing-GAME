import { useState, useEffect } from 'react';

function useBearerToken(initialValue) {
  const [bearerToken, setBearerToken] = useState(initialValue);

  function checkAndRetrieveToken() {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('bearerToken');
      if (storedToken) {
        const tokenAge = (Date.now() - localStorage.getItem('bearerTokenTimestamp')) / 1000 / 60 / 60 / 24;
        if (tokenAge < 5) {
          console.log(121, storedToken);
          setBearerToken(storedToken);  // Call the function to update the value of bearerToken
        } else {
          localStorage.removeItem('bearerToken');
          localStorage.removeItem('bearerTokenTimestamp');
        }
      }
    }
  }

  useEffect(() => {
    checkAndRetrieveToken();
  }, []);  // Run this effect only once on mount

  useEffect(() => {
    console.log(123, bearerToken);  // Log the updated value of bearerToken
  }, [bearerToken]);  // Only run this effect when bearerToken is updated

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bearerToken', bearerToken);
      localStorage.setItem('bearerTokenTimestamp', Date.now());
    }
  }, [bearerToken]);

  return [bearerToken, setBearerToken];
}

export default useBearerToken;
