import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Authentication.css";

export const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/users/login",
        formData,
        { withCredentials: true }
      );
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.alert("Login success!");
        navigate("/");
      } else {
        window.alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log("Error:", error);
      window.alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="auth-form-container">
        <h2>Login</h2>
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit">Log In</button>
        </form>
        <Link to="/register" style={{ color: "white" }}>
          Don't have an account? Register.
        </Link>
      </div>
    </div>
  );
};
