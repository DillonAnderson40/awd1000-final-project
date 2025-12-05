import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddStock() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    ticker: "",
    nickname: "",
    targetPrice: "",
    notes: "",
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newStock = {
      id: crypto.randomUUID(),
      ...form,
      dateAdded: new Date().toISOString()
    };

    const existing = JSON.parse(localStorage.getItem("stocks")) || [];
    const updated = [...existing, newStock];

    localStorage.setItem("stocks", JSON.stringify(updated));

    navigate("/watchlist");
  }

  return (
    <div className="card p-4 bg-dark text-light">
      <h2>Add New Stock</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Ticker Symbol</label>
          <input 
            name="ticker"
            className="form-control"
            value={form.ticker}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Nickname</label>
          <input 
            name="nickname"
            className="form-control"
            value={form.nickname}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Target Price</label>
          <input 
            name="targetPrice"
            type="number"
            className="form-control"
            value={form.targetPrice}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Notes</label>
          <textarea
            name="notes"
            className="form-control"
            value={form.notes}
            onChange={handleChange}
          ></textarea>
        </div>

        <button className="btn btn-primary">Add Stock</button>
      </form>
    </div>
  );
}