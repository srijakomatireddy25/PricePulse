import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "../styles/auth.css";

function RegisterPage() {

  const navigate = useNavigate();

  const [form,setForm] = useState({
    name:"",
    email:"",
    password:""
  });

  const handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value});
  };

  const handleSubmit=async(e)=>{
    e.preventDefault();

    await API.post("/auth/register",form);

    alert("Registration Successful");

    navigate("/");
  };

  return (
    <div className="auth-container">
      <form className="auth-card animate-fade-in" onSubmit={handleSubmit}>
        
        <h2>Create Account</h2>
        <p>Join PricePulse today</p>

        <div className="auth-form-group">
          <label>Full Name</label>
          <input 
            name="name" 
            placeholder="Jane Doe" 
            onChange={handleChange} 
            required 
          />
        </div>

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

        <button type="submit">Register</button>

        <div className="auth-links">
          <p className="meta">
            Already have an account? <Link to="/">Sign in</Link>
          </p>
        </div>

      </form>
    </div>
  );
}

export default RegisterPage;