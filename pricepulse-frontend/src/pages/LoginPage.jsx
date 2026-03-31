import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { loginUser } from "../utils/auth";
import "../styles/auth.css";

function LoginPage() {

  const navigate = useNavigate();

  const [form,setForm] = useState({
    email:"",
    password:""
  });

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    await API.post("/auth/login",form);

    loginUser();

    navigate("/about");
  };

  return (
    <div className="auth-container">
      <form className="auth-card animate-fade-in" onSubmit={handleSubmit}>
        
        <h2>Welcome Back</h2>
        <p>Sign in to your PricePulse account</p>

        <div className="auth-form-group">
          <label>Email Address</label>
          <input
            name="email"
            type="email"
            placeholder="name@company.com"
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-form-group">
          <label>Password</label>
          <input
            name="password"
            type="password"
            placeholder="••••••••"
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Sign In</button>

        <div className="auth-links">
          <p className="meta">
            Don't have an account? <Link to="/register">Create one now</Link>
          </p>
        </div>

      </form>
    </div>
  );
}

export default LoginPage;