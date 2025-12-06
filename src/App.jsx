import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Watchlist from "./pages/Watchlist";
import AddStock from "./pages/AddStock";
import EditStock from "./pages/EditStock";
import Dashboard from "./pages/Dashboard";

// 🔥 NEW PAGE
import WSBFeed from "./pages/WSBFeed";

import "./App.css";

function App() {
  return (
    <Router>
      <Header />

      <main className="container mt-4">
        <Routes>
          {/* Default Landing Page */}
          <Route path="/" element={<Dashboard />} />

          {/* CRUD Pages */}
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/add" element={<AddStock />} />
          <Route path="/edit/:id" element={<EditStock />} />

          {/* 🔥 NEW ROUTE FOR WALLSTREETBETS */}
          <Route path="/wallstreetbets" element={<WSBFeed />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;

