import { useEffect, useState } from "react";

const API_KEY = "d4p1lj1r01qjpnb03esgd4plj1r01qjpnb03et0";

export default function NewsFeed() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const url = `https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      setNews(data.slice(0, 5)); // show 5 headlines
    } catch (err) {
      console.error("News error:", err);
    }
  }

  return (
    <div className="p-3 rounded" style={{ background: "#111" }}>
      {news.map((item, i) => (
        <div key={i} className="mb-3">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
            style={{ textDecoration: "none" }}
          >
            {item.headline}
          </a>
          <p className="text-secondary m-0">{item.source}</p>
        </div>
      ))}
    </div>
  );
}
