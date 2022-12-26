 export function getBearerToken() {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('bearerToken');
      if (storedToken) {
        const tokenAge = (Date.now() - localStorage.getItem('bearerTokenTimestamp')) / 1000 / 60 / 60 / 24;
        if (tokenAge < 5) {
          return storedToken;  // Return the stored token
        } else {
          localStorage.removeItem('bearerToken');
          localStorage.removeItem('bearerTokenTimestamp');
        }
      }
    }
    return '';  // Return an empty string if no token is found in local storage
  }
  