import React, { useEffect, useState } from "react";

const API = "https://quantshift-backend.onrender.com";

export default function LosersList() {
  const [losers, setLosers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLosers();
  }, []);

  async function fetchLosers() {
    try {
      const res = await fetch(`${API}/losers`);
      const data = await res.json();
      setLosers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching losers:", err);
      setLoading(false);
    }
  }

  if (loading) return <p>Loading losers…</p>;

  return (
    <div className="mt-3">
      {losers.slice(0, 5).map((l, i) => (
        <div
          key={i}
          className="d-flex justify-content-between p-2 mb-2 rounded"
          style={{
            background: "#11141a",
            border: "1px solid rgba(255,0,0,0.25)",
            color: "#ff4d4d"
          }}
        >
          <span>{l.symbol}</span>
          <span>{l.pct.toFixed(2)}%</span>
        </div>
      ))}
    </div>
  );
}
