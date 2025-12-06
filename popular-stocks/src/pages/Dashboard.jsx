import { useEffect, useState } from "react";
import MarketCard from "../components/MarketCard";
import GainersList from "../components/GainersList";
import LosersList from "../components/LosersList";
import NewsFeed from "../components/NewsFeed";
import WatchlistPreview from "../components/WatchlistPreview";

export default function Dashboard() {
  return (
    <div className="container text-light py-4">
      <h2 className="mb-4">Dashboard - QuantShift</h2>

      {/* Market Overview */}
      <h4 className="mt-3">Market Overview</h4>
      <div className="row g-3 mb-4">
        <MarketCard symbol="SPY" name="S&P 500" />
        <MarketCard symbol="QQQ" name="NASDAQ 100" />
        <MarketCard symbol="DIA" name="Dow Jones" />
        <MarketCard symbol="BTC-USD" name="Bitcoin" />
        <MarketCard symbol="ETH-USD" name="Ethereum" />
      </div>

      {/* Movers */}
      <div className="row g-3">
        <div className="col-md-6">
          <GainersList />
        </div>
        <div className="col-md-6">
          <LosersList />
        </div>
      </div>

      {/* Watchlist Preview */}
      <h4 className="mt-5">Your Watchlist Overview</h4>
      <WatchlistPreview />

      {/* News */}
      <h4 className="mt-5">Market News</h4>
      <NewsFeed />
    </div>
  );
}
