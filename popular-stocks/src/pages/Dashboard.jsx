import React from "react";
import MarketCard from "../components/MarketCard";
import GainersList from "../components/GainersList";
import LosersList from "../components/LosersList";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard — QuantShift</h1>

      <div className="dashboard-grid">
        {/* =============== LEFT SIDE — MARKET OVERVIEW =============== */}
        <div className="market-overview-section">
          <h2 className="section-title">Market Overview</h2>

          {/* ===== STOCK INDEX CARDS (Finnhub) ===== */}
          <MarketCard title="S&P 500" symbol="SPY" />
          <MarketCard title="NASDAQ 100" symbol="QQQ" />
          <MarketCard title="Dow Jones" symbol="DIA" />

          {/* ===== CRYPTO CARDS (Binance proxy) ===== */}
          <MarketCard title="Bitcoin" symbol="BINANCE:BTCUSDT" />
          <MarketCard title="Ethereum" symbol="BINANCE:ETHUSDT" />
          <MarketCard title="Solana" symbol="BINANCE:SOLUSDT" />
          <MarketCard title="Cardano" symbol="BINANCE:ADAUSDT" />
        </div>

        {/* =============== RIGHT SIDE — GAINERS & LOSERS =============== */}
        <div className="gainers-losers-section">
          <div className="gainers-section">
            <h2 className="section-title">Top Gainers</h2>
            <GainersList />
          </div>

          <div className="losers-section">
            <h2 className="section-title">Top Losers</h2>
            <LosersList />
          </div>
        </div>
      </div>
    </div>
  );
}

