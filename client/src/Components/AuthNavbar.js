import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

const AuthNavbar = (props) => {
  const { username, client, history, id } = props;
  const handleSignOut = (client) => {
    client.resetStore();
    localStorage.setItem("token", "");

    history.push("/signin");
  };

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
            <li className="navbar-link">
              <Link to="/addsong">Unleash</Link>
            </li>
            <li className="navbar-link">
              <Link to="/search">Search</Link>
            </li>
          </ul>
          <ul className="navbar-nav auth">
            <span style={{ color: "white" }}>Welcome {username}</span>
            <li className="navbar-link">
              <Link to={`/user/${id}`}>
                <FiChevronRight className="nav-icon" />
                Profile
              </Link>
            </li>
            <li className="navbar-link">
              <button to="/signup" onClick={() => handleSignOut(client)}>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
