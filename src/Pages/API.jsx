import React, { useEffect, useState } from "react";

function API() {
  const [joke, setJoke] = useState(null);
  const [guess, setGuess] = useState("");
  const [showPunchline, setShowPunchline] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=twopart");
      const data = await response.json();
      setJoke(data);
      setGuess("");
      setShowPunchline(false);
      setResult("");
    } catch (error) {
      console.log("Error fetching data:", error);
      setResult("Could not load a joke. Try clicking Generate joke again.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const generateJoke = () => {
    fetchData();
  };

  const checkGuess = (e) => {
    e.preventDefault();
    if (!joke || !guess.trim() || showPunchline) return;

    setShowPunchline(true);

    if (joke.delivery.toLowerCase().includes(guess.trim().toLowerCase())) {
      setScore((prev) => prev + 1);
      setResult("Correct! +1 point");
    } else {
      setResult("Wrong guess! See the punchline below.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>API Joke Game</h1>
      <p>Score: {score}</p>

      <button onClick={generateJoke}>Generate joke</button>

      {/* Displayed API Data */}
      <p>Type: {joke?.category}</p>
      <p>Setup: {joke?.setup}</p>
      <p>Punchline: {showPunchline ? joke?.delivery : "???"}</p>

      {/* Simple Minigame */}
      <form onSubmit={checkGuess}>
        <input
          type="text"
          placeholder="Guess a word in the punchline..."
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button type="submit">Check Guess</button>
      </form>

      {result && <p>{result}</p>}
    </div>
  );
}

export default API;