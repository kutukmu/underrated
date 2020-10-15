import React, { useState, useEffect, useRef } from "react";
import withSession from "./withSession";
import useStateCallback from "./useStateCallback";
import { UNLIKE_SONG } from "../mutations";
import { useMutation } from "@apollo/client";

const LikeButton = (props) => {
  const [username, setUsername] = useState("");
  const { session } = props;
  const { itemid, refetch, changeState } = props;
  const [unLikeSong] = useMutation(UNLIKE_SONG);

  const handleLike = async () => {
    changeState();
    unLikeSong({
      variables: {
        id: itemid,
        userid: session.Me.id,
      },
    });
  };

  useEffect(() => {
    if (session && session.Me) {
      const { username, favorites } = session.Me;

      setUsername(username);
    }
  }, []);

  return (
    username && (
      <button className="like unlike" onClick={handleLike}>
        {"Unlike"}
      </button>
    )
  );
};

export default withSession(LikeButton);
