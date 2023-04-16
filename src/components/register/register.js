import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    let formIsValid = true;
    if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name)) {
      newErrors.name = "Name cannot contain numbers or special characters";
      formIsValid = false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid Email";
      formIsValid = false;
    }
    if (password.length < 8) {
      newErrors.password = "Password must be atleast 8 characters long";
      formIsValid = false;
    }
    if (password !== reEnterPassword) {
      newErrors.passwordMatch = "Passwords do not match";
      formIsValid = false;
    }
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
    } else {
      setError("");
    }
    if (formIsValid) {
      register();
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

  const handleCheck = () => {
    let show = document.getElementById("show-pass");
    if (show.checked) {
      setShowPassword(true);
    }
    else{
      setShowPassword(false);
    }
  };

  const register = async () => {
    const user = { name, email, password, reEnterPassword };
    if (
      name &&
      email &&
      password &&
      reEnterPassword &&
      password === reEnterPassword
    ) {
      await axios
        .post("http://localhost:3001/register", user)
        .then((res) => {
          alert(res.data);
          if (res.status === 500) {
            return;
          } else {
            navigate("/profile");
          }
        })
        .catch((err) => {
          alert("User already exists");
          console.log(err.response.data);
        });
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setReEnterPassword("");
  };

  return (
    <div className="register container">
      <div className="home-btn-container">
        <h1>Register</h1>
        <Link className="btn btn-primary home-btn" to="/">
          Home
        </Link>
      </div>
      <form onSubmit={handleSubmit} method="post">
        <label htmlFor="name" className="form-label mt-4">
          Name
        </label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          id="name"
          className="form-control form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div className="error-container">
          {error.name && <p>{error.name}</p>}
        </div>
        <label htmlFor="email" className="form-label mt-3">
          Email
        </label>
        <input
          type="text"
          placeholder="Email"
          name="email"
          id="email"
          className="form-control form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          name="password"
          id="password"
          className="form-control form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="checkbox"
          id="show-pass"
          className="form-check"
          onChange={handleCheck}
        />
        <label htmlFor="show-pass" className="form-check-label">
          Show Password
        </label>
        <div className="error-container">
          {error.password && <p>{error.password}</p>}
        </div>

        <label htmlFor="reEnterPassword" className="form-label mt-3">
          Re-enter Password
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          name="reEnterPassword"
          id="reEnterPassword"
          className="form-control form-input"
          value={reEnterPassword}
          onChange={(e) => setReEnterPassword(e.target.value)}
          required
        />
        <div className="error-container">
          {error.passwordMatch && <p>{error.passwordMatch}</p>}
        </div>
        <br />
        <div className="btn-container">
          <button type="submit" className="btn btn-primary mt-3">
            Register
          </button>
          <input
            type="reset"
            className="btn btn-outline-primary mt-3 reset-btn"
            onClick={handleReset}
          />
        </div>
      </form>
      <p className="mt-3">
        Already have an account?{" "}
        <strong>
          <Link to="/login">Login</Link>
        </strong>
      </p>
    </div>
  );
};

export default Register;
