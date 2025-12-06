import { useEffect, useState } from "react";

const API_KEY = "d4pljl1r01qjpnb03esgd4pljl1r01qjpnb03et0";

export default function NewsFeed() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  async function loadNews() {
    try {
      const res = await fetch(
        `https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`
      );

      const data = await res.json();

      // Finnhub will return an object containing error text if API key is invalid or rate-limited
      if (!Array.isArray(data)) {
        console.warn("News API returned unexpected data:", data);
        setError("Live news unavailable. Showing mock articles.");
        setNews([
          {
            headline: "Market steady amid investor optimism",
            datetime: Date.now(),
            source: "MockFeed",
          },
          {
            headline: "Tech stocks show early gains",
            datetime: Date.now(),
            source: "MockFeed",
          },
          {
            headline: "Crypto rebounds after mild selloff",
            datetime: Date.now(),
            source: "MockFeed",
          },
        ]);
        return;
      }

      setNews(data.slice(0, 3));
    } catch (err) {
      console.error("News error:", err);
      setError("News unavailable.");
    }
  }

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div className="card bg-dark text-light p-3">
      <h5>News</h5>
      {news.map((n, i) => (
        <div key={i} className="mb-2">
          <strong>{n.headline}</strong>
          <div className="text-muted">{n.source}</div>
        </div>
      ))}
    </div>
  );
}
