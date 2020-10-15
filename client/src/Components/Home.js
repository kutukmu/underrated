import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <div className="container">
          <h5>Used by a few people</h5>
          <h1>Everything you need to discover new songs</h1>
          <p>
            Have you ever thought the number of songs that are waiting for you
            to discover them?. I thought for you and here is the result. Sign up
            and get access the songs treasure right away.
          </p>
          <Link to="/signup">Sing Up</Link>
        </div>
      </div>
      <img src="./images/home.png" alt="img" />
    </div>
  );
};

export default Home;
