import React, { useState } from "react";
import ReactDOM from "react-dom";
import { ADD_COMMENT } from "../mutations";
import { useMutation } from "@apollo/client";

const Model = ({ closePortal, songId }) => {
  const [text, setText] = useState("");
  const [CreateComment] = useMutation(ADD_COMMENT);
  const handleSubmit = (e) => {
    e.preventDefault();
    CreateComment({
      variables: {
        songId: songId,
        body: text,
      },
    });
    closePortal();
  };

  return ReactDOM.createPortal(
    <div className="modal" onClick={() => closePortal()}>
      <div className="comment-form" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => closePortal()}>
          X
        </button>
        <h1>Add Comment</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            col="3"
            row="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>,

    document.querySelector("#modal")
  );
};

export default Model;
