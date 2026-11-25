import React, { useEffect, useState } from "react";

// useEffect(function, [dependencies]);

function UseEffect() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("red");

  const changeColor = () => {
    setColor((c) => (c === "red" ? "green" : "red"));
  };

  useEffect(() => {
    document.title = `Count: ${count}, ${color}`;
  }, [count, color]);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <p style={{ color: color }}>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Add</button>
      <button onClick={changeColor}>Change color</button>
    </div>
  );
}

export default UseEffect;