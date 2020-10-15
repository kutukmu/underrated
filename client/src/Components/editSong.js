import React, { useState, useEffect } from "react";
import { UPDATE_SONG } from "../mutations";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import withAuth from "./withAuth";
toast.configure();

const EditSong = (props) => {
  useEffect(() => {
    if (!props.location.state) {
      props.history.push("/");
    }
  }, []);

  if (props.location.state) {
    var { name, description, category, url } = props.location.state;
  }

  const prmid = props.match.params.id;

  const [state, setState] = useState({
    name,
    description,
    category,
    url,
  });

  const [UpdateSong] = useMutation(UPDATE_SONG);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const song = await UpdateSong({
        variables: {
          id: prmid,
          data: {
            name: state.name,
            description: state.description,
            category: state.category,
            url: state.url,
          },
        },
      });

      props.history.goBack();
    } catch (error) {
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
  };

  return (
    <div className="add-song">
      <div className="container">
        <div className="add-song-inner">
          <div className="form-container">
            <h1>Start Sharing with others</h1>
            <form className="song-form" onSubmit={handleSubmit}>
              <div className="form-input">
                <label htmlFor="title">Title: </label>
                <input
                  required
                  type="text"
                  value={state.name}
                  onChange={(e) =>
                    setState({
                      ...state,
                      [e.target.name]: e.target.value,
                    })
                  }
                  name="name"
                  id="title"
                />
              </div>
              <div className="form-input">
                <label htmlFor="category">Category: </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={state.category}
                  onChange={(e) =>
                    setState({
                      ...state,
                      [e.target.name]: e.target.value,
                    })
                  }
                >
                  <option value="rock">Rock</option>
                  <option value="pop">Pop</option>
                  <option value="hiphop">HipHop</option>
                  <option value="electronic">Electronic</option>
                  <option value="country">Country</option>
                  <option value="classic">Classic</option>
                  <option value="jazz">Jazz</option>
                </select>
              </div>
              <div className="form-input">
                <label htmlFor="description">Description: </label>
                <textarea
                  col="3"
                  row="3"
                  required
                  value={state.description}
                  id="description"
                  name="description"
                  className="textarea"
                  onChange={(e) =>
                    setState({
                      ...state,
                      [e.target.name]: e.target.value,
                    })
                  }
                ></textarea>
              </div>
              <div className="form-input">
                <label htmlFor="url">Youtube Url: </label>
                <input
                  id="url"
                  type="text"
                  required
                  name="url"
                  value={state.url}
                  onChange={(e) =>
                    setState({
                      ...state,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
              <button>Unleash</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth((session) => session && session.Me)(EditSong);
