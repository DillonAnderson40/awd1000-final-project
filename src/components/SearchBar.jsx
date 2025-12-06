export default function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-4 position-relative">
      <i 
        className="fa-solid fa-magnifying-glass text-secondary"
        style={{ position: "absolute", top: "10px", left: "12px" }}
      ></i>

      <input
        type="text"
        className="form-control ps-5"
        placeholder="Search by ticker or nickname..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
