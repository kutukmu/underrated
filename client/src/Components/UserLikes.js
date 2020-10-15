import React from "react";
import { ME_QUERY } from "../queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";
const UserLikes = () => {
  const { loading, data, error } = useQuery(ME_QUERY);

  const opts = {
    width: 300,
    height: 200,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  if (loading) return <h1>Loading ...</h1>;
  if (error) return <h1>Error...</h1>;

  return (
    <div className="userlikes">
      <div className="userlikes-text">
        <h1>{data.Me.username}'s Likes</h1>
        <div className="search-results">
          {data.Me.favorites.length
            ? data.Me.favorites.map((item, idx) => {
                return (
                  <div className="search-card" key={idx}>
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
              })
            : "You Have not liked any song yet"}
        </div>
      </div>
    </div>
  );
};

export default UserLikes;
