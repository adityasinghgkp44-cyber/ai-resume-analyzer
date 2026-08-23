import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, BrainCircuit } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { isAuthenticated, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="navbar-logo">
        <BrainCircuit size={34} />
        <span>AI Resume Analyzer</span>
      </div>

      <div className={`navbar-links ${menuOpen ? "active" : ""}`}>

        <a href="#home">Home</a>

        <a href="#features">Features</a>

        <a href="#how">How It Works</a>

        <a href="#faq">FAQ</a>

        <a href="#contact">Contact</a>

        {isAuthenticated ? (
          <>
            <Link to="/dashboard">Dashboard</Link>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link
              className="register-btn"
              to="/register"
            >
              Register
            </Link>
          </>
        )}

      </div>

      <button
        className="mobile-menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

    </nav>
  );
}

export default Navbar;