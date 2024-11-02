import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ session }) => {
  return (
    <nav className="navbar">
      <Link to="/">Learning path</Link>
      <div className="vulnerabilities-links">
        <Link to="/movies">Movies</Link>
        <Link to="/reset-password">Reset Password</Link>
        <Link to="/login">login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
