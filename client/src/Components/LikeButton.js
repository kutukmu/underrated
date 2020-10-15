import React, { useState, useEffect, useRef } from "react";
import withSession from "./withSession";
import { LIKE_SONG, UNLIKE_SONG } from "../mutations";
import { useMutation } from "@apollo/client";

const LikeButton = (props) => {
  const [username, setUsername] = useState("");
  const [liked, setLiked] = useState(false);
  const { session } = props;
  const { itemid } = props;
  const [LikeSong] = useMutation(LIKE_SONG);
  const [unLikeSong] = useMutation(UNLIKE_SONG);

  const handleLike = async () => {
    setLiked(!liked);
    if (liked) {
      unLikeSong({
        variables: {
          id: itemid,
          userid: session.Me.id,
        },
      });
    } else {
      LikeSong({
        variables: {
          id: itemid,
          userid: session.Me.id,
        },
      });
    }
  };

  const handleState = () => {
    setLiked(!liked);
  };

  useEffect(() => {
    if (session && session.Me) {
      const { username, favorites } = session.Me;
      const prevLiked = favorites.findIndex((n) => n.id === itemid) > -1;

      setUsername(username);
      setLiked(prevLiked);
    }
  }, []);

  return (
    username && (
      <button className={`like ${liked && "unlike"}`} onClick={handleLike}>
        {!liked ? "Like" : "Unliked"}
      </button>
    )
  );
};

export default withSession(LikeButton);
