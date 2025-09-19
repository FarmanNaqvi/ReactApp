import React, { useState, useEffect } from "react";

function App() {
  const [joke, setJoke] = useState(null);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL)   // ✅ use env var
      .then((res) => res.json())
      .then((data) => setJoke(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-2xl shadow-xl text-center max-w-md">
        <h1 className="text-2xl font-bold mb-4">😂 Random Joke App</h1>
        {joke ? (
          <>
            <p className="text-lg font-semibold">{joke.setup}</p>
            <p className="text-blue-600 mt-2">{joke.punchline}</p>
          </>
        ) : (
          <p>Loading joke...</p>
        )}
      </div>
    </div>
  );
}

export default App;
