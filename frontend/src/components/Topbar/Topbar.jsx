import "./Topbar.css";
import { Search, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Topbar() {
  const { user } = useAuth();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <header className="topbar">

      <div className="topbar-left">
        <h2>
          {greeting},
          <span> {user?.username || "User"} 👋</span>
        </h2>

        <p>
          Welcome back to your AI Career Assistant
        </p>
      </div>

      <div className="topbar-right">

        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Search..."
          />

        </div>

        <button className="notification-btn">

          <Bell size={20} />

          <span className="notification-dot"></span>

        </button>

        <div className="profile-mini">

          <div className="avatar">
           {(user?.username?.charAt(0) || "U").toUpperCase()}
          </div>

          <div>

            <h4>{user?.username}</h4>

            <p>{user?.email}</p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Topbar;