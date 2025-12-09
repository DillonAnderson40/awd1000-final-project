import React, { useEffect, useState } from "react";

const API = "https://quantshift-backend.onrender.com";

export default function GainersList() {
  const [gainers, setGainers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGainers();
  }, []);

  async function fetchGainers() {
    try {
      const res = await fetch(`${API}/gainers`);
      const data = await res.json();
      setGainers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching gainers:", err);
      setLoading(false);
    }
  }

  if (loading) return <p>Loading gainers…</p>;

  return (
    <div className="mt-3">
      {gainers.slice(0, 5).map((g, i) => (
        <div
          key={i}
          className="d-flex justify-content-between p-2 mb-2 rounded"
          style={{
            background: "#11141a",
            border: "1px solid rgba(0,255,0,0.25)",
            color: "#4caf50"
          }}
        >
          <span>{g.symbol}</span>
          <span>+{g.pct.toFixed(2)}%</span>
        </div>
      ))}
    </div>
  );
}

