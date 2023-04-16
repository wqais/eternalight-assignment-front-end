import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

const Home = () => {
  return (
    <div className="home-page container text-start">
      <h1>
        Welcome! <small>&#128516;</small>
      </h1>
      <p className="mt-4">
        This is a simple login and registration app built using React, Node.js and MongoDB. 
      </p>
      <p className="mt-4">Choose an action:</p>
      <Link to="/register" className="btn btn-primary action-btn">
        Register
      </Link>
      &nbsp; &nbsp;
      <Link to="/login" className="btn btn-primary action-btn">
        Login
      </Link>
      <p className="mt-5">
        <strong>Test Credentials:</strong>
        <br />
        <strong>Email :</strong> test@gmail.com
        <br />
        <strong>Password :</strong> test@123
      </p>
      <footer className="container text-center footer-container">
        Made by <a className="portfolio-link" href="https://wqais-portfolio.vercel.app/">Qais Warekar</a>
      </footer>
    </div>
  );
};

export default Home;
