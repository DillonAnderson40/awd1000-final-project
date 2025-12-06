export default function Footer() {
  return (
    <footer
      className="text-center py-3 mt-5"
      style={{
        background: "#11141a",
        borderTop: "1px solid #262a33",
        color: "#b5b5b5",
      }}
    >
      <p className="mb-1 fw-semibold" style={{ color: "#e6e6e6" }}>
        © {new Date().getFullYear()} QuantShift
      </p>
      <small style={{ opacity: 0.7 }}>
        Built for AWD1000 React CRUD Final Project
      </small>
    </footer>
  );
}
