export default function GainersList() {
  const gainers = [
    { symbol: "AAPL", pct: +2.15 },
    { symbol: "MSFT", pct: +1.98 },
    { symbol: "TSLA", pct: +4.45 },
  ];

  return (
    <div className="mt-3">
      {gainers.map((g) => (
        <div
          key={g.symbol}
          className="d-flex justify-content-between p-2 mb-2 rounded bg-dark text-success"
          style={{
            border: "1px solid rgba(0,255,0,0.2)",
            fontSize: "0.9rem",
          }}
        >
          <span>{g.symbol}</span>
          <span>+{g.pct}%</span>
        </div>
      ))}
    </div>
  );
}
