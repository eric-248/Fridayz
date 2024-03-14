import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Authentication.css";

export const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5050/api/users/register",
        formData
      );
      if (response.status === 201) {
        window.alert("Registration success!");
        navigate("/login");
      } else {
        window.alert("Registration failed. Please try again.");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Handle 400 Bad Request
        window.alert("User already exists");
      } else {
        console.log("Error:", error);
        window.alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="registration-page">
      <div className="auth-form-container">
        <h2>Register</h2>
        <form
          className="registration-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
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
          <button type="submit">Register</button>
          <Link to="/login" style={{ color: "white" }}>
            Already have an account? Login.
          </Link>
        </form>
      </div>
    </div>
  );
};
