import React, { useEffect } from "react";
import { GET_ALL_SONGS } from "../queries";
import { useQuery } from "@apollo/client";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";

const Posts = (props) => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_SONGS);

  useEffect(() => {
    refetch();
  }, [data]);
  if (loading) return <h1>Loading ...</h1>;
  if (error) return <h1>Error</h1>;

  const opts = {
    width: 300,
    height: 200,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };
  return (
    <div className="posts">
      <div className="container">
        <div className="abs-images">
          <img
            src="images/leftshape.png"
            className="left-shape"
            alt="circle-shapee"
          />
          <img
            src="images/rightshape.png"
            className="right-shape"
            alt="circle-shape"
          />
        </div>
        <div className="posts-inner">
          <h1>Discover the new Songs</h1>
          <div className="post-list">
            {data.getAllSongs.map((item, idx) => {
              return (
                <div className="song-card" key={idx}>
                  <div className="player">
                    <YouTube videoId={item.url.split("=")[1]} opts={opts} />;
                  </div>
                  <div className="info">
                    <div className="user">
                      <h4>Category: {item.category.toUpperCase()}</h4>
                      <h4>{item.username}</h4>
                    </div>
                    <div className="text">
                      <h2>{item.name}</h2>
                      <Link to={`/songs/${item.id}`}>Go to Page</Link>
                      <p>{item.description.substring(0, 40)}...</p>
                      <div className="date-likes">
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
                </div>
              );
            })}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Posts;
