import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./profile.css";

const Profile = () => {
  let [userID, setUserID] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get("http://localhost:3001/profile");
      setUserID(res.data._id);
      setName(res.data.name);
      setEmail(res.data.email);
      setPassword(res.data.password);
    };
    getUser();
  }, []);

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
      update();
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
    } else {
      setShowPassword(false);
    }
  };

  const update = async () => {
    const user = { name, email, password };
    if (name && email && password && password === reEnterPassword) {
      await axios
        .post(`http://localhost:3001/profile/${userID}`, user)
        .then((res) => {
          alert(res.data);
        })
        .catch((err) => {
          alert("Could not update profile");
          console.log(err.response.data);
        });
    }
  };

  const logout = async () => {
    try {
      const res = await fetch("/logout", {
        method: "POST",
      });
      if (res.status === 200) {
        setUserID(null);
        alert("Logged out successfully");
      } else {
        alert("Error logging out");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!userID) {
    return (
      <div className="container profile-container logged-out">
        <h1>Log in to view your profile</h1>
        <br />
        <Link to="/" className="btn btn-primary mt-4 navigate-link">
          Home
        </Link>
        <Link to="/login" className="btn btn-primary mt-4 navigate-link">
          Login
        </Link>
        <Link to="/register" className="btn btn-primary mt-4 navigate-link">
          Register
        </Link>
      </div>
    );
  }
  return (
    <div className="profile container mt-5">
      <div className="home-btn-container">
        <h1>Successfully logged in!</h1>
        <Link className="btn btn-primary home-btn" to="/">
          Home
        </Link>
      </div>
      <form onSubmit={handleSubmit} action={`/profile/${userID}`}>
        <h4 className="mt-4">Edit your profile here:</h4>
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
          onClick={handleCheck}
          className="form-check"
        />
        <label htmlFor="show-pass" className="show-pass-label">
          Show Password
        </label>
        <div className="error-container">
          {error.password && <p>{error.password}</p>}
        </div>
        <label htmlFor="reEnterPassword" className="form-label mt-4 below-check">
          Re-enter Password
        </label>
        <input
          type="password"
          placeholder="Re-enter Password"
          name="re-enter-password"
          id="re-enter-password"
          className="form-control form-input"
          onChange={(e) => setReEnterPassword(e.target.value)}
          required
        />
        <div className="error-container">
          {error.passwordMatch && <p>{error.passwordMatch}</p>}
        </div>
        <br />
        <div className="btn-container">
          <button type="submit" className="btn btn-primary mt-3">
            Update
          </button>
          <button
            onClick={logout}
            className="btn btn-outline-primary mt-3 logout-btn reset-btn"
          >
            Log Out
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
