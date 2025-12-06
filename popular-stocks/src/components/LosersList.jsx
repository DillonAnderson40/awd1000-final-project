export default function LosersList() {
  const losers = [
    { symbol: "META", pct: -1.28 },
    { symbol: "NFLX", pct: -0.94 },
    { symbol: "AMZN", pct: -2.31 },
  ];

  return (
    <div className="mt-3">
      {losers.map((l) => (
        <div
          key={l.symbol}
          className="d-flex justify-content-between p-2 mb-2 rounded bg-dark text-danger"
          style={{
            border: "1px solid rgba(255,0,0,0.2)",
            fontSize: "0.9rem",
          }}
        >
          <span>{l.symbol}</span>
          <span>{l.pct}%</span>
        </div>
      ))}
    </div>
  );
}
