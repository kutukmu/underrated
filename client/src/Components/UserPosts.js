import React from "react";
import { GET_USER_POSTS } from "../queries";
import { DELETE_SONG } from "../mutations";
import { useQuery, useMutation } from "@apollo/client";
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import EditSong from "./editSong";

const UserPosts = (props) => {
  const { data, loading, error, refetch } = useQuery(GET_USER_POSTS);
  const [DeleteSong] = useMutation(DELETE_SONG);
  if (loading) return <h1>Loading ...</h1>;

  if (error) return <h1>Error...</h1>;
  const opts = {
    width: 300,
    height: 200,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const handleDelete = (id) => {
    DeleteSong({
      variables: {
        id: id,
      },
    });

    refetch();
  };

  return (
    <div className="userposts">
      <h1>Your Songs</h1>
      <div className="search-results">
        {data.getUserPosts.length
          ? data.getUserPosts.map((item, idx) => {
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
                    <div className="edit-delete">
                      <button
                        className="delete"
                        onClick={() => handleDelete(item.id)}
                      >
                        <MdDelete className="icon" />
                        Delete
                      </button>
                      <Link
                        className="edit"
                        to={{
                          pathname: `songs/${item.id}/edit`,
                          state: {
                            name: item.name,
                            url: item.url,
                            description: item.description,
                            category: item.category,
                          },
                        }}
                      >
                        <BiEditAlt className="icon" />
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          : "You Have not shared any Song yet"}
      </div>
    </div>
  );
};

export default UserPosts;
