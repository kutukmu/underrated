import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_SONGS } from "../queries";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const Search = () => {
  const [word, setWord] = useState("");

  const [getAllSongs, { loading, data, error }] = useLazyQuery(GET_ALL_SONGS);

  const handleSubmit = (e) => {
    e.preventDefault();
    getAllSongs({
      variables: {
        word: word,
      },
    });
  };
  const opts = {
    width: 300,
    height: 200,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  if (error) {
    toast(error.message, {
      type: "error",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <div className="search">
      <div className="container">
        <div className="search-inner">
          <div className="search-form">
            <form className="sf" onSubmit={handleSubmit}>
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                required
                placeholder="Rock Songs"
              />
              <button>Search</button>
            </form>
          </div>
          <div className="search-results">
            {loading && "loading..."}
            {data &&
              data.getAllSongs.map((item) => {
                return (
                  <div className="search-card">
                    <div className="search-card-video">
                      <YouTube videoId={item.url.split("=")[1]} opts={opts} />
                    </div>
                    <div className="search-card-text">
                      <h2>{item.name}</h2>
                      <Link to={`/songs/${item.id}`}>Go to Page</Link>
                      <h2>User: {item.username}</h2>
                      <h3>Category: {item.category.toUpperCase()}</h3>
                      <p>
                        {item.description.substring(0, 20)}
                        ...
                      </p>
                      <div className="search-card-bottom">
                        <h3>
                          <span role="img" aria-label="hearth">
                            💖
                          </span>{" "}
                          {item.likes}
                        </h3>
                        <h3>
                          {new Date(Number(item.createdDate)).toDateString()}
                        </h3>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
