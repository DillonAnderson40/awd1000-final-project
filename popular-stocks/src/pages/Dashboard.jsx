import React from "react";
import MarketCard from "../components/MarketCard";
import GainersList from "../components/GainersList";
import LosersList from "../components/LosersList";
import NewsFeed from "../components/NewsFeed";

export default function Dashboard() {
  const marketSymbols = [
    { symbol: "SPY", name: "S&P 500" },
    { symbol: "QQQ", name: "NASDAQ 100" },
    { symbol: "DIA", name: "Dow Jones" },
    { symbol: "BTCUSDT", name: "Bitcoin" },
    { symbol: "ETHUSDT", name: "Ethereum" },
  ];

  return (
    <div className="dashboard-container">
      <h1>Dashboard - QuantShift</h1>

      <div className="dashboard-grid">
        {/* LEFT COLUMN */}
        <section className="left-column">
          <h2>Market Overview</h2>

          {marketSymbols.map((item) => (
            <MarketCard
              key={item.symbol}
              symbol={item.symbol}
              name={item.name}
            />
          ))}
        </section>

        {/* RIGHT COLUMN */}
        <section className="right-column">
          <h2>Top Gainers</h2>
          <GainersList />

          <h2 style={{ marginTop: "2rem" }}>Top Losers</h2>
          <LosersList />
        </section>

        {/* FULL-WIDTH NEWS */}
        <section className="news-section">
          <h2>News</h2>
          <NewsFeed />
        </section>
      </div>
    </div>
  );
}

