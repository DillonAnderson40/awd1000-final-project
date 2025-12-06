export default function LosersList() {
  const losers = [
    { symbol: "NVDA", pct: -1.24 },
    { symbol: "AMZN", pct: -0.92 },
    { symbol: "META", pct: -0.71 },
  ];

  return (
    <div className="p-3 rounded" style={{ background: "#111" }}>
      <h4 className="text-light mb-3">Top Losers</h4>

      {losers.map(l => (
        <div key={l.symbol} className="d-flex justify-content-between py-2">
          <span className="text-light">{l.symbol}</span>
          <span style={{ color: "#FF3B30" }}>{l.pct}%</span>
        </div>
      ))}
    </div>
  );
}
