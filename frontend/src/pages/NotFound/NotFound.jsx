import "./NotFound.css";

import { Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";

function NotFound() {
  return (
    <div className="notfound-page">

      <div className="notfound-card">

        <AlertTriangle
          size={90}
          className="notfound-icon"
        />

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          The page you are looking for doesn't exist
          or has been moved.
        </p>

        <Link to="/dashboard" className="home-btn">
          <Home size={18} />
          Back to Dashboard
        </Link>

      </div>

    </div>
  );
}

export default NotFound;