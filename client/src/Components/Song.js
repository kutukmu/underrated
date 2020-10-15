import React, { useState } from "react";
import { GET_ALL_SONGS } from "../queries";
import Modal from "./CommentModal";
import { DELETE_COMMENT } from "../mutations";
import { GiRamProfile } from "react-icons/gi";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import YouTube from "react-youtube";
import LikeButton from "./LikeButton";

toast.configure();

const Song = (props) => {
  const { session } = props;
  const [DeleteComment] = useMutation(DELETE_COMMENT);

  const prmid = props.match.params.id;
  const [isOpen, setOpen] = useState(false);
  const { loading, data, error, refetch } = useQuery(GET_ALL_SONGS, {
    variables: {
      id: prmid,
    },
    pollInterval: 500,
  });

  if (loading) return <h1>Loading ...</h1>;
  if (error) {
    return toast(error.message, {
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
  const opts = {
    width: 600,
    height: 400,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
    },
  };

  const {
    id,
    name,
    url,
    category,
    description,
    createdDate,
    username,
    likes,
    comments,
  } = data.getAllSongs[0];

  const closePortal = () => {
    setOpen(false);
  };

  return (
    <>
      {isOpen && <Modal closePortal={closePortal} songId={id} />}
      <div className="song">
        <div className="container">
          <div className="song-inner">
            <div className="song-container">
              <div className="player">
                <YouTube videoId={url.split("=")[1]} opts={opts} />
              </div>
              <div className="song-info">
                <div className="top">
                  <h1 className="song-name">{name}</h1>
                  <h1 className="likes">
                    <span role="img" aria-label="heart-emoji">
                      💖{" "}
                    </span>
                    {likes}
                  </h1>
                </div>
                <div className="bottom">
                  <h2>
                    Unleashed by: <b>{username}</b>
                  </h2>
                  <h1>Category: {category.toUpperCase()}</h1>
                  <p>{description}</p>
                  <LikeButton itemid={id} refetch={refetch} />
                  {session && session.Me && (
                    <button onClick={() => setOpen(true)}>Comment</button>
                  )}
                  <h1 className="date">
                    {new Date(Number(createdDate)).toDateString()}
                  </h1>
                </div>
              </div>
            </div>
            <div className="comment-container">
              <h1>Comments</h1>
              <div className="comment">
                {comments.length === 0
                  ? "No Comment added yet"
                  : comments.map((item, idx) => {
                      return (
                        <div className="user-comment" key={idx}>
                          <div className="icon">
                            <GiRamProfile className="ic" />
                          </div>
                          <div className="comment-text">
                            <h3>{item.username}</h3>
                            <p>{item.body}</p>
                            <h4>{item.createdAt.split("T")[0]}</h4>
                          </div>
                          <div className="comment-delete">
                            {session &&
                              session.Me &&
                              session.Me.username === item.username && (
                                <button
                                  onClick={() => {
                                    DeleteComment({
                                      variables: {
                                        songId: id,
                                        commentId: item.id,
                                      },
                                    });
                                  }}
                                >
                                  Delete
                                </button>
                              )}
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Song;
