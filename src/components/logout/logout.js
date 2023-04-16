
import { Link } from "react-router-dom";

const Logout = () => {
  return (
    <div className="container logout">
      <h1>Logged Out</h1>
      <br />
      <br />
      <Link to="/" className="btn btn-primary link-btn">Home</Link>
      <Link to="/profile" className="btn btn-primary link-btn">Profile</Link>
      <Link to="/login" className="btn btn-primary link-btn">Login</Link>
      <Link to="/register" className="btn btn-primary link-btn">Register</Link>
    </div>
  );
};

export default Logout;