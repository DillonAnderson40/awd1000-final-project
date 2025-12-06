import React, { useEffect, useState } from "react";

export default function GainersList() {
  const [gainers, setGainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/gainers")
      .then(r => r.json())
      .then(data => {
        setGainers(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Gainers error:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading gainers...</p>;

  return (
    <div className="mt-3">
      {gainers.slice(0, 5).map((g, idx) => (
        <div
          key={idx}
          className="d-flex justify-content-between p-2 mb-2 rounded"
          style={{
            background: "#11141a",
            border: "1px solid rgba(0,255,0,0.25)",
            color: "#4caf50",
          }}
        >
          <span>{g.symbol}</span>
          <span>+{g.pct.toFixed(2)}%</span>
        </div>
      ))}
    </div>
  );
}

