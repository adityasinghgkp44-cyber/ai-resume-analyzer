import "./Register.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      console.log("FORM:", form);
      const response = await registerUser(form);

      toast.success(
        response.message || "Registration Successful"
      );

      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      <div className="register-overlay"></div>

      <form
        className="register-card"
        onSubmit={handleRegister}
      >

        <div className="register-header">
          <h1>Create Account</h1>
          <p>Start analyzing your resume with AI.</p>
        </div>

        <div className="input-group">
          <User size={20} />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <Mail size={20} />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <Lock size={20} />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>

        <button
          className="register-btn"
          disabled={loading}
        >
          <UserPlus size={20} />

          {loading
            ? "Creating Account..."
            : "Register"}
        </button>

        <div className="register-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </div>

      </form>

    </div>
  );
}

export default Register;