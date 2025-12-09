import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AddStock() {
  const navigate = useNavigate();
  const location = useLocation();

  // If editing, stock data will be in location.state.stock
  const stockToEdit = location.state?.stock || null;

  const [form, setForm] = useState({
    ticker: "",
    nickname: "",
    targetPrice: "",
    notes: "",
  });

  // Load existing stock into form when editing
  useEffect(() => {
    if (stockToEdit) {
      setForm({
        ticker: stockToEdit.ticker,
        nickname: stockToEdit.nickname,
        targetPrice: stockToEdit.targetPrice,
        notes: stockToEdit.notes || "",
      });
    }
  }, [stockToEdit]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("stocks")) || [];

    if (stockToEdit) {
      // ⭐ EDIT EXISTING STOCK
      const updated = existing.map((s) =>
        s.id === stockToEdit.id
          ? { ...stockToEdit, ...form }
          : s
      );

      localStorage.setItem("stocks", JSON.stringify(updated));
    } else {
      // ⭐ ADD NEW STOCK
      const newStock = {
        id: crypto.randomUUID(),
        ...form,
        dateAdded: new Date().toISOString(),
      };

      const updated = [...existing, newStock];
      localStorage.setItem("stocks", JSON.stringify(updated));
    }

    navigate("/watchlist");
  }

  return (
    <div className="card p-4 bg-dark text-light">
      <h2>{stockToEdit ? "Edit Stock" : "Add New Stock"}</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Ticker Symbol</label>
          <input
            name="ticker"
            className="form-control"
            value={form.ticker}
            onChange={handleChange}
            required
            disabled={!!stockToEdit} // Disable ticker when editing
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

        <button className="btn btn-primary">
          {stockToEdit ? "Save Changes" : "Add Stock"}
        </button>
      </form>
    </div>
  );
}
