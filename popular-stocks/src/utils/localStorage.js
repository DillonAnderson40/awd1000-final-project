// Load stocks from localStorage
export function loadStocks() {
  const raw = localStorage.getItem("stocks");
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Save stocks to localStorage
export function saveStocks(stocks) {
  localStorage.setItem("stocks", JSON.stringify(stocks));
}
