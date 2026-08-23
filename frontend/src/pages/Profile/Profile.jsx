import "./Profile.css";

import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { User, Mail, Shield, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <DashboardLayout>
      <div className="profile-page">

        <div className="profile-card">

          <div className="profile-avatar">
            {user?.username?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <h1>{user?.username}</h1>

          <p>AI Resume Analyzer User</p>

          <div className="profile-info">

            <div className="info-item">
              <User size={20} />
              <span>{user?.username}</span>
            </div>

            <div className="info-item">
              <Mail size={20} />
              <span>{user?.email}</span>
            </div>

            <div className="info-item">
              <Shield size={20} />
              <span>Authenticated Account</span>
            </div>

          </div>

          <button
            className="logout-btn-profile"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Profile;