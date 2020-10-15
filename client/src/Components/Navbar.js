import React from "react";
import { Link } from "react-router-dom";
import { FiLogIn, FiUserPlus } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className={`navbar`}>
      <div className="container">
        <div className="navbar-inner">
          <div className="brand">
            <Link to="/">UnderRated</Link>
          </div>
          <ul className="navbar-nav">
            <li className="navbar-link">
              <Link to="/">Home</Link>
            </li>
            <li className="navbar-link">
              <Link to="/songs">Treasure</Link>
            </li>
          </ul>
          <ul className="navbar-nav auth">
            <li className="navbar-link">
              <Link to="/signin">
                <FiLogIn className="nav-icon" />
                Sign In
              </Link>
            </li>
            <li className="navbar-link">
              <Link to="/signup">
                <FiUserPlus className="nav-icon" />
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
