import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  FileText,
  Briefcase,
  Route,
  History,
  User,
  Settings,
  LogOut,
  BrainCircuit,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Upload Resume",
      path: "/upload",
      icon: <Upload size={20} />,
    },
    {
      name: "Analysis",
      path: "/analysis",
      icon: <FileText size={20} />,
    },
    {
      name: "Job Match",
      path: "/match-jd",
      icon: <Briefcase size={20} />,
    },
    {
      name: "Roadmap",
      path: "/roadmap",
      icon: <Route size={20} />,
    },
    {
      name: "History",
      path: "/history",
      icon: <History size={20} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={20} />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <BrainCircuit size={30} />
        <span>AI Resume</span>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-user">
        <div className="user-avatar">
          {user?.username?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div className="user-info">
          <h4>{user?.username || "User"}</h4>
          <p>{user?.email || "No Email"}</p>
        </div>
      </div>

      <button className="sidebar-logout" onClick={handleLogout}>
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;