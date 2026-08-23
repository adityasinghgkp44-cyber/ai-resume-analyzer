import "./Settings.css";

import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  Moon,
  Sun,
  Bell,
  Shield,
  Save,
} from "lucide-react";
import { toast } from "react-hot-toast";

function Settings() {
  const { user } = useAuth();

  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <DashboardLayout>
      <div className="settings-page">

        <h1>Settings</h1>

        <div className="settings-card">

          <div className="setting-row">

            <div className="setting-info">
              <User size={22} />
              <div>
                <h3>Username</h3>
                <p>{user?.username}</p>
              </div>
            </div>

          </div>

          <div className="setting-row">

            <div className="setting-info">
              <Shield size={22} />
              <div>
                <h3>Email</h3>
                <p>{user?.email}</p>
              </div>
            </div>

          </div>

          <div className="setting-row">

            <div className="setting-info">
              {darkMode ? <Moon size={22} /> : <Sun size={22} />}

              <div>
                <h3>Dark Theme</h3>
                <p>Enable dark appearance</p>
              </div>

            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
              />

              <span className="slider"></span>

            </label>

          </div>

          <div className="setting-row">

            <div className="setting-info">

              <Bell size={22} />

              <div>
                <h3>Notifications</h3>
                <p>Email & system notifications</p>
              </div>

            </div>

            <label className="switch">

              <input
                type="checkbox"
                checked={notifications}
                onChange={() => setNotifications(!notifications)}
              />

              <span className="slider"></span>

            </label>

          </div>

          <button
            className="save-btn"
            onClick={handleSave}
          >
            <Save size={18} />
            Save Settings
          </button>

        </div>

      </div>
    </DashboardLayout>
  );
}

export default Settings;