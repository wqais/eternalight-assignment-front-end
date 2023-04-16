import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let formIsValid = true;
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid Email";
      formIsValid = false;
    }
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
    } else {
      setError("");
    }
    if (formIsValid) {
      login();
      var errors = document.querySelectorAll(".error-container");
      errors.forEach((error) => {
        error.style.marginBottom = "0";
      });
    }
    if(!formIsValid){
      var errors = document.querySelectorAll(".error-container");
      errors.forEach((error) => {
          error.style.marginBottom = "-1rem";
      });
    }
  };

  const login = async () => {
    const user = { email, password };
    if (email && password) {
      await axios
        .post("http://localhost:3001/login", user)
        .then((res) => {
          alert(res.data);
          if (res.data === "User logged in successfully") {
            // window.location.replace("/profile");
            navigate("/profile");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleCheck = () => {
    let show = document.getElementById("show-pass");
    if (show.checked) {
      setShowPassword(true);
    }
    else{
      setShowPassword(false);
    }
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container login">
      <div className="home-btn-container">
        <h1>Login</h1>
        <Link className="btn btn-primary home-btn" to="/">
          Home
        </Link>
      </div>
      <form id="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email" className="form-label mt-4">
          Email
        </label>
        <input
          type="text"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          id="email"
          className="form-control form-input"
          required
        />
        <div className="error-container">
          {error.email && <p>{error.email}</p>}
        </div>
        <label htmlFor="password" className="form-label mt-3">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          id="password"
          className="form-control form-input"
          required
        />
        <input type="checkbox" id="show-pass" onClick={handleCheck} className="form-check"/>
        <label htmlFor="show-pass" className="show-pass-label">Show Password</label>
        <div className="btn-container">
          <button type="submit" className="mt-4 btn btn-primary">
            Login
          </button>
          <input
            type="reset"
            className="btn btn-outline-primary mt-3 reset-btn"
            onClick={handleReset}
          />
        </div>
      </form>
      <p className="mt-2">
        Don't have an account?{" "}
        <strong>
          <Link to="/register">Register</Link>
        </strong>
      </p>
    </div>
  );
};

export default Login;
