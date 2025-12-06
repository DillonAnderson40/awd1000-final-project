import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditStock() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    ticker: "",
    nickname: "",
    targetPrice: "",
    notes: "",
  });

  // Load the stock by ID when page loads
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("stocks")) || [];
    const stockToEdit = saved.find(s => s.id === id);

    if (!stockToEdit) {
      alert("Stock not found.");
      return navigate("/watchlist");
    }

    setForm({
      ticker: stockToEdit.ticker,
      nickname: stockToEdit.nickname,
      targetPrice: stockToEdit.targetPrice,
      notes: stockToEdit.notes,
    });
  }, [id, navigate]);

  // Handle updating the form
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // Save the updated stock
  function handleSubmit(e) {
    e.preventDefault();

    const saved = JSON.parse(localStorage.getItem("stocks")) || [];

    const updatedList = saved.map(stock =>
      stock.id === id
        ? { ...stock, ...form } // update fields
        : stock
    );

    localStorage.setItem("stocks", JSON.stringify(updatedList));

    navigate("/watchlist");
  }

  return (
    <div className="card p-4 bg-dark text-light">
      <h2>Edit Stock</h2>

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

        <button className="btn btn-primary">Save Changes</button>
      </form>
    </div>
  );
}

