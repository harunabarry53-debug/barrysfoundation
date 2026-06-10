import { useState, useCallback } from 'react';

export default function JokeGenerator() {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJoke = useCallback(async () => {
    setLoading(true);
    setError(null);
    setJoke(null);

    try {
      const response = await fetch('https://api.api-ninjas.com/v1/jokes?limit=1', {
        method: 'GET',
        headers: {
          'X-Api-Key': import.meta.env.VITE_JOKES_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch joke');
      }

      const data = await response.json();
      if (data.length > 0) {
        setJoke(data[0].joke);
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching the joke');
      console.error('Error fetching joke:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">😂 Joke Generator</h1>

        <div className="bg-gray-100 rounded-lg p-6 min-h-32 mb-6 flex items-center justify-center">
          {loading ? (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-2">Loading joke...</p>
            </div>
          ) : error ? (
            <p className="text-red-600 text-center">{error}</p>
          ) : joke ? (
            <p className="text-gray-700 text-lg leading-relaxed text-center">{joke}</p>
          ) : (
            <p className="text-gray-500 text-center">Click the button to get a joke!</p>
          )}
        </div>

        <button
          onClick={fetchJoke}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
        >
          {loading ? 'Loading...' : 'Get a Joke! 🎉'}
        </button>
      </div>
    </div>
  );
}
